import { z } from "zod";

export const companyFormSchema = z.object({
  endereco: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000"),
  
  rua: z
    .string()
    .min(1, "Rua é obrigatória"),
    
  numero: z
    .string()
    .min(1, "Número é obrigatório"),
    
  complemento: z
    .string()
    .optional(),
    
  bairro: z
    .string()
    .min(1, "Bairro é obrigatório"),
    
  cidade: z
    .string()
    .min(1, "Cidade é obrigatória"),
    
  uf: z
    .string()
    .length(2, "UF deve ter 2 caracteres")
    .regex(/^[A-Z]{2}$/, "UF deve conter apenas letras maiúsculas"),
  
  cnae: z
    .string()
    .min(1, "CNAE é obrigatório")
    .regex(/^\d{4}-\d{1}\/\d{2}$/, "CNAE deve ter o formato 0000-0/00"),
  
  isMei: z.boolean(),
  
  capitalInicial: z
    .number()
    .min(0.01, "Capital inicial deve ser maior que zero")
    .max(1000000000, "Capital inicial muito alto")
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
