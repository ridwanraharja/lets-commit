import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Users,
  BookOpen,
  Sparkles,
  Heart,
  Star,
  Coffee,
  Image,
  ArrowRight,
} from "lucide-react";
import { Tag } from "react-tag-input";
import { useLetsCommit } from "../hooks/useLetsCommit";
import {
  CreateEventParams,
  Session as ContractSession,
} from "../types/contracts";
import {
  EventFormCard,
  FormTextarea,
  TagInput,
  SessionForm,
  SuccessModal,
  AnimatedBackground,
  InfoCard,
  FormInput,
} from "../components";

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
}

interface EventData {
  title: string;
  description: string;
  location: string;
  imageUri: string;
  maxParticipants: string;
  eventFee: string;
  commitmentDeposit: string;
  startSaleDate: string;
  endSaleDate: string;
}

export default function CreatePage() {
  const { createEvent, isConnected } = useLetsCommit();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    location: "",
    imageUri: "",
    maxParticipants: "",
    eventFee: "",
    commitmentDeposit: "",
    startSaleDate: "",
    endSaleDate: "",
  });

  const [sessions, setSessions] = useState<Session[]>([
    { id: "1", title: "", date: "", time: "", duration: "" },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSessionChange = (
    sessionId: string,
    field: keyof Session,
    value: string
  ) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, [field]: value } : session
      )
    );
  };

  const addSession = () => {
    if (sessions.length >= 255) {
      setError("Maximum 255 sessions allowed per event");
      return;
    }

    const newSession: Session = {
      id: Date.now().toString(),
      title: "",
      date: "",
      time: "",
      duration: "",
    };
    setSessions((prev) => [...prev, newSession]);
    setError(null);
  };

  const removeSession = (sessionId: string) => {
    if (sessions.length > 1) {
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    }
  };

  // Convert form data to contract format
  const convertSessionsToContractFormat = (): ContractSession[] => {
    return sessions.map((session) => {
      const sessionDate = new Date(session.date);
      const [hours, minutes] = session.time.split(":").map(Number);
      sessionDate.setHours(hours, minutes, 0, 0);

      const startTime = BigInt(Math.floor(sessionDate.getTime() / 1000));
      const durationInSeconds = Math.floor(
        parseFloat(session.duration) * 60 * 60
      );
      const endTime = startTime + BigInt(durationInSeconds);

      return {
        startSessionTime: startTime,
        endSessionTime: endTime,
        attendedCount: BigInt(0),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (
        !eventData.title ||
        !eventData.description ||
        !eventData.location ||
        !eventData.imageUri
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (sessions.some((s) => !s.title || !s.date || !s.time || !s.duration)) {
        throw new Error("Please fill in all session details");
      }

      if (!eventData.startSaleDate || !eventData.endSaleDate) {
        throw new Error("Please set sale period dates");
      }

      if (tags.length !== 5) {
        throw new Error("Please add exactly 5 tags");
      }

      const startSaleDate = new Date(eventData.startSaleDate);
      const endSaleDate = new Date(eventData.endSaleDate);
      const now = new Date();

      if (startSaleDate <= now) {
        throw new Error("Start sale date must be in the future");
      }

      if (endSaleDate <= startSaleDate) {
        throw new Error("End sale date must be after start sale date");
      }

      // const saleEndDate = new Date(eventData.endSaleDate);
      for (const session of sessions) {
        const sessionDate = new Date(session.date);
        if (isNaN(sessionDate.getTime())) {
          throw new Error("Please enter valid dates for all sessions");
        }
        // if (sessionDate <= saleEndDate) {
        //   throw new Error(
        //     "All sessions must be scheduled after the sale end date"
        //   );
        // }
      }

      for (const session of sessions) {
        const duration = parseFloat(session.duration);
        if (isNaN(duration) || duration <= 0) {
          throw new Error("Session duration must be a valid positive number");
        }

        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(session.time)) {
          throw new Error(
            "Please enter valid times for all sessions (HH:MM format)"
          );
        }
      }

      const eventFee = parseFloat(eventData.eventFee);
      const commitmentDeposit = parseFloat(eventData.commitmentDeposit);

      if (isNaN(eventFee) || eventFee < 0) {
        throw new Error("Event fee must be a valid positive number");
      }

      if (isNaN(commitmentDeposit) || commitmentDeposit < 0) {
        throw new Error("Commitment deposit must be a valid positive number");
      }

      const maxParticipants = parseInt(eventData.maxParticipants);
      if (
        isNaN(maxParticipants) ||
        maxParticipants < 1 ||
        maxParticipants > 255
      ) {
        throw new Error("Maximum participants must be between 1 and 255");
      }

      const contractParams: CreateEventParams = {
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        imageUri: eventData.imageUri,
        priceAmount: BigInt(eventFee * 100),
        commitmentAmount: BigInt(commitmentDeposit * 100),
        maxParticipant: maxParticipants,
        startSaleDate: BigInt(Math.floor(startSaleDate.getTime() / 1000)),
        endSaleDate: BigInt(Math.floor(endSaleDate.getTime() / 1000)),
        tags: tags.map((tag) => tag.text) as [
          string,
          string,
          string,
          string,
          string
        ],
        sessions: convertSessionsToContractFormat(),
      };

      await createEvent(contractParams);

      setShowSuccessModal(true);

      await queryClient.invalidateQueries({ queryKey: ["events"] });

      setEventData({
        title: "",
        description: "",
        location: "",
        imageUri: "",
        maxParticipants: "",
        eventFee: "",
        commitmentDeposit: "",
        startSaleDate: "",
        endSaleDate: "",
      });
      setSessions([{ id: "1", title: "", date: "", time: "", duration: "" }]);
      setError(null);
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Info card data
  const sessionInfoItems = [
    {
      icon: Heart,
      text: "Participants pay per session: event fee + commitment deposit",
      color: "text-pink-500",
    },
    {
      icon: Sparkles,
      text: "Commitment deposit returned after attending each session",
      color: "text-blue-500",
    },
    {
      icon: Star,
      text: "No-shows forfeit their commitment deposit for that session",
      color: "text-purple-500",
    },
    {
      icon: Calendar,
      text: "Organizers generate QR codes at session start for check-in",
      color: "text-blue-500",
    },
    {
      icon: Users,
      text: "Participants scan QR or use link to confirm attendance",
      color: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Create New Event
              </h1>
            </motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Set up your educational event with blockchain-secured commitments
              and build a learning community
              <motion.span
                className="inline-block ml-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                role="img"
                aria-label="sparkles"
              >
                ✨
              </motion.span>
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Details Card */}
            <EventFormCard
              icon={Calendar}
              title="Event Details"
              subtitle="Basic information about your event"
              gradientFrom="blue-500"
              gradientTo="purple-500"
            >
              <div className="space-y-6">
                <FormInput
                  id="title"
                  name="title"
                  type="text"
                  value={eventData.title}
                  onChange={handleInputChange}
                  placeholder="Web3 Development Masterclass"
                  label="Event Title"
                  required
                />

                <FormTextarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  placeholder="Comprehensive course covering blockchain fundamentals, smart contracts, and DeFi protocols..."
                  label="Description"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    id="imageUri"
                    name="imageUri"
                    type="url"
                    value={eventData.imageUri}
                    onChange={handleInputChange}
                    placeholder="https://example.com/event-image.jpg"
                    label="Image URI"
                    icon={Image}
                    required
                    helperText="Provide a direct link to your event image (JPG, PNG, or WebP)"
                  />

                  <FormInput
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    value={eventData.maxParticipants}
                    onChange={handleInputChange}
                    placeholder="50"
                    label="Maximum Participants"
                    icon={Users}
                    required
                    min="1"
                    max="255"
                    helperText="Maximum 255 participants allowed per event"
                  />
                </div>

                <FormInput
                  id="location"
                  name="location"
                  type="text"
                  value={eventData.location}
                  onChange={handleInputChange}
                  placeholder="Online / Physical Address"
                  label="Location"
                  icon={MapPin}
                  required
                />

                <TagInput tags={tags} setTags={setTags} />
              </div>
            </EventFormCard>

            {/* Sale Period Card */}
            <EventFormCard
              icon={Calendar}
              title="Sale Period"
              subtitle="Set when participants can enroll"
              gradientFrom="green-500"
              gradientTo="blue-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="startSaleDate"
                  name="startSaleDate"
                  type="datetime-local"
                  value={eventData.startSaleDate}
                  onChange={handleInputChange}
                  label="Start Sale Date"
                  required
                  focusRingColor="green"
                  borderFocusColor="green"
                  helperText="When participants can start enrolling"
                />
                <FormInput
                  id="endSaleDate"
                  name="endSaleDate"
                  type="datetime-local"
                  value={eventData.endSaleDate}
                  onChange={handleInputChange}
                  label="End Sale Date"
                  required
                  focusRingColor="green"
                  borderFocusColor="green"
                  helperText="Last day participants can enroll (must be before first session)"
                />
              </div>
            </EventFormCard>

            {/* Sessions Card */}
            <EventFormCard
              icon={Clock}
              title="Sessions"
              subtitle="Configure individual sessions for your event"
              gradientFrom="purple-500"
              gradientTo="pink-500"
            >
              <div className="space-y-6">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Maximum 255 sessions allowed per event
                </p>

                <AnimatePresence>
                  {sessions.map((session, index) => (
                    <SessionForm
                      key={session.id}
                      session={session}
                      index={index}
                      onSessionChange={handleSessionChange}
                      onRemoveSession={removeSession}
                      canRemove={sessions.length > 1}
                    />
                  ))}
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={addSession}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-2xl text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all duration-300 font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Add another session"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Session
                </motion.button>
              </div>
            </EventFormCard>

            {/* Pricing & Commitment Card */}
            <EventFormCard
              icon={DollarSign}
              title="Pricing & Commitment"
              subtitle="Set pricing and commitment deposits"
              gradientFrom="pink-500"
              gradientTo="purple-500"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    id="eventFee"
                    name="eventFee"
                    type="number"
                    value={eventData.eventFee}
                    onChange={handleInputChange}
                    placeholder="50"
                    label="Event Fee per Session (IDRX)"
                    required
                    min="0"
                    step="0.01"
                    focusRingColor="pink"
                    borderFocusColor="pink"
                    helperText="Fee participants pay to attend each session (supports 6 decimal places)"
                  />
                  <FormInput
                    id="commitmentDeposit"
                    name="commitmentDeposit"
                    type="number"
                    value={eventData.commitmentDeposit}
                    onChange={handleInputChange}
                    placeholder="25"
                    label="Commitment Deposit per Session (IDRX)"
                    required
                    min="0"
                    step="0.01"
                    focusRingColor="pink"
                    borderFocusColor="pink"
                    helperText="Refundable deposit to encourage attendance (supports 6 decimal places)"
                  />
                </div>

                <InfoCard
                  title="How Sessions Work"
                  titleIcon={Coffee}
                  items={sessionInfoItems}
                  gradientFrom="blue-50"
                  gradientTo="purple-50"
                  borderColor="blue-200"
                />
              </div>
            </EventFormCard>

            {/* Submit Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button
                type="submit"
                disabled={isLoading || !isConnected}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                whileHover={
                  !isLoading && isConnected ? { scale: 1.02, y: -2 } : {}
                }
                whileTap={!isLoading && isConnected ? { scale: 0.98 } : {}}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />

                <span className="relative z-10 flex items-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create Event
                    </>
                  )}
                </span>
              </motion.button>

              <motion.button
                type="button"
                disabled={true}
                className="flex-1 px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Save as Draft
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Event Created Successfully!"
        message="Your event has been created and is now live on the platform. Participants can start enrolling during the sale period."
        primaryAction={{
          label: "Explore Events",
          onClick: () => {
            setShowSuccessModal(false);
            navigate("/explore");
          },
          icon: <ArrowRight className="w-5 h-5" />,
        }}
        secondaryAction={{
          label: "Create Another Event",
          onClick: () => setShowSuccessModal(false),
        }}
      />
    </div>
  );
}
