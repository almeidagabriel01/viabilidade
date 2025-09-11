"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from "lucide-react";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { AnalysisResponse } from "@/types/company";

interface DetailsRecommendationsProps {
  result: AnalysisResponse;
}

export function DetailsRecommendations({ result }: DetailsRecommendationsProps) {
  const isPositive = result.result.type === 'positive';
  const isNegative = result.result.type === 'negative';

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Details */}
      {result.result.details && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <AdvancedCard className="h-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                {isPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                ) : isNegative ? (
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                )}
                Pontos Identificados
              </h3>
              <ul className="space-y-3">
                {result.result.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      isPositive ? 'bg-green-500' : 
                      isNegative ? 'bg-red-500' : 
                      'bg-yellow-500'
                    }`} />
                    <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AdvancedCard>
        </motion.div>
      )}

      {/* Recommendations */}
      {result.result.recommendations && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <AdvancedCard className="h-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                Recomendações
              </h3>
              <ul className="space-y-3">
                {result.result.recommendations.map((recommendation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 rounded-full mt-2 mr-3 bg-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AdvancedCard>
        </motion.div>
      )}
    </div>
  );
}
