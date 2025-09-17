"use client";

import { User, Save } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import type { UserProfile } from "../../types/profile";

interface PersonalInfoTabProps {
  user: UserProfile;
  editedUser: UserProfile;
  isEditing: boolean;
  onInputChange: (field: keyof UserProfile, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function PersonalInfoTab({
  user,
  editedUser,
  isEditing,
  onInputChange,
  onSave,
  onCancel,
}: PersonalInfoTabProps) {
  return (
    <AdvancedCard hover={false}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 pt-2 sm:pt-4">
          <User className="h-5 w-5 text-blue-500" />
          <span className="text-lg sm:text-xl">Informações Pessoais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome Completo
            </label>
            {isEditing ? (
              <Input
                value={editedUser.nome}
                onChange={(e) => onInputChange("nome", e.target.value)}
                placeholder="Digite seu nome"
                className="h-12 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg break-words">
                {user.nome}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={editedUser.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                placeholder="Digite seu email"
                className="h-12 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg break-all">
                {user.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Telefone
            </label>
            {isEditing ? (
              <Input
                value={editedUser.telefone || ""}
                onChange={(e) => onInputChange("telefone", e.target.value)}
                placeholder="Digite seu telefone"
                className="h-12 text-lg p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {user.telefone || "Não informado"}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cidade
            </label>
            {isEditing ? (
              <Input
                value={editedUser.cidade || ""}
                onChange={(e) => onInputChange("cidade", e.target.value)}
                placeholder="Digite sua cidade"
                className="h-12 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 text-2xl"
              />
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-base">
                {user.cidade || "Não informado"}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Endereço
          </label>
          {isEditing ? (
            <Textarea
              value={editedUser.endereco || ""}
              onChange={(e) => onInputChange("endereco", e.target.value)}
              placeholder="Digite seu endereço completo"
              className="h-12 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700"
              rows={2}
            />
          ) : (
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg break-words">
              {user.endereco || "Não informado"}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={onSave}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto dark:text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        )}
      </CardContent>
    </AdvancedCard>
  );
}
