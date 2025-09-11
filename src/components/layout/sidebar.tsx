"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Home, 
  Building2,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Uso do Modelo",
    icon: Building2,
    href: "/uso-modelo",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  const toggleDesktop = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkIsDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      
      // Se mudou para mobile, feche o menu desktop
      if (!desktop && isDesktopCollapsed) {
        setIsDesktopCollapsed(false);
      }
      
      // Se mudou para desktop, feche o menu mobile
      if (desktop && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, [isDesktopCollapsed, isMobileOpen]);

  // Click outside handler for mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isDesktop &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen && !isDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen, isDesktop]);

  if (!isMounted) {
    return null;
  }

  // Mobile Layout (Navbar horizontal)
  if (!isDesktop) {
    return (
      <>
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm",
            className
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 shadow-md group-hover:scale-110 transition-transform duration-200">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Análise de Viabilidade
                </span>
              </Link>

              {/* Current page indicator */}
              <div className="hidden xs:block">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === '/uso-modelo' && pathname === '/resultado');
                  if (isActive) {
                    const Icon = item.icon;
                    return (
                      <div key={item.href} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-sm font-medium">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Right section with Theme Toggle and Mobile Menu */}
              <div className="flex items-center space-x-3">
                <ThemeToggle />

                {/* Mobile menu button */}
                <div className="relative">
                  <Button
                    ref={buttonRef}
                    variant="outline"
                    size="icon"
                    onClick={toggleMobile}
                    className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                    aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={isMobileOpen}
                  >
                    <motion.div
                      animate={{ rotate: isMobileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileOpen ? (
                        <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      ) : (
                        <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      )}
                    </motion.div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[calc(4rem+1px)] left-4 right-4 z-50"
            >
              <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href === '/uso-modelo' && pathname === '/resultado');

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                        )}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto h-2 w-2 rounded-full bg-blue-500"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    <p>© 2025 Viabilidade • Versão 1.0.0</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for fixed navbar */}
        <div className="h-16" />
      </>
    );
  }

  // Desktop Layout (Sidebar vertical)
  const showDesktopButton = isDesktop && isDesktopCollapsed;

  return (
    <>
      {/* Desktop Expand Button */}
      <AnimatePresence>
        {showDesktopButton && (
          <motion.div
            key="desktop-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 left-4 z-[60] hidden lg:block"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDesktop}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isDesktopCollapsed ? 64 : 256,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className={cn(
          "relative h-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden flex flex-col",
          className
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 relative">
          {/* Logo and Title */}
          <div className={cn(
            "flex items-center transition-all duration-[400ms] ease-out",
            isDesktopCollapsed && "justify-center"
          )}>
            <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            
            <span className={cn(
              "text-xl font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap transition-all duration-[400ms] ease-out ml-3",
              isDesktopCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-3"
            )}>
              Viabilidade
            </span>
          </div>

          {/* Control Buttons */}
          <div className={cn(
            "flex items-center space-x-2 transition-all duration-[400ms] ease-out",
            isDesktopCollapsed ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}>
            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDesktop}
              className="hidden lg:flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8 cursor-pointer transition-colors duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 space-y-2",
          isDesktopCollapsed ? "p-2" : "p-4"
        )}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === '/uso-modelo' && pathname === '/resultado');
            
            const linkElement = (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center rounded-xl text-sm font-medium transition-all duration-[400ms] ease-out cursor-pointer group",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 hover:scale-105",
                  isDesktopCollapsed ? "justify-center p-3 mx-auto w-12 h-12" : "px-4 py-3"
                )}
              >
                <Icon className={cn(
                  "flex-shrink-0",
                  isDesktopCollapsed ? "h-6 w-6" : "h-5 w-5"
                )} />
                
                <span className={cn(
                  "truncate transition-all duration-[400ms] ease-out ml-3",
                  isDesktopCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-3"
                )}>
                  {item.title}
                </span>
              </Link>
            );

            // Wrap with tooltip when collapsed
            if (isDesktopCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    {linkElement}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="z-[9999]">
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return linkElement;
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className={cn(
            "flex items-center transition-all duration-[400ms] ease-out",
            isDesktopCollapsed ? "justify-center" : "justify-between"
          )}>
            <div className={cn(
              "text-xs text-gray-500 dark:text-gray-400 transition-all duration-[400ms] ease-out",
              isDesktopCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}>
              <p>© 2025 Viabilidade</p>
              <p>Versão 1.0.0</p>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </motion.aside>
    </>
  );
}
