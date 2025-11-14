"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";
import MainLayout from "@/components/layout/main-layout";
import { PageTransition } from "@/components/layout/page-transition";
import { LoadingState } from "@/components/result/loading-state";
import { ResultHeader } from "@/components/result/result-header";
import { MainResultCard } from "@/components/result/main-result-card";
import { DetailsRecommendations } from "@/components/result/details-recommendations";
import { CompanyDataSummary } from "@/components/result/company-data-summary";
import { ActionButtons } from "@/components/result/action-buttons";
import { useResultData } from "@/hooks/use-result-data";
import { ProtectedRoute } from "@/components/auth/protected-route";

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const { result, isLoading } = useResultData(analysisId || undefined);

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
            <MainResultCard result={result} />
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

