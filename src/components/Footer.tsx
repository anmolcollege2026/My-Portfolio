import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-surface-900 border-t border-white/10 py-16 px-6 sm:px-12 text-white/60">
      <div className="max-w-7xl mx-auto flex flex-col justify-between space-y-12">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <h4 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </h4>
            <p className="font-mono text-xs text-crimson mt-1 uppercase tracking-widest">
              {PORTFOLIO_DATA.personal.education} &bull; {PORTFOLIO_DATA.personal.university}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            data-cursor="WARP"
            className="group px-6 py-3 border border-white/10 hover:border-crimson hover:bg-crimson/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp className="w-4 h-4 text-crimson group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Tier & Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <div className="text-white/30 text-[10px] uppercase mb-1">LOCAL TIME</div>
            <div className="text-white font-bold">{time || '12:00:00'} IST</div>
            <div className="text-white/40 text-[10px]">[DELHI // UTC+05:30]</div>
          </div>

          <div>
            <div className="text-white/30 text-[10px] uppercase mb-1">CORE ENGINE</div>
            <div className="text-white">React 18 + Vite + Tailwind</div>
            <div className="text-white/40 text-[10px]">Zero Template Framework</div>
          </div>

          <div>
            <div className="text-white/30 text-[10px] uppercase mb-1">DEPARTMENT</div>
            <div className="text-white">Artificial Intelligence & Data Science</div>
            <div className="text-white/40 text-[10px]">USAR / GGSIPU</div>
          </div>

          <div>
            <div className="text-white/30 text-[10px] uppercase mb-1">DESIGN PHILOSOPHY</div>
            <div className="text-crimson font-medium">Experimental &bull; Cinematic &bull; Tactile</div>
            <div className="text-white/40 text-[10px]">&copy; {new Date().getFullYear()} Anmol Verma</div>
          </div>
        </div>

      </div>
    </footer>
  );
};
