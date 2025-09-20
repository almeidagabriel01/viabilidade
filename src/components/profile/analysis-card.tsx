"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import type { Analysis } from "../../types/profile";
import {
  getStatusColor,
  getStatusIcon,
  getStatusText,
} from "../../lib/analysisUtils";
import { setCurrentAnalysisId, clearCurrentAnalysisId } from "@/lib/storage/analysis-storage";
import { storeAnalysisData } from "@/lib/storage/analysis-data-storage";
import { getFormData } from "@/lib/storage/form-data-storage";

interface AnalysisCardProps {
  analysis: Analysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const router = useRouter();

  const handleViewResult = () => {
    // Limpar análise atual e navegar para o resultado
    clearCurrentAnalysisId();
    router.push(`/resultado?analysisId=${analysis.id}`);
  };

  const handleContinue = () => {
    // Definir a análise atual e navegar para o formulário
    setCurrentAnalysisId(analysis.id);
    
    // Carregar dados da análise se existirem
    const formData = getFormData();
    if (formData) {
      storeAnalysisData(analysis.id, formData);
    }
    
    router.push('/uso-modelo');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate flex-shrink-0">
              {analysis.titulo}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={`flex items-center space-x-1 ${getStatusColor(
                  analysis.status
                )} text-xs`}
              >
                {getStatusIcon(analysis.status)}
                <span>{getStatusText(analysis.status)}</span>
              </Badge>
              {analysis.score && (
                <Badge variant="secondary" className="text-xs">
                  Score: {analysis.score}%
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 break-words">
            {analysis.cnae}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {analysis.endereco}, {analysis.cidade}/{analysis.uf}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="whitespace-nowrap">
                Criada em{" "}
                {new Date(analysis.dataAnalise).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end space-x-2">
          <div className="flex items-center space-x-2">
            {analysis.status === "incompleta" && (
              <Button
                size="sm"
                variant="outline"
                className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/20 text-xs"
                onClick={handleContinue}
              >
                <span className="hidden sm:inline">Continuar</span>
                <span className="sm:hidden">▶</span>
              </Button>
            )}
            {analysis.status === "completa" && (
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/20 text-xs"
                onClick={handleViewResult}
              >
                <span className="hidden sm:inline">Ver Resultado</span>
                <span className="sm:hidden">👁</span>
              </Button>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}
