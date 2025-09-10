"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdvancedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const buttonVariants = {
  primary: "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-2xl hover:shadow-blue-500/25",
  secondary: "bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 shadow-2xl hover:shadow-white/25",
  outline: "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600",
  ghost: "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
};

const sizeVariants = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

export function AdvancedButton({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  onClick,
  href,
  type = "button",
  ...props
}: AdvancedButtonProps) {
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative font-semibold rounded-2xl transition-all duration-300 border-0 overflow-hidden group",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98 
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ boxShadow: "0 0 0px rgba(59, 130, 246, 0)" }}
        whileHover={{ 
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" 
        }}
        transition={{ duration: 0.3 }}
      />
    </Component>
  );
}
