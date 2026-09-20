import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; isUser?: boolean; isError?: boolean; isSuccess?: boolean }>>([
    { text: `[ANMOL VERMA CYBERSHELL v2.4] Initialized.` },
    { text: `University School of Automation and Robotics // AI & Data Science` },
    { text: `Type 'help' to inspect available system commands.` },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    sound.playKey();

    setHistory((prev) => [...prev, { text: `user@anmol-verma:~$ ${cmd}`, isUser: true }]);

    switch (cleanCmd) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          { text: `Available Commands:` },
          { text: `  about     - Display personal background, university & focus` },
          { text: `  skills    - List core programming languages and competencies` },
          { text: `  projects  - Show active experimental builds` },
          { text: `  contact   - Signal transmission details` },
          { text: `  warp      - Trigger spatial reality distortion & audio pulse` },
          { text: `  matrix    - Stream algorithmic matrix telemetry` },
          { text: `  clear     - Wipe console history` },
          { text: `  exit      - Close this terminal session` },
        ]);
        break;

      case 'about':
      case 'bio':
        setHistory((prev) => [
          ...prev,
          { text: `NAME: ${PORTFOLIO_DATA.personal.name}` },
          { text: `STATUS: ${PORTFOLIO_DATA.personal.education}` },
          { text: `UNIVERSITY: ${PORTFOLIO_DATA.personal.university} (${PORTFOLIO_DATA.personal.universityShort})` },
          { text: `DEPARTMENT: ${PORTFOLIO_DATA.personal.department}` },
          { text: `TAGLINE: ${PORTFOLIO_DATA.personal.tagline}` },
          { text: `BIO: ${PORTFOLIO_DATA.about.bioParagraph1}` },
        ]);
        break;

      case 'skills':
        setHistory((prev) => [
          ...prev,
          { text: `ACTIVE TECHNICAL MATRIX:` },
          ...PORTFOLIO_DATA.skills.map((s) => ({
            text: `  [+] ${s.name} (${s.category}) -> ${s.level} | ${s.experience}`,
          })),
        ]);
        break;

      case 'projects':
        setHistory((prev) => [
          ...prev,
          { text: `SYSTEM EXPERIMENTS & PROJECTS:` },
          ...PORTFOLIO_DATA.projects.map((p) => ({
            text: `  [*] ${p.title} [${p.status}] -> ${p.subtitle}`,
          })),
        ]);
        break;

      case 'contact':
        setHistory((prev) => [
          ...prev,
          { text: `TRANSMISSION CHANNEL: ${PORTFOLIO_DATA.contact.email}` },
          { text: `AVAILABILITY: ${PORTFOLIO_DATA.contact.availability}` },
          { text: `LATENCY: ${PORTFOLIO_DATA.contact.responseLatency}` },
        ]);
        break;

      case 'warp':
        sound.playWarp();
        setHistory((prev) => [
          ...prev,
          { text: `[WARP ENGAGED] Spatial frequency shifted.`, isSuccess: true },
        ]);
        break;

      case 'matrix':
        sound.playSuccess();
        setHistory((prev) => [
          ...prev,
          { text: `[0x7FFA] 10010101 01101001 01101110 01110011 01110000`, isSuccess: true },
          { text: `[0x7FFB] TENSOR FLOW OPTICAL CONVOLUTION COMPLETE`, isSuccess: true },
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
      case 'quit':
        onClose();
        break;

      case '':
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { text: `Command not found: '${cmd}'. Type 'help' for instructions.`, isError: true },
        ]);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else {
      sound.playKey();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl h-[550px] bg-void border border-crimson/50 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface-900">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-crimson" />
            <span className="font-mono text-xs text-white/80 tracking-wider">
              ANMOL_CYBERSHELL // USAR_AI_DS
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 text-white/50 hover:text-crimson transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-2 select-text">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.isUser
                  ? 'text-white font-bold'
                  : line.isError
                  ? 'text-rose-500'
                  : line.isSuccess
                  ? 'text-emerald-400'
                  : 'text-white/70'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Command Input */}
        <div className="flex items-center gap-2 p-4 border-t border-white/10 bg-surface-900/60">
          <span className="font-mono text-xs text-crimson font-bold">
            user@anmol:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'projects', 'skills', 'about')..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-white/20"
          />
          <button
            onClick={() => {
              handleCommand(inputVal);
              setInputVal('');
            }}
            className="text-white/40 hover:text-crimson transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
