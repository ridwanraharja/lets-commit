import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export function AnimatedBackground() {
  return (
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
          ease: "easeInOut",
        }}
        style={{ top: "5%", left: "5%" }}
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
          delay: 5,
        }}
        style={{ top: "15%", right: "5%" }}
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
          delay: 10,
        }}
        style={{ bottom: "10%", left: "15%" }}
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
          delay: 3,
        }}
        style={{ top: "50%", right: "20%" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] lg:opacity-[0.04] dark:opacity-[0.01] dark:sm:opacity-[0.015] dark:lg:opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-1/4 right-1/6 text-blue-400/25"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
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
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 3,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
              i % 4 === 0
                ? "bg-blue-500"
                : i % 4 === 1
                ? "bg-purple-500"
                : i % 4 === 2
                ? "bg-pink-500"
                : "bg-indigo-500"
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

      {/* Animated lines */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-px h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-12 sm:w-16 lg:w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/6 w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 5,
          delay: 2.5,
        }}
      />

      {/* Rotating circles */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-40 sm:h-40 border border-blue-500/10 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 border border-purple-500/10 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
