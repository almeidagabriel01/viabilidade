import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { AnalysisResultType, AnalysisResponse, CompanyData } from "@/types/company";
import { resultConfigs } from "@/lib/config/result-configs";
import { analyzeViability } from "@/lib/api/analysis-service";
import { getFormData } from "@/lib/storage/form-data-storage";
import { getAnalysisDataById } from "@/lib/storage/analysis-data-storage";
import { getAnalysisById } from "@/lib/storage/analysis-storage";
import { THRESHOLD_POSITIVE, THRESHOLD_MODERATE } from "@/lib/config/thresholds";

const DEBUG_RESULT_TYPE: AnalysisResultType | null = null; //'positive', 'negative', 'inadequate_use', 'excessive_use' e null

export function useResultData(analysisId?: string) {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      try {
        let companyData: CompanyData | null = null;
        let storedAnalysis = null;

        if (analysisId) {
          // Buscar dados específicos da análise por ID
          const analysisData = getAnalysisDataById(analysisId);
          storedAnalysis = getAnalysisById(analysisId);
          companyData = analysisData;
        } else {
          // Usar dados do formulário mais recente
          const formData = getFormData();
          companyData = formData;
        }

        // Se não encontrou dados, retornar erro
        if (!companyData) {
          toast.error('Dados da análise não encontrados');
          throw new Error('Dados da análise não encontrados');
        }

        if (DEBUG_RESULT_TYPE) {
          const analysisResult: AnalysisResponse = {
            result: resultConfigs[DEBUG_RESULT_TYPE],
            companyData: companyData,
            analysisDate: storedAnalysis?.dataAnalise || new Date().toISOString(),
            viabilityScore: storedAnalysis?.score
          };
          setResult(analysisResult);
        } else if (storedAnalysis?.score !== undefined) {
          // Se já temos o score armazenado, não precisamos chamar a API novamente
          const { createAnalysisResult } = await import("@/lib/api/analysis-service");
          const analysisResult = createAnalysisResult(
            storedAnalysis.score,
            companyData,
            storedAnalysis.dataAnalise || new Date().toISOString()
          );
          setResult(analysisResult);
        } else {
          const analysisResult = await analyzeViability(companyData);

          // Se temos uma análise armazenada com score, garantir que o tipo de resultado seja consistente
          if (storedAnalysis?.score !== undefined) {
            analysisResult.viabilityScore = storedAnalysis.score;

            // ... existing code ...

            // Recalcular o tipo de resultado baseado no score armazenado
            let correctResultType: "positive" | "moderate" | "negative";
            if (storedAnalysis.score >= THRESHOLD_POSITIVE) {
              correctResultType = "positive";
            } else if (storedAnalysis.score >= THRESHOLD_MODERATE) {
              correctResultType = "moderate";
            } else {
              correctResultType = "negative";
            }

            // Atualizar o resultado apenas se o tipo for diferente
            if (analysisResult.result.type !== correctResultType &&
              (correctResultType === 'positive' || correctResultType === 'moderate' || correctResultType === 'negative')) {
              analysisResult.result = resultConfigs[correctResultType];
            }
          }

          // Usar a data da análise armazenada se disponível
          if (storedAnalysis?.dataAnalise) {
            analysisResult.analysisDate = storedAnalysis.dataAnalise;
          }

          setResult(analysisResult);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        toast.error(`Erro ao carregar resultado: ${errorMessage}`);
        setError(errorMessage);

        // Tentar buscar dados como fallback
        let companyData: CompanyData | null = null;
        if (analysisId) {
          companyData = getAnalysisDataById(analysisId);
        }
        if (!companyData) {
          companyData = getFormData();
        }

        // Se ainda não tem dados, usar valores padrão
        if (!companyData) {
          companyData = {
            endereco: "00000-000",
            cnae: "0000-0-00",
            isMei: false,
            naturezaJuridica: 0,
            qualificacaoDoResponsavel: 0
          };
        }

        const fallbackResult: AnalysisResponse = {
          result: resultConfigs['inadequate_use'],
          companyData: companyData,
          analysisDate: new Date().toISOString(),
          testCount: 1,
          maxTests: 2
        };
        setResult(fallbackResult);
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [analysisId]);

  return { result, isLoading };
}
