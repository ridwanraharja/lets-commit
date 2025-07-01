// components/TestimonialCard.tsx
import { Star, Quote, CheckCircle, Award } from "lucide-react";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { ITestimonial } from "../types/constType";

interface TestimonialCardProps {
    testimonial: ITestimonial;
    index: number;
    cardWidth: number;
    testimonialsLength: number; // Add this to calculate delay properly
}

const TestimonialCard = React.memo<TestimonialCardProps>(({ 
    testimonial, 
    cardWidth, 
    index, 
    testimonialsLength 
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { 
        once: false,
        margin: "-20px"
    });

    return (
        <motion.div
            ref={ref}
            className="group flex-shrink-0 relative will-change-transform"
            whileHover={{ 
                scale: 1.02,
                y: -6,
                transition: { 
                    duration: 0.2,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }
            }}
            style={{
                backfaceVisibility: 'hidden',
                width: `${cardWidth}px`,
                minHeight: '320px'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
                duration: 0.6, 
                delay: (index % testimonialsLength) * 0.1,
                ease: "easeOut"
            }}
        >
            {/* Card with consistent design across all screen sizes */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden h-full p-6">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                {/* Top decorative element */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-gray-900/50 dark:to-blue-900/20 rounded-bl-2xl md:rounded-bl-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                    {/* Header with user info */}
                    <div className="flex items-center mb-5">
                        <motion.div
                            className="relative flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.15 }}
                        >
                            <img
                                src={testimonial.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"}
                                alt={testimonial.name}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-lg"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80";
                                }}
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                <CheckCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                        </motion.div>
                        <div className="flex-1 ml-3 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base mb-1 truncate">
                                {testimonial.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm truncate">
                                {testimonial.role}
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold truncate">
                                {testimonial.company}
                            </p>
                        </div>
                        
                        {/* Rating stars section - always show 5 stars */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                            {Array.from({ length: 5 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                    transition={{ 
                                        duration: 0.25,
                                        delay: isInView ? (i * 0.05) : 0,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25
                                    }}
                                >
                                    <Star 
                                        className={`w-3.5 h-3.5 md:w-4 md:h-4 drop-shadow-sm transition-colors duration-200 ${
                                            i < testimonial.rating 
                                                ? 'text-yellow-400 fill-current' // Filled star
                                                : 'text-gray-300 dark:text-gray-600' // Outline star
                                        }`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quote section */}
                    <div className="relative flex-1 mb-5">
                        <Quote className="absolute -top-2 -left-2 w-7 h-7 md:w-8 md:h-8 text-blue-500/20 dark:text-blue-400/20" />
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-gray-900/50 dark:to-blue-900/20 rounded-xl md:rounded-2xl h-full flex items-center p-4 ml-3">
                            <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed d text-sm md:text-md line-clamp-6">
                                "{testimonial.text}"
                            </p>
                        </div>
                    </div>

                    {/* Course badge */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                                <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Course Completed</p>
                                <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold truncate">
                                    {testimonial.course}
                                </p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                            <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;