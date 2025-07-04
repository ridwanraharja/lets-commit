import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InfoItem {
  icon: LucideIcon;
  text: string;
  color: string;
}

interface InfoCardProps {
  title: string;
  titleIcon: LucideIcon;
  items: InfoItem[];
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
}

export function InfoCard({
  title,
  titleIcon: TitleIcon,
  items,
  gradientFrom,
  gradientTo,
  borderColor,
}: InfoCardProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-${gradientFrom} via-${gradientTo} to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-${borderColor}/50 dark:border-blue-700/50`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h4
        className={`font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2`}
      >
        <TitleIcon className="w-5 h-5" />
        {title}
      </h4>
      <ul className={`text-sm text-blue-800 dark:text-blue-200 space-y-2`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <item.icon
              className={`w-4 h-4 mt-0.5 ${item.color} flex-shrink-0`}
            />
            {item.text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
