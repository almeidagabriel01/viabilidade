"use client";

import { CardContent } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  colorClass: string;
}

export function StatCard({ title, value, icon, colorClass }: StatCardProps) {
  return (
    <AdvancedCard>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {title}
            </p>
            <p className={`text-xl sm:text-2xl font-bold ${colorClass}`}>
              {value}
            </p>
          </div>
          <div
            className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              colorClass.includes("blue")
                ? "bg-blue-100 dark:bg-blue-900/20"
                : colorClass.includes("green")
                ? "bg-green-100 dark:bg-green-900/50"
                : colorClass.includes("orange")
                ? "bg-orange-100 dark:bg-orange-900/50"
                : "bg-gray-100 dark:bg-gray-700/50"
            }`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </AdvancedCard>
  );
}
