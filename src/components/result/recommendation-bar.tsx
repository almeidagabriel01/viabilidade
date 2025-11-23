"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface RecommendationBarProps {
  score: number; // 0 a 100
  showLabel?: boolean;
}

export function RecommendationBar({ score, showLabel = true }: RecommendationBarProps) {
  // Determinar cor e status baseado na pontuação
  const getScoreConfig = (score: number) => {
    if (score >= 75) {
      return {
        color: "from-green-500 to-emerald-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-700 dark:text-green-400",
        icon: TrendingUp,
        label: "Alta Viabilidade",
        message: "Excelente localização para o negócio!"
      };
    } else if (score >= 55) {
      return {
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        textColor: "text-yellow-700 dark:text-yellow-400",
        icon: Minus,
        label: "Viabilidade Moderada",
        message: "Localização com potencial, mas requer atenção."
      };
    } else {
      return {
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-700 dark:text-red-400",
        icon: TrendingDown,
        label: "Baixa Viabilidade",
        message: "Localização não recomendada para este tipo de negócio."
      };
    }
  };

  const config = getScoreConfig(score);
  const IconComponent = config.icon;

  return (
    <div className="space-y-4">
      {/* Título e Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconComponent className={`w-5 h-5 ${config.textColor}`} />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Índice de Recomendação
          </span>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className={`${config.bgColor} px-4 py-2 rounded-full`}
        >
          <span className={`text-2xl font-bold ${config.textColor}`}>
            {score}%
          </span>
        </motion.div>
      </div>

      {/* Barra de Progresso */}
      <div className="relative w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${config.color} rounded-full shadow-lg relative`}
        >
          {/* Efeito de brilho */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>

        {/* Marcadores na barra */}
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">0%</span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">50%</span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">100%</span>
        </div>
      </div>

      {/* Label e Mensagem */}
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`${config.bgColor} p-4 rounded-lg border-l-4 border-${config.textColor.split('-')[1]}-500`}
        >
          <p className={`font-semibold ${config.textColor} mb-1`}>
            {config.label}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {config.message}
          </p>
        </motion.div>
      )}

      {/* Escala de Referência */}
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Baixa (0-54%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Moderada (55-74%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Alta (75-100%)</span>
        </div>
      </div>
    </div>
  );
}
