"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { Analysis } from "../../types/profile";
import {
  getStatusColor,
  getStatusIcon,
  getStatusText,
} from "../../lib/analysisUtils";
import { setCurrentAnalysisId, clearCurrentAnalysisId } from "@/lib/storage/analysis-storage";


interface AnalysisCardProps {
  analysis: Analysis;
  onDelete?: () => Promise<void> | void;
}

export function AnalysisCard({ analysis, onDelete }: AnalysisCardProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleViewResult = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Limpar análise atual e navegar para o resultado
    clearCurrentAnalysisId();
    router.push(`/resultado?analysisId=${analysis.id}`);
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Definir a análise atual e navegar para o formulário
    setCurrentAnalysisId(analysis.id);
    router.push('/uso-modelo');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  }

  const confirmDelete = async () => {
    if (onDelete && !isDeleting) {
      setIsDeleting(true);
      setIsDeleteDialogOpen(false);
      try {
        await onDelete();
      } finally {
        setIsDeleting(false);
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group relative"
      onClick={analysis.status === "completa" ? () => router.push(`/resultado?analysisId=${analysis.id}`) : undefined}
    >
      {/* Layout principal */}
      <div className="flex flex-col gap-3">
        {/* Linha 1: CEP + Status/Score */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-tight pr-2">
            {analysis.cep ? `CEP: ${analysis.cep}` : analysis.titulo}
          </h3>
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className={`flex items-center space-x-1 ${getStatusColor(
                analysis.status
              )} text-xs whitespace-nowrap`}
            >
              {getStatusIcon(analysis.status)}
              <span>{getStatusText(analysis.status)}</span>
            </Badge>
            {analysis.score && (
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                Score: {analysis.score}%
              </Badge>
            )}
          </div>
        </div>

        {/* Linha 2: CNAE */}
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-500">CNAE: </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 break-words">{analysis.cnae}</span>
        </div>

        {/* Linha 3: Endereço + Data + Ações */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Informações de Endereço e Data */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500 dark:text-gray-400 min-w-0 flex-1">
            <div className="flex items-start space-x-1 min-w-0 flex-1 sm:flex-initial sm:max-w-[60%]">
              <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
              <span className="break-words line-clamp-2 sm:line-clamp-1">
                {analysis.endereco || analysis.titulo}
              </span>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="whitespace-nowrap">
                Criada em{" "}
                {new Date(analysis.dataAnalise).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center justify-end gap-2 flex-shrink-0">
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
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 sm:p-2"
                onClick={handleDelete}
                title="Excluir análise"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a análise &quot;{analysis.titulo}&quot;?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteDialogOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
