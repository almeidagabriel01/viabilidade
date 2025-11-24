"use client";

import { User } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import type { UserProfile } from "../../types/profile";

interface PersonalInfoTabProps {
  user: UserProfile;
}

export function PersonalInfoTab({
  user,
}: PersonalInfoTabProps) {
  return (
    <AdvancedCard hover={false}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 pt-2 sm:pt-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Informações Pessoais
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome Completo
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg break-words">
              {user.nome}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg break-all">
              {user.email}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Telefone
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {user.telefone || "Não informado"}
            </div>
          </div>
        </div>
      </CardContent>
    </AdvancedCard>
  );
}
