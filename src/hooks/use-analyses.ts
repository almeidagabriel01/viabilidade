import React, { useState, useEffect, useCallback } from "react";
import { Analysis } from "@/types/profile";
import { 
  fetchAnalysisHistory, 
  deleteAnalysisFromBackend,
  HistoryAnalysis 
} from "@/lib/api/history-service";
import { 
  getAnalyses as getLocalAnalyses, 
  subscribeToAnalysisChanges,
  deleteAnalysis as deleteLocalAnalysis 
} from "@/lib/storage/analysis-storage";
import { toast } from "react-toastify";

// Converte análise do backend para o formato do frontend
function convertBackendAnalysis(backendAnalysis: HistoryAnalysis): Analysis {
  return {
    id: String(backendAnalysis.id),
    titulo: backendAnalysis.local,
    cnae: backendAnalysis.cnae,
    endereco: backendAnalysis.local,
    cep: backendAnalysis.cep,
    cidade: "",
    uf: "",
    status: "completa" as const,
    score: Math.round(backendAnalysis.pontuacao * 100),
    dataAnalise: backendAnalysis.data_analise,
    dataAtualizacao: backendAnalysis.data_analise,
    dadosCompletos: true,
  };
}

export function useAnalyses() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = React.useRef(false);
  const isDeletingRef = React.useRef(false);

  const loadAnalyses = useCallback(async () => {
    // Evitar chamadas duplicadas usando ref
    if (isFetchingRef.current) {
      console.log('Chamada duplicada evitada');
      return;
    }
    
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // Buscar análises do backend (completas)
      const backendAnalyses = await fetchAnalysisHistory();
      const convertedBackendAnalyses = backendAnalyses.map(convertBackendAnalysis);

      // Buscar análises locais (apenas incompletas)
      const localAnalyses = getLocalAnalyses();
      const incompleteLocalAnalyses = localAnalyses.filter(a => a.status === "incompleta");

      // Combinar: análises do backend + análises locais incompletas
      const allAnalyses = [...convertedBackendAnalyses, ...incompleteLocalAnalyses];

      // Ordenar por data (mais recente primeiro)
      const sortedAnalyses = allAnalyses.sort((a, b) =>
        new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
      );

      setAnalyses(sortedAnalyses);
    } catch (err) {
      console.error('Erro ao carregar análises:', err);
      setError('Erro ao carregar análises');
      
      // Em caso de erro, tentar carregar apenas do localStorage
      try {
        const localAnalyses = getLocalAnalyses();
        const sortedAnalyses = localAnalyses.sort((a, b) =>
          new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
        );
        setAnalyses(sortedAnalyses);
      } catch (localError) {
        console.error('Erro ao carregar análises locais:', localError);
        setAnalyses([]);
      }
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadAnalyses();

    // Subscrever a mudanças locais (para análises incompletas)
    const unsubscribe = subscribeToAnalysisChanges(() => {
      // Recarregar quando houver mudanças locais
      loadAnalyses();
    });

    return unsubscribe;
  }, [loadAnalyses]);

  const deleteAnalysis = useCallback(async (id: string) => {
    // Evitar chamadas duplicadas
    if (isDeletingRef.current) {
      console.log('Delete já em andamento, ignorando chamada duplicada');
      return;
    }

    isDeletingRef.current = true;

    try {
      // Verificar se é uma análise do backend (id numérico) ou local
      const numericId = parseInt(id);
      
      if (!isNaN(numericId)) {
        // É uma análise do backend - deletar via API
        await deleteAnalysisFromBackend(numericId);
      } else {
        // É uma análise local - deletar do localStorage
        deleteLocalAnalysis(id);
        toast.success('Análise excluída com sucesso!');
      }

      // Recarregar lista
      await loadAnalyses();
    } catch (err) {
      console.error('Erro ao deletar análise:', err);
      // O toast de erro já é mostrado no service
    } finally {
      isDeletingRef.current = false;
    }
  }, [loadAnalyses]);

  return { 
    analyses, 
    isLoading, 
    error,
    refreshAnalyses: loadAnalyses,
    deleteAnalysis 
  };
}
