import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Trash2,
  Users,
  BookOpen,
  Sparkles,
  Heart,
  Star,
  Coffee,
  Image,
  Tag as TagIcon,
} from "lucide-react";
import { WithContext as ReactTagInput, Tag } from "react-tag-input";
import { useLetsCommit } from "../hooks/useLetsCommit";
import {
  CreateEventParams,
  Session as ContractSession,
} from "../types/contracts";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

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

      // Validate sale dates
      const startSaleDate = new Date(eventData.startSaleDate);
      const endSaleDate = new Date(eventData.endSaleDate);
      const now = new Date();

      if (startSaleDate <= now) {
        throw new Error("Start sale date must be in the future");
      }

      if (endSaleDate <= startSaleDate) {
        throw new Error("End sale date must be after start sale date");
      }

      const saleEndDate = new Date(eventData.endSaleDate);
      for (const session of sessions) {
        const sessionDate = new Date(session.date);
        if (isNaN(sessionDate.getTime())) {
          throw new Error("Please enter valid dates for all sessions");
        }
        if (sessionDate <= saleEndDate) {
          throw new Error(
            "All sessions must be scheduled after the sale end date"
          );
        }
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
        priceAmount: BigInt(Math.floor(eventFee * 10 ** 6)),
        commitmentAmount: BigInt(Math.floor(commitmentDeposit * 10 ** 6)),
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

      const hash = await createEvent(contractParams);
      console.log("Event created successfully! Transaction hash:", hash);

      setSuccess(`Event created successfully! Transaction hash: ${hash}`);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl sm:blur-3xl"
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
          aria-hidden="true"
        />

        <motion.div
          className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl sm:blur-3xl"
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
          aria-hidden="true"
        />

        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full blur-2xl sm:blur-3xl"
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
          aria-hidden="true"
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
          aria-hidden="true"
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
          aria-hidden="true"
        />

        <motion.div
          className="absolute top-1/4 right-1/6 text-blue-400/25"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <BookOpen className="w-8 h-8" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/6 text-purple-400/25"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 3,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
      </div>

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

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Event Details
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Basic information about your event
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                  >
                    Event Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Web3 Development Masterclass"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                    placeholder="Comprehensive course covering blockchain fundamentals, smart contracts, and DeFi protocols..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="imageUri"
                      className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                    >
                      <Image className="w-4 h-4 inline mr-1" />
                      Image URI *
                    </label>
                    <input
                      id="imageUri"
                      type="url"
                      name="imageUri"
                      value={eventData.imageUri}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="https://example.com/event-image.jpg"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Provide a direct link to your event image (JPG, PNG, or
                      WebP)
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="maxParticipants"
                      className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                    >
                      <Users className="w-4 h-4 inline mr-1" />
                      Maximum Participants *
                    </label>
                    <input
                      id="maxParticipants"
                      type="number"
                      name="maxParticipants"
                      value={eventData.maxParticipants}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="50"
                      min="1"
                      max="255"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Maximum 255 participants allowed per event
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                  >
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Online / Physical Address"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <TagIcon className="w-4 h-4 inline mr-1" />
                    Tags (5 tags required) *
                  </label>
                  <div className="bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-3">
                    <ReactTagInput
                      tags={tags}
                      suggestions={[]}
                      delimiters={[188, 13]} // comma and enter
                      placeholder="Add tags..."
                      handleDelete={(i) =>
                        setTags(tags.filter((tag, index) => index !== i))
                      }
                      handleAddition={(tag) => {
                        if (tags.length < 5) {
                          setTags([...tags, tag]);
                        }
                      }}
                      classNames={{
                        tags: "flex flex-wrap gap-2",
                        tag: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-lg text-sm flex items-center gap-1",
                        tagInput: "flex-1 min-w-0",
                        tagInputField:
                          "w-full px-3 py-2 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm",
                        remove:
                          "text-red-500 hover:text-red-700 cursor-pointer",
                        selected: "flex items-center gap-1",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sale Period Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Sale Period
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Set when participants can enroll
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="startSaleDate"
                    className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                  >
                    Start Sale Date *
                  </label>
                  <input
                    id="startSaleDate"
                    type="datetime-local"
                    name="startSaleDate"
                    value={eventData.startSaleDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300/50 focus:border-green-500 transition-all duration-300 text-gray-900 dark:text-white"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    When participants can start enrolling
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="endSaleDate"
                    className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                  >
                    End Sale Date *
                  </label>
                  <input
                    id="endSaleDate"
                    type="datetime-local"
                    name="endSaleDate"
                    value={eventData.endSaleDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300/50 focus:border-green-500 transition-all duration-300 text-gray-900 dark:text-white"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Last day participants can enroll (must be before first
                    session)
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Sessions
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Configure individual sessions for your event
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Maximum 255 sessions allowed per event
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-700/50 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Star className="w-4 h-4 text-blue-500" />
                        Session {index + 1}
                      </h4>
                      {sessions.length > 1 && (
                        <motion.button
                          type="button"
                          onClick={() => removeSession(session.id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Remove session ${index + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor={`session-title-${session.id}`}
                          className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                        >
                          Session Title *
                        </label>
                        <input
                          id={`session-title-${session.id}`}
                          type="text"
                          value={session.title}
                          onChange={(e) =>
                            handleSessionChange(
                              session.id,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Introduction to Smart Contracts"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label
                            htmlFor={`session-date-${session.id}`}
                            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                          >
                            Date *
                          </label>
                          <input
                            id={`session-date-${session.id}`}
                            type="date"
                            value={session.date}
                            onChange={(e) =>
                              handleSessionChange(
                                session.id,
                                "date",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`session-time-${session.id}`}
                            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                          >
                            Time *
                          </label>
                          <input
                            id={`session-time-${session.id}`}
                            type="time"
                            value={session.time}
                            onChange={(e) =>
                              handleSessionChange(
                                session.id,
                                "time",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`session-duration-${session.id}`}
                            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                          >
                            Duration (hours) *
                          </label>
                          <input
                            id={`session-duration-${session.id}`}
                            type="number"
                            value={session.duration}
                            onChange={(e) =>
                              handleSessionChange(
                                session.id,
                                "duration",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="2"
                            min="1"
                            step="0.5"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

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
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pricing & Commitment
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Set pricing and commitment deposits
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="eventFee"
                      className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                    >
                      Event Fee per Session (USDT) *
                    </label>
                    <input
                      id="eventFee"
                      type="number"
                      name="eventFee"
                      value={eventData.eventFee}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="50"
                      min="0"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Fee participants pay to attend each session (supports 6
                      decimal places)
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="commitmentDeposit"
                      className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
                    >
                      Commitment Deposit per Session (USDT) *
                    </label>
                    <input
                      id="commitmentDeposit"
                      type="number"
                      name="commitmentDeposit"
                      value={eventData.commitmentDeposit}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="25"
                      min="0"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Refundable deposit to encourage attendance (supports 6
                      decimal places)
                    </p>
                  </div>
                </div>

                <motion.div
                  className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    How Sessions Work
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <Heart className="w-4 h-4 mt-0.5 text-pink-500 flex-shrink-0" />
                      Participants pay per session: event fee + commitment
                      deposit
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      Commitment deposit returned after attending each session
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                      No-shows forfeit their commitment deposit for that session
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      Organizers generate QR codes at session start for check-in
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      Participants scan QR or use link to confirm attendance
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>

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
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                disabled={isLoading}
                className="flex-1 px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50"
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
                  <BookOpen className="w-5 h-5" />
                  Save as Draft
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
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

      <motion.div
        className="absolute top-1/4 left-1/4 w-px h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-12 sm:w-16 lg:w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/6 w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 5,
          delay: 2.5,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-40 sm:h-40 border border-blue-500/10 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 border border-purple-500/10 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
