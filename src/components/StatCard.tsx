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
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-md transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${
          color === "blue"
            ? "from-blue-500/5 to-cyan-500/5"
            : color === "green"
            ? "from-green-500/5 to-emerald-500/5"
            : "from-purple-500/5 to-pink-500/5"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              color === "blue"
                ? "bg-blue-100/80 dark:bg-blue-900/30"
                : color === "green"
                ? "bg-green-100/80 dark:bg-green-900/30"
                : "bg-purple-100/80 dark:bg-purple-900/30"
            } backdrop-blur-sm`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon
              className={`w-5 h-5 ${
                color === "blue"
                  ? "text-blue-600 dark:text-blue-400"
                  : color === "green"
                  ? "text-green-600 dark:text-green-400"
                  : "text-purple-600 dark:text-purple-400"
              }`}
            />
          </motion.div>

          <motion.div
            className={`w-2 h-2 rounded-full ${
              color === "blue"
                ? "bg-blue-400"
                : color === "green"
                ? "bg-green-400"
                : "bg-purple-400"
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </h3>
          <motion.p
            className={`text-2xl font-bold ${
              color === "blue"
                ? "text-blue-600 dark:text-blue-400"
                : color === "green"
                ? "text-green-600 dark:text-green-400"
                : "text-purple-600 dark:text-purple-400"
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ${value.toLocaleString()}
          </motion.p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">USDT</p>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
