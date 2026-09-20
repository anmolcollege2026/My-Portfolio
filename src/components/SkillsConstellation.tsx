import React, { useState, useEffect, useRef } from 'react';
import { Play, Terminal, CheckCircle2, RotateCcw, Code2, Sparkles, X } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA, SkillItem } from '../portfolioData';

export const SkillsConstellation: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillItem>(PORTFOLIO_DATA.skills[0]);
  const [isRunningSnippet, setIsRunningSnippet] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'constellation' | 'terminal'>('constellation');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize terminal output with the active skill snippet
  useEffect(() => {
    setTerminalLogs([
      `[LOADED] ${activeSkill.snippet.filename}`,
      `[TARGET] ${activeSkill.name} // ${activeSkill.level}`,
      `[STATUS] Ready for compilation.`,
      activeSkill.snippet.output,
    ]);
  }, [activeSkill]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 30,
      y: (e.clientY - rect.top - rect.height / 2) / 30,
    });
  };

  const handleSelectSkill = (skill: SkillItem) => {
    sound.playClick(950);
    setActiveSkill(skill);
    setViewMode('terminal');
  };

  const handleRunCode = () => {
    sound.playWarp();
    setIsRunningSnippet(true);
    setTerminalLogs([
      `[COMPILE_START] Invoking compiler for ${activeSkill.name}...`,
      `[OPTIMIZATION] Flags: -O3 -Wall -Wextra`,
    ]);

    setTimeout(() => {
      sound.playSuccess();
      setIsRunningSnippet(false);
      setTerminalLogs((prev) => [
        ...prev,
        `[BUILD_SUCCESS] Output binary generated: 0 errors, 0 warnings.`,
        `----------------------------------------`,
        activeSkill.snippet.output,
        `[PROCESS_TERMINATED] Execution time: 1.42ms (Exit Code: 0)`,
      ]);
    }, 450);
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-void py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-crimson font-mono text-sm font-bold tracking-widest">[03]</span>
            <h2 className="font-mono text-sm tracking-widest text-white/80 uppercase">
              THE SKILLS MATRIX // INTERACTIVE COMPILER
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <span>MODE:</span>
            <button
              onClick={() => setViewMode('constellation')}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === 'constellation' ? 'bg-crimson text-white' : 'hover:text-white'
              }`}
            >
              NODES
            </button>
            <span>/</span>
            <button
              onClick={() => setViewMode('terminal')}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === 'terminal' ? 'bg-crimson text-white' : 'hover:text-white'
              }`}
            >
              TERMINAL
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Layout Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Floating Skills Nodes */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-crimson uppercase tracking-widest">
                ACTIVE LANGUAGES & TECH // CLICK TO COMPILE
              </span>
              <span className="font-mono text-xs text-white/30">
                {PORTFOLIO_DATA.skills.length} MODULES LOADED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_DATA.skills.map((skill, index) => {
                const isSelected = activeSkill.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill)}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="EXEC"
                    className={`group relative p-5 border text-left transition-all duration-300 backdrop-blur-sm overflow-hidden ${
                      isSelected
                        ? 'border-crimson bg-surface-900 shadow-xl scale-[1.02]'
                        : 'border-white/10 bg-surface-900/40 hover:border-white/30 hover:bg-surface-900/70'
                    }`}
                    style={{
                      transform: `translate(${mousePos.x * (index % 2 === 0 ? 0.3 : -0.3)}px, ${
                        mousePos.y * (index % 2 === 0 ? 0.3 : -0.3)
                      }px)`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                        {skill.category}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isSelected ? 'bg-crimson scale-125' : 'bg-white/20 group-hover:bg-crimson/50'
                        }`}
                      />
                    </div>

                    <div className="flex items-baseline justify-between">
                      <h4 className="font-display font-bold text-xl text-white group-hover:text-crimson transition-colors">
                        {skill.name}
                      </h4>
                      <span className="font-mono text-xs text-white/40 group-hover:text-white/80">
                        {skill.level}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-white/50 mt-2 line-clamp-1">
                      {skill.experience}
                    </p>

                    {isSelected && (
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                        <div className="absolute transform rotate-45 bg-crimson text-white font-mono text-[8px] font-bold py-0.5 right-[-35px] top-[14px] w-[120px] text-center">
                          ACTIVE
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint alert */}
            <div className="mt-4 p-4 border border-white/5 bg-white/[0.02] rounded text-xs font-mono text-white/50 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-crimson shrink-0" />
              <span>
                Select any language to inspect real source code algorithms and simulate compiler execution in the laboratory terminal.
              </span>
            </div>
          </div>

          {/* Right Column: High-Tech Code Artifact Terminal & Simulator */}
          <div className="lg:col-span-6 border border-white/10 bg-surface-900 shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="font-mono text-xs text-white/60 ml-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-crimson" />
                  {activeSkill.snippet.filename}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunningSnippet}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="RUN"
                  className="px-3 py-1 bg-crimson hover:bg-crimson-hover disabled:opacity-50 text-white font-mono text-xs rounded transition-all flex items-center gap-1.5 shadow-lg"
                >
                  {isRunningSnippet ? (
                    <RotateCcw className="w-3 h-3 animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                  <span>{isRunningSnippet ? 'RUNNING...' : 'EXECUTE'}</span>
                </button>
              </div>
            </div>

            {/* Code Editor Body */}
            <div className="p-5 font-mono text-xs text-white/90 bg-black/60 overflow-x-auto border-b border-white/5">
              <pre className="leading-relaxed">
                <code>
                  {activeSkill.snippet.code.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-4 text-white/20 text-right">
                        {idx + 1}
                      </span>
                      <span className="table-cell">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Simulated Live Output Console */}
            <div className="p-4 bg-void font-mono text-xs min-h-[140px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/40 mb-2 border-b border-white/5 pb-1 text-[11px]">
                  <Terminal className="w-3 h-3 text-crimson" />
                  <span>OUTPUT CONSOLE</span>
                  <span className="text-[10px] text-white/20">&bull; STDOUT / STDERR</span>
                </div>
                <div className="space-y-1">
                  {terminalLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className={`leading-relaxed ${
                        log.startsWith('[BUILD_SUCCESS]') || log.startsWith('[SYS_OK]')
                          ? 'text-emerald-400'
                          : log.startsWith('[COMPILE_START]') || log.startsWith('[LOADED]')
                          ? 'text-crimson'
                          : 'text-white/70'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30">
                <span>RUNTIME: NATIVE ENGINE</span>
                <span className="text-crimson font-medium">STATUS: NOMINAL</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
