import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Plus } from "lucide-react";
import { featuredEvents } from "../constants/featuredEvent";
import { Link } from "react-router-dom";
import CardEvent from "./CardEvent";
import { IFeaturedEvent } from "../types/constType";

export default function FeaturedEvent() {
    // Only show first 3 events
    const displayEvents = featuredEvents.slice(0, 3);

    return (
        <>
            {/* Featured Events - Clean Design */}
            <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    {/* Static Background Blobs */}
                    <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/8 to-emerald-400/8 rounded-full blur-3xl"></div>

                    {/* Static Grid Pattern */}
                    <div 
                        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Static Constellation Points */}
                    <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
                    <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-60"></div>
                    <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-40"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div 
                            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50 transition-all duration-700 ease-in-out"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Sparkles className="w-4 h-4" />
                            Featured Events
                        </motion.div>

                        <motion.h2 
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Trending{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Commitment
                                </span>
                                {/* <motion.div 
                                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                /> */}
                            </span>{" "}
                            Events
                        </motion.h2>
                        
                        <motion.p 
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Discover high-quality events with proven commitment systems and rewarding outcomes for dedicated learners
                        </motion.p>
                    </motion.div>

                    {/* Events Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                            {displayEvents.map((event: IFeaturedEvent, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                >
                                    <CardEvent
                                        event={event}
                                        index={index}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 md:p-8 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-3xl border border-blue-200/50 dark:border-blue-700/50 transition-all duration-700 ease-in-out">
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out mb-4 sm:mb-0">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium text-base md:text-lg">Ready to join the commitment revolution?</span>
                                    <Sparkles className="w-5 h-5 text-purple-500" />
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to="/explore"
                                            className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-700 ease-in-out overflow-hidden"
                                        >
                                            {/* Animated background gradient */}
                                            <motion.div 
                                                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                                                initial={{ x: "100%" }}
                                                whileHover={{ x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            
                                            <span className="relative z-10 flex items-center">
                                                Explore All Events
                                                <motion.div
                                                    className="ml-2"
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ArrowRight className="w-5 h-5" />
                                                </motion.div>
                                            </span>
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to="/create"
                                            className="group inline-flex items-center px-6 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-700 ease-in-out"
                                        >
                                            Create Event
                                            <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}