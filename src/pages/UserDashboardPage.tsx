import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  StatCard,
  SessionList,
  Session,
  QRGeneratorModal,
} from "../components";
import { participantData, organizerData } from "../data/mockData";

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<"participant" | "organizer">(
    "participant"
  );
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionCode, setSessionCode] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

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

  return (
    <>
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10">
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl sm:blur-3xl"
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
            className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-2xl sm:blur-3xl"
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
            className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] lg:opacity-[0.04] dark:opacity-[0.01]"
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
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-7xl">
          <motion.div
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/50 dark:to-purple-900/50 backdrop-blur-xl text-blue-700 dark:text-blue-300 text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium shadow-lg sm:shadow-2xl border border-blue-200/50 dark:border-blue-700/50"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Commitment-Based Learning Platform</span>
          </motion.div>

          <motion.div
            className="mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.span
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Learning
              </motion.span>

              <motion.span
                className="block text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-2 sm:mt-4 relative"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Dashboard
                <motion.div
                  className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 lg:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div
            className="mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Manage your learning sessions and track commitment-based progress
              with{" "}
              <motion.span
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                automated reward systems
              </motion.span>{" "}
              and smart contract escrow.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              onClick={() => setActiveTab("participant")}
              className={`group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-300 ${
                activeTab === "participant"
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                  : "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "participant" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center">
                <Users className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                Participant View
              </span>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab("organizer")}
              className={`group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-300 ${
                activeTab === "organizer"
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                  : "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "organizer" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center">
                <TrendingUp className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                Organizer View
              </span>
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
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
      </section>

      {activeTab === "participant" && (
        <>
          <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="text-center mb-12 lg:mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 lg:mb-6">
                  Participant Overview
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Track your learning progress and available cashback rewards
                  from your commitment-based education journey
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                <StatCard
                  icon={DollarSign}
                  title="Total Deposits"
                  value={participantData.totalDeposits}
                  color="blue"
                />
                <StatCard
                  icon={CheckCircle}
                  title="Available Cashback"
                  value={participantData.availableCashback}
                  color="green"
                />
                <StatCard
                  icon={TrendingUp}
                  title="Total Claimed"
                  value={participantData.totalClaimed}
                  color="purple"
                />
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
            <motion.div
              className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -80, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ top: "10%", left: "85%" }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl lg:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 mb-8"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 lg:mb-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2 lg:mb-3">
                      Upcoming Sessions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                      Your scheduled learning commitments
                    </p>
                  </div>
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                </motion.div>

                <SessionList
                  sessions={participantData.upcomingSessions}
                  type="participant"
                />
              </motion.div>
            </div>
          </section>

          <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900 dark:via-green-950/10 dark:to-blue-950/10 relative overflow-hidden">
            <motion.div
              className="absolute w-40 h-40 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-2xl"
              animate={{
                x: [0, -80, 60, 0],
                y: [0, 60, -40, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ top: "5%", left: "10%" }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl lg:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 lg:mb-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 lg:mb-3">
                      Completed Sessions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                      Your learning history and achievements
                    </p>
                  </div>
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                </motion.div>

                <SessionList
                  sessions={participantData.completedSessions}
                  type="participant"
                />
              </motion.div>
            </div>
          </section>
        </>
      )}

      {activeTab === "organizer" && (
        <>
          <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="text-center mb-12 lg:mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-4 lg:mb-6">
                  Organizer Dashboard
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Manage your events and track revenue from your
                  commitment-based learning programs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
                <StatCard
                  icon={DollarSign}
                  title="Total Revenue"
                  value={organizerData.totalRevenue}
                  color="purple"
                />
                <StatCard
                  icon={CheckCircle}
                  title="Available Withdrawal"
                  value={organizerData.availableWithdrawal}
                  color="green"
                />
                <StatCard
                  icon={TrendingUp}
                  title="Total Withdrawn"
                  value={organizerData.totalWithdrawn}
                  color="blue"
                />
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.button
                  className="group relative inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white font-bold text-base lg:text-lg rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Withdraw Funds
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/create"
                    className="group relative inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold text-base lg:text-lg rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Create New Event
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-commitment-blue/5 to-light-blue/5 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-deep-navy dark:text-foreground mb-2">
                      Active Sessions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Kelola sesi yang akan datang dan hari ini
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-commitment-blue" />
                </div>

                <SessionList
                  sessions={organizerData.activeSessions}
                  type="organizer"
                  onGenerateQR={handleGenerateQR}
                />
              </div>
            </div>
          </section>

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

          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-deep-navy dark:text-foreground mb-2">
                      Completed Sessions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Riwayat sesi dengan tingkat kehadiran
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <SessionList
                  sessions={organizerData.completedSessions}
                  type="organizer"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
