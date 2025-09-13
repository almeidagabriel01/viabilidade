"use client";

import { FileText, Building2 } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import type { Analysis } from "../../types/profile";
import { AnalysisCard } from "./analysis-card";

interface AnalysesTabProps {
  analyses: Analysis[];
}

export function AnalysesTab({ analyses }: AnalysesTabProps) {
  return (
    <AdvancedCard hover={false}>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span className="text-lg sm:text-xl">Minhas Análises</span>
          </div>
          <Badge variant="secondary" className="self-start sm:ml-auto">
            {analyses.length} análises
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {analyses.length > 0 ? (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <Building2 className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Nenhuma análise encontrada
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 px-4">
              Comece criando sua primeira análise de viabilidade
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Building2 className="h-4 w-4 mr-2" />
              Nova Análise
            </Button>
          </div>
        )}
      </CardContent>
    </AdvancedCard>
  );
}
