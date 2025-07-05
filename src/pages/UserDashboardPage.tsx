import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import {
  StatCard,
  SessionList,
  Session,
  QRGeneratorModal,
  EventList,
  DashboardTabs,
} from "../components";
import { useDashboardService } from "../hooks/useDashboardService";
import { useEventService } from "../hooks/useEventService";
import { useRole } from "../context/RoleContext";
import {
  mapParticipantDashboard,
  mapOrganizerDashboard,
} from "../utils/dashboardMapper";
import { IFeaturedEvent } from "../types/constType";
import { mapApiEventToFeaturedEvent } from "../utils/eventMapper";

export default function UserDashboardPage() {
  const { role } = useRole();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionCode, setSessionCode] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

  const { address } = useAccount();
  const { useGetParticipantDashboard, useGetOrganizerDashboard } =
    useDashboardService();
  const { useGetEventsByState } = useEventService();

  // Only fetch the dashboard that matches the current role
  const participantQuery = useGetParticipantDashboard(
    address ?? "",
    role === "participant"
  );

  const organizerQuery = useGetOrganizerDashboard(
    address ?? "",
    role === "organizer"
  );

  const { data: onSaleEvents, isLoading: onSaleLoading } =
    useGetEventsByState("ON_SALE");
  const { data: onGoingEvents, isLoading: onGoingLoading } =
    useGetEventsByState("ON_GOING");
  const { data: finishedEvents, isLoading: finishedLoading } =
    useGetEventsByState("FINISHED");

  // Combine all events
  const allEvents: IFeaturedEvent[] = useMemo(() => {
    const events: IFeaturedEvent[] = [];

    if (onSaleEvents) {
      events.push(...onSaleEvents.map(mapApiEventToFeaturedEvent));
    }
    if (onGoingEvents) {
      events.push(...onGoingEvents.map(mapApiEventToFeaturedEvent));
    }
    if (finishedEvents) {
      events.push(...finishedEvents.map(mapApiEventToFeaturedEvent));
    }

    return events;
  }, [onSaleEvents, onGoingEvents, finishedEvents]);

  const organizerEvents = allEvents.filter(
    (event) => event.organizer === address?.toLowerCase()
  );

  const isLoading = onSaleLoading || onGoingLoading || finishedLoading;

  const currentQuery =
    role === "participant" ? participantQuery : organizerQuery;

  const participantData =
    participantQuery.data && !participantQuery.isError
      ? mapParticipantDashboard(participantQuery.data)
      : {
          totalDeposits: 0,
          availableCashback: 0,
          totalClaimed: 0,
          upcomingSessions: [],
          completedSessions: [],
        };

  const organizerData =
    organizerQuery.data && !organizerQuery.isError
      ? mapOrganizerDashboard(organizerQuery.data)
      : {
          totalRevenue: 0,
          availableWithdrawal: 0,
          totalWithdrawn: 0,
          activeSessions: [],
          completedSessions: [],
        };

  const handleGenerateQR = (session: Session) => {
    setSelectedSession(session);
    setShowCodeInput(true);
    setSessionCode("");
  };

  const handleConfirmCode = () => {
    if (sessionCode.trim()) {
      setShowCodeInput(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
    setShowCodeInput(false);
    setSessionCode("");
  };

  if (currentQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading {role} dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (currentQuery.isError) {
    console.warn(
      `Failed to load ${role} dashboard data, showing empty dashboard`
    );
  }

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please connect your wallet to view dashboard
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl sm:blur-3xl"
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
          className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl sm:blur-3xl"
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

        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 30, -45, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
          style={{ bottom: "10%", left: "15%" }}
        />

        <motion.div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-xl sm:blur-2xl"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -25, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ top: "50%", right: "20%" }}
        />

        <motion.div
          className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-full blur-lg sm:blur-xl"
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -20, 12, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
          style={{ top: "35%", left: "70%" }}
        />

        <motion.div
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] lg:opacity-[0.04] dark:opacity-[0.01] dark:sm:opacity-[0.015] dark:lg:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0
                ? "bg-blue-500"
                : i % 4 === 1
                ? "bg-purple-500"
                : i % 4 === 2
                ? "bg-pink-500"
                : "bg-indigo-500"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-0 sm:h-16 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm ${
                  role === "participant"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-purple-600 text-white shadow-lg"
                }`}
              >
                {role === "participant" ? (
                  <>
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      Participant Dashboard
                    </span>
                    <span className="sm:hidden">Participant</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      Organizer Dashboard
                    </span>
                    <span className="sm:hidden">Organizer</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        {role === "participant" && (
          <div className="space-y-6 sm:space-y-8">
            <section>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  Overview
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Your learning progress and financial summary
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard
                  icon={DollarSign}
                  title="Total Deposits"
                  value={participantData.totalDeposits / 1000}
                  color="blue"
                />
                <StatCard
                  icon={CheckCircle}
                  title="Available Cashback"
                  value={participantData.availableCashback / 1000}
                  color="green"
                />
                <StatCard
                  icon={TrendingUp}
                  title="Total Claimed"
                  value={participantData.totalClaimed / 1000}
                  color="purple"
                />
              </div>
            </section>

            <DashboardTabs
              tabs={[
                {
                  id: "upcoming",
                  label: "Upcoming Sessions",
                  icon: Clock,
                  content: (
                    <SessionList
                      sessions={participantData.upcomingSessions}
                      type="participant"
                    />
                  ),
                },
                {
                  id: "completed",
                  label: "Completed Sessions",
                  icon: Award,
                  content: (
                    <SessionList
                      sessions={participantData.completedSessions}
                      type="participant"
                    />
                  ),
                },
              ]}
              defaultTab="upcoming"
            />
          </div>
        )}

        {role === "organizer" && (
          <div className="space-y-6 sm:space-y-8">
            <section>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  Revenue Overview
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Your event revenue and withdrawal status
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard
                  icon={DollarSign}
                  title="Total Revenue"
                  value={organizerData.totalRevenue / 1000}
                  color="purple"
                />
                <StatCard
                  icon={CheckCircle}
                  title="Available Withdrawal"
                  value={organizerData.availableWithdrawal / 1000}
                  color="green"
                />
                <StatCard
                  icon={TrendingUp}
                  title="Total Withdrawn"
                  value={organizerData.totalWithdrawn / 1000}
                  color="blue"
                />
              </div>
            </section>

            <section>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Quick Actions
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.button
                    className="w-full sm:flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    Withdraw Funds
                  </motion.button>
                  <Link
                    to="/create"
                    className="w-full sm:flex-1 px-4 sm:px-6 py-3 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200 text-center backdrop-blur-sm text-sm sm:text-base"
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    Create New Event
                  </Link>
                </div>
              </div>
            </section>

            <DashboardTabs
              tabs={[
                {
                  id: "events",
                  label: "My Events",
                  icon: Calendar,
                  content: (
                    <EventList events={organizerEvents} isLoading={isLoading} />
                  ),
                },
                {
                  id: "active",
                  label: "Active Sessions",
                  icon: Clock,
                  content: (
                    <SessionList
                      sessions={organizerData.activeSessions}
                      type="organizer"
                      onGenerateQR={handleGenerateQR}
                      sessionType="upcoming"
                    />
                  ),
                },
                {
                  id: "completed",
                  label: "Completed Sessions",
                  icon: Award,
                  content: (
                    <SessionList
                      sessions={organizerData.completedSessions}
                      type="organizer"
                      onGenerateQR={handleGenerateQR}
                      sessionType="completed"
                    />
                  ),
                },
              ]}
              defaultTab="events"
            />
          </div>
        )}
      </main>

      {selectedSession && (
        <QRGeneratorModal
          session={selectedSession}
          sessionCode={sessionCode}
          setSessionCode={setSessionCode}
          showCodeInput={showCodeInput}
          onClose={handleCloseModal}
          onConfirm={handleConfirmCode}
        />
      )}
    </div>
  );
}
