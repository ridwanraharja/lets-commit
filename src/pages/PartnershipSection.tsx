import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Handshake, Rocket, Crown, ArrowRight, CheckCircle, Award, Target,Home, ArrowLeft, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function PartnershipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const partnershipTiers = [
    {
      id: "startup",
      name: "Startup Partner",
      icon: Rocket,
      amount: "$5,000",
      period: "quarterly",
      description: "Perfect for growing startups looking to make an impact",
      features: [
        "Company logo on platform",
        "Newsletter mentions",
        "Social media shout-outs",
        "Quarterly partnership report",
        "Access to community events",
        "Basic analytics dashboard"
      ],
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      link: "/partnership/startup",
      badge: "Most Popular",
      badgeColor: "bg-emerald-500"
    },
    {
      id: "growth",
      name: "Growth Partner",
      icon: TrendingUp,
      amount: "$15,000",
      period: "quarterly",
      description: "Ideal for established companies ready to scale impact",
      features: [
        "Everything in Startup",
        "Featured partner spotlight",
        "Co-branded event opportunities",
        "Dedicated account manager",
        "Custom marketing materials",
        "Advanced analytics & insights",
        "Priority customer support",
        "Joint press releases"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      link: "/partnership/growth",
      badge: "Best Value",
      badgeColor: "bg-blue-500"
    },
    {
      id: "enterprise",
      name: "Enterprise Partner",
      icon: Crown,
      amount: "$50,000",
      period: "quarterly",
      description: "Become a strategic partner in our mission to transform education",
      features: [
        "Everything in Growth",
        "Logo placement on homepage",
        "Co-marketing opportunities",
        "Direct line to founders",
        "Custom integrations & APIs",
        "White-label solutions",
        "Exclusive partner events",
        "Strategic advisory board seat",
        "Custom partnership agreements"
      ],
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
      link: "/partnership/enterprise",
      badge: "Premium",
      badgeColor: "bg-purple-500"
    }
  ];

  const partnershipBenefits = [
    {
      icon: Users,
      title: "Reach Millions",
      description: "Connect with our growing community of 100K+ active learners",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Brand Visibility",
      description: "Increase brand awareness through strategic co-marketing",
      color: "text-green-500"
    },
    {
      icon: Handshake,
      title: "Strategic Growth",
      description: "Access new markets and customer segments",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Industry Leadership",
      description: "Position your brand as an education innovation leader",
      color: "text-orange-500"
    }
  ];

  const partnerLogos = [
    { name: "TechCorp", logo: "🚀" },
    { name: "EduTech Solutions", logo: "📚" },
    { name: "Innovation Labs", logo: "⚡" },
    { name: "Future Learning", logo: "🌟" },
    { name: "Digital Academy", logo: "💻" },
    { name: "Smart Education", logo: "🧠" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-indigo-950/10 transition-colors duration-700 ease-in-out"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Partnership Icons */}
        <motion.div 
          className="absolute top-20 left-1/4 text-blue-400/30"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        >
          <Handshake className="w-8 h-8" />
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
          <Globe className="w-6 h-6" />
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-1/3 text-green-400/20"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        >
          <Target className="w-7 h-7" />
        </motion.div>

        <motion.div 
          className="absolute top-1/2 right-1/4 text-orange-400/25"
          animate={{ 
            y: [0, -18, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 3 }}
        >
          <Award className="w-5 h-5" />
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-blue-200/50 dark:border-blue-700/50 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Handshake className="w-4 h-4" />
            Strategic Partnerships
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
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
            Partner With Us to{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Shape the Future
              </span>
              {/* <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              /> */}
            </span>
            <br />of Education
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Join leading companies in revolutionizing learning through commitment-based education. Together, we can create lasting impact.
          </motion.p>
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-in-out hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-700 ease-in-out">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Tiers */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-700 ease-in-out">
              Choose Your Partnership Level
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-700 ease-in-out">
              Select the partnership tier that aligns with your goals and maximize your impact on global education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                className="group relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredTier(tier.id)}
                onHoverEnd={() => setHoveredTier(null)}
              >
                <div className={`relative h-full ${tier.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex flex-col transition-colors duration-700 ease-in-out`}>
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className={`${tier.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-3xl`}>
                        {tier.badge}
                      </div>
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 ease-in-out`} />
                  
                  {/* Top Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tier.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left`} />
                  
                  {/* Content Container */}
                  <div className="relative p-8 flex flex-col flex-grow">
                    {/* Icon & Name */}
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
                      
                      <div className="flex items-baseline justify-center gap-1 mb-3">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                          {tier.amount}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-700 ease-in-out">
                          /{tier.period}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 font-medium transition-colors duration-700 ease-in-out">
                        {tier.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-700 ease-in-out"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, delay: 1.2 + featureIndex * 0.05 }}
                        >
                          <div className={`w-5 h-5 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Link
                        to={tier.link}
                        className={`group/btn relative block w-full px-6 py-4 bg-gradient-to-r ${tier.color} hover:shadow-xl text-white font-semibold rounded-xl transition-all duration-700 ease-in-out text-center overflow-hidden`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Become a {tier.name.split(' ')[0]}
                          <motion.div
                            animate={{ x: hoveredTier === tier.id ? 4 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </span>
                        <div className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-700 ease-in-out`} />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Partners */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-700 ease-in-out">
            Trusted by Industry Leaders
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700 ease-in-out">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-700 ease-in-out"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                  {partner.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          {/* <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <Link
              to="/partnership/custom"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-700 ease-in-out group"
            >
              Need a Custom Partnership?
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div> */}
        </motion.div>
        {/* Back to Home Button */}
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

          {/* Alternative Simple Button */}
          {/* <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-700 ease-in-out text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Or simply go back to homepage
            </Link>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}