"use client";

import { Header } from "./header";
import { HeroContent } from "./hero-content";
import { FeaturesSection } from "./features-section";
import { CTASection } from "./cta-section";
import { Footer } from "./footer";

export function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <HeroContent />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}