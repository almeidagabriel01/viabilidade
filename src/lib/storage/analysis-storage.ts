import { Analysis } from "@/types/profile";
import { CompanyData } from "@/types/company";

const ANALYSES_STORAGE_KEY = 'viability_analyses';
const CURRENT_ANALYSIS_STORAGE_KEY = 'current_analysis_id';

// Sistema de callbacks para notificar mudanças
type AnalysisChangeCallback = (analyses: Analysis[]) => void;
let changeCallbacks: AnalysisChangeCallback[] = [];

export function subscribeToAnalysisChanges(callback: AnalysisChangeCallback) {
  changeCallbacks.push(callback);
  return () => {
    changeCallbacks = changeCallbacks.filter(cb => cb !== callback);
  };
}

function notifyChanges() {
  const analyses = getAnalyses();
  changeCallbacks.forEach(callback => callback(analyses));
}

export function storeAnalysis(analysis: Analysis): void {
  try {
    const existingAnalyses = getAnalyses();
    const updatedAnalyses = existingAnalyses.filter(a => a.id !== analysis.id);
    updatedAnalyses.push(analysis);
    localStorage.setItem(ANALYSES_STORAGE_KEY, JSON.stringify(updatedAnalyses));
    notifyChanges();
  } catch (error) {
    console.error('Erro ao armazenar análise:', error);
  }
}

export function getAnalyses(): Analysis[] {
  try {
    const stored = localStorage.getItem(ANALYSES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Analysis[];
    }
  } catch (error) {
    console.error('Erro ao recuperar análises:', error);
  }
  return [];
}

export function getAnalysisById(id: string): Analysis | null {
  try {
    const analyses = getAnalyses();
    return analyses.find(analysis => analysis.id === id) || null;
  } catch (error) {
    console.error('Erro ao recuperar análise por ID:', error);
    return null;
  }
}

export function deleteAnalysis(id: string): void {
  try {
    const analyses = getAnalyses();
    const updatedAnalyses = analyses.filter(analysis => analysis.id !== id);
    localStorage.setItem(ANALYSES_STORAGE_KEY, JSON.stringify(updatedAnalyses));
    notifyChanges();
  } catch (error) {
    console.error('Erro ao deletar análise:', error);
  }
}

export function setCurrentAnalysisId(id: string): void {
  try {
    localStorage.setItem(CURRENT_ANALYSIS_STORAGE_KEY, id);
  } catch (error) {
    console.error('Erro ao definir análise atual:', error);
  }
}

export function getCurrentAnalysisId(): string | null {
  try {
    return localStorage.getItem(CURRENT_ANALYSIS_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao recuperar ID da análise atual:', error);
    return null;
  }
}

export function clearCurrentAnalysisId(): void {
  try {
    localStorage.removeItem(CURRENT_ANALYSIS_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar ID da análise atual:', error);
  }
}

export function createAnalysisFromCompanyData(companyData: CompanyData, analysisId: string): Analysis {
  return {
    id: analysisId,
    titulo: `${companyData.rua}, ${companyData.numero}`,
    cnae: companyData.cnae,
    endereco: `${companyData.rua}, ${companyData.numero}${companyData.complemento ? `, ${companyData.complemento}` : ''}`,
    cidade: companyData.cidade || "",
    uf: companyData.uf || "",
    status: "incompleta",
    dataAnalise: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),
    dadosCompletos: false,
  };
}
