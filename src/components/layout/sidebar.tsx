"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  const pathname = usePathname();

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  const toggleDesktop = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const showMobileButton = !isDesktop && !isMobileOpen;
  const showDesktopButton = isDesktop && isDesktopCollapsed;

  return (
    <>
      {/* Mobile Menu Button */}
      <AnimatePresence>
        {showMobileButton && (
          <motion.div
            key="mobile-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 left-4 z-[60] lg:hidden"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMobile}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50]"
            onClick={toggleMobile}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isDesktop ? 0 : (isMobileOpen ? 0 : -280),
          width: isDesktopCollapsed ? 64 : 256,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className={cn(
          "fixed top-0 left-0 z-[55] h-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 shadow-lg",
          "lg:relative lg:translate-x-0 lg:shadow-none overflow-hidden flex flex-col",
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

            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobile}
              className="lg:hidden flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8 cursor-pointer transition-colors duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
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
            const isActive = pathname === item.href;
            
            const linkElement = (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={() => setIsMobileOpen(false)}
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