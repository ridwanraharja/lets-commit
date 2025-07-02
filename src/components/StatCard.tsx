import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  color: string;
}

export function StatCard({ icon: Icon, title, value, color }: StatCardProps) {
  return (
    <motion.div
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 lg:p-8 text-center border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${
          color === "blue"
            ? "from-blue-500/10 to-cyan-500/10"
            : color === "green"
            ? "from-green-500/10 to-emerald-500/10"
            : "from-purple-500/10 to-pink-500/10"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <motion.div
        className={`mx-auto mb-4 lg:mb-6 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center ${
          color === "blue"
            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
            : color === "green"
            ? "bg-gradient-to-r from-green-500 to-emerald-500"
            : "bg-gradient-to-r from-purple-500 to-pink-500"
        } relative z-10`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
      </motion.div>
      <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3 relative z-10">
        {title}
      </h3>
      <motion.p
        className={`text-3xl lg:text-4xl font-black mb-1 lg:mb-2 relative z-10 ${
          color === "blue"
            ? "text-blue-600 dark:text-blue-400"
            : color === "green"
            ? "text-green-600 dark:text-green-400"
            : "text-purple-600 dark:text-purple-400"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        ${value}
      </motion.p>
      <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium relative z-10">
        USDT
      </p>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}
