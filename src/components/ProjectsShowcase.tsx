import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Layers, Eye, Cpu, X, Sparkles, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA, ProjectItem } from '../portfolioData';

export const ProjectsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['ALL', 'AI & Vision', 'Systems & Engine', 'Interactive Web', 'GAME AND SIMULATIONS'];

  const filteredProjects = activeCategory === 'ALL'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  const handleOpenModal = (project: ProjectItem) => {
    sound.playWarp();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    sound.playClick(600);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-void py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 mb-12 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-crimson font-mono text-sm font-bold tracking-widest">[04]</span>
            <h2 className="font-mono text-sm tracking-widest text-white/80 uppercase">
              EXPERIMENTS & PROJECTS // LABORATORY REPOSITORY
            </h2>
          </div>
          <div className="font-mono text-xs text-white/40">
            TOTAL BUILDS: {PORTFOLIO_DATA.projects.length}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(800);
                setActiveCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? 'border-crimson bg-crimson text-white shadow-lg'
                  : 'border-white/10 bg-surface-900/40 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Interactive Rail / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              onMouseEnter={() => sound.playHover()}
              data-cursor="INSPECT"
              className="group relative flex flex-col justify-between p-7 border border-white/10 bg-surface-900/40 hover:border-crimson hover:bg-surface-900/90 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
            >
              {/* Subtle top index indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-crimson font-bold">
                  PROJECT 0{index + 1}
                </span>
                <span className="px-2 py-0.5 border border-white/10 rounded text-[10px] font-mono text-white/50 group-hover:border-crimson/40 group-hover:text-crimson transition-colors">
                  {project.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl text-white group-hover:text-crimson transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-white/40 mb-4 line-clamp-1">
                  {project.subtitle}
                </p>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technical Metrics Preview */}
              <div className="grid grid-cols-2 gap-2 my-4 py-3 border-y border-white/5 font-mono text-[11px]">
                {project.metrics.slice(0, 2).map((m, mIdx) => (
                  <div key={mIdx} className="bg-black/30 p-2 rounded border border-white/5">
                    <div className="text-white/40 text-[9px] uppercase">{m.label}</div>
                    <div className="text-white/90 font-medium">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Technology Badges & Inspection Trigger */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-white/60 bg-white/5 px-2 py-0.5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="font-mono text-[10px] text-white/40 px-1 py-0.5">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-crimson group-hover:text-crimson group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Subtle hover background accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-crimson scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

      </div>

      {/* Cinematic Full-Screen Project Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-900 border border-white/20 shadow-2xl flex flex-col justify-between overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-surface-800/80 sticky top-0 z-10 backdrop-blur-md">
              <div>
                <span className="font-mono text-xs text-crimson tracking-widest uppercase block mb-1">
                  {selectedProject.category} // {selectedProject.status}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2.5 rounded-full border border-white/20 hover:border-crimson text-white hover:text-crimson transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h4 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2">
                  ARCHITECTURAL OVERVIEW
                </h4>
                <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Performance Metrics Grid */}
              <div>
                <h4 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-3">
                  SYSTEM TELEMETRY & BENCHMARKS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedProject.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-white/10 bg-surface-800/40 rounded"
                    >
                      <div className="font-mono text-[11px] text-white/40 mb-1 uppercase">
                        {metric.label}
                      </div>
                      <div className="font-mono text-lg font-bold text-crimson">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div>
                <h4 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-3">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1.5 border border-white/20 bg-white/5 text-white/90 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Links */}
            <div className="p-6 sm:p-8 border-t border-white/10 bg-surface-800/80 flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-10 backdrop-blur-md">
              <div className="font-mono text-xs text-white/40">
                REPOSITORY IDENTIFIER: {selectedProject.id}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-5 py-2.5 border border-white/20 hover:border-white text-white font-mono text-xs flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>

                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-5 py-2.5 bg-crimson hover:bg-crimson-hover text-white font-mono text-xs flex items-center gap-2 transition-colors shadow-lg"
                >
                  <span>LAUNCH LIVE DEMO</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
