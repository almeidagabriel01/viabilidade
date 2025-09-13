"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  FileText,
  Building2,
  Settings,
  Calendar,
  Edit3,
  Save,
  X,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";

import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Tipos baseados no que foi visto nos códigos
interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  dataCadastro: string;
  ultimoAcesso: string;
}

interface Analysis {
  id: string;
  titulo: string;
  cnae: string;
  endereco: string;
  cidade: string;
  uf: string;
  status: "completa" | "incompleta" | "processando";
  score?: number;
  dataAnalise: string;
  dataAtualizacao: string;
  dadosCompletos: boolean;
}

// Mock data - em um projeto real, viriam da API
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
  const [analyses] = useState<Analysis[]>(mockAnalyses);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(mockUser);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser(user); // Reset changes
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    //chamada à API para salvar os dados
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status: Analysis["status"]) => {
    switch (status) {
      case "completa":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "incompleta":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800";
      case "processando":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const getStatusIcon = (status: Analysis["status"]) => {
    switch (status) {
      case "completa":
        return <CheckCircle className="h-4 w-4" />;
      case "incompleta":
        return <AlertCircle className="h-4 w-4" />;
      case "processando":
        return <Clock className="h-4 w-4 animate-spin" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: Analysis["status"]) => {
    switch (status) {
      case "completa":
        return "Completa";
      case "incompleta":
        return "Incompleta";
      case "processando":
        return "Processando";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Header do Perfil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AdvancedCard
          hover={false}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 p-4"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {user.nome}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Membro desde{" "}
                        {new Date(user.dataCadastro).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        Último acesso:{" "}
                        {new Date(user.ultimoAcesso).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleEditToggle}
                variant={isEditing ? "secondary" : "outline"}
                className="flex items-center space-x-2"
              >
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Edit3 className="h-4 w-4" />
                )}
                <span>{isEditing ? "Cancelar" : "Editar Perfil"}</span>
              </Button>
            </div>
          </CardContent>
        </AdvancedCard>
      </motion.div>

      {/* Abas do Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Informações</span>
            </TabsTrigger>
            <TabsTrigger
              value="analyses"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Análises</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Estatísticas</span>
            </TabsTrigger>
          </TabsList>

          {/* Aba de Informações Pessoais */}
          <TabsContent value="info">
            <AdvancedCard hover={false}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 pt-4">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Informações Pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nome Completo
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedUser.nome}
                        onChange={(e) =>
                          handleInputChange("nome", e.target.value)
                        }
                        placeholder="Digite seu nome"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Digite seu email"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
                        onChange={(e) =>
                          handleInputChange("telefone", e.target.value)
                        }
                        placeholder="Digite seu telefone"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
                        onChange={(e) =>
                          handleInputChange("cidade", e.target.value)
                        }
                        placeholder="Digite sua cidade"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
                      onChange={(e) =>
                        handleInputChange("endereco", e.target.value)
                      }
                      placeholder="Digite seu endereço completo"
                      rows={2}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {user.endereco || "Não informado"}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" onClick={handleEditToggle}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </CardContent>
            </AdvancedCard>
          </TabsContent>

          {/* Aba de Análises */}
          <TabsContent value="analyses">
            <AdvancedCard hover={false} className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 pt-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span>Minhas Análises</span>
                  <Badge variant="secondary" className="ml-auto">
                    {analyses.length} análises
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyses.length > 0 ? (
                  <div className="space-y-4">
                    {analyses.map((analysis) => (
                      <motion.div
                        key={analysis.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {analysis.titulo}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`flex items-center space-x-1 ${getStatusColor(
                                  analysis.status
                                )}`}
                              >
                                {getStatusIcon(analysis.status)}
                                <span>{getStatusText(analysis.status)}</span>
                              </Badge>
                              {analysis.score && (
                                <Badge variant="secondary">
                                  Score: {analysis.score}%
                                </Badge>
                              )}
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {analysis.cnae}
                            </p>

                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {analysis.endereco}, {analysis.cidade}/
                                  {analysis.uf}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  Criada em{" "}
                                  {new Date(
                                    analysis.dataAnalise
                                  ).toLocaleDateString("pt-BR")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {analysis.status === "incompleta" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/20"
                              >
                                Continuar
                              </Button>
                            )}
                            {analysis.status === "completa" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/20"
                              >
                                Ver Resultado
                              </Button>
                            )}
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Nenhuma análise encontrada
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                      Comece criando sua primeira análise de viabilidade
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Building2 className="h-4 w-4 mr-2" />
                      Nova Análise
                    </Button>
                  </div>
                )}
              </CardContent>
            </AdvancedCard>
          </TabsContent>

          {/* Aba de Estatísticas */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AdvancedCard>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total de Análises
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {analyses.length}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </AdvancedCard>

              <AdvancedCard>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Completas
                      </p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {analyses.filter((a) => a.status === "completa").length}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </AdvancedCard>

              <AdvancedCard>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Score Médio
                      </p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {analyses.filter((a) => a.score).length > 0
                          ? Math.round(
                              analyses
                                .filter((a) => a.score)
                                .reduce((acc, a) => acc + (a.score || 0), 0) /
                                analyses.filter((a) => a.score).length
                            )
                          : 0}
                        %
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </AdvancedCard>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
