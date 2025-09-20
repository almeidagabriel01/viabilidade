"use client";

import { FileText, CheckCircle, Building2 } from "lucide-react";
import type { Analysis } from "../../types/profile";
import { StatCard } from "./stat-card";

interface StatsTabProps {
  analyses: Analysis[];
  isLoading?: boolean;
}

export function StatsTab({ analyses, isLoading = false }: StatsTabProps) {
  const completedAnalyses = analyses.filter(
    (a) => a.status === "completa"
  ).length;
  const averageScore =
    analyses.filter((a) => a.score).length > 0
      ? Math.round(
          analyses
            .filter((a) => a.score)
            .reduce((acc, a) => acc + (a.score || 0), 0) /
            analyses.filter((a) => a.score).length
        )
      : 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <StatCard
        title="Total de Análises"
        value={analyses.length}
        icon={
          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
        }
        colorClass="text-gray-900 dark:text-gray-100"
      />

      <StatCard
        title="Completas"
        value={completedAnalyses}
        icon={
          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
        }
        colorClass="text-green-600 dark:text-green-400"
      />

      <StatCard
        title="Score Médio"
        value={`${averageScore}%`}
        icon={
          <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
        }
        colorClass="text-orange-600 dark:text-orange-400"
      />
    </div>
  );
}
