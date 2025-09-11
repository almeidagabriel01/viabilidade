"use client";

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

const loginFormSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
    ),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Implementar chamada para API
      // const result = await analyzeViability(data);
      console.log("Form data:", data);

      // Por enquanto, apenas log dos dados
      alert(
        "Formulário enviado com sucesso! Verifique o console para ver os dados."
      );
    } catch {
      alert("Erro ao enviar formulário. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-md mx-auto w-full">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo</h2>
            <p className="text-gray-600">
              Entre na sua conta para continuar sua análise de viabilidade
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data as unknown as LoginFormData)
              )}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control as Control<LoginFormData>}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu email"
                            className="h-12 text-base bg-gray-50"
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as Control<LoginFormData>}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-blue-900 dark:text-gray-300">
                          Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Digite sua senha"
                            className="h-12 text-base bg-gray-50"
                            value={field.value || ""}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Entrar
                </button>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <a
                href="/cadastro"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-32 w-48 h-48 border-2 border-white rounded-full"></div>
          <div className="absolute top-44 right-44 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-56 right-56 w-16 h-16 border-2 border-white rounded-full"></div>
        </div>

        <div className="flex flex-col justify-center items-center text-white p-12 relative w-full">
          <div className="max-w-md text-center">
            <h3 className="text-3xl font-bold mb-6">
              Descubra a Viabilidade da Sua Empresa
            </h3>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Sistema inteligente que analisa a viabilidade de instalação da sua
              empresa considerando fatores demográficos, econômicos e de
              mercado.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 opacity-30">
          <svg
            width="400"
            height="280"
            viewBox="0 0 400 280"
            className="text-white h-full"
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
};

export default LoginForm;
