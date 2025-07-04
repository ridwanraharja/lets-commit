import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import { FormInput } from "./FormInput";

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
}

interface SessionFormProps {
  session: Session;
  index: number;
  onSessionChange: (
    sessionId: string,
    field: keyof Session,
    value: string
  ) => void;
  onRemoveSession: (sessionId: string) => void;
  canRemove: boolean;
}

export function SessionForm({
  session,
  index,
  onSessionChange,
  onRemoveSession,
  canRemove,
}: SessionFormProps) {
  return (
    <motion.div
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
        {canRemove && (
          <motion.button
            type="button"
            onClick={() => onRemoveSession(session.id)}
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
        <FormInput
          id={`session-title-${session.id}`}
          name="title"
          type="text"
          value={session.title}
          onChange={(e) => onSessionChange(session.id, "title", e.target.value)}
          placeholder="Introduction to Smart Contracts"
          label="Session Title"
          required
          focusRingColor="purple"
          borderFocusColor="purple"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            id={`session-date-${session.id}`}
            name="date"
            type="date"
            value={session.date}
            onChange={(e) =>
              onSessionChange(session.id, "date", e.target.value)
            }
            label="Date"
            required
            focusRingColor="purple"
            borderFocusColor="purple"
          />
          <FormInput
            id={`session-time-${session.id}`}
            name="time"
            type="time"
            value={session.time}
            onChange={(e) =>
              onSessionChange(session.id, "time", e.target.value)
            }
            label="Time"
            required
            focusRingColor="purple"
            borderFocusColor="purple"
          />
          <FormInput
            id={`session-duration-${session.id}`}
            name="duration"
            type="number"
            value={session.duration}
            onChange={(e) =>
              onSessionChange(session.id, "duration", e.target.value)
            }
            placeholder="2"
            label="Duration (hours)"
            required
            min="1"
            step="0.5"
            focusRingColor="purple"
            borderFocusColor="purple"
          />
        </div>
      </div>
    </motion.div>
  );
}
