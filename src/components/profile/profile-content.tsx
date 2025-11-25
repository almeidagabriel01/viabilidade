// components/ProfileContent.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, FileText, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UserProfile } from "@/types/profile";
import { ProfileHeader } from "./profile-header";
import { PersonalInfoTab } from "./personal-info-tab";
import { AnalysesTab } from "./analysis-tab";
import { StatsTab } from "./stats-tab";
import { useAnalyses } from "@/hooks/use-analyses";
import { useAuth } from "@/contexts/auth-context";
import { fetchUserData } from "@/lib/api/user-service";

export function ProfileContent() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserProfile>({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    dataCadastro: "",
    ultimoAcesso: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      if (authUser?.id) {
        // Tentar buscar dados completos do backend
        const backendUser = await fetchUserData(authUser.id);

        if (!isMounted) return;

        if (backendUser) {
          setUser({
            id: String(backendUser.id),
            nome: backendUser.name,
            email: backendUser.email,
            telefone: backendUser.phone || "(11) 99999-9999",
            dataCadastro: backendUser.data_criacao ? backendUser.data_criacao.split('T')[0] : new Date().toISOString().split('T')[0],
            ultimoAcesso: new Date().toISOString().split('T')[0],
          });
        } else {
          // Fallback para dados do auth context
          setUser({
            id: authUser.id,
            nome: authUser.name,
            email: authUser.email,
            telefone: "(11) 99999-9999",
            dataCadastro: new Date().toISOString().split('T')[0],
            ultimoAcesso: new Date().toISOString().split('T')[0],
          });
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [authUser?.id, authUser?.name, authUser?.email]);

  const { analyses, isLoading: analysesLoading, deleteAnalysis } = useAnalyses();
  const [activeTab, setActiveTab] = useState<string>("info");

  const handleDeleteAnalysis = async (id: string) => {
    await deleteAnalysis(id);
  };

  return (
    <div className="w-full mx-auto space-y-4 p-4 sm:p-6 lg:p-8">
      <ProfileHeader user={user} />

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
            <PersonalInfoTab user={user} />
          </TabsContent>

          {/* Aba de Análises */}
          <TabsContent value="analyses">
            <AnalysesTab
              analyses={analyses}
              isLoading={analysesLoading}
              onDelete={handleDeleteAnalysis}
            />
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
