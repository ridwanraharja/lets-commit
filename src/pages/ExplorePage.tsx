import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Zap,
  Target,
  Star,
} from "lucide-react";
import CardEvent from "../components/CardEvent";
import { useEventService } from "../hooks/useEventService";
import { mapApiEventToFeaturedEvent } from "../utils/eventMapper";
import { IFeaturedEvent } from "../types/constType";

export default function ExplorePage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // API hooks
  const { useGetEventsByState } = useEventService();
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

  const isLoading = onSaleLoading || onGoingLoading || finishedLoading;

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Filter options
  const statusFilters = [
    {
      id: "ALL",
      label: "All Events",
      icon: Target,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-100 dark:bg-gray-800",
      count: allEvents.length,
    },
    {
      id: "ON_SALE",
      label: "On Sale",
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      count: allEvents.filter((e: IFeaturedEvent) => e.StatusTags === "ON_SALE")
        .length,
    },
    {
      id: "ON_GOING",
      label: "Live Now",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      count: allEvents.filter(
        (e: IFeaturedEvent) => e.StatusTags === "ON_GOING"
      ).length,
    },
    {
      id: "FINISHED",
      label: "Completed",
      icon: CheckCircle,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-100 dark:bg-gray-800",
      count: allEvents.filter(
        (e: IFeaturedEvent) => e.StatusTags === "FINISHED"
      ).length,
    },
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First", icon: Calendar },
    { id: "popular", label: "Most Popular", icon: TrendingUp },
    { id: "price_low", label: "Price: Low to High", icon: Target },
    { id: "price_high", label: "Price: High to Low", icon: Star },
  ];

  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    if (searchQuery) {
      filtered = filtered.filter(
        (event: IFeaturedEvent) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.organizerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedStatus !== "ALL") {
      filtered = filtered.filter(
        (event: IFeaturedEvent) => event.StatusTags === selectedStatus
      );
    }

    switch (sortBy) {
      case "popular":
        filtered = [...filtered].sort(
          (a: IFeaturedEvent, b: IFeaturedEvent) =>
            b.participant - a.participant
        );
        break;
      case "price_low":
        filtered = [...filtered].sort(
          (a: IFeaturedEvent, b: IFeaturedEvent) =>
            a.eventPrice +
            a.commitmentPrice -
            (b.eventPrice + b.commitmentPrice)
        );
        break;
      case "price_high":
        filtered = [...filtered].sort(
          (a: IFeaturedEvent, b: IFeaturedEvent) =>
            b.eventPrice +
            b.commitmentPrice -
            (a.eventPrice + a.commitmentPrice)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedStatus, sortBy, allEvents]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus("ALL");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-1/4 text-blue-400/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 0 }}
        >
          <Search className="w-8 h-8" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-1/3 text-purple-400/15"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -8, 8, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Filter className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/3 text-green-400/20"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 15, -5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          <Sparkles className="w-7 h-7" />
        </motion.div>

        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 relative z-10">
        <motion.div
          ref={sectionRef}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-blue-200/50 dark:border-blue-700/50 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Target className="w-4 h-4" />
            Explore Events
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover Amazing{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Learning Events
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Find the perfect learning experience that matches your goals and
            interests. Filter, search, and join events that inspire you.
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name, description, or organizer..."
                className="w-full pl-12 pr-12 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-700 ease-in-out text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-[1.1rem] transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {statusFilters.map((filter, index) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedStatus(filter.id)}
                className={`group relative px-4 py-2 md:px-6 md:py-3 rounded-2xl font-semibold transition-all duration-700 ease-in-out overflow-hidden ${
                  selectedStatus === filter.id
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                    : `${filter.bgColor} text-gray-700 dark:text-gray-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50`
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <filter.icon className="w-4 h-4" />
                  <span className="text-sm md:text-base">{filter.label}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedStatus === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {filter.count}
                  </span>
                </div>
                {selectedStatus !== filter.id && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${filter.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-in-out`}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-700 ease-in-out hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Advanced Filters</span>
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-700 ease-in-out">
                        Sort By
                      </h3>
                      <div className="space-y-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSortBy(option.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-700 ease-in-out ${
                              sortBy === option.id
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                : "bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <option.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-700 ease-in-out">
                        Quick Stats
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Total Events
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {allEvents.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Filtered Results
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {filteredEvents.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-700 ease-in-out font-medium"
                    >
                      <X className="w-4 h-4" />
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "All Events"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-700 ease-in-out">
                {filteredEvents.length} event
                {filteredEvents.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {(searchQuery || selectedStatus !== "ALL") && (
              <motion.button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-700 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
                Clear Filters
              </motion.button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-80"></div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filteredEvents.map((event: IFeaturedEvent, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CardEvent event={event} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-700 ease-in-out">
                No Events Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto transition-colors duration-700 ease-in-out">
                We couldn't find any events matching your criteria. Try
                adjusting your search or filters.
              </p>
              {selectedStatus !== "ALL" && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-700 ease-in-out"
                >
                  View All Events
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
