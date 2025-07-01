import { testimonials } from "../constants/testimonials";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import  { useRef, useState, useEffect, useMemo, useCallback } from "react";
import TestimonialCard from "./TestimonialCard"; // Import the separated component

interface ResponsiveSettings {
    cardWidth: number;
    gap: number;
    animationDuration: number;
}

// Custom hook for responsive settings with debounced resize
function useResponsiveSettings(): ResponsiveSettings {
    const getSettings = useCallback((): ResponsiveSettings => {
        if (typeof window === 'undefined') {
            return { cardWidth: 380, gap: 24, animationDuration: 30 };
        }
        
        const width = window.innerWidth;
        if (width >= 1024) {
            return { cardWidth: 380, gap: 24, animationDuration: 30 };
        } else if (width >= 768) {
            return { cardWidth: 320, gap: 20, animationDuration: 25 };
        } else {
            return { cardWidth: 280, gap: 16, animationDuration: 20 };
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

// Custom hook for visibility management
function useVisibilityPause() {
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPaused(document.hidden);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return isPaused;
}

export default function Testimonials() {
    const settings = useResponsiveSettings();
    const isPaused = useVisibilityPause();
    const { cardWidth, gap, animationDuration } = settings;
    const scrollRef = useRef<HTMLDivElement>(null);

    // Memoize calculations to prevent unnecessary recalculations
    const scrollConfig = useMemo(() => {
        const totalCardWidth = cardWidth + gap;
        const containerWidth = testimonials.length * totalCardWidth;
        
        return {
            totalCardWidth,
            containerWidth,
            // Create seamless loop by duplicating testimonials
            duplicatedTestimonials: [...testimonials, ...testimonials]
        };
    }, [cardWidth, gap]);

    // CSS untuk infinite scroll animation
    const scrollStyles = useMemo(() => ({
        display: 'flex',
        gap: `${gap}px`,
        width: `${scrollConfig.containerWidth * 2}px`,
        animation: `scroll-infinite ${animationDuration}s linear infinite`,
        animationPlayState: isPaused ? 'paused' as const : 'running' as const,
        willChange: 'transform'
    }), [gap, scrollConfig.containerWidth, animationDuration, isPaused]);

    // Dynamic keyframes untuk CSS animation
    useEffect(() => {
        const styleId = 'testimonials-keyframes';
        const existingStyle = document.getElementById(styleId);
        
        if (existingStyle) {
            existingStyle.remove();
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes scroll-infinite {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${scrollConfig.containerWidth}px);
                }
            }
            
            .testimonials-scroll-container:hover {
                animation-play-state: paused;
            }
        `;
        
        document.head.appendChild(style);

        return () => {
            const styleElement = document.getElementById(styleId);
            if (styleElement) {
                styleElement.remove();
            }
        };
    }, [scrollConfig.containerWidth]);

    return (
        <>
            {/* Testimonials Section - Enhanced with Motion */}
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.div 
                            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Star className="w-4 h-4" />
                            Testimonials
                        </motion.div>
                        
                        <motion.h2 
                            className="text-2xl md:text-4xl lg:text-6xl text-gray-900 dark:text-white mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            What They Say About Us
                        </motion.h2>
                        
                        <motion.p 
                            className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Discover how our community members have achieved their goals
                            through our proven commitment-based methodology
                        </motion.p>
                    </div>

                    {/* Moving Testimonials Container */}
                    <div className="relative py-4 md:py-6 lg:py-8">
                        {/* Animated scrolling wrapper */}
                        <div 
                            ref={scrollRef}
                            className="testimonials-scroll-container"
                            style={scrollStyles}
                        >
                            {scrollConfig.duplicatedTestimonials.map((testimonial, index) => {
                                // Calculate which set this card belongs to (0 or 1)
                                const setIndex = Math.floor(index / testimonials.length);
                                // Calculate position within the set
                                const positionInSet = index % testimonials.length;
                                
                                return (
                                    <TestimonialCard
                                        key={`${testimonial.id}-set${setIndex}-${positionInSet}`}
                                        testimonial={testimonial}
                                        index={index}
                                        cardWidth={cardWidth}
                                        testimonialsLength={testimonials.length}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Enhanced info section */}
                    <motion.div 
                        className="text-center mt-12 md:mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                            <motion.div 
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Smooth infinite scroll {isPaused ? '(Paused)' : '(Active)'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}