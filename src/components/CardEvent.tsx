import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Info, Eye, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { IFeaturedEvent } from "../types/constType";
import ImgFake from '../assets/BlockDevId.jpg'

interface CardEventProps {
  event: IFeaturedEvent;
  index?: number;
}

export default function CardEvent({ event, index = 0 }: CardEventProps) {
  // Calculate participant percentage
  const participantPercentage = (event.participant / event.maxParticipant) * 100;
  
  // Calculate total price
  const totalPrice = event.eventPrice + event.commitmentPrice;

  // Format date range with year
  const formatDateRange = () => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    };
    
    if (event.startDate === event.endDate) {
      return startDate.toLocaleDateString('en-US', options);
    }
    
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  // Calculate duration in days
  const calculateDuration = () => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays === 1 ? "1 day" : `${diffDays} days`;
  };

  // Status badge styling
  const getStatusBadge = () => {
    switch (event.StatusTags) {
      case "ON_SALE":
        return { 
          text: "On Sale", 
          color: "bg-gradient-to-r from-green-500 to-emerald-500",
          textColor: "text-white",
          glow: "shadow-green-500/25"
        };
      case "ON_GOING":
        return { 
          text: "Live", 
          color: "bg-gradient-to-r from-blue-500 to-cyan-500",
          textColor: "text-white",
          glow: "shadow-blue-500/25"
        };
      case "FINISHED":
        return { 
          text: "Ended", 
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          textColor: "text-white",
          glow: "shadow-gray-500/25"
        };
      default:
        return { 
          text: event.StatusTags, 
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          textColor: "text-white",
          glow: "shadow-gray-500/25"
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 ease-in-out overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 w-full h-full"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out" />
      

      <motion.div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
      />


      <div className="relative h-48 sm:h-52 md:h-48 lg:h-52 overflow-hidden">
        <img 
          src={ImgFake} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-all duration-700 ease-in-out" />
        

        <div className="absolute top-3 left-3 z-10">
          <div className={`${statusBadge.color} ${statusBadge.textColor} text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-700 ease-in-out`}>
            {statusBadge.text}
          </div>
        </div>


        <div className="absolute top-3 right-3 z-10">
          <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 transition-all duration-700 ease-in-out">
            <Clock className="w-3 h-3 transition-all duration-700 ease-in-out" />
            <span>{calculateDuration()}</span>
          </div>
        </div>
      </div>


      <div className="relative z-10 p-4 sm:p-5 flex flex-col flex-1">

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-700 ease-in-out line-clamp-2">
          {event.title}
        </h3>
        
  
        <p className="hidden sm:block text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed transition-colors duration-700 ease-in-out">
          {event.description}
        </p>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 transition-colors duration-700 ease-in-out">
          by <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">{event.organizerName}</span>
        </p>

   
        <div className="space-y-3 mb-5 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
            <Calendar className="w-4 h-4 text-blue-500 transition-colors duration-700 ease-in-out flex-shrink-0" />
            <span className="line-clamp-1">{formatDateRange()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
            <MapPin className="w-4 h-4 text-purple-500 transition-colors duration-700 ease-in-out flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          

          <div className="flex items-center justify-between transition-colors duration-700 ease-in-out">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
              <Users className="w-4 h-4 text-green-500 transition-colors duration-700 ease-in-out" />
              <span>Participants</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
              {event.participant}/{event.maxParticipant}
            </span>
          </div>
          

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-700 ease-in-out">
            <motion.div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-colors duration-700 ease-in-out"
              initial={{ width: 0 }}
              animate={{ width: `${participantPercentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
            />
          </div>
        </div>


        <div className="px-4 py-3 bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-900/50 dark:to-blue-900/30 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 -mx-4 sm:-mx-5 mb-4 transition-all duration-700 ease-in-out">
          <div className="space-y-2">

            <div className="flex justify-between items-center text-sm transition-colors duration-700 ease-in-out">
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">Event Price:</span>
              <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">${event.eventPrice}</span>
            </div>
            <div className="flex justify-between items-center text-sm transition-colors duration-700 ease-in-out">
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">Commitment Fee:</span>
              <span className="font-semibold text-orange-600 dark:text-orange-400 transition-colors duration-700 ease-in-out">${event.commitmentPrice}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between items-center transition-colors duration-700 ease-in-out">
              <span className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-700 ease-in-out">Total:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 transition-colors duration-700 ease-in-out">${totalPrice}</span>
            </div>
            

            <div className="flex items-start gap-2 p-3 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg transition-all duration-700 ease-in-out hover:bg-blue-100/80 dark:hover:bg-blue-900/30">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 transition-colors duration-700 ease-in-out" />
              <div className="text-xs text-blue-700 dark:text-blue-300 transition-colors duration-700 ease-in-out">
                <p className="font-medium mb-1">💰 Commitment Cashback:</p>
                <p>• Attend sessions → Get commitment fee back</p>
                <p>• Complete all sessions → 100% cashback!</p>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row gap-3 mt-auto">

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <Link
              to={`/events/${event.id}`}
              className="group/btn relative w-full inline-flex items-center justify-center py-2.5 sm:py-3 font-medium text-sm sm:text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-700 ease-in-out overflow-hidden"
            >
              <Eye className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="relative z-10">View Details</span>
            </Link>
          </motion.div>


          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {event.StatusTags === "FINISHED" ? (
              <button
                disabled
                className="group/btn relative w-full inline-flex items-center justify-center py-2.5 sm:py-3 font-semibold text-sm sm:text-base rounded-xl bg-gray-400 text-white cursor-not-allowed transition-all duration-700 ease-in-out"
              >
                <span className="relative z-10">Event Ended</span>
              </button>
            ) : (
              <Link
                to={`/events/${event.id}/register`}
                className="group/btn relative w-full inline-flex items-center justify-center py-2.5 sm:py-3 font-semibold text-sm sm:text-base rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-700 ease-in-out overflow-hidden"
              >

                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                
                <UserPlus className="w-4 h-4 mr-2 relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                <span className="relative z-10">
                  {event.StatusTags === "ON_GOING" ? "Join Now" : "Register"}
                </span>
              </Link>
            )}
          </motion.div>
        </div>
      </div>


      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-2xl pointer-events-none transition-all duration-700 ease-in-out" />
    </motion.div>
  );
}