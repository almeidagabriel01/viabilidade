"use client";

import { useState } from "react";
import { Building2, MapPin, FileCheck } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { Form } from "@/components/ui/form";
import { useCompanyForm } from "@/hooks/use-company-form";
import { CompanyFormData } from "@/lib/validations/company-form";
import { motion, AnimatePresence } from "framer-motion";
import { Control } from "react-hook-form";

// Componentes separados
import { StepIndicator } from "./step-indicator";
import { LocationStep } from "./location-step";
import { CompanyDataStep } from "./company-data-step";
import { FinalizationStep } from "./finalization-step";
import { StepNavigation } from "./step-navigation";

const steps = [
  {
    id: 1,
    title: "Localização",
    description: "Informações sobre a localização da empresa",
    icon: MapPin
  },
  {
    id: 2,
    title: "Dados da Empresa", 
    description: "Informações sobre a empresa e negócio",
    icon: Building2
  },
  {
    id: 3,
    title: "Finalização",
    description: "Revisão e envio dos dados",
    icon: FileCheck
  }
];

export function CompanyForm() {
  const { form, onSubmit, isLoading } = useCompanyForm();
  const [currentStep, setCurrentStep] = useState(1);

  // Watch all form values to trigger re-renders when they change
  const watchedValues = form.watch();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formData = form.getValues();
    await onSubmit(formData as unknown as CompanyFormData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        const hasRequiredFields = !!(
          watchedValues.endereco?.trim() && 
          watchedValues.rua?.trim() && 
          watchedValues.numero?.trim() && 
          watchedValues.bairro?.trim() && 
          watchedValues.cidade?.trim() && 
          watchedValues.uf?.trim()
        );
        return hasRequiredFields;
      }
      case 2: {
        const hasRequiredFields = !!(
          watchedValues.cnae?.trim() && 
          watchedValues.capitalInicial && watchedValues.capitalInicial > 0
        );
        return hasRequiredFields;
      }
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LocationStep 
            control={form.control as unknown as Control<CompanyFormData>} 
            setValue={form.setValue}
            cepValue={form.watch('endereco') || ''}
          />
        );
      case 2:
        return <CompanyDataStep control={form.control as unknown as Control<CompanyFormData>} />;
      case 3:
        return <FinalizationStep watch={form.watch} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AdvancedCard className="shadow-2xl" hover={false}>
        <CardHeader className="pb-6 pt-8">
          <CardTitle className="flex items-center justify-center space-x-3 text-xl md:text-2xl">
            <div className="flex items-center justify-center">
              <Building2 className="h-7 w-7 md:h-8 md:w-8 text-blue-500" />
            </div>
            <span className="text-center">Análise de Viabilidade Empresarial</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data as unknown as CompanyFormData))} className="space-y-6">
              {/* Step Indicator */}
              <StepIndicator steps={steps} currentStep={currentStep} />

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {renderCurrentStep()}
              </AnimatePresence>

              {/* Navigation */}
              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                isLoading={isLoading}
                onPrevious={previousStep}
                onNext={nextStep}
                onSubmit={handleSubmit}
                canProceed={canProceed()}
              />
            </form>
          </Form>
        </CardContent>
      </AdvancedCard>
    </motion.div>
  );
}
