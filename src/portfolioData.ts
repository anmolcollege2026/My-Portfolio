/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION DATA - ANMOL VERMA
 * ==============================================================================
 * Welcome! This file contains all your personal information, skills, projects,
 * social media links, and about sections.
 * 
 * You can effortlessly update any information below without having to modify
 * any complex animation or layout code!
 * ==============================================================================
 */

export interface SkillItem {
  id: string;
  name: string;
  category: 'Systems' | 'Intelligence' | 'Web & Interface';
  level: string;
  experience: string;
  color: string;
  snippet: {
    filename: string;
    code: string;
    output: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Vision' | 'Systems & Engine' | 'Robotics & Control' | 'Interactive Web';
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  stars?: string;
  status: 'Deployed' | 'Active Research' | 'Prototype' | 'Open Source';
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface SocialItem {
  name: string;
  handle: string;
  url: string;
  icon: string;
  description: string;
  accent: string;
}

export const PORTFOLIO_DATA = {
  // --- Personal Identity ---
  personal: {
    name: "ANMOL VERMA",
    firstName: "ANMOL",
    lastName: "VERMA",
    role: "AI & Data Science Explorer",
    education: "1st-Year Student",
    university: "University School of Automation and Robotics",
    universityShort: "USAR",
    department: "AI & Data Science (AI-DS)",
    location: "New Delhi, India",
    status: "Exploring Frontiers // Open for Collabs",
    tagline: "Curious Mind. Exploring Technology. Building Ideas.",
    subtagline: "Bridging algorithmic thinking, low-level systems, and intelligent machine dynamics.",
  },

  // --- Cinematic Story Chapters (About Section) ---
  storyWords: [
    { word: "CURIOUS", phrase: "Driven by the primal urge to understand how things work under the hood." },
    { word: "EXPLORE", phrase: "Diving into low-level memory, neural patterns, and autonomous machines." },
    { word: "BUILD",   phrase: "Transforming abstract logic into high-performance, tangible software." },
    { word: "LEARN",   phrase: "Continuous recursive growth, pushing boundaries every single day." }
  ],

  about: {
    bioParagraph1: "I am a curious technology enthusiast and 1st-year AI & Data Science student at the University School of Automation and Robotics. My journey started with a simple question: how do lines of code instruct silicon to simulate physics, perceive patterns, and make autonomous decisions?",
    bioParagraph2: "From low-level memory mechanics in C/C++ to machine learning pipelines in Python and interactive digital experiences on the web, I thrive on hands-on experimentation. I do not just want to use software — I want to architect it, break it down to its core invariants, and rebuild it better.",
    highlights: [
      { label: "ACADEMIC LAB", value: "USAR, Delhi" },
      { label: "SPECIALIZATION", value: "AI & Data Science" },
      { label: "FOCUS", value: "C/C++, Python, Systems & Web" },
      { label: "MINDSET", value: "Relentless Experimentation" }
    ],
    pillars: [
      { title: "Exploring New Technologies", desc: "Always testing cutting-edge paradigms, architectures, and toolchains before they go mainstream." },
      { title: "Building Creative Projects", desc: "Transforming theoretical computer science into kinetic, tactile applications." },
      { title: "Low-Level to High-Level", desc: "Mastering the spectrum from pointers and cache lines to neural embeddings and user interfaces." },
      { title: "Continuous Learning", desc: "Every project is a laboratory experiment to push personal frontiers further." }
    ]
  },

  // --- Interactive Skills Dataset (with live runnable code previews) ---
  skills: [
    {
      id: "c",
      name: "C Language",
      category: "Systems",
      level: "Core Systems",
      experience: "Pointers, Memory Allocation, Structures, Bitwise Operations",
      color: "#ff2a2a",
      snippet: {
        filename: "memory_core.c",
        code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = malloc(sizeof(int) * 3);\n    ptr[0] = 0xDEAD; ptr[1] = 0xBEEF;\n    printf("[SYS_OK] Allocated at 0x%p\\n", (void*)ptr);\n    free(ptr);\n    return 0;\n}`,
        output: "[SYS_OK] Allocated at 0x7ffd18b4e020\n[MEM_FREE] Deallocated 24 bytes safely."
      }
    },
    {
      id: "cpp",
      name: "C++",
      category: "Systems",
      level: "OOP & Performance",
      experience: "STL, Templates, RAII, Memory Safety, Computational Speed",
      color: "#ff3e3e",
      snippet: {
        filename: "kinetics_vector.cpp",
        code: `#include <iostream>\n#include <vector>\n\ntemplate <typename T>\nstruct Vector3D { T x, y, z; };\n\nint main() {\n    Vector3D<float> velocity{2.5f, -9.8f, 0.0f};\n    std::cout << "[PHYSICS] Gravity applied: " << velocity.y << " m/s^2\\n";\n    return 0;\n}`,
        output: "[PHYSICS] Gravity applied: -9.8 m/s^2\n[THREAD] Frame rendering at 60.0 FPS"
      }
    },
    {
      id: "python",
      name: "Python",
      category: "Intelligence",
      level: "AI & Automation",
      experience: "NumPy, Data Science, Scripting, Algorithm Prototyping",
      color: "#ff5252",
      snippet: {
        filename: "neural_pass.py",
        code: `import numpy as np\n\ndef forward_activation(weights, inputs, bias=0.05):\n    z = np.dot(weights, inputs) + bias\n    return 1 / (1 + np.exp(-z))  # Sigmoid\n\nw = np.array([0.45, 0.82])\nx = np.array([1.0, 0.5])\nprint(f"[PREDICTION] Confidence: {forward_activation(w, x):.4f}")`,
        output: "[PREDICTION] Confidence: 0.7027\n[TENSOR] Matrix dimensions matched: (1, 2) x (2, 1)"
      }
    },
    {
      id: "html",
      name: "HTML",
      category: "Web & Interface",
      level: "Semantic Architecture",
      experience: "Modern Semantic Standards, DOM Structure, Accessibility, Canvas API",
      color: "#ff6363",
      snippet: {
        filename: "viewport.html",
        code: `<!DOCTYPE html>\n<section id="quantum-hud" data-theme="dark">\n  <header class="telemetry-bar">\n    <span class="status-live">ONLINE</span>\n    <h1 class="font-display">ANMOL VERMA</h1>\n  </header>\n</section>`,
        output: "[DOM_PARSED] 14 nodes initialized.\n[A11Y] Semantic landmarks valid."
      }
    },
    {
      id: "css",
      name: "CSS",
      category: "Web & Interface",
      level: "Layouts & Animation",
      experience: "CSS Grid/Flexbox, Keyframes, Hardware Accelerated Transforms, Variables",
      color: "#ff7474",
      snippet: {
        filename: "spatial_transform.css",
        code: `@property --warp-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }\n\n.cinema-viewport {\n  transform: perspective(1200px) rotateX(15deg) scale3d(1.02, 1.02, 1.02);\n  filter: contrast(1.15) brightness(1.05);\n  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);\n}`,
        output: "[GPU_COMPOSITOR] Render layer promoted to VRAM.\n[FPS] 120hz smooth interpolation enabled."
      }
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Web & Interface",
      level: "Dynamic Systems",
      experience: "Async/Await, Event Loop, Canvas Context, DOM Manipulation, Web Audio API",
      color: "#ff8585",
      snippet: {
        filename: "event_loop.js",
        code: `const triggerWarp = async (coordinates) => {\n  console.log(\`[WARP_ENGAGED] Vector: \${JSON.stringify(coordinates)}\`);\n  await new Promise(resolve => setTimeout(resolve, 80));\n  return { status: "TRANSLATED_60FPS", delta: 0.016 };\n};\n\ntriggerWarp({ x: 1920, y: 1080 }).then(console.log);`,
        output: "[WARP_ENGAGED] Vector: {\"x\":1920,\"y\":1080}\n{ status: 'TRANSLATED_60FPS', delta: 0.016 }"
      }
    }
  ] as SkillItem[],

  // --- Immersive Project Showcase ---
  projects: [
    {
      id: "Tic-Tac-Toe game",
      title: "Tic-Tac-Toe game",
      subtitle: "A classic game with a modern twist",
      category: "GAME AND SIMULATIONS",
      description: "A responsive implementation of the classic Tic-Tac-Toe game with smooth animations and a clean UI.",
      longDescription: "Built with modern web technologies to provide an engaging user experience across all devices. Features include smooth transitions, responsive design, and intuitive gameplay.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/anmolcollege2026/Tic-Tac-Toe-GAME",
      liveUrl: "https://anmolcollege2026.github.io/Tic-Tac-Toe-GAME/",
      status: "deployed",
      metrics: [
        { label: "Performance", value: "95/100" },
        { label: "User Satisfaction", value: "90/100" }
      ],
      tags: ["Game Development", "JavaScript", "Responsive Design"]
    },
    {
      id: "",
      title: "V-GLANCE",
      subtitle: "High-Performance 2D Rigid Body & Particle Physics Simulator",
      category: "Systems & Engine",
      description: "vGlance is an intelligent video search engine that goes beyond traditional keyword matching. Using advanced AI technologies, it analyzes the actual content of videos - speech, text, and visual elements - to provide semantic search capabilities.",
      longDescription: "**vGlance** is an AI-powered video search engine that understands speech, text, and visuals to find relevant moments in videos. It enables fast, semantic search, helping users find exactly what they need without watching the entire video.",
      technologies: ["FASTAPI", "POSTGRESQL WITH CONNECTION POOLING", "WHISPER", "EASYOCR", "GEMINI API" , "yt-dlp + FFmpeg","HTML5, CSS3, JAVASCRIPT, PYTHON FLASK"],
      githubUrl: "https://github.com/anmolcollege2026/Vglance-demo",
      // liveUrl: "https://kinetics-engine.example.com",
      status: "NOT DEPLOYED",
      metrics: [
        { label: "Particle Capacity", value: "10,000+" },
        { label: "Integration", value: "Verlet / Euler" },
        { label: "Frametime", value: "1.2ms / frame" }
      ],
      tags: ["C++", "Physics", "ENGINE", "Algorithms","SEARCH ENGINE"]
    },
    // {
    //   id: "robotrack-core",
    //   title: "RoboTrack Core",
    //   subtitle: "Autonomous Mobile Robot Navigation & Telemetry System",
    //   category: "Robotics & Control",
    //   description: "Simulation environment for automated robotic path planning, obstacle avoidance algorithms (A* & DWA), and real-time lidar telemetry.",
    //   longDescription: "Directly inspired by coursework at the University School of Automation and Robotics. Integrates sensor fusion simulation, dynamic obstacle velocity forecasting, and low-latency serial command dispatch to virtual actuators.",
    //   technologies: ["C", "Python", "Robotics Kinematics", "Algorithm Design"],
    //   githubUrl: "https://github.com/anmol-verma-placeholder/robotrack-core",
    //   liveUrl: "https://robotrack.example.com",
    //   status: "Prototype",
    //   metrics: [
    //     { label: "Routing Alg.", value: "Dynamic A*" },
    //     { label: "Scan Freq.", value: "40 Hz" },
    //     { label: "Drift Error", value: "< 0.02%" }
    //   ],
    //   tags: ["Automation", "Robotics", "USAR", "Kinematics"]
    // },
    {
      id: "Monochrome Algorithm Visualizer",
      title: "Monochrome Algorithm Visualizer",
      subtitle: "Interactive Data Structures & Graph Traversal Visualizer",
      category: "Interactive Web",
      description: "Monochrome Algorithm Visualizer is a sleek, web-based tool designed to help developers and students understand sorting mechanics through real-time animation. Built using pure HTML, CSS, and JavaScript, the application features an interactive Bubble Sort algorithm set against a high-contrast black-and-gray glassmorphism aesthetic.",
      longDescription: "Created to help fellow computer science students visually grasp the temporal flow of algorithms. Features step-by-step memory inspection, execution speed scrubbing, and live state machine representations.",
      technologies: ["JavaScript", "HTML5 Canvas", "CSS Animations", "Algorithms"],
      githubUrl: "https://github.com/anmolcollege2026/Bubble-Sort-Visualizer",
      liveUrl: "https://anmolcollege2026.github.io/Bubble-Sort-Visualizer/",
      status: "Deployed",
      metrics: [
        { label: "Visualizers", value: "12 Algorithms" },
        { label: "Time Complexity", value: "O(V + E) Live" },
        { label: "User Interaction", value: "Full Control" }
      ],
      tags: ["Data Structures", "Visualization", "Education"]
    },
    // {
    //   id: "terminal-x",
    //   title: "Terminal-X CyberShell",
    //   subtitle: "Custom POSIX-Compliant Micro-Shell & Process Monitor",
    //   category: "Systems & Engine",
    //   description: "A lightweight command line interpreter written in pure C supporting command pipelines, background job control, and system diagnostics.",
    //   longDescription: "Explores the boundary between the operating system kernel and user space. Implements process forking, file descriptor redirection, signal intercepts (SIGINT, SIGTSTP), and custom environment variable evaluation.",
    //   technologies: ["C Language", "POSIX API", "Linux Syscalls", "Make"],
    //   githubUrl: "https://github.com/anmol-verma-placeholder/terminal-x",
    //   liveUrl: "https://terminal-x.example.com",
    //   status: "Open Source",
    //   metrics: [
    //     { label: "Binary Footprint", value: "48 KB" },
    //     { label: "Memory Overhead", value: "0.8 MB" },
    //     { label: "Syscall Latency", value: "Sub-millisecond" }
    //   ],
    //   tags: ["C", "Systems Programming", "Shell", "OS"]
    // }
  ] as ProjectItem[],

  // --- Interactive Social Realm ---
  socials: [
    {
      name: "LinkedIn",
      handle: "anmol-verma-usar",
      url: "https://www.linkedin.com/in/anmol-verma-65108b429/",
      icon: "Linkedin",
      description: "Connect for collaborative research, engineering discussions, and academic networking.",
      accent: "#ff2a2a"
    },
    {
      name: "GitHub",
      handle: "anmol-verma-dev",
      url: "https://github.com/anmolcollege2026",
      icon: "Github",
      description: "Explore all source code repositories, open-source experiments, and commit logs.",
      accent: "#ffffff"
    },
    {
      name: "Instagram",
      handle: "@anmolverma.tech",
      url: "https://www.instagram.com/anmol.vermaji?stkn=N25jNjZkcnF1Nmhk",
      icon: "Instagram",
      description: "Behind the scenes: university robotics lab life, project build logs, and tech experiments.",
      accent: "#e50914"
    }
  ] as SocialItem[],

  // --- Contact Transmission ---
  contact: {
    title: "INITIATE TRANSMISSION",
    subtitle: "Have a question, a project idea, or want to collaborate? Send a signal directly into my inbox.",
    email: "anmolcollegeusar@gmail.com",
    availability: "Available for ambitious projects & tech collabs",
    responseLatency: "Typically within 24 hours"
  }
};
