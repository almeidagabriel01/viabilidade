"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { AnalysisResponse } from "@/types/company";

const iconMap = {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock
};

interface MainResultCardProps {
  result: AnalysisResponse;
}

export function MainResultCard({ result }: MainResultCardProps) {
  const IconComponent = iconMap[result.result.icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mb-8"
    >
      <AdvancedCard className={`${result.result.bgColor} border-2 border-opacity-20 dark:border-opacity-30 shadow-2xl`}>
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${result.result.bgColor} border-4 border-white dark:border-gray-800 shadow-lg`}>
              <IconComponent className={`w-10 h-10 ${result.result.color}`} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`text-3xl font-bold ${result.result.color} mb-4`}
          >
            {result.result.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
          >
            {result.result.description}
          </motion.p>

          {/* Test Count for Excessive Use */}
          {result.result.type === 'excessive_use' && result.testCount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-lg p-4 mb-6"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Análises realizadas: <span className="font-semibold">{result.testCount}/{result.maxTests}</span>
              </p>
            </motion.div>
          )}
        </div>
      </AdvancedCard>
    </motion.div>
  );
}
