"use client";

import { motion } from "framer-motion";
import { User, Calendar, Clock, Edit3, X } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "../../types/profile";

interface ProfileHeaderProps {
  user: UserProfile;
  isEditing: boolean;
  onEditToggle: () => void;
  showEditButton: boolean;
}

export function ProfileHeader({
  user,
  isEditing,
  onEditToggle,
  showEditButton,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AdvancedCard
        hover={false}
        className="mt-16 lg:mt-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
      >
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  {user.nome}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">
                      Membro desde{" "}
                      {new Date(user.dataCadastro).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">
                      Último acesso:{" "}
                      {new Date(user.ultimoAcesso).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {showEditButton && (
              <Button
                onClick={onEditToggle}
                variant={isEditing ? "secondary" : "outline"}
                className="flex items-center space-x-2 w-full sm:w-auto"
                size="sm"
              >
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Edit3 className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isEditing ? "Cancelar" : "Editar Perfil"}
                </span>
                <span className="sm:hidden">
                  {isEditing ? "Cancelar" : "Editar"}
                </span>
              </Button>
            )}
          </div>
        </CardContent>
      </AdvancedCard>
    </motion.div>
  );
}
