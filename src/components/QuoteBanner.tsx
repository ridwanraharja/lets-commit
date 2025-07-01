import { motion } from "framer-motion";


export default function QuoteBanner() {
    return (
        <>
            {/* Quote Banner - Simplified */}
            <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div 
                        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90" />
                        
                        {/* Floating Particles */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <div className="absolute top-16 left-12 w-1 h-1 bg-white rounded-full animate-ping"></div>
                            <div className="absolute bottom-12 right-16 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                        </div>

                        {/* Decorative Blurs */}
                        <div className="absolute top-4 md:top-8 left-4 md:left-8 w-20 md:w-24 h-20 md:h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-28 md:w-32 h-28 md:h-32 bg-white/10 rounded-full blur-2xl"></div>

                        {/* Content */}
                        <div className="relative z-10 space-y-6 md:space-y-8">

                            {/* Main Quote - Reduced Size */}
                            <motion.h2 
                                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold max-w-5xl mx-auto leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <span className="text-yellow-300 font-semibold">Commit to Win</span>
                                <span className="text-white/80 font-medium"> - </span>
                                <span className="text-white font-semibold">Get your money back by completing what you </span>
                                <span className="relative text-yellow-300 font-semibold">
                                    started
                                    <motion.div 
                                        className="absolute -bottom-1 left-0 w-full h-0.5 md:h-1 bg-yellow-300 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 1.2 }}
                                    />
                                </span>
                                <span className="text-white font-semibold">.</span>
                            </motion.h2>

                            {/* Supporting Text - Reduced Size */}
                            <motion.p 
                                className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                Put your money where your commitment is. Complete your learning journey and get a full refund - it's our way of betting on your success.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}