import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle} from 'lucide-react';
import { faqs } from '../constants/faqs';
import { IFaqs } from '../types/constType';

export default function FrequentlyAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out"
      id="sec-faq"
    >

      <div className="absolute inset-0">

        <div className="absolute top-10 md:top-20 right-5 md:right-10 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-10 md:bottom-20 left-5 md:left-10 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl md:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-green-400/8 to-emerald-400/8 rounded-full blur-2xl md:blur-3xl"></div>


        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 1px)`,
            backgroundSize: '40px 40px md:60px md:60px'
          }}
        />

        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-60"></div>
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div 
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >

          <motion.div 
            className="inline-flex items-center gap-2 mb-4 md:mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Frequently Asked Questions</span>
            <span className="sm:hidden">FAQ</span>
          </motion.div>

          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 lg:mb-6 leading-tight transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Got{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </span>
            ?<br className="sm:hidden" /> <span className="sm:inline">We've Got Answers</span>
          </motion.h1>

          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Find answers to common questions about our commitment-based learning platform
          </motion.p>
        </motion.div>
        

        <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
            {faqs.map((faq: IFaqs, index: number) => (
              <motion.div 
                key={faq.id} 
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 ease-in-out"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >

                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                

                <div className={`absolute top-0 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-700 ease-in-out ${openFAQ === faq.id ? 'scale-x-100' : 'scale-x-0'}`} />
                

                <div
                  className="relative p-4 sm:p-5 md:p-6 lg:p-8 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFAQ(faq.id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start gap-3 sm:gap-4">

                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">

                      <motion.div 
                        className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {faq.id}
                      </motion.div>
                      
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-2xl  text-gray-900 dark:text-white leading-relaxed pr-2 transition-colors duration-700 ease-in-out ">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-700 ease-in-out"
                      animate={{ 
                        rotate: openFAQ === faq.id ? 180 : 0,
                        backgroundColor: openFAQ === faq.id ? "rgba(59, 130, 246, 0.1)" : undefined
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                    </motion.div>
                  </div>
                </div>
                

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                        <div className="pl-4 sm:pl-5 md:pl-6 border-l-2 border-blue-200 dark:border-blue-700">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-gray-50 dark:bg-gray-900/50 rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 relative transition-colors duration-700 ease-in-out"
                          >
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg pl-1 sm:pl-2 font-medium transition-colors duration-700 ease-in-out">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>


                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-700 ease-in-out ${openFAQ === faq.id ? 'opacity-100' : 'group-hover:opacity-50'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}