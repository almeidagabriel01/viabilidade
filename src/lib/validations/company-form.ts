import { z } from "zod";

export const companyFormSchema = z.object({
  endereco: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000"),

  // Address fields are optional now as we only collect CEP
  rua: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),

  cnae: z
    .string()
    .min(1, "CNAE é obrigatório")
    .regex(/^\d{4}-\d{1}\/\d{2}$/, "CNAE deve ter o formato 0000-0/00"),

  isMei: z.boolean(),

  naturezaJuridica: z
    .number()
    .min(1, "Natureza Jurídica é obrigatória"),

  qualificacaoDoResponsavel: z
    .number()
    .min(1, "Qualificação do Responsável é obrigatória")
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
