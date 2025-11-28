"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { AnalysisResponse, CompanyData } from "@/types/company";
import { createAnalysisResult } from "@/lib/api/analysis-service";
import { fetchAnalysisDetail } from "@/lib/api/history-service";
import { useAnalysisContext } from "@/contexts/analysis-context";

interface UseResultDataParams {
  source?: string | null;
  analysisId?: string | null;
  onAnalysisLoaded?: (viabilidadeId: number) => void;
}

export function useResultData({ source, analysisId, onAnalysisLoaded }: UseResultDataParams) {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { freshAnalysis, clearFreshAnalysis } = useAnalysisContext();
  const lastParamsRef = useRef<string>('');

  useEffect(() => {
    // Criar uma chave única para os parâmetros atuais
    const currentParams = `${source}-${analysisId}`;
    
    // Se os parâmetros são os mesmos, não recarregar
    if (lastParamsRef.current === currentParams && result !== null) {
      setIsLoading(false);
      return;
    }
    
    lastParamsRef.current = currentParams;

    const loadResult = async () => {
      setIsLoading(true);
      
      try {
        // Caso 1: Análise recém-criada (source=new)
        // Os dados já estão no contexto, não precisa chamar API
        if (source === 'new' && freshAnalysis) {
          console.log('✅ Usando análise recém-criada do contexto');
          setResult(freshAnalysis);
          
          // Notificar o componente pai sobre o ID da análise para atualizar a URL
          if (freshAnalysis.viabilidadeId && onAnalysisLoaded) {
            onAnalysisLoaded(freshAnalysis.viabilidadeId);
          }
          
          clearFreshAnalysis();
          return;
        }

        // Caso 2: Acessando do histórico (analysisId é numérico)
        // Precisa buscar os dados da API
        if (analysisId) {
          const numericId = parseInt(analysisId);
          
          if (!isNaN(numericId)) {
            console.log('📡 Buscando análise do histórico:', numericId);
            const backendDetail = await fetchAnalysisDetail(numericId);
            
            // Converter score de 0-1 para 0-100
            const score = Math.round(backendDetail.resultado.pontuacao * 100);
            
            // Criar companyData a partir dos dados do backend
            const companyData: CompanyData = {
              endereco: backendDetail.localizacao.cep,
              cnae: backendDetail.empresa?.cnae || "",
              isMei: backendDetail.empresa?.isMei || false,
              naturezaJuridica: backendDetail.empresa?.naturezaJuridica || 0,
              qualificacaoDoResponsavel: backendDetail.empresa?.qualificacaoDoResponsavel || 0,
              capitalInicial: backendDetail.empresa?.capitalInicial || 0,
              rua: backendDetail.localizacao.rua,
              bairro: backendDetail.localizacao.bairro,
              cidade: backendDetail.localizacao.cidade,
              uf: backendDetail.localizacao.uf,
            };

            const locationDetails = {
              cep: backendDetail.localizacao.cep,
              rua: backendDetail.localizacao.rua,
              bairro: backendDetail.localizacao.bairro,
              cidade: backendDetail.localizacao.cidade,
              uf: backendDetail.localizacao.uf,
              latitude: backendDetail.localizacao.latitude,
              longitude: backendDetail.localizacao.longitude,
            };

            const analysisResult = createAnalysisResult(
              score,
              companyData,
              backendDetail.data_analise,
              backendDetail.viabilidade_id,
              locationDetails
            );

            setResult(analysisResult);
            return;
          }
        }

        // Caso 3: Nenhum dado disponível
        throw new Error('Dados da análise não encontrados');
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        console.error('❌ Erro ao carregar resultado:', errorMessage);
        toast.error(`Erro ao carregar resultado: ${errorMessage}`);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [source, analysisId, freshAnalysis, clearFreshAnalysis, onAnalysisLoaded, result]);

  return { result, isLoading, error };
}
