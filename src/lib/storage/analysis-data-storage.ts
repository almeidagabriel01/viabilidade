import { CompanyData } from "@/types/company";

const ANALYSIS_DATA_STORAGE_KEY = 'viability_analysis_data';

export function storeAnalysisData(analysisId: string, companyData: CompanyData): void {
  try {
    const existingData = getAnalysisData();
    existingData[analysisId] = companyData;
    localStorage.setItem(ANALYSIS_DATA_STORAGE_KEY, JSON.stringify(existingData));
  } catch (error) {
    console.error('Erro ao armazenar dados da análise:', error);
  }
}

export function getAnalysisData(): Record<string, CompanyData> {
  try {
    const stored = localStorage.getItem(ANALYSIS_DATA_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Record<string, CompanyData>;
    }
  } catch (error) {
    console.error('Erro ao recuperar dados das análises:', error);
  }
  return {};
}

export function getAnalysisDataById(analysisId: string): CompanyData | null {
  try {
    const allData = getAnalysisData();
    return allData[analysisId] || null;
  } catch (error) {
    console.error('Erro ao recuperar dados da análise por ID:', error);
    return null;
  }
}

export function deleteAnalysisData(analysisId: string): void {
  try {
    const existingData = getAnalysisData();
    delete existingData[analysisId];
    localStorage.setItem(ANALYSIS_DATA_STORAGE_KEY, JSON.stringify(existingData));
  } catch (error) {
    console.error('Erro ao deletar dados da análise:', error);
  }
}
