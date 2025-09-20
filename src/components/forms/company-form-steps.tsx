"use client";

import { useState } from "react";
import { Building2, MapPin, DollarSign, FileCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AdvancedButton } from "@/components/ui/advanced-button";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { AdvancedInput } from "@/components/ui/advanced-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCompanyForm } from "@/hooks/use-company-form";
import { CompanyFormData } from "@/lib/validations/company-form";
import { MaskedInput } from "./masked-input";
import { CNAESelect } from "./cnae-select";
import { Control } from "react-hook-form";

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

  const handleCEPChange = async (cep: string) => {
    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          // Preenche os campos automaticamente
          form.setValue('rua', data.logradouro || '');
          form.setValue('bairro', data.bairro || '');
          form.setValue('cidade', data.localidade || '');
          form.setValue('uf', data.uf || '');
        }
      } catch {
        // Silently handle error
      }
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* CEP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control as Control<CompanyFormData>}
                name="endereco"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center space-x-3 text-base font-semibold text-gray-700 dark:text-gray-300">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>CEP</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <MaskedInput
                          mask="00000-000"
                          placeholder="00000-000"
                          className="w-full h-12 pl-10 pr-4 text-base bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10"
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(e);
                            handleCEPChange(e.target.value);
                          }}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                      Digite o CEP e o endereço será preenchido automaticamente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Endereço completo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6">
                <FormField
                  control={form.control as Control<CompanyFormData>}
                  name="rua"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        Rua/Logradouro
                      </FormLabel>
                      <FormControl>
                        <AdvancedInput
                          placeholder="Ex: Rua das Flores"
                          className="h-12 text-base"
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-3">
                <FormField
                  control={form.control as Control<CompanyFormData>}
                  name="numero"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        Número
                      </FormLabel>
                      <FormControl>
                        <AdvancedInput
                          placeholder="123"
                          className="h-12 text-base"
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-3">
                <FormField
                  control={form.control as Control<CompanyFormData>}
                  name="complemento"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        Complemento
                      </FormLabel>
                      <FormControl>
                        <AdvancedInput
                          placeholder="Apto 101"
                          className="h-12 text-base"
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Bairro, Cidade, UF */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <FormField
                  control={form.control as Control<CompanyFormData>}
                  name="bairro"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        Bairro
                      </FormLabel>
                      <FormControl>
                        <AdvancedInput
                          placeholder="Centro"
                          className="h-12 text-base"
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-6">
                <FormField
                  control={form.control as Control<CompanyFormData>}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        Cidade
                      </FormLabel>
                      <FormControl>
                        <AdvancedInput
                          placeholder="São Paulo"
                          className="h-12 text-base"
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-2">
                <FormField
                  control={form.control as Control<CompanyFormData>}
                  name="uf"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        UF
                      </FormLabel>
                      <FormControl>
                        <AdvancedInput
                          placeholder="SP"
                          className="h-12 text-base uppercase"
                          maxLength={2}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* CNAE */}
            <FormField
              control={form.control as Control<CompanyFormData>}
              name="cnae"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center space-x-3 text-base font-semibold text-gray-700 dark:text-gray-300">
                    <FileCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>CNAE</span>
                  </FormLabel>
                  <FormControl>
                    <div className="h-12">
                      <CNAESelect
                        value={field.value || ''}
                        onValueChange={field.onChange}
                        placeholder="Busque pelo código ou descrição"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Atividade econômica principal da empresa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MEI */}
            <FormField
              control={form.control as Control<CompanyFormData>}
              name="isMei"
              render={({ field }) => (
                <FormItem className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                  <div className="flex flex-row items-start space-x-4 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-blue-300 dark:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-lg transition-all duration-300 mt-1 sm:mt-0 shrink-0"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1 min-w-0">
                      <FormLabel className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 cursor-pointer block">
                        Microempreendedor Individual (MEI)
                      </FormLabel>
                      <FormDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Marque se a empresa será registrada como MEI
                      </FormDescription>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Capital Inicial */}
            <div className="space-y-4">
              <FormField
                control={form.control as Control<CompanyFormData>}
                name="capitalInicial"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center space-x-3 text-base font-semibold text-gray-700 dark:text-gray-300">
                      <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Capital Inicial (R$)</span>
                    </FormLabel>
                    <FormControl>
                      <AdvancedInput
                        type="number"
                        min={0.01}
                        step={0.01}
                        placeholder="10.000,00"
                        icon={<DollarSign className="h-4 w-4" />}
                        className="h-12 text-base"
                        value={field.value || 0}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                      Valor do capital inicial disponível para investimento
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Revisão dos Dados
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Revise todas as informações antes de enviar para análise de viabilidade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Localização:</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {form.watch('endereco')} - {form.watch('rua')}, {form.watch('numero')}
                    {form.watch('complemento') && `, ${form.watch('complemento')}`}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {form.watch('bairro')} - {form.watch('cidade')}/{form.watch('uf')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Empresa:</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    CNAE: {form.watch('cnae')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tipo: {form.watch('isMei') ? 'MEI' : 'Empresa'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Capital: R$ {form.watch('capitalInicial')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCompleted 
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${isActive || isCompleted ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-24 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-all duration-300
                  ${isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      <AdvancedCard 
        hover={false} 
        glow={false} 
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-0 shadow-xl"
      >
        <CardHeader className="pb-6 pt-6">
          <CardTitle className="flex items-center justify-center space-x-3 text-xl">
            <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>{steps[currentStep - 1]?.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data as unknown as CompanyFormData))} className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <span>Próximo</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <AdvancedButton
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    size="lg"
                    className="flex items-center space-x-2 min-w-[200px] h-12"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Analisando...</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="h-5 w-5" />
                        <span>Analisar Viabilidade</span>
                      </>
                    )}
                  </AdvancedButton>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </AdvancedCard>
    </div>
  );
}
