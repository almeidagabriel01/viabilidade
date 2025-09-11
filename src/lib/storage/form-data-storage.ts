import { CompanyData } from "@/types/company";

const STORAGE_KEY = 'viability_form_data';

export function storeFormData(data: CompanyData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao armazenar dados do formulário:', error);
  }
}

export function getFormData(): CompanyData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as CompanyData;
    }
  } catch (error) {
    console.error('Erro ao recuperar dados do formulário:', error);
  }
  return null;
}

export function clearFormData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar dados do formulário:', error);
  }
}
