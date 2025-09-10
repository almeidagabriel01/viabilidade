"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AdvancedButton } from "@/components/ui/advanced-button";
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canProceed: boolean;
}

export function StepNavigation({ 
  currentStep, 
  totalSteps, 
  isLoading, 
  onPrevious, 
  onNext, 
  onSubmit,
  canProceed 
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <motion.div
      className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div>
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="flex items-center space-x-2"
            disabled={isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentStep} de {totalSteps}
        </div>
        
        {isLastStep ? (
          <AdvancedButton
            type="button"
            onClick={onSubmit}
            disabled={isLoading || !canProceed}
            className="flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Finalizar Análise</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </AdvancedButton>
        ) : (
          <AdvancedButton
            type="button"
            onClick={onNext}
            disabled={isLoading || !canProceed}
            className="flex items-center space-x-2"
          >
            <span>Próximo</span>
            <ChevronRight className="h-4 w-4" />
          </AdvancedButton>
        )}
      </div>
    </motion.div>
  );
}
