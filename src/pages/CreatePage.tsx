import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  MapPin, 
  Plus, 
  Trash2, 
  Users,
  BookOpen,
  Sparkles,
  Heart,
  Star,
  Coffee
} from 'lucide-react';

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
}

interface EventData {
  title: string;
  description: string;
  location: string;
  category: string;
  maxParticipants: string;
  eventFee: string;
  commitmentDeposit: string;
}

export default function CreatePage() {
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    location: '',
    category: '',
    maxParticipants: '',
    eventFee: '',
    commitmentDeposit: '',
  });

  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', title: '', date: '', time: '', duration: '' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSessionChange = (sessionId: string, field: keyof Session, value: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, [field]: value } : session
    ));
  };

  const addSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      title: '',
      date: '',
      time: '',
      duration: ''
    };
    setSessions(prev => [...prev, newSession]);
  };

  const removeSession = (sessionId: string) => {
    if (sessions.length > 1) {
      setSessions(prev => prev.filter(session => session.id !== sessionId));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Event created:', { eventData, sessions });
    // TODO: Implement blockchain event creation
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out relative overflow-hidden">

      <div className="absolute inset-0">

        <motion.div 
          className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '5%', left: '5%' }}
          aria-hidden="true"
        />
        
        <motion.div 
          className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 45, -35, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          style={{ top: '15%', right: '5%' }}
          aria-hidden="true"
        />
        
        <motion.div 
          className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 30, -45, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          style={{ bottom: '10%', left: '15%' }}
          aria-hidden="true"
        />


        <motion.div 
          className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-xl sm:blur-2xl"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -25, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{ top: '50%', right: '20%' }}
          aria-hidden="true"
        />


        <motion.div 
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] lg:opacity-[0.04] dark:opacity-[0.01] dark:sm:opacity-[0.015] dark:lg:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          aria-hidden="true"
        />

  
        <motion.div 
          className="absolute top-1/4 right-1/6 text-blue-400/25"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <BookOpen className="w-8 h-8" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 left-1/6 text-purple-400/25"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Create New Event
              </h1>
            </motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Set up your educational event with blockchain-secured commitments and build a learning community 
              <motion.span
                className="inline-block ml-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                role="img"
                aria-label="sparkles"
              >
                ✨
              </motion.span>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">

            <motion.div 
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Event Details</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Basic information about your event</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    Event Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Web3 Development Masterclass"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                    placeholder="Comprehensive course covering blockchain fundamentals, smart contracts, and DeFi protocols..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={eventData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="defi">DeFi</option>
                      <option value="nft">NFT</option>
                      <option value="smart-contracts">Smart Contracts</option>
                      <option value="web3-dev">Web3 Development</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="maxParticipants" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      <Users className="w-4 h-4 inline mr-1" />
                      Maximum Participants *
                    </label>
                    <input
                      id="maxParticipants"
                      type="number"
                      name="maxParticipants"
                      value={eventData.maxParticipants}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="50"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Online / Physical Address"
                    required
                  />
                </div>
              </div>
            </motion.div>

    
            <motion.div 
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sessions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Configure individual sessions for your event</p>
                </div>
              </div>

              <div className="space-y-6">
                {sessions.map((session, index) => (
                  <motion.div 
                    key={session.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-700/50 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Star className="w-4 h-4 text-blue-500" />
                        Session {index + 1}
                      </h4>
                      {sessions.length > 1 && (
                        <motion.button
                          type="button"
                          onClick={() => removeSession(session.id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Remove session ${index + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor={`session-title-${session.id}`} className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                          Session Title *
                        </label>
                        <input
                          id={`session-title-${session.id}`}
                          type="text"
                          value={session.title}
                          onChange={(e) => handleSessionChange(session.id, 'title', e.target.value)}
                          className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Introduction to Smart Contracts"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor={`session-date-${session.id}`} className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Date *
                          </label>
                          <input
                            id={`session-date-${session.id}`}
                            type="date"
                            value={session.date}
                            onChange={(e) => handleSessionChange(session.id, 'date', e.target.value)}
                            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor={`session-time-${session.id}`} className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Time *
                          </label>
                          <input
                            id={`session-time-${session.id}`}
                            type="time"
                            value={session.time}
                            onChange={(e) => handleSessionChange(session.id, 'time', e.target.value)}
                            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor={`session-duration-${session.id}`} className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Duration (hours) *
                          </label>
                          <input
                            id={`session-duration-${session.id}`}
                            type="number"
                            value={session.duration}
                            onChange={(e) => handleSessionChange(session.id, 'duration', e.target.value)}
                            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-600/70 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="2"
                            min="1"
                            step="0.5"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <motion.button
                  type="button"
                  onClick={addSession}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-2xl text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all duration-300 font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Add another session"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Session
                </motion.button>
              </div>
            </motion.div>

   
            <motion.div 
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pricing & Commitment</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Set pricing and commitment deposits</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventFee" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      Event Fee per Session (USDT) *
                    </label>
                    <input
                      id="eventFee"
                      type="number"
                      name="eventFee"
                      value={eventData.eventFee}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="50"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="commitmentDeposit" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      Commitment Deposit per Session (USDT) *
                    </label>
                    <input
                      id="commitmentDeposit"
                      type="number"
                      name="commitmentDeposit"
                      value={eventData.commitmentDeposit}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="25"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <motion.div 
                  className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    How Sessions Work
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <Heart className="w-4 h-4 mt-0.5 text-pink-500 flex-shrink-0" />
                      Participants pay per session: event fee + commitment deposit
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      Commitment deposit returned after attending each session
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                      No-shows forfeit their commitment deposit for that session
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      Organizers generate QR codes at session start for check-in
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      Participants scan QR or use link to confirm attendance
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>


            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button
                type="submit"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
     
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
     
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                <span className="relative z-10 flex items-center">
                  <Sparkles className="w-5 h-5" />
                  Create Event
                </span>
              </motion.button>
              
              <motion.button
                type="button"
                className="flex-1 px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
          
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-5 h-5" />
                  Save as Draft
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>


      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
              i % 4 === 0 ? 'bg-blue-500' :
              i % 4 === 1 ? 'bg-purple-500' :
              i % 4 === 2 ? 'bg-pink-500' : 'bg-indigo-500'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

   
      <motion.div 
        className="absolute top-1/4 left-1/4 w-px h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
        animate={{ 
          scaleY: [0, 1, 0],
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatDelay: 3 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-12 sm:w-16 lg:w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatDelay: 4,
          delay: 1 
        }}
      />


      <motion.div 
        className="absolute top-1/2 left-1/6 w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0] 
        }}
        transition={{ 
          duration: 1.8, 
          repeat: Infinity,
          repeatDelay: 5,
          delay: 2.5 
        }}
      />


      <motion.div 
        className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-40 sm:h-40 border border-blue-500/10 rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 border border-purple-500/10 rounded-full"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "linear"
        }}
      />

    </div>
  );
}