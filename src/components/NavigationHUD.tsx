import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Terminal, Compass, Menu, X, Globe } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface NavigationHUDProps {
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  onToggleTerminal,
  isTerminalOpen,
}) => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('genesis');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check section in viewport
      const sections = ['genesis', 'story', 'skills', 'projects', 'socials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const scrollToSection = (id: string) => {
    sound.playClick(900);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'genesis', label: t.nav.genesis, num: '01' },
    { id: 'story', label: t.nav.narrative, num: '02' },
    { id: 'skills', label: t.nav.skills, num: '03' },
    { id: 'projects', label: t.nav.projects, num: '04' },
    { id: 'socials', label: t.nav.socials, num: '05' },
    { id: 'contact', label: t.nav.contact, num: '06' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-crimson transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Primary Fixed HUD Bar */}
      <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none">
        
        {/* Left: Telemetry & Identification */}
        <div className="pointer-events-auto flex items-center gap-3 bg-surface-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-2xl">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-crimson animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-crimson relative" />
          </div>
          <span className="font-mono text-xs tracking-wider text-white/90">
            {PORTFOLIO_DATA.personal.firstName} // <span className="text-crimson font-bold">{PORTFOLIO_DATA.personal.universityShort}</span>
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] text-white/40 border-l border-white/10 pl-2">
            AI-DS '28
          </span>
        </div>

        {/* Right: Tactical Controls & Menu */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          
          {/* Quick Section Dial for Desktop */}
          <div className="hidden lg:flex items-center bg-surface-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-white/60 gap-4">
            {navLinks.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => sound.playHover()}
                className={`transition-colors hover:text-white uppercase tracking-wider flex items-center gap-1 ${
                  activeSection === item.id ? 'text-crimson font-bold' : ''
                }`}
              >
                <span className="text-[9px] text-white/30">{item.num}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Terminal Command Trigger */}
          <button
            onClick={() => {
              sound.playWarp();
              onToggleTerminal();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="EXEC"
            className={`p-2 rounded-full border backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 px-3 text-xs font-mono ${
              isTerminalOpen
                ? 'bg-crimson border-crimson text-white'
                : 'bg-surface-900/80 border-white/10 text-white/80 hover:border-crimson hover:text-white'
            }`}
            title="Toggle Command Console (~)"
          >
            <Terminal className="w-3.5 h-3.5 text-crimson group-hover:text-white" />
            <span className="hidden sm:inline-block">CONSOLE</span>
            <kbd className="hidden sm:inline-block text-[9px] px-1 bg-white/10 rounded border border-white/10 font-mono">~</kbd>
          </button>

          {/* Multilingual Selector Pill & Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                sound.playClick(1000);
                setIsLangOpen(!isLangOpen);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="LANG"
              className="p-2 rounded-full border backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 px-2.5 text-xs font-mono bg-surface-900/80 border-white/10 text-white/90 hover:border-crimson hover:text-white"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-crimson" />
              <span className="uppercase font-bold text-[11px] tracking-wider">{language}</span>
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 py-1.5 w-40 bg-surface-900/95 backdrop-blur-xl border border-white/15 shadow-2xl rounded-lg z-50 flex flex-col font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] text-white/40 uppercase tracking-widest border-b border-white/5 mb-1">
                  SELECT LANGUAGE
                </div>
                {availableLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`px-3 py-2 text-left flex items-center justify-between hover:bg-crimson hover:text-white transition-colors ${
                      language === l.code ? 'text-crimson font-bold bg-white/5' : 'text-white/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-white/30 uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => sound.playHover()}
            data-cursor="AUDIO"
            className="p-2.5 rounded-full bg-surface-900/80 backdrop-blur-md border border-white/10 hover:border-white/30 text-white/80 transition-colors"
            title={isMuted ? "Unmute Tactical Audio" : "Mute Tactical Audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/40" />
            ) : (
              <Volume2 className="w-4 h-4 text-crimson" />
            )}
          </button>

          {/* Nav Drawer Hamburger Button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsMenuOpen(!isMenuOpen);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="MENU"
            className="p-2.5 rounded-full bg-surface-900/80 backdrop-blur-md border border-white/10 hover:border-crimson text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-4 h-4 text-crimson" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Architectural Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="font-mono text-xs text-white/50 tracking-widest">
              NAVIGATION MATRIX // {PORTFOLIO_DATA.personal.name}
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsMenuOpen(false);
              }}
              className="p-3 rounded-full border border-white/20 hover:border-crimson text-white hover:text-crimson transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 my-auto max-w-4xl mx-auto w-full">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-baseline justify-between py-4 border-b border-white/5 hover:border-crimson/50 text-left transition-all duration-300"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-sm sm:text-lg text-crimson">
                    {item.num}
                  </span>
                  <span className="font-display text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/80 group-hover:text-white group-hover:translate-x-3 transition-transform duration-300">
                    {item.label}
                  </span>
                </div>
                <Compass className="w-5 h-5 text-white/20 group-hover:text-crimson group-hover:rotate-45 transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Mobile Language Switcher Row */}
          <div className="py-4 border-t border-white/10">
            <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-2">
              LANGUAGE // भाषा // 言語:
            </div>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                  }}
                  className={`px-3 py-1.5 rounded border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    language === l.code
                      ? 'border-crimson bg-crimson text-white font-bold'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-white/40 gap-3">
            <div>DEPARTMENT: {PORTFOLIO_DATA.personal.department}</div>
            <div>LOCATION: {PORTFOLIO_DATA.personal.location}</div>
            <div className="text-crimson font-medium">{PORTFOLIO_DATA.personal.status}</div>
          </div>
        </div>
      )}
    </>
  );
};
