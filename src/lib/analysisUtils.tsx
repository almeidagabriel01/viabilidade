import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import type { Analysis } from "../types/profile";

export const getStatusColor = (status: Analysis["status"]) => {
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

export const getStatusIcon = (status: Analysis["status"]) => {
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

export const getStatusText = (status: Analysis["status"]) => {
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
