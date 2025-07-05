import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, QrCode } from "lucide-react";
import { isSessionActive } from "../utils/contractUtils";

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "active";
  deposit: number;
  attendance?: number;
  totalParticipants: number;
  startSessionTime?: bigint;
  endSessionTime?: bigint;
}

interface SessionCardProps {
  session: Session;
  type: "participant" | "organizer";
  sessionType: "upcoming" | "completed";
  onGenerateQR?: (session: Session) => void;
}

export function SessionCard({
  session,
  type,
  onGenerateQR,
  sessionType,
}: SessionCardProps) {
  console.log("session", session);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "active":
        return "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "completed":
        return "bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100/80 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const isToday = session.date === today;

  const isSessionActuallyActive =
    session.startSessionTime && session.endSessionTime
      ? isSessionActive(session.startSessionTime, session.endSessionTime)
      : false;

  const canGenerateQR = type === "organizer" && isSessionActuallyActive;

  return (
    <motion.div
      className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
            {session.title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{session.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>{session.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm whitespace-nowrap ${getStatusColor(
              session.status
            )}`}
          >
            {isToday ? "Today" : getStatusText(session.status)}
          </span>

          {canGenerateQR && (
            <motion.button
              onClick={() => onGenerateQR?.(session)}
              className="p-1.5 bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200/80 dark:hover:bg-blue-900/50 transition-colors backdrop-blur-sm flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Generate QR Code"
            >
              <QrCode className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="line-clamp-1">{session.location}</span>
          </div>
          {type === "organizer" && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 flex-shrink-0" />
              {sessionType === "upcoming" && (
                <span>{session.totalParticipants}</span>
              )}
              {sessionType === "completed" && (
                <span>
                  {session.attendance}/{session.totalParticipants}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="text-right flex-shrink-0">
          <div className="font-semibold text-gray-900 dark:text-white">
            ${session.deposit}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Deposit</div>
        </div>
      </div>

      {session.attendance !== undefined && (
        <div className="mt-3 pt-3 border-t border-gray-100/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              Attendance Rate
            </span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {(session.attendance ?? 0 / session.totalParticipants) * 100}%
            </span>
          </div>
          <div className="mt-1 w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-1.5">
            <motion.div
              className="bg-green-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              whileInView={{
                width: `${
                  ((session.attendance ?? 0) / session.totalParticipants) * 100
                }%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
