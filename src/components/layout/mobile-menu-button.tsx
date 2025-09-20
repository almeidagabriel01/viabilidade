"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        onClick={toggleMenu}
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          )}
        </motion.div>
      </Button>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] right-0 z-50"
          >
            <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden min-w-[200px]">
              <div className="p-2">
                <Link
                  href="/uso-modelo"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Building2 className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">Análise</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
