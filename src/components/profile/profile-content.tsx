// components/ProfileContent.tsx (Componente Principal Corrigido)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, FileText, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Analysis, UserProfile } from "@/types/profile";
import { ProfileHeader } from "./profile-header";
import { PersonalInfoTab } from "./personal-info-tab";
import { AnalysesTab } from "./analysis-tab";
import { StatsTab } from "./stats-tab";

const mockUser: UserProfile = {
  id: "1",
  nome: "João Silva",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-9999",
  endereco: "Rua das Flores, 123",
  cidade: "São Paulo",
  uf: "SP",
  dataCadastro: "2024-01-15",
  ultimoAcesso: "2024-12-20",
};

const mockAnalyses: Analysis[] = [
  {
    id: "1",
    titulo: "Padaria Central",
    cnae: "5611-2/01 - Lanchonetes, casas de chá, de sucos",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    uf: "SP",
    status: "completa",
    score: 85,
    dataAnalise: "2024-12-18",
    dataAtualizacao: "2024-12-18",
    dadosCompletos: true,
  },
  {
    id: "2",
    titulo: "Farmácia Popular",
    cnae: "4771-7/01 - Comércio varejista de produtos farmacêuticos",
    endereco: "Rua Augusta, 500",
    cidade: "São Paulo",
    uf: "SP",
    status: "incompleta",
    dataAnalise: "2024-12-15",
    dataAtualizacao: "2024-12-19",
    dadosCompletos: false,
  },
  {
    id: "3",
    titulo: "Mercadinho do Bairro",
    cnae: "4712-1/00 - Comércio varejista de mercadorias em geral",
    endereco: "Rua das Palmeiras, 250",
    cidade: "Campinas",
    uf: "SP",
    status: "processando",
    dataAnalise: "2024-12-20",
    dataAtualizacao: "2024-12-20",
    dadosCompletos: true,
  },
];

export function ProfileContent() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [analyses] = useState(mockAnalyses);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(mockUser);
  const [activeTab, setActiveTab] = useState<string>("info");

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser(user); // Reset changes
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Aqui faria a chamada à API para salvar os dados
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full mx-auto space-y-4 p-4 sm:p-6 lg:p-8">
      <ProfileHeader
        user={user}
        isEditing={isEditing}
        onEditToggle={handleEditToggle}
        showEditButton={activeTab === "info"}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs
          defaultValue="info"
          className="space-y-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="info"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Informações</span>
            </TabsTrigger>
            <TabsTrigger
              value="analyses"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Análises</span>
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Estatísticas</span>
            </TabsTrigger>
          </TabsList>

          {/* Aba de Informações Pessoais */}
          <TabsContent value="info">
            <PersonalInfoTab
              user={user}
              editedUser={editedUser}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleEditToggle}
            />
          </TabsContent>

          {/* Aba de Análises */}
          <TabsContent value="analyses">
            <AnalysesTab analyses={analyses} />
          </TabsContent>

          {/* Aba de Estatísticas */}
          <TabsContent value="stats">
            <StatsTab analyses={analyses} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
