"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input, PasswordInput } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter no mínimo 2 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    company: z
      .string()
      .min(2, "Nome da empresa deve ter no mínimo 2 caracteres")
      .max(100, "Nome da empresa deve ter no máximo 100 caracteres"),
    phone: z
      .string()
      .min(14, "Telefone deve estar no formato (XX)XXXX-XXXX ou (XX)XXXXX-XXXX")
      .regex(/^\(\d{2}\)\d{4,5}-\d{4}$/, "Telefone deve estar no formato (XX)XXXX-XXXX ou (XX)XXXXX-XXXX"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

// Função para formatar telefone
const formatPhone = (value: string) => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11);
  
  // Aplica a máscara
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 2)})${limited.slice(2)}`;
  } else if (limited.length <= 10) {
    return `(${limited.slice(0, 2)})${limited.slice(2, 6)}-${limited.slice(6)}`;
  } else {
    return `(${limited.slice(0, 2)})${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
};

export default function RegisterForm() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Chamar API de registro
      await register({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        password: data.password,
      });

      // Redirecionar será feito automaticamente pelo PublicRoute
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      
      // Mostrar mensagem de erro amigável
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950">
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-950 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-md mx-auto w-full py-12">
          <div className="flex items-center space-x-2 lg:space-x-3 mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl blur-sm opacity-75"></div>
              <div className="relative flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl">
                <Building2 className="h-5 w-5 lg:h-8 lg:w-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-none">
                Viabilidade
              </span>
              <span className="text-[10px] lg:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-[0.1em] lg:tracking-[0.2em] uppercase">
                Business Intelligence
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Criar Conta
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Cadastre-se para começar sua análise de viabilidade
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control as Control<RegisterFormData>}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Nome Completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as Control<RegisterFormData>}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Digite seu email"
                            className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as Control<RegisterFormData>}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Empresa
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome da sua empresa"
                            className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as Control<RegisterFormData>}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Telefone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(11) 99999-9999"
                            className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            {...field}
                            onChange={(e) => {
                              const formatted = formatPhone(e.target.value);
                              field.onChange(formatted);
                            }}
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as Control<RegisterFormData>}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Crie uma senha forte"
                            className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as Control<RegisterFormData>}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Confirmar Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Confirme sua senha"
                            className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Cadastrando...</span>
                    </>
                  ) : (
                    <span>Cadastrar</span>
                  )}
                </button>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Faça login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white dark:border-gray-300 rounded-full"></div>
          <div className="absolute top-32 right-32 w-48 h-48 border-2 border-white dark:border-gray-300 rounded-full"></div>
          <div className="absolute top-44 right-44 w-32 h-32 border-2 border-white dark:border-gray-300 rounded-full"></div>
          <div className="absolute top-56 right-56 w-16 h-16 border-2 border-white dark:border-gray-300 rounded-full"></div>
        </div>

        <div className="flex flex-col justify-center items-center text-white p-12 relative w-full">
          <div className="max-w-md text-center">
            <h3 className="text-3xl font-bold mb-6 text-white dark:text-gray-100">
              Comece Agora Mesmo
            </h3>
            <p className="text-blue-100 dark:text-blue-100 text-lg mb-8 leading-relaxed">
              Crie sua conta e tenha acesso completo ao nosso sistema de análise de viabilidade empresarial.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 opacity-30 dark:opacity-20">
          <svg
            width="400"
            height="280"
            viewBox="0 0 400 280"
            className="text-white dark:text-gray-300 h-full"
          >
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="400" height="280" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
