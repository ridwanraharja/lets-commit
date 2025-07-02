import { testimonials } from "../constants/testimonials";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import TestimonialCard from "./TestimonialCard"; 

interface ResponsiveSettings {
    cardWidth: number;
    gap: number;
    cardsPerView: number;
}

// Custom hook for responsive settings with debounced resize
function useResponsiveSettings(): ResponsiveSettings {
    const getSettings = useCallback((): ResponsiveSettings => {
        if (typeof window === 'undefined') {
            return { cardWidth: 380, gap: 24, cardsPerView: 3 };
        }
        
        const width = window.innerWidth;
        if (width >= 1024) {
            return { cardWidth: 380, gap: 24, cardsPerView: 3 };
        } else if (width >= 768) {
            return { cardWidth: 320, gap: 20, cardsPerView: 2 };
        } else {
            return { cardWidth: 280, gap: 16, cardsPerView: 1 };
        }
    }, []);

    const [settings, setSettings] = useState<ResponsiveSettings>(getSettings);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setSettings(getSettings());
            }, 150);
        };

        window.addEventListener('resize', debouncedResize, { passive: true });
        
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(timeoutId);
        };
    }, [getSettings]);

    return settings;
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const settings = useResponsiveSettings();
    const { cardWidth, gap, cardsPerView } = settings;
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    const maxSlides = Math.max(0, testimonials.length - cardsPerView);


    const goToPrevious = useCallback(() => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(maxSlides, prev + 1));
    }, [maxSlides]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev >= maxSlides) {
                    return 0; 
                }
                return prev + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [maxSlides]);


    const transformOffset = useMemo(() => {
        return -currentIndex * (cardWidth + gap);
    }, [currentIndex, cardWidth, gap]);

    return (
        <>

            <section 
                ref={sectionRef}
                className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-700 ease-in-out"
            >

                <div className="absolute inset-0">

                    <motion.div 
                        className="absolute top-16 left-1/4 w-3 h-3 bg-blue-400/25 rounded-full"
                        animate={{ 
                            y: [0, -25, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                        className="absolute top-24 right-1/3 w-5 h-5 bg-purple-400/20 rounded-full"
                        animate={{ 
                            y: [0, -35, 0],
                            scale: [1, 0.7, 1],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div 
                        className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400/40 rounded-full"
                        animate={{ 
                            y: [0, -20, 0],
                            scale: [1, 1.6, 1],
                            opacity: [0.4, 0.9, 0.4]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                    />
                    <motion.div 
                        className="absolute top-40 left-1/5 w-4 h-4 bg-green-400/15 rounded-full"
                        animate={{ 
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.15, 0.5, 0.15]
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                    />
                    <motion.div 
                        className="absolute bottom-20 right-1/4 w-3 h-3 bg-yellow-400/30 rounded-full"
                        animate={{ 
                            y: [0, -28, 0],
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ duration: 4.5, repeat: Infinity, delay: 4 }}
                    />

  
                    <svg className="absolute inset-0 w-full h-full hidden md:block" style={{ zIndex: 1 }}>
    
                        <motion.path
                            d="M 50 150 Q 250 80 450 200 T 850 180"
                            stroke="url(#gradient1)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="4,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 3, delay: 0.5 }}
                        />
            
                        <motion.path
                            d="M 100 300 Q 300 200 500 350 T 900 300"
                            stroke="url(#gradient2)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="3,6"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 4, delay: 1 }}
                        />
          
                        <motion.path
                            d="M 0 250 Q 200 150 400 280 T 800 250"
                            stroke="url(#gradient3)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="2,8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 5, delay: 1.5 }}
                        />
                        
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>

   
                    <svg className="absolute inset-0 w-full h-full md:hidden" style={{ zIndex: 1 }}>
                        <motion.path
                            d="M 20 100 Q 120 50 220 120 Q 300 180 380 140"
                            stroke="url(#mobileGradient1)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="3,3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                        <motion.path
                            d="M 50 250 Q 150 200 250 270 Q 320 320 400 280"
                            stroke="url(#mobileGradient2)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="2,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2.5, delay: 1 }}
                        />
                        
                        <defs>
                            <linearGradient id="mobileGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="mobileGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.div 
                            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50 transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Star className="w-4 h-4" />
                            Testimonials
                        </motion.div>
                        
                        <motion.h2 
                            className="text-2xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-bold transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            What They Say About Us
                        </motion.h2>
                        
                        <motion.p 
                            className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Discover how our community members have achieved their goals
                            through our proven commitment-based methodology
                        </motion.p>
                    </div>


                    <div className="relative py-4 md:py-6 lg:py-8">
    
                        <div className="relative">
               
                            <motion.button
                                onClick={goToPrevious}
                                disabled={currentIndex === 0}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 group p-3 md:p-4 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-700 ease-in-out -translate-x-1/2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ transform: 'translateX(-50%) translateY(-50%)' }}
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-700 ease-in-out" />
                            </motion.button>
                            
     
                            <motion.button
                                onClick={goToNext}
                                disabled={currentIndex >= maxSlides}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 group p-3 md:p-4 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-700 ease-in-out translate-x-1/2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ transform: 'translateX(50%) translateY(-50%)' }}
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-700 ease-in-out" />
                            </motion.button>

       
                            <div className="overflow-hidden mx-8 md:mx-12">
                                <motion.div 
                                    ref={scrollRef}
                                    className="flex gap-4 md:gap-6"
                                    animate={{ x: transformOffset }}
                                    transition={{ 
                                        duration: 0.5, 
                                        ease: [0.25, 0.46, 0.45, 0.94] 
                                    }}
                                    style={{ width: `${testimonials.length * (cardWidth + gap)}px` }}
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <TestimonialCard
                                            key={testimonial.id}
                                            testimonial={testimonial}
                                            index={index}
                                            cardWidth={cardWidth}
                                            testimonialsLength={testimonials.length}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>

          
                        <div className="flex justify-center items-center gap-2 mt-8">
                            {Array.from({ length: maxSlides + 1 }, (_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-700 ease-in-out ${
                                        index === currentIndex
                                            ? 'bg-blue-600 dark:bg-blue-400 w-8'
                                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                    }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </div>

                
                    <motion.div 
                        className="text-center mt-12 md:mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-700 ease-in-out">
                            <motion.div 
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-700 ease-in-out">
                                Swipe to explore testimonials ({currentIndex + 1} of {testimonials.length})
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}