import { motion } from "framer-motion";
import { Sparkles, ArrowRight,  Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { to: "/explore", label: "Explore Events", icon: "ri-compass-line" },
    { to: "/create", label: "Create Event", icon: "ri-add-circle-line" },
    { to: "/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
    { to: "/disputes", label: "Dispute Center", icon: "ri-scales-line" },
  ];

  const supportLinks = [
    { to: "/help", label: "Help Center", icon: "ri-question-line" },
    { to: "/docs", label: "Documentation", icon: "ri-book-line" },
    { to: "/security", label: "Security", icon: "ri-shield-check-line" },
    { to: "/contact", label: "Contact Us", icon: "ri-mail-line" },
  ];

  const socialLinks = [
    { href: "#", icon: "ri-twitter-line", label: "Twitter", color: "hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
    { href: "#", icon: "ri-discord-line", label: "Discord", color: "hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20" },
    { href: "https://github.com/LetsCommit-BlockDevId", icon: "ri-github-line", label: "GitHub", color: "hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700" },
    { href: "#", icon: "ri-telegram-line", label: "Telegram", color: "hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  ];

  return (
    <footer className="relative pt-8 md:pt-12 lg:pt-16 overflow-hidden bg-gradient-to-t from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">

      <div className="absolute inset-0">

        <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-500/8 rounded-full blur-xl" />
        

        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>


      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          

          <motion.div 
            className="sm:col-span-2 lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-in-out">
                  <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-white group-hover:rotate-12 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 transition-all duration-700 ease-in-out">
                  Let'sCommit!
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors duration-700 ease-in-out">
                  🚀 Commitment-based Learning
                </p>
              </div>
            </Link>

            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed transition-colors duration-700 ease-in-out">
              Revolutionizing education through commitment-based learning with Web3 technology. 
              Secure, transparent, and rewarding for everyone.
            </p>


            <div className="flex gap-2 md:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-lg`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-lg md:text-xl`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2 text-base md:text-lg transition-colors duration-700 ease-in-out">
              <div className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              Platform
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-700 ease-in-out"
                  >
                    <i className={`${link.icon} text-sm md:text-base group-hover:scale-110 transition-transform duration-700 ease-in-out`}></i>
                    <span className="group-hover:translate-x-1 transition-transform duration-700 ease-in-out">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700 ease-in-out" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2 text-base md:text-lg transition-colors duration-700 ease-in-out">
              <div className="w-1 h-5 md:h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-700 ease-in-out"
                  >
                    <i className={`${link.icon} text-sm md:text-base group-hover:scale-110 transition-transform duration-700 ease-in-out`}></i>
                    <span className="group-hover:translate-x-1 transition-transform duration-700 ease-in-out">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700 ease-in-out" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="sm:col-span-2 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2 text-base md:text-lg transition-colors duration-700 ease-in-out">
              <div className="w-1 h-5 md:h-6 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full"></div>
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base leading-relaxed transition-colors duration-700 ease-in-out">
              Get the latest updates on new features, events, and commitment-based learning insights.
            </p>
            

            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-700 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
                />
                <motion.button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Subscribe</span>
                </motion.button>
              </div>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                We respect your privacy. Unsubscribe anytime. No spam, ever.
              </p>
            </div>

          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-200/50 dark:border-gray-700/50 mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs md:text-sm transition-colors duration-700 ease-in-out text-center md:text-left">
            <span>© {currentYear} CommitLearn. All Right Reserved.</span>
            
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
            {[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/cookies", label: "Cookie Policy" },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-700 ease-in-out hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}