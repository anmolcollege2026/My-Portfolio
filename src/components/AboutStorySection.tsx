import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';

export const AboutStorySection: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const words = PORTFOLIO_DATA.storyWords;

  const handleWordSelect = (idx: number) => {
    sound.playClick(700 + idx * 80);
    setActiveWordIndex(idx);
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-void py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] font-display font-black text-[18vw] leading-none text-white whitespace-nowrap">
        EXPERIMENT
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-crimson font-mono text-sm font-bold tracking-widest">[02]</span>
            <h2 className="font-mono text-sm tracking-widest text-white/80 uppercase">
              THE NARRATIVE STREAM // STORY MATRIX
            </h2>
          </div>
          <div className="font-mono text-xs text-white/40">
            DISCIPLINE: {PORTFOLIO_DATA.personal.department}
          </div>
        </div>

        {/* Dynamic Typographic Chapter Selector (CURIOUS, EXPLORE, BUILD, LEARN) */}
        <div className="mb-20">
          <p className="font-mono text-xs text-crimson tracking-widest uppercase mb-4">
            CHAPTER 0{activeWordIndex + 1} // SELECT TO DIVE DEEPER
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {words.map((item, idx) => {
              const isActive = activeWordIndex === idx;
              return (
                <button
                  key={item.word}
                  onClick={() => handleWordSelect(idx)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="READ"
                  className={`group relative p-5 sm:p-6 text-left transition-all duration-300 border ${
                    isActive
                      ? 'border-crimson bg-surface-900 shadow-2xl scale-[1.02]'
                      : 'border-white/10 bg-surface-900/40 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <span className={`font-mono text-xs ${isActive ? 'text-crimson font-bold' : 'text-white/40'}`}>
                      0{idx + 1}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-crimson animate-ping' : 'bg-white/20'}`} />
                  </div>

                  <h3
                    className={`font-display font-black text-xl sm:text-2xl lg:text-2xl xl:text-3xl tracking-tight leading-none transition-colors ${
                      isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                    }`}
                  >
                    {item.word}
                  </h3>

                  <p className={`font-mono text-xs mt-3 line-clamp-2 transition-colors ${isActive ? 'text-white/70' : 'text-white/30'}`}>
                    {item.phrase}
                  </p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Narrative Split: Holographic ID & Mission Synthesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: USAR Holographic Student Record */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 border border-white/10 bg-surface-900/60 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/30">
              SYS_ID: USAR-2026-AV
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-crimson/40 bg-crimson/10 rounded text-[11px] font-mono text-crimson mb-6">
                <Cpu className="w-3 h-3" />
                <span>ACTIVE OPERATOR</span>
              </div>

              <h4 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
                {PORTFOLIO_DATA.personal.name}
              </h4>
              <p className="font-mono text-xs text-crimson font-medium mb-6">
                {PORTFOLIO_DATA.personal.education} &bull; {PORTFOLIO_DATA.personal.department}
              </p>

              <div className="text-white/70 text-sm leading-relaxed space-y-4 font-sans">
                <p>{PORTFOLIO_DATA.about.bioParagraph1}</p>
                <p>{PORTFOLIO_DATA.about.bioParagraph2}</p>
              </div>
            </div>

            {/* University & Specs Ticker */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="font-mono text-[11px] text-white/40 mb-3">INSTITUTION:</div>
              <div className="font-sans font-medium text-white text-sm">
                {PORTFOLIO_DATA.personal.university}
              </div>
              <div className="font-mono text-xs text-crimson mt-1">
                GGSIPU &bull; Delhi, India
              </div>
            </div>
          </div>

          {/* Right: The Four Pillars of Curiosity */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.about.pillars.map((pillar, pIdx) => (
                <div
                  key={pillar.title}
                  onMouseEnter={() => sound.playHover()}
                  className="p-6 border border-white/10 bg-surface-900/30 hover:border-crimson/50 hover:bg-surface-900/80 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-crimson">0{pIdx + 1}</span>
                    <Sparkles className="w-4 h-4 text-white/20 group-hover:text-crimson transition-colors" />
                  </div>
                  <h5 className="font-display font-bold text-lg text-white mb-2 group-hover:text-crimson transition-colors">
                    {pillar.title}
                  </h5>
                  <p className="font-mono text-xs text-white/50 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Dynamic Interactive Curiosity Quote Strip */}
            <div className="p-6 border border-crimson/30 bg-crimson/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-crimson tracking-widest uppercase block mb-1">
                  CURRENT RESEARCH FOCUS
                </span>
                <p className="font-mono text-xs text-white/90">
                  "Exploring algorithmic intelligence, discrete systems, and building high-performance tactile web tools."
                </p>
              </div>
              <a
                href="#skills"
                onClick={() => sound.playClick()}
                className="px-4 py-2 border border-crimson text-crimson hover:bg-crimson hover:text-white font-mono text-xs tracking-wider transition-colors shrink-0 flex items-center gap-2"
              >
                <span>INSPECT SKILLS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
