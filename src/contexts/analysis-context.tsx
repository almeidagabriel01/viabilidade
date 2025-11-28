"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AnalysisResponse } from "@/types/company";

interface AnalysisContextType {
  freshAnalysis: AnalysisResponse | null;
  setFreshAnalysis: (analysis: AnalysisResponse | null) => void;
  clearFreshAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [freshAnalysis, setFreshAnalysis] = useState<AnalysisResponse | null>(null);

  const clearFreshAnalysis = () => setFreshAnalysis(null);

  return (
    <AnalysisContext.Provider value={{ freshAnalysis, setFreshAnalysis, clearFreshAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysisContext must be used within an AnalysisProvider");
  }
  return context;
}
