"use client";

import { motion } from "framer-motion";
import { RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisResponse } from "@/types/company";

interface ActionButtonsProps {
  result: AnalysisResponse;
  onNewAnalysis: () => void;
}

export function ActionButtons({ result, onNewAnalysis }: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="text-center"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onNewAnalysis}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Nova Análise
        </Button>
        {(result.result.type === 'positive' || result.result.type === 'negative') && (
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3"
            onClick={() => window.print()}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Salvar Resultado
          </Button>
        )}
      </div>
    </motion.div>
  );
}
