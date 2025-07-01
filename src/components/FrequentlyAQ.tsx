import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles} from 'lucide-react';
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
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10"
      id="sec-faq"
    >
      {/* Enhanced Background Effects */}
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
        {/* Clean Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Simple Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Got{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
              {/* <motion.div 
                className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              /> */}
            </span>
            ? We've Got Answers
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Find answers to common questions about our commitment-based learning platform
          </motion.p>
        </motion.div>
        
        {/* Enhanced FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {faqs.map((faq: IFaqs, index: number) => (
              <motion.div 
                key={faq.id} 
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300 ${openFAQ === faq.id ? 'scale-x-100' : 'scale-x-0'}`} />
                
                {/* Question Header */}
                <div
                  className="relative p-6 md:p-8 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFAQ(faq.id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start gap-4">
                    {/* Question Number & Text */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Question Number */}
                      <motion.div 
                        className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {faq.id}
                      </motion.div>
                      
                      {/* Question Text */}
                      <h3 className="font-semibold text-lg md:text-xl text-gray-900 dark:text-white leading-relaxed">
                        {faq.question}
                      </h3>
                    </div>
                    
                    {/* Chevron Icon */}
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300"
                      animate={{ 
                        rotate: openFAQ === faq.id ? 180 : 0,
                        backgroundColor: openFAQ === faq.id ? "rgba(59, 130, 246, 0.1)" : undefined
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Answer Section */}
                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <div className="pl-12 border-l-2 border-blue-200 dark:border-blue-700">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 relative"
                          >
                            {/* Decorative Quote Mark */}
                            <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg pl-8 font-semibold">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Glow Effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 ${openFAQ === faq.id ? 'opacity-100' : 'group-hover:opacity-50'}`} />
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}