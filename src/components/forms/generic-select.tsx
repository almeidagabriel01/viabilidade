"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
    value: string;
    label: string;
}

interface GenericSelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export function GenericSelect({
    value,
    onValueChange,
    options,
    placeholder,
    className
}: GenericSelectProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    // Fechar dropdown quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (newValue: string) => {
        onValueChange?.(newValue);
        setOpen(false);
    };

    const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        onValueChange?.("");
    };

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* Trigger Button */}
            <div
                onClick={() => setOpen(!open)}
                className={cn(
                    "w-full max-w-full h-14 px-4 text-left font-normal bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 cursor-pointer rounded-2xl transition-all duration-300 focus:shadow-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:outline-none flex items-center overflow-hidden",
                    !value && "text-gray-500 dark:text-gray-400",
                    open && "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10 dark:ring-blue-400/10"
                )}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen(!open);
                    }
                }}
            >
                <div className="flex items-center justify-between w-full gap-2">
                    <div className="grid flex-1 text-left min-w-0">
                        {selectedOption ? (
                            <span className="text-base text-gray-900 dark:text-gray-100 font-medium truncate">
                                {selectedOption.label}
                            </span>
                        ) : (
                            <span className="text-base text-gray-500 dark:text-gray-400 truncate">
                                {placeholder || "Selecione..."}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                        {value && (
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
                        )}
                        <ChevronsUpDown className={cn(
                            "h-5 w-5 text-gray-400 transition-transform duration-200",
                            open && "rotate-180"
                        )} />
                    </div>
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-[9999] max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={cn(
                                "w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer",
                                value === option.value && "bg-blue-50 dark:bg-blue-900/20"
                            )}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSelect(option.value);
                                }
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-base",
                                    value === option.value ? "font-semibold text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                                )}>
                                    {option.label}
                                </span>
                                {value === option.value && (
                                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
