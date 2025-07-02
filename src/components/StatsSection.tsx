import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { statsConst } from "../constants/stats";
import { Trophy } from "lucide-react";


export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <>

            <section 
                ref={sectionRef}
                className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-t from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10"
            >



                <div className="container mx-auto px-4 md:px-6 relative z-10">

                    <motion.div 
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >

                        <motion.div 
                        className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Trophy className="w-4 h-4" fill="currentColor" />
                        
                        Our Stats

                        </motion.div>
                        
                        <motion.h2 
                            className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Trusted Platform with{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Real Results
                            </span>
                        </motion.h2>
                        
                        <motion.p 
                            className="text-md md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Join thousands of learners who have experienced the benefits of our commitment-based learning system
                        </motion.p>
                    </motion.div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {statsConst.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="group relative p-6 md:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >

                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
     
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-3xl"></div>
                                
                                <div className="relative z-10">
                    
                                    <motion.div 
                                        className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-br ${
                                            stat.variant === 'success' 
                                                ? 'from-green-500 to-emerald-500' 
                                                : stat.variant === 'warning'
                                                ? 'from-yellow-500 to-orange-500'
                                                : 'from-blue-500 to-purple-500'
                                        } rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                    >
                                        <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                    </motion.div>

                 
                                    <motion.div 
                                        className={`text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 bg-gradient-to-r ${
                                            stat.variant === 'success' 
                                                ? 'from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400' 
                                                : stat.variant === 'warning'
                                                ? 'from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400'
                                                : 'from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'
                                        } bg-clip-text text-transparent`}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                                    >
                                        {stat.value}
                                    </motion.div>

                          
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                                        {stat.title}
                                    </h3>

             
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 leading-relaxed">
                                        {stat.description}
                                    </p>

                      
                                    <div className="flex items-center justify-between">
                                        <span className={`inline-flex items-center gap-1 text-xs md:text-sm font-semibold px-2 py-1 rounded-full ${
                                            stat.variant === 'success' 
                                                ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30' 
                                                : stat.variant === 'warning'
                                                ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
                                                : 'text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
                                        }`}>
                                            <span className="text-xs">↗</span>
                                            {stat.trend}
                                        </span>
                                        
                                        <div className="flex space-x-1">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        stat.variant === 'success' 
                                                            ? 'bg-green-400' 
                                                            : stat.variant === 'warning'
                                                            ? 'bg-yellow-400'
                                                            : 'bg-blue-400'
                                                    }`}
                                                    animate={{ 
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 1, 0.5]
                                                    }}
                                                    transition={{ 
                                                        duration: 2, 
                                                        repeat: Infinity, 
                                                        delay: i * 0.2 
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                  
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </motion.div>
                        ))}
                    </div>

                </div>

                <div className="container mx-auto px-4 md:px-6 pt-16">
                    <motion.div 
                        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center text-white shadow-2xl overflow-hidden max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                  
                        <div className="absolute inset-0">
                        
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-pink-600/95" />
                            
              
                            <div 
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                                    backgroundSize: '25px 25px'
                                }}
                            />
                        </div>
                        
     
                        <div className="absolute top-2 left-2 w-12 md:w-16 h-12 md:h-16 bg-white/10 rounded-full blur-xl" />
                        <div className="absolute bottom-2 right-2 w-16 md:w-20 h-16 md:h-20 bg-white/10 rounded-full blur-2xl" />

              
                        <div className="relative z-10 space-y-4 md:space-y-5">
            
                            <motion.h2 
                                className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold max-w-2xl mx-auto leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="text-yellow-300 font-semibold">
                                    "Commit to Win"
                                </span>
                                <span className="text-white/80 font-medium"> - </span>
                                <span className="text-white font-semibold">Get your money back by completing what you </span>
                                <span className="relative text-yellow-300 font-semibold">
                                    started
                                    <motion.div 
                                        className="absolute -bottom-0.5 left-0 w-full h-0.5 md:h-1 bg-yellow-300 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: "100%" } : { width: 0 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </span>
                                <span className="text-white font-semibold">.</span>
                            </motion.h2>

                      
                            <motion.p 
                                className="text-sm md:text-base text-blue-100 max-w-xl mx-auto leading-relaxed font-medium"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Put your money where your commitment is. Complete your learning journey and get a{" "}
                                <span className="text-yellow-200 font-semibold">
                                    full refund
                                </span>
                                {" "}- it's our way of betting on your success.
                            </motion.p>

        
                            <div className="flex justify-center items-center gap-1.5 mt-4">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-60"
                                    />
                                ))}
                            </div>
                        </div>

           
                        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-yellow-300/30 rounded-tl-2xl" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-yellow-300/30 rounded-br-2xl" />

             
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        />
                    </motion.div>
                </div>

            </section>
        </>
    );
}