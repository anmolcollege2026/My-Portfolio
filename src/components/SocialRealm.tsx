import React from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight, Compass, Share2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';

export const SocialRealm: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="w-6 h-6" />;
      case 'Github':
        return <Github className="w-6 h-6" />;
      case 'Instagram':
        return <Instagram className="w-6 h-6" />;
      default:
        return <Share2 className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="socials"
      className="relative min-h-[70vh] w-full bg-void py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-crimson font-mono text-sm font-bold tracking-widest">[05]</span>
            <h2 className="font-mono text-sm tracking-widest text-white/80 uppercase">
              DIGITAL REALM // NETWORK NODES
            </h2>
          </div>
          <div className="font-mono text-xs text-white/40">
            CONNECT & EXPLORE
          </div>
        </div>

        {/* Lead In Typography */}
        <div className="mb-14">
          <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
            Want to know more about me?
          </h3>
          <p className="font-mono text-sm sm:text-base text-crimson uppercase tracking-widest">
            Explore my digital world.
          </p>
        </div>

        {/* Interactive Social Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.socials.map((item, idx) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick(900)}
              data-cursor="CONNECT"
              className="group relative flex flex-col justify-between p-8 border border-white/10 bg-surface-900/40 hover:border-crimson hover:bg-surface-900/90 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-full border border-white/10 bg-white/5 text-white/80 group-hover:border-crimson group-hover:text-crimson transition-colors">
                  {getIcon(item.icon)}
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-crimson group-hover:text-crimson group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Handle */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block mb-1">
                  NODE 0{idx + 1}
                </span>
                <h4 className="font-display font-bold text-3xl text-white group-hover:text-crimson transition-colors">
                  {item.name}
                </h4>
                <div className="font-mono text-xs text-crimson mt-1 font-medium">
                  {item.handle}
                </div>
              </div>

              {/* Description */}
              <p className="font-mono text-xs text-white/50 leading-relaxed border-t border-white/5 pt-4">
                {item.description}
              </p>

              {/* Bottom Accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-crimson scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
