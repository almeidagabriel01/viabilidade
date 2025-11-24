"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCnaes, HelperItem } from "@/lib/api/helpers-service";

interface CNAESelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export function CNAESelect({ value, onValueChange, placeholder }: CNAESelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cnaes, setCnaes] = useState<HelperItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadCnaes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCnaes();
        setCnaes(data);
      } catch (error) {
        console.error("Erro ao carregar CNAEs:", error);
        setError("Erro ao carregar opções. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCnaes();
  }, []);

  const selectedOption = cnaes.find(option => option.codigo === value);

  // Filtrar opções baseado no termo de busca
  const filteredOptions = cnaes.filter(option =>
    option.codigo.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus no input quando abrir
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSelect = (codigo: string) => {
    onValueChange?.(codigo);
    setOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onValueChange?.("");
    setSearchTerm("");
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <div
        onClick={() => !isLoading && !error && setOpen(!open)}
        className={cn(
          "w-full max-w-full h-14 px-4 text-left font-normal bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 cursor-pointer rounded-2xl transition-all duration-300 focus:shadow-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:outline-none overflow-hidden",
          !value && "text-gray-500 dark:text-gray-400",
          open && "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10 dark:ring-blue-400/10",
          (isLoading || !!error) && "opacity-50 cursor-not-allowed",
          !!error && "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10"
        )}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isLoading && !error) setOpen(!open);
          }
        }}
      >
        <div className="flex items-center justify-between w-full h-full gap-2">
          {isLoading ? (
            <span className="text-base text-gray-500 dark:text-gray-400 flex items-center h-full truncate flex-1">
              Carregando CNAEs...
            </span>
          ) : error ? (
            <span className="text-base text-red-500 dark:text-red-400 flex items-center h-full truncate flex-1 gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </span>
          ) : selectedOption ? (
            <div className="grid flex-1 text-left">
              <span className="font-semibold text-blue-600 dark:text-blue-400 text-base truncate">
                {selectedOption.codigo}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {selectedOption.descricao}
              </span>
            </div>
          ) : (
            <span className="text-base text-gray-500 dark:text-gray-400 flex items-center h-full truncate flex-1">
              {placeholder || "Selecione um CNAE..."}
            </span>
          )}

          <div className="flex items-center space-x-2 shrink-0">
            {value && !isLoading && !error ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear(e);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClear(e);
                  }
                }}
              >
                <X className="h-4 w-4 text-gray-400" />
              </div>
            ) : null}
            <ChevronsUpDown className={cn(
              "h-5 w-5 text-gray-400 transition-transform duration-200",
              open && "rotate-180"
            )} />
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-[9999] max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar CNAE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <p>Carregando...</p>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>Nenhum CNAE encontrado</p>
                <p className="text-xs mt-1">Tente buscar por um termo diferente</p>
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.codigo}
                  onClick={() => handleSelect(String(option.codigo))}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer",
                    value === String(option.codigo) && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(String(option.codigo));
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1 min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
                          {option.codigo}
                        </span>
                        {value === String(option.codigo) && (
                          <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                        {option.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}