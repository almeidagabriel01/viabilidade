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
        setAnalyses(storedAnalyses);
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
      setAnalyses(updatedAnalyses);
    });

    return unsubscribe;
  }, []);

  return { analyses, isLoading };
}
