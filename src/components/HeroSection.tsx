import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles, Activity, Layers, CornerDownRight, Binary } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWarped, setIsWarped] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  // Cinematic canvas particle matrix & gravitational distortion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle technical constellation
    const nodeCount = Math.min(width < 768 ? 35 : 75, 90);
    const nodes: { x: number; y: number; vx: number; vy: number; baseRadius: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: Math.random() * 1.5 + 0.8,
      });
    }

    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const onCanvasMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
          y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        });
      }
    };
    window.addEventListener('mousemove', onCanvasMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle crosshair grid at mouse position
      ctx.strokeStyle = 'rgba(255, 30, 39, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(targetMouseX, 0);
      ctx.lineTo(targetMouseX, height);
      ctx.moveTo(0, targetMouseY);
      ctx.lineTo(width, targetMouseY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gravitational attraction/repulsion
        const dx = targetMouseX - node.x;
        const dy = targetMouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          node.x -= (dx / dist) * force * 1.5;
          node.y -= (dy / dist) * force * 1.5;
        }

        ctx.fillStyle = dist < 120 ? '#ff1e27' : 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, dist < 120 ? node.baseRadius * 1.4 : node.baseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const ndx = node.x - nodeB.x;
          const ndy = node.y - nodeB.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (nDist < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - nDist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Trigger boot sequence appearance
    const timer = setTimeout(() => {
      setIsBooted(true);
      sound.playClick(600);
    }, 150);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onCanvasMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const handleTriggerWarp = () => {
    sound.playWarp();
    setIsWarped((prev) => !prev);
  };

  const nameString = PORTFOLIO_DATA.personal.name;

  return (
    <section
      id="genesis"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-void pt-24 pb-12 px-6 sm:px-12 select-none"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Background Interactive Canvas Particle Field */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

      {/* Top telemetry status line */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-crimson" />
          <span>SPATIAL COORDINATE: [{(mousePos.x * 100).toFixed(1)}, {(mousePos.y * 100).toFixed(1)}]</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block">UNIVERSITY SCHOOL OF AUTOMATION & ROBOTICS</span>
          <span className="text-white/80 font-bold px-2 py-0.5 border border-white/20 rounded bg-white/5">
            AI-DS
          </span>
        </div>
      </div>

      {/* Hero Centerpiece: Kinetic Name & Dimensional Depth */}
      <div
        className={`relative z-10 my-auto py-12 transition-all duration-700 ease-out preserve-3d ${
          isWarped ? 'scale-105 -rotate-1' : ''
        }`}
        style={{
          transform: `rotateY(${mousePos.x * 7}deg) rotateX(${-mousePos.y * 7}deg) translateZ(${
            isWarped ? '40px' : '0px'
          })`,
        }}
      >
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-crimson/30 bg-crimson/10 text-crimson text-xs font-mono tracking-widest uppercase">
          <Binary className="w-3.5 h-3.5" />
          <span>{t.hero.spec}</span>
        </div>

        {/* Cinematic Kinetic Headline - Balanced size to keep ANMOL VERMA together */}
        <div className="relative overflow-hidden mb-6">
          <h1
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-none flex items-center flex-wrap sm:flex-nowrap gap-x-4 md:gap-x-6 select-none"
            data-cursor="WARP"
            onClick={handleTriggerWarp}
          >
            <span className="whitespace-nowrap inline-flex">
              {"ANMOL".split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-transform duration-300 hover:text-crimson hover:-translate-y-2 hover:scale-110"
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="whitespace-nowrap inline-flex">
              {"VERMA".split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-transform duration-300 hover:text-crimson hover:-translate-y-2 hover:scale-110"
                  style={{ transitionDelay: `${(index + 5) * 25}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Tagline & Exploratory Subtext */}
        <div className="max-w-3xl">
          <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white/90 tracking-tight mb-4">
            {t.hero.tagline}
          </p>
          <p className="font-mono text-xs sm:text-sm text-white/50 leading-relaxed max-w-2xl">
            {t.hero.subtagline}
          </p>
        </div>

        {/* Interactive Warp Trigger & Surprise Action */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={handleTriggerWarp}
            onMouseEnter={() => sound.playHover()}
            data-cursor="SURPRISE"
            className="group relative px-6 py-3 border border-crimson bg-crimson/10 text-white font-mono text-xs uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-crimson hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-crimson group-hover:text-white transition-colors" />
              {isWarped ? t.hero.resetField : t.hero.distortReality}
            </span>
          </button>

          <a
            href="#story"
            onClick={() => sound.playClick()}
            className="px-6 py-3 border border-white/10 hover:border-white/40 text-white/70 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2"
          >
            <span>{t.hero.enterNarrative}</span>
            <CornerDownRight className="w-3.5 h-3.5 text-crimson" />
          </a>
        </div>
      </div>

      {/* Bottom Telemetry & Scroll Anchor */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-t border-white/10 pt-4 text-xs font-mono text-white/40 gap-4">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-white/20 rounded-full" />
          <span>{t.hero.operatorStatus}</span>
        </div>

        <a
          href="#story"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 text-white/60 hover:text-crimson transition-colors group"
        >
          <span className="tracking-widest uppercase text-[10px]">{t.hero.scrollToExperience}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-crimson group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
