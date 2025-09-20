"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdvancedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function AdvancedCard({
  children,
  className,
  hover = true,
  glow = false
}: AdvancedCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 relative",
        hover && "overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hover ? {
        y: -2,
        scale: 1.002,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
    >
      {/* Background gradient on hover - only if hover is enabled */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 dark:from-blue-900/10 dark:to-indigo-900/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
      
      {/* Glow effect - only if glow is enabled and hover is true */}
      {glow && hover && (
        <motion.div
          className="absolute -inset-1 rounded-3xl opacity-0"
          style={{
            background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(79, 70, 229, 0.1))",
            filter: "blur(20px)"
          }}
          whileHover={{ 
            opacity: 0.6,
            transition: { duration: 0.4 }
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
