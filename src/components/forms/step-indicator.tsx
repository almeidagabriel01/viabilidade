"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 px-4">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center w-full">
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const StepIcon = step.icon;
            
            return (
              <React.Fragment key={step.id}>
                <motion.div
                  className="flex flex-col items-center space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`
                      relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30' 
                        : isCurrent 
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/40' 
                          : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                      }
                    `}
                    animate={{
                      scale: isCurrent ? 1.15 : 1,
                      boxShadow: isCurrent ? "0 0 25px rgba(59, 130, 246, 0.6)" : "0 0 0px rgba(0, 0, 0, 0)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <motion.svg
                        className="h-7 w-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    ) : (
                      <StepIcon className="h-7 w-7" />
                    )}
                  </motion.div>
                  
                  <div className="text-center px-2 max-w-[140px]">
                    <p className={`text-sm font-semibold mb-1 ${
                      isCurrent 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : isCompleted 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    className={`
                      w-24 h-1 mx-4 rounded-full transition-all duration-500
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
                    `}
                    initial={{ scaleX: 0.3 }}
                    animate={{ scaleX: isCompleted ? 1 : 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-sm mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-5 px-2">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-2.5 w-full shadow-inner">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              
              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    className={`
                      relative w-9 h-9 rounded-full flex items-center justify-center text-white border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 shadow-md shadow-green-500/30' 
                        : isCurrent 
                          ? 'bg-blue-500 border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-md shadow-blue-500/40' 
                          : 'bg-gray-400 dark:bg-gray-600 border-gray-400 dark:border-gray-600'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isCurrent ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <span className="text-xs font-bold">{step.id}</span>
                    )}
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <motion.div
                      className={`
                        flex-1 h-1 mx-2 rounded-full transition-all duration-500
                        ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
                      `}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        
        {/* Current Step Info */}
        <div className="text-center px-4">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1.5">
            Passo {currentStep} de {steps.length}
          </p>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5">
            {steps.find(step => step.id === currentStep)?.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight max-w-xs mx-auto">
            {steps.find(step => step.id === currentStep)?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
