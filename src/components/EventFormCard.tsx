import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface EventFormCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

export function EventFormCard({
  icon: Icon,
  title,
  subtitle,
  children,
  gradientFrom,
  gradientTo,
}: EventFormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
