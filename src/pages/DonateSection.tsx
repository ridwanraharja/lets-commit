import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles, Coffee, Gift, Zap, Users, Award, Crown, DollarSign, CheckCircle, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function DonateSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const presetAmounts = [
    { amount: 5, label: "Coffee", icon: Coffee, color: "from-amber-500 to-orange-500", desc: "Buy us a coffee" },
    { amount: 15, label: "Supporter", icon: Heart, color: "from-pink-500 to-rose-500", desc: "Show your support" },
    { amount: 50, label: "Champion", icon: Award, color: "from-blue-500 to-cyan-500", desc: "Become a champion" },
    { amount: 100, label: "Hero", icon: Crown, color: "from-purple-500 to-indigo-500", desc: "Be our hero" },
  ];

  const impactStats = [
    { icon: Users, value: "1,000+", label: "Learners Helped", color: "text-blue-500" },
    { icon: Award, value: "95%", label: "Success Rate", color: "text-green-500" },
    { icon: Sparkles, value: "50+", label: "Events Created", color: "text-purple-500" },
    { icon: Heart, value: "500+", label: "Lives Changed", color: "text-pink-500" },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/30 dark:from-gray-950 dark:via-purple-950/10 dark:to-blue-950/10 transition-colors duration-700 ease-in-out"
    >

      <div className="absolute inset-0">

        <motion.div 
          className="absolute top-20 left-1/4 text-pink-400/30"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        >
          <Heart className="w-8 h-8" fill="currentColor" />
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-1/3 text-purple-400/25"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-1/3 text-blue-400/20"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        >
          <Gift className="w-7 h-7" />
        </motion.div>

        <motion.div 
          className="absolute top-1/2 right-1/4 text-yellow-400/25"
          animate={{ 
            y: [0, -18, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 3 }}
        >
          <Zap className="w-5 h-5" />
        </motion.div>


        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-pink-200/50 dark:border-pink-700/50 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Support Our Mission
            <motion.div
              className="w-2 h-2 bg-pink-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Help Us{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Transform Lives
              </span>
            </span>
            <br />Through Learning
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Every donation helps us create better learning experiences, develop new features, and make education accessible to everyone worldwide.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
      
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-700 ease-in-out">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-700 ease-in-out">
                Choose Your Impact
              </h3>

  
              <div className="grid grid-cols-2 gap-4 mb-8">
                {presetAmounts.map((preset, index) => (
                  <motion.button
                    key={preset.amount}
                    onClick={() => handleAmountSelect(preset.amount)}
                    className={`group relative p-4 md:p-6 rounded-2xl border-2 transition-all duration-700 ease-in-out overflow-hidden ${
                      selectedAmount === preset.amount
                        ? `border-transparent bg-gradient-to-r ${preset.color} text-white shadow-lg`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-900/50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 text-center">
                      <preset.icon className={`w-8 h-8 mx-auto mb-2 ${selectedAmount === preset.amount ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                      <div className={`text-2xl font-bold mb-1 ${selectedAmount === preset.amount ? 'text-white' : 'text-gray-900 dark:text-white'} transition-colors duration-700 ease-in-out`}>
                        ${preset.amount}
                      </div>
                      <div className={`text-xs font-medium ${selectedAmount === preset.amount ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'} transition-colors duration-700 ease-in-out`}>
                        {preset.desc}
                      </div>
                    </div>
                    {selectedAmount !== preset.amount && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${preset.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-in-out`} />
                    )}
                  </motion.button>
                ))}
              </div>

     
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-700 ease-in-out">
                  Or enter custom amount:
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-700 ease-in-out text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    min="1"
                    step="0.01"
                  />
                </div>
              </motion.div>

     
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-700 ease-in-out">
                    Your Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={isAnonymous}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-700 ease-in-out text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-700 ease-in-out">
                    Donate anonymously
                  </span>
                </label>
              </motion.div>

         
              <motion.button
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-700 ease-in-out overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={getFinalAmount() === 0}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  Donate ${getFinalAmount() > 0 ? getFinalAmount().toFixed(2) : '0.00'}
                </span>
              </motion.button>

           
              <motion.div
                className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-700 ease-in-out"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                Secure payment powered by blockchain technology
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-8">
           
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl p-6 md:p-8 transition-colors duration-700 ease-in-out">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-700 ease-in-out">
                  Your Impact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {impactStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm transition-colors duration-700 ease-in-out"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium transition-colors duration-700 ease-in-out">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

         
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-700 ease-in-out">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-700 ease-in-out">
                  How Your Donation Helps
                </h3>
                <div className="space-y-4">
                  {[
                    "Platform development and maintenance",
                    "Supporting learners with scholarships",
                    "Creating new educational content",
                    "Expanding to underserved communities"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 transition-colors duration-700 ease-in-out">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

          
              <motion.div
                className="text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-3xl transition-colors duration-700 ease-in-out"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="currentColor" />
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-700 ease-in-out">
                  Thank You!
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                  Every contribution, no matter the size, makes a real difference in someone's learning journey.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

  
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-700 ease-in-out backdrop-blur-sm"
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 bg-white/60 dark:bg-gray-700/60 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-700 ease-in-out"
              whileHover={{ scale: 1.1, rotate: -10 }}
            >
              <Home className="w-5 h-5" />
            </motion.div>
            
            <div className="text-left">
              <div className="flex items-center gap-2 text-lg font-bold">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-700 ease-in-out" />
                Back to Home
              </div>
              <div className="text-sm opacity-75 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                Continue exploring CommitLearn!
              </div>
            </div>
            
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </Link>


        </motion.div>
      </div>
    </section>
  );
}