import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building, ArrowRight } from "lucide-react";
import { useRole } from "../context/RoleContext";

const RoleSwitch: React.FC = () => {
  const { role, toggleRole } = useRole();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    toggleRole();
  };

  const nextRole = role === "participant" ? "organizer" : "participant";
  const nextRoleIcon = role === "participant" ? Building : User;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Text Link */}
      <motion.button
        onClick={handleClick}
        className={`relative flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
          role === "participant"
            ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            : "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-semibold">Switch to {nextRole}</span>

        <motion.div
          animate={{
            x: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-3 h-3" />
        </motion.div>

        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 rounded-full ${
            role === "participant" ? "bg-blue-500" : "bg-purple-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50 min-w-max"
            initial={{ opacity: 0, y: -5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div>
                {React.createElement(nextRoleIcon, { className: "w-3 h-3" })}
              </div>
              <span>Click to switch to {nextRole}</span>
            </div>

            <div className="absolute top-0 right-3 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoleSwitch;
