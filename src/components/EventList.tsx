import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Eye,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import { format } from "date-fns";
import { IFeaturedEvent } from "../types/constType";
import numeral from "numeral";
import { useState } from "react";

interface EventListProps {
  events: IFeaturedEvent[];
  isLoading?: boolean;
  onClaimFirstPortion?: (eventId: string) => void;
  claimingEventId?: string | null;
  showParticipantView?: boolean;
}

export default function EventList({
  events,
  isLoading = false,
  onClaimFirstPortion,
  claimingEventId = null,
  showParticipantView = false,
}: EventListProps) {
  const [displayCount, setDisplayCount] = useState(3);

  const displayedEvents = events.slice(0, displayCount);
  const hasMore = events.length > displayCount;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {showParticipantView ? "No events joined" : "No events found"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {showParticipantView
            ? "You haven't joined any events yet. Explore events to get started!"
            : "You haven't created any events yet."}
        </p>
        <Link
          to={showParticipantView ? "/explore" : "/create"}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showParticipantView ? "Explore Events" : "Create Your First Event"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg"
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                    event.StatusTags === "ON_SALE"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      : event.StatusTags === "ON_GOING"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
                  }`}
                >
                  {event.StatusTags === "ON_SALE"
                    ? "On Sale"
                    : event.StatusTags === "ON_GOING"
                    ? "Live"
                    : "Ended"}
                </span>
                <div className="flex items-start justify-between my-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {event.title}
                  </h3>
                </div>

                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="truncate">
                      {format(new Date(event.startDate), "MMM dd, yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>
                      {event.participant}/{event.maxParticipant}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Price:{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {numeral(event.eventPrice / 100).format("0,0")} IDRX
                      </span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Commitment:{" "}
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        {numeral(event.commitmentPrice / 100).format("0,0")}{" "}
                        IDRX
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to={`/events/${event.id}`}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Link>

                {onClaimFirstPortion && !showParticipantView && (
                  <motion.button
                    onClick={() => onClaimFirstPortion(event.id.toString())}
                    disabled={claimingEventId === event.id.toString()}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      claimingEventId === event.id.toString()
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    whileHover={
                      claimingEventId === event.id.toString()
                        ? {}
                        : { scale: 1.05 }
                    }
                    whileTap={
                      claimingEventId === event.id.toString()
                        ? {}
                        : { scale: 0.95 }
                    }
                    title={
                      claimingEventId === event.id.toString()
                        ? "Claiming..."
                        : "Claim First Portion"
                    }
                  >
                    {claimingEventId === event.id.toString() ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                    ) : (
                      <DollarSign className="w-4 h-4 mr-1" />
                    )}
                    Claim
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={() => setDisplayCount((prev) => prev + 3)}
            className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:shadow-lg"
          >
            <ChevronDown className="w-4 h-4 mr-2" />
            Load More ({events.length - displayCount} remaining)
          </button>
        </motion.div>
      )}
    </div>
  );
}
