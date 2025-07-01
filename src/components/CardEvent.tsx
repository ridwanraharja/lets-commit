
import { Link } from "react-router-dom";
import { Calendar, Clock, Users } from "lucide-react";
import { IFeaturedEvent } from "../types/constType";

interface CardEventProps {
  event: IFeaturedEvent;
}

export default function CardEvent({ event }: CardEventProps) {
  // Calculate participant percentage
  const participantPercentage = (event.participants / event.maxParticipants) * 100;
  
  // Determine popularity badge
  const getPopularityBadge = () => {
    if (participantPercentage >= 90) return { text: "Almost Full", color: "bg-red-500" };
    if (participantPercentage >= 70) return { text: "Popular", color: "bg-orange-500" };
    if (participantPercentage >= 50) return { text: "Trending", color: "bg-yellow-500" };
    return null;
  };

  const popularityBadge = getPopularityBadge();

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700 relative">
      {/* Popularity Badge */}
      {popularityBadge && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`${popularityBadge.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
            {popularityBadge.text}
          </span>
        </div>
      )}

      {/* Header Section */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-2">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full w-fit">
              {event.category}
            </span>
            {/* Duration Badge */}
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>{event.duration}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Cashback
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${event.potentialCashback}
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          by <span className="font-semibold">{event.organizer}</span>
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{event.date} • {event.time}</span>
          </div>
          
          {/* Participants Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>Participants</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {event.participants}/{event.maxParticipants}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${participantPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Total Cost:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${event.totalCost}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Commitment Fee:
            </span>
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              ${event.commitmentFee}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Max Cashback:
              </span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                ${event.potentialCashback}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6">
        <Link
          to={`/events/${event.id}`}
          className="group/btn relative w-full inline-flex items-center justify-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">Daftar Sekarang</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}