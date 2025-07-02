import { Link } from "react-router-dom";
import { Heart, Star, ArrowRight } from "lucide-react";
import { sponsors } from "../constants/sponsor";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supportOptions } from "../constants/supportOptions";
import imgEth from '../assets/ethereum-logo.svg';

export default function SupportUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isSponsorsInView = useInView(sponsorsRef, { once: true, margin: "-100px" });

  // Mobile slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const maxSlides = supportOptions.length;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch/Mouse handlers for swipe functionality
  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleEnd = (clientX: number) => {
    if (!isDragging) return;
    
    const deltaX = startX - clientX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentSlide < maxSlides - 1) {
        // Swipe left - next slide
        setCurrentSlide(prev => Math.min(prev + 1, maxSlides - 1));
      } else if (deltaX < 0 && currentSlide > 0) {
        // Swipe right - previous slide
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    }
    
    setIsDragging(false);
    setStartX(0);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleEnd(e.clientX);
  };

  // Auto-advance slides every 5 seconds (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % maxSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlides]);

  return (
    <>
      <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-700 ease-in-out">

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

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">

          <motion.div 
            ref={sectionRef}
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >

            <motion.div 
              className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50 transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Heart className="w-4 h-4" fill="currentColor" />
              Support Our Mission
            </motion.div>

            <motion.h2 
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Choose Your{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Support Level
                </span>
              </span>
            </motion.h2>

            <motion.p 
              className="text-md  md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-semibold mb-16 transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Every contribution helps us build better learning experiences and impact millions of learners worldwide
            </motion.p>


            <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
              {supportOptions.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  className="group relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  whileHover={{ y: -8 }}
                >
                  <div className={`relative h-full ${tier.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex flex-col transition-colors duration-700 ease-in-out`}>

                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 ease-in-out`} />

                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tier.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left`} />
                    <div className="relative p-8 flex flex-col flex-grow">

                      <div className="text-center mb-6">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <tier.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-700 ease-in-out">
                          {tier.name}
                        </h3>
                        
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                            {tier.amount}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-700 ease-in-out">
                            /{tier.period}
                          </span>
                        </div>
                      </div>


                      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 font-medium transition-colors duration-700 ease-in-out">
                        {tier.description}
                      </p>


                      <ul className="space-y-3 mb-8 flex-grow">
                        {tier.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex}
                            className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.4, delay: 0.8 + featureIndex * 0.1 }}
                          >
                            <div className={`w-5 h-5 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <ArrowRight className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>


                      <div className="mt-auto">
                        <Link
                          to={tier.link}
                          className={`group/btn relative block w-full px-6 py-4 bg-gradient-to-r ${tier.color} hover:shadow-xl text-white font-semibold rounded-xl transition-all duration-700 ease-in-out text-center overflow-hidden`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Choose {tier.name.split(' ')[0]}
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-700 ease-in-out" />
                          </span>
                          <div className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-700 ease-in-out`} />
                        </Link>
                      </div>
                    </div>


                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />
                  </div>
                </motion.div>
              ))}
            </div>


            <div className="lg:hidden mb-16">

              <div 
                ref={sliderRef} 
                className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ 
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {supportOptions.map((tier, index) => (
                    <div key={tier.id} className="w-full flex-shrink-0 px-4">
                      <motion.div
                        className="group relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out mx-auto max-w-sm"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 * index }}
                      >
                        <div className={`relative ${tier.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex flex-col transition-colors duration-700 ease-in-out`}>

                          <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-5`} />
                          
     
                          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tier.color}`} />
                          
         
                          <div className="relative p-6 flex flex-col">
          
                            <div className="text-center mb-6">
                              <div className={`w-14 h-14 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl`}>
                                <tier.icon className="w-7 h-7 text-white" />
                              </div>
                              
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-700 ease-in-out">
                                {tier.name}
                              </h3>
                              
                              <div className="flex items-baseline justify-center gap-1">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                                  {tier.amount}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-700 ease-in-out">
                                  /{tier.period}
                                </span>
                              </div>
                            </div>

        
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-6 font-medium text-sm transition-colors duration-700 ease-in-out">
                              {tier.description}
                            </p>

           
                            <ul className="space-y-3 mb-6">
                              {tier.features.slice(0, 3).map((feature, featureIndex) => (
                                <li 
                                  key={featureIndex}
                                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-700 ease-in-out"
                                >
                                  <div className={`w-4 h-4 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                                  </div>
                                  <span className="font-medium">{feature}</span>
                                </li>
                              ))}
                              {tier.features.length > 3 && (
                                <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold">+</span>
                                  </div>
                                  <span className="font-medium">+{tier.features.length - 3} more features</span>
                                </li>
                              )}
                            </ul>

         
                            <Link
                              to={tier.link}
                              className={`group/btn relative block w-full px-6 py-3 bg-gradient-to-r ${tier.color} text-white font-semibold rounded-xl transition-all duration-700 ease-in-out text-center`}
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                Choose {tier.name.split(' ')[0]}
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-700 ease-in-out" />
                              </span>
                            </Link>
                          </div>

           
                          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`} />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="flex items-center justify-center mt-6">

                <div className="flex gap-2">
                  {supportOptions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ease-in-out ${
                        index === currentSlide 
                          ? 'bg-pink-600 w-8' 
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

  
              <div className="text-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors duration-700 ease-in-out">
                  {currentSlide + 1} of {maxSlides}
                </span>
              </div>


              <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2 transition-colors duration-700 ease-in-out">
                Swipe or tap dots to navigate between options
              </p>
            </div>
          </motion.div>


          <motion.div 
            ref={sponsorsRef}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isSponsorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50 transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isSponsorsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-4 h-4" fill="currentColor" />
              Platform Partners
            </motion.div>

            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={isSponsorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Trusted by Amazing Organizations
            </motion.h3>

 
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700 ease-in-out">
              {sponsors.slice(0, 6).map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  className="group cursor-pointer p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-700 ease-in-out"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isSponsorsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  onClick={() => window.open(sponsor.website, "_blank")}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={imgEth}
                    alt={sponsor.name}
                    className="w-full h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}