// components/ProfileContent.tsx (Componente Principal Corrigido)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, FileText, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UserProfile } from "@/types/profile";
import { ProfileHeader } from "./profile-header";
import { PersonalInfoTab } from "./personal-info-tab";
import { AnalysesTab } from "./analysis-tab";
import { StatsTab } from "./stats-tab";
import { useAnalyses } from "@/hooks/use-analyses";

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


export function ProfileContent() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const { analyses, isLoading: analysesLoading } = useAnalyses();
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
            <AnalysesTab analyses={analyses} isLoading={analysesLoading} />
          </TabsContent>

          {/* Aba de Estatísticas */}
          <TabsContent value="stats">
            <StatsTab analyses={analyses} isLoading={analysesLoading} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
