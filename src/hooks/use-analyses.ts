import { useState, useEffect } from "react";
import { Analysis } from "@/types/profile";
import { getAnalyses, subscribeToAnalysisChanges } from "@/lib/storage/analysis-storage";

export function useAnalyses() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar análises iniciais
    const loadAnalyses = () => {
      try {
        const storedAnalyses = getAnalyses();
        // Ordenar por data de atualização (mais recente primeiro)
        const sortedAnalyses = storedAnalyses.sort((a, b) =>
          new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
        );
        setAnalyses(sortedAnalyses);
      } catch (error) {
        console.error('Erro ao carregar análises:', error);
        setAnalyses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalyses();

    // Subscrever a mudanças
    const unsubscribe = subscribeToAnalysisChanges((updatedAnalyses) => {
      const sortedAnalyses = updatedAnalyses.sort((a, b) =>
        new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
      );
      setAnalyses(sortedAnalyses);
    });

    return unsubscribe;
  }, []);

  const refreshAnalyses = () => {
    try {
      const storedAnalyses = getAnalyses();
      const sortedAnalyses = storedAnalyses.sort((a, b) =>
        new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
      );
      setAnalyses(sortedAnalyses);
    } catch (error) {
      console.error('Erro ao recarregar análises:', error);
    }
  };

  return { analyses, isLoading, refreshAnalyses };
}
