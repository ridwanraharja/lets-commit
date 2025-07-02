import { motion } from "framer-motion";
import { Calendar, Clock, QrCode } from "lucide-react";

export interface Session {
  id: number;
  eventTitle: string;
  sessionTitle: string;
  date: string;
  time?: string;
  participants?: number;
  maxParticipants?: number;
  revenue?: number;
  status?: string;
  deposit?: number;
  canClaim?: boolean;
  claimed?: boolean;
  attended?: boolean;
  withdrawn?: boolean;
  attendanceRate?: number;
}

interface SessionCardProps {
  session: Session;
  type: "participant" | "organizer";
  onGenerateQR?: (s: Session) => void;
}

export function SessionCard({ session, type, onGenerateQR }: SessionCardProps) {
  if (type === "participant") {
    return (
      <motion.div
        className="group relative bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="flex items-start space-x-4 lg:space-x-6">
              <motion.div
                className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 lg:mb-2">
                  {session.eventTitle}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3 lg:mb-4 text-base lg:text-lg">
                  {session.sessionTitle}
                </p>
                <div className="flex flex-wrap gap-4 lg:gap-6 text-sm lg:text-base text-gray-600 dark:text-gray-400">
                  <span>📅 {session.date}</span>
                  {session.time && <span>🕐 {session.time}</span>}
                  {session.deposit && (
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      💰 ${session.deposit} USDT
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:ml-6">
            <motion.button
              className="group relative w-full lg:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Session</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-start space-x-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                session.status === "today"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600"
                  : "bg-gradient-to-tr from-commitment-blue to-light-blue"
              }`}
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-deep-navy dark:text-foreground">
                {session.eventTitle}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {session.sessionTitle}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  📅 {session.date}
                  {session.time && <> at {session.time}</>}
                </span>
                {session.participants && session.maxParticipants && (
                  <span>
                    👥 {session.participants}/{session.maxParticipants}
                  </span>
                )}
                {session.revenue && (
                  <span className="font-semibold text-commitment-blue">
                    💰 ${session.revenue} USDT
                  </span>
                )}
              </div>
              {session.status === "today" && (
                <span className="inline-block mt-2 px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-medium rounded-full">
                  Today
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          {session.status === "today" ? (
            <button
              onClick={() => onGenerateQR && onGenerateQR(session)}
              className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR
            </button>
          ) : (
            <button className="px-6 py-2 border-2 border-commitment-blue text-commitment-blue font-medium rounded-lg hover:bg-light-blue/10 transition-all duration-200">
              Manage Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
