import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { NavigationHUD } from './components/NavigationHUD';
import { HeroSection } from './components/HeroSection';
import { AboutStorySection } from './components/AboutStorySection';
import { SkillsConstellation } from './components/SkillsConstellation';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SocialRealm } from './components/SocialRealm';
import { ContactTransmission } from './components/ContactTransmission';
import { Footer } from './components/Footer';
import { TerminalConsole } from './components/TerminalConsole';
import { LanguageProvider } from './context/LanguageContext';

export const AppContent: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Initialize smooth inertia scroll via Lenis
  useEffect(() => {
    // Disable on reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Global keyboard shortcut for terminal (tilde `~` or backtick `` ` ``)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '~' || e.key === '`') {
        // Prevent toggle if currently typing in an input/textarea
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-void text-white selection:bg-crimson selection:text-white">
      {/* Precision reticle custom cursor */}
      <CustomCursor />

      {/* Subtle cinematic film grain overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Floating Tactical Navigation & HUD */}
      <NavigationHUD
        isTerminalOpen={isTerminalOpen}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <HeroSection />
        <AboutStorySection />
        <SkillsConstellation />
        <ProjectsShowcase />
        <SocialRealm />
        <ContactTransmission />
      </main>

      {/* Architectural Telemetry Footer */}
      <Footer />

      {/* Interactive Command Terminal */}
      <TerminalConsole
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
