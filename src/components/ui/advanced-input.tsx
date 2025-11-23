"use client";

import { motion } from "framer-motion";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AdvancedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  mask?: string;
}

export const AdvancedInput = forwardRef<HTMLInputElement, AdvancedInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <motion.label
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}

        <motion.div
          className="relative"
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full max-w-full h-14 px-4 text-base bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600",
              "focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl transition-all duration-300",
              "focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:shadow-lg",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              icon && "pl-10",
              error && "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400",
              className
            )}
            {...props}
          />
        </motion.div>

        {error && (
          <motion.p
            className="text-sm text-red-500 dark:text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

AdvancedInput.displayName = "AdvancedInput";
