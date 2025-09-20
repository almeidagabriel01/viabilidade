import { useState, useEffect } from "react";
import { AnalysisResultType, AnalysisResponse, CompanyData } from "@/types/company";
import { resultConfigs } from "@/lib/config/result-configs";
import { analyzeViability } from "@/lib/api/analysis-service";
import { getFormData } from "@/lib/storage/form-data-storage";
import { getAnalysisDataById } from "@/lib/storage/analysis-data-storage";

const DEBUG_RESULT_TYPE: AnalysisResultType | null = null; //'positive', 'negative', 'inadequate_use', 'excessive_use' e null

const mockCompanyData: CompanyData = {
  endereco: "01310-100",
  rua: "Av. Paulista",
  numero: "1000",
  complemento: "Sala 100",
  bairro: "Bela Vista",
  cidade: "São Paulo",
  uf: "SP",
  cnae: "47.81-0-00",
  isMei: false,
  capitalInicial: 50000
};

export function useResultData(analysisId?: string) {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        let companyData: CompanyData;
        
        if (analysisId) {
          // Buscar dados específicos da análise
          const analysisData = getAnalysisDataById(analysisId);
          companyData = analysisData || mockCompanyData;
        } else {
          // Usar dados do formulário atual
          const formData = getFormData();
          companyData = formData || mockCompanyData;
        }
        
        if (DEBUG_RESULT_TYPE) {
          const analysisResult: AnalysisResponse = {
            result: resultConfigs[DEBUG_RESULT_TYPE],
            companyData: companyData,
            analysisDate: new Date().toISOString(),
            testCount: DEBUG_RESULT_TYPE === 'excessive_use' ? 2 : 1,
            maxTests: 2
          };
          setResult(analysisResult);
        } else {
          const analysisResult = await analyzeViability(companyData);
          setResult(analysisResult);
        }
      } catch (error) {
        console.error('Erro ao carregar resultado:', error);
        let companyData: CompanyData;
        
        if (analysisId) {
          const analysisData = getAnalysisDataById(analysisId);
          companyData = analysisData || mockCompanyData;
        } else {
          const formData = getFormData();
          companyData = formData || mockCompanyData;
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
