import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Calendar,
  MapPin,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useLetsCommit } from "../hooks/useLetsCommit";
import { useEventService } from "../hooks/useEventService";
import { useQueryClient } from "@tanstack/react-query";
import { SuccessModal } from "../components/SuccessModal";
import { EventDetailOrganizer } from "../services/types";
import { Session } from "../types/contracts";

export default function CheckInPage() {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { address } = useAccount();
  const { attendSession, getSession, isParticipantEnrolled } = useLetsCommit();
  const { useGetEventById } = useEventService();
  const queryClient = useQueryClient();

  const sessionCode = searchParams.get("code");
  const eventId = searchParams.get("eventId");

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [eventData, setEventData] = useState<EventDetailOrganizer | null>(null);
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch event and session data
  const { data: event, isLoading: eventLoading } = useGetEventById(
    eventId || "",
    !!eventId
  );

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId || !eventId) return;

      try {
        const eventBigInt = BigInt(eventId);
        // Handle both direct sessionId and sessionId from dashboard format (eventId-sessionNumber)
        let sessionIndex: number;
        if (sessionId.includes("-")) {
          // Format: "eventId-sessionNumber"
          sessionIndex = parseInt(sessionId.split("-")[1]);
        } else {
          // Format: direct sessionId
          sessionIndex = parseInt(sessionId) - 1;
        }
        const session = await getSession(eventBigInt, sessionIndex);
        setSessionData(session);
      } catch (err) {
        console.error("Failed to fetch session:", err);
        setError("Failed to load session data");
      }
    };

    const checkEnrollment = async () => {
      if (!address || !eventId) return;

      try {
        const eventBigInt = BigInt(eventId);
        const enrolled = await isParticipantEnrolled(eventBigInt, address);
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error("Failed to check enrollment:", err);
      }
    };

    fetchSessionData();
    checkEnrollment();
  }, [sessionId, eventId, address]);

  const handleCheckIn = async () => {
    if (!address || !sessionId || !eventId || !sessionCode) {
      setError("Missing required information for check-in");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const eventBigInt = BigInt(eventId);
      const sessionIndex = parseInt(sessionId.split("-")[1]);

      console.log("eventBigInt", eventBigInt);
      console.log("sessionIndex", sessionId);
      console.log("sessionCode", sessionCode);
      // Call the attendSession function
      const hash = await attendSession(eventBigInt, sessionIndex, sessionCode);

      console.log("Check-in successful, transaction hash:", hash);
      setSuccess(true);
      setShowSuccessModal(true);

      // Invalidate queries to refresh data
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      await queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    } catch (err) {
      console.error("Check-in failed:", err);
      setError(err instanceof Error ? err.message : "Check-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate(`/events/${eventId}`);
  };

  const handleGoToEvent = () => {
    navigate(`/events/${eventId}`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  // Validation checks
  const isMissingInfo = !sessionId || !eventId || !sessionCode;
  const isNotConnected = !address;
  const isNotEnrolled = !isEnrolled && !eventLoading;

  if (isMissingInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Invalid Check-in Link
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This check-in link is missing required information. Please use the
            QR code or link provided by your event organizer.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isNotConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please connect your wallet to check in for this session.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isNotEnrolled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Not Enrolled
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You are not enrolled in this event. Please enroll first before
            checking in.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoToEvent}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Event
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "5%", left: "5%" }}
        />
        <motion.div
          className="absolute w-56 h-56 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 45, -35, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          style={{ top: "15%", right: "5%" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleGoToEvent}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Event
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Session Check-in
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Confirm your attendance for this session
            </p>
          </div>

          {/* Event and Session Info */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {eventLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : eventData ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {eventData.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {eventData.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {eventData.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Session {sessionId}
                    </div>
                  </div>
                </div>

                {sessionData && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Session Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Date
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(
                              Number(sessionData.startSessionTime) * 1000
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Time
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(
                              Number(sessionData.startSessionTime) * 1000
                            ).toLocaleTimeString()}{" "}
                            -{" "}
                            {new Date(
                              Number(sessionData.endSessionTime) * 1000
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Check-in Status */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ready to Check-in
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    You are enrolled in this event and can check in for this
                    session. Click the button below to confirm your attendance.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Failed to load event information
                </p>
              </div>
            )}
          </motion.div>

          {/* Check-in Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-700 dark:text-green-400">
                    Check-in successful! Your attendance has been recorded.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleCheckIn}
              disabled={isLoading || success || !eventData}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Check-in...
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  Check-in Complete
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  Check-in for Session
                </div>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Check-in Successful!"
        message="Your attendance has been recorded successfully. You can now claim your commitment deposit for this session."
        primaryAction={{
          label: "View Event",
          onClick: handleSuccessModalClose,
          icon: <Calendar className="w-4 h-4" />,
        }}
        secondaryAction={{
          label: "Go Home",
          onClick: handleGoHome,
        }}
      />
    </div>
  );
}
