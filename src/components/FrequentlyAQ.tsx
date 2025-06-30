import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../constants/faqs';
import { IFaqs } from '../types/constType';

export default function FrequentlyAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="sec-faq">
      <div className="container xl:pb-24 lg:pb-24 md:pb-12"></div>
      <div className="">
        <div className="container mx-auto px-5 lg:px-8 pt-16 pb-24">
          <div className="text-center" id="accordion-title">
            <h5 className="text-blue-600 tracking-wider mb-3 md:text-base lg:text-lg font-bold text-lg">
              FAQ
            </h5>
            <h1 className="text-gray-900 dark:text-white text-2xl font-semibold md:text-3xl xl:max-w-lg mx-auto xl:leading-relaxed lg:text-4xl mb-5">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:max-w-xl mx-auto lg:text-2xl md:text-lg mb-8 font-semibold">
              Discover what others are asking in our FAQ section!
            </p>
          </div>
          
          <div className="grid grid-cols-1 max-w-4xl cursor-pointer mx-auto space-y-4" id="accordions">
            {faqs.map((faq: IFaqs, index: number) => (
              <motion.div 
                key={faq.id} 
                className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-800 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <dt
                  className="flex justify-between items-center cursor-pointer"
                  aria-controls={`faq-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFAQ(faq.id);
                    }
                  }}
                >
                  <p className="font-semibold text-lg text-gray-900 dark:text-white">
                    {`${faq.id}. ${faq.question}`}
                  </p>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </dt>
                
                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.dd
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`faq-${faq.id}`}
                    >
                      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-lg font-light text-gray-700 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}