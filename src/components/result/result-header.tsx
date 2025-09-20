"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisResponse } from "@/types/company";

interface ResultHeaderProps {
  result: AnalysisResponse;
  onBackToForm: () => void;
}

export function ResultHeader({ result, onBackToForm }: ResultHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-8"
    >
      <Button
        variant="ghost"
        onClick={onBackToForm}
        className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar ao Formulário
      </Button>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Resultado da Análise
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Análise realizada em {new Date(result.analysisDate).toLocaleDateString('pt-BR')}
      </p>
    </motion.div>
  );
}
