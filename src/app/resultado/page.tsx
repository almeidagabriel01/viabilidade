"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useCallback } from "react";
import MainLayout from "@/components/layout/main-layout";
import { PageTransition } from "@/components/layout/page-transition";
import { LoadingState } from "@/components/result/loading-state";
import { ResultHeader } from "@/components/result/result-header";
import { MapResultContainer } from "@/components/result/map-result-container";
import { DetailsRecommendations } from "@/components/result/details-recommendations";
import { CompanyDataSummary } from "@/components/result/company-data-summary";
import { ActionButtons } from "@/components/result/action-buttons";
import { useResultData } from "@/hooks/use-result-data";
import { ProtectedRoute } from "@/components/auth/protected-route";

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const analysisId = searchParams.get('analysisId');
  
  // Callback para atualizar a URL quando a análise for carregada
  const handleAnalysisLoaded = useCallback((viabilidadeId: number) => {
    // Atualizar a URL sem recarregar a página, substituindo source=new pelo analysisId
    window.history.replaceState(null, '', `/resultado?analysisId=${viabilidadeId}`);
  }, []);
  
  const { result, isLoading } = useResultData({ source, analysisId, onAnalysisLoaded: handleAnalysisLoaded });

  const handleNewAnalysis = () => {
    router.push('/uso-modelo');
  };

  const handleBackToForm = () => {
    router.push('/uso-modelo');
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!result) return null;

  return (
    <MainLayout>
      <PageTransition>
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ResultHeader result={result} onBackToForm={handleBackToForm} />
            <MapResultContainer result={result} />
            <DetailsRecommendations result={result} />
            <CompanyDataSummary result={result} />
            <ActionButtons result={result} onNewAnalysis={handleNewAnalysis} />
          </motion.div>
        </div>
      </PageTransition>
    </MainLayout>
  );
}

export default function ResultPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingState />}>
        <ResultPageContent />
      </Suspense>
    </ProtectedRoute>
  );
}

