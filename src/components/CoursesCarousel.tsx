"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, Clock, BookOpen } from "lucide-react";

type ArtType = "rings" | "shards" | "cubes" | "waves";

interface Course {
  id: number;
  category: string;
  targetAudience: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  title: string;
  description: string;
  duration: string;
  lessons: number;
  price: string;
  features: string[];
  grad: string;
  art: ArtType;
  accent: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    category: "IA Básica",
    targetAudience: "Reconversión Laboral",
    level: "Principiante",
    title: "Fundamentos de IA y Prompt Engineering",
    description: "Domina las herramientas líderes de IA generativa (ChatGPT, Claude, Midjourney) y aprende técnicas avanzadas de prompt engineering para multiplicar tu productividad.",
    duration: "4 semanas",
    lessons: 24,
    price: "$49 USD",
    features: ["Aprende desde cero (sin programar)", "Casos prácticos de automatización", "Acceso a plantillas de prompts", "Comunidad activa en Discord"],
    grad: "linear-gradient(135deg,#0c4a6e 0%,#0369a1 55%,#06b6d4 100%)",
    art: "rings",
    accent: "#00ffff",
  },
  {
    id: 2,
    category: "IA Avanzada",
    targetAudience: "Desarrolladores & Estudiantes",
    level: "Intermedio",
    title: "Desarrollo de Agentes y Aplicaciones con LLMs",
    description: "Programa agentes autónomos que razonan, usan herramientas y toman decisiones. Crea aplicaciones RAG avanzadas y llévalas a producción.",
    duration: "8 semanas",
    lessons: 48,
    price: "$129 USD",
    features: ["Programación con Python y TypeScript", "Arquitecturas RAG avanzadas", "Despliegue en producción", "Proyecto integrador real"],
    grad: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 55%,#7c3aed 100%)",
    art: "shards",
    accent: "#a78bfa",
  },
  {
    id: 3,
    category: "IA Empresarial",
    targetAudience: "Equipos & Profesionales",
    level: "Avanzado",
    title: "IA Generativa para Negocios y Productividad",
    description: "Implementa soluciones de IA en corporativos. Aprende análisis de ROI, flujos de trabajo y automatización con estrictas políticas de privacidad.",
    duration: "6 semanas",
    lessons: 32,
    price: "$99 USD",
    features: ["Análisis de ROI de IA en la empresa", "Seguridad y privacidad de datos", "Casos de estudio reales", "Certificación oficial corporativa"],
    grad: "linear-gradient(135deg,#831843 0%,#be185d 55%,#f43f5e 100%)",
    art: "cubes",
    accent: "#f9a8d4",
  },
  {
    id: 4,
    category: "MLOps & Infraestructura",
    targetAudience: "Desarrolladores & DevOps",
    level: "Avanzado",
    title: "MLOps e Infraestructura de IA",
    description: "Aprende a desplegar, monitorear y escalar modelos de IA y LLMs en la nube. Domina herramientas de MLOps y pipelines automatizados.",
    duration: "8 semanas",
    lessons: 40,
    price: "$149 USD",
    features: ["Orquestación con Kubernetes", "Despliegue y escalado de LLMs", "Monitoreo de drift y latencia", "Pipelines de CI/CD para IA"],
    grad: "linear-gradient(135deg,#052e16 0%,#14532d 55%,#16a34a 100%)",
    art: "waves",
    accent: "#4ade80",
  },
  {
    id: 5,
    category: "Ingeniería de LLMs",
    targetAudience: "Ingenieros de IA",
    level: "Avanzado",
    title: "Fine-Tuning y Personalización de LLMs",
    description: "Personaliza modelos de lenguaje de código abierto con tus propios datos. Aprende técnicas avanzadas de fine-tuning con LoRA y QLoRA.",
    duration: "6 semanas",
    lessons: 30,
    price: "$119 USD",
    features: ["Preparación de datasets de entrenamiento", "Fine-tuning eficiente con LoRA", "Optimización de memoria y cuantización", "Evaluación de rendimiento del modelo"],
    grad: "linear-gradient(135deg,#7c2d12 0%,#c2410c 55%,#f97316 100%)",
    art: "shards",
    accent: "#fdba74",
  },
  {
    id: 6,
    category: "Gobernanza y Ética",
    targetAudience: "Líderes & Directivos",
    level: "Principiante",
    title: "Gobernanza, Ética y Privacidad en IA",
    description: "Domina los marcos de gobernanza y regulación ética. Mitiga riesgos de sesgo y garantiza la privacidad de datos corporativos.",
    duration: "4 semanas",
    lessons: 20,
    price: "$59 USD",
    features: ["Leyes y regulaciones internacionales (EU AI Act)", "Técnicas de mitigación de sesgos", "Políticas de privacidad y seguridad", "Auditoría de sistemas de IA"],
    grad: "linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 55%,#6366f1 100%)",
    art: "rings",
    accent: "#93c5fd",
  },
];

const LEVEL_COLORS: Record<Course["level"], string> = {
  Principiante: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Intermedio: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Avanzado: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

// --- Abstract SVG art ---
function CardArt({ type, accent }: { type: ArtType; accent: string }) {
  const cls = "absolute top-[8%] right-[-4%] w-[56%] h-[84%] opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2";
  if (type === "rings") return (
    <svg viewBox="0 0 200 200" className={cls} preserveAspectRatio="xMidYMid meet">
      <g fill="none" strokeWidth="9" strokeLinecap="round">
        <circle cx="78" cy="72" r="34" stroke={accent} opacity="0.95" />
        <circle cx="120" cy="118" r="34" stroke="#22d3ee" opacity="0.85" />
        <circle cx="84" cy="128" r="24" stroke="#a78bfa" opacity="0.8" />
        <circle cx="132" cy="64" r="22" stroke="#f472b6" opacity="0.75" />
      </g>
    </svg>
  );
  if (type === "shards") return (
    <svg viewBox="0 0 200 200" className={cls} preserveAspectRatio="xMidYMid meet">
      <polygon points="60,40 110,60 70,120" fill={accent} opacity="0.95" />
      <polygon points="120,30 160,70 110,90" fill="#f43f5e" opacity="0.9" />
      <rect x="95" y="100" width="46" height="60" rx="6" fill="#22d3ee" opacity="0.85" transform="rotate(14 118 130)" />
      <polygon points="40,130 90,150 50,175" fill="#facc15" opacity="0.9" />
    </svg>
  );
  if (type === "cubes") return (
    <svg viewBox="0 0 200 200" className={cls} preserveAspectRatio="xMidYMid meet">
      <g opacity="0.92">
        <polygon points="100,40 140,62 100,84 60,62" fill={accent} />
        <polygon points="60,62 100,84 100,134 60,112" fill="#1e3a8a" opacity="0.8" />
        <polygon points="140,62 100,84 100,134 140,112" fill="#3b82f6" opacity="0.85" />
        <polygon points="100,90 132,108 100,126 68,108" fill="#93c5fd" opacity="0.7" />
      </g>
    </svg>
  );
  return (
    <svg viewBox="0 0 200 200" className={cls} preserveAspectRatio="xMidYMid meet">
      <g fill="none" strokeWidth="7" strokeLinecap="round">
        <path d="M40 110 Q70 60 100 110 T160 110" stroke={accent} opacity="0.95" />
        <path d="M40 130 Q70 80 100 130 T160 130" stroke="#22d3ee" opacity="0.8" />
        <path d="M40 90 Q70 40 100 90 T160 90" stroke="#fff" opacity="0.45" />
      </g>
    </svg>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article
      className="group flex-none bg-[#0d121f] border border-white/8 rounded-2xl overflow-hidden shadow-[0_12px_34px_rgba(0,0,0,0.4)] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.55)] hover:border-white/15 cursor-pointer"
      style={{ flex: "0 0 calc((100% - 48px) / 3)" }}
    >
      {/* Gradient media header */}
      <div className="relative overflow-hidden flex items-end p-5" style={{ aspectRatio: "16/9", background: course.grad }}>
        <div className="absolute inset-0 bg-[radial-gradient(80%_90%_at_110%_10%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
        <CardArt type={course.art} accent={course.accent} />

        {/* Badges top-left */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className="text-[11px] font-bold text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
            {course.category}
          </span>
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border self-start ${LEVEL_COLORS[course.level]}`}>
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 font-extrabold text-white leading-tight tracking-tight max-w-[60%] [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]" style={{ fontSize: "clamp(14px,1.3vw,18px)" }}>
          {course.title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3.5 flex-1">
        {/* Audience tag */}
        <span className="self-start text-[11px] font-semibold text-[#00ffff]/80 bg-[#00ffff]/8 px-2.5 py-1 rounded-md border border-[#00ffff]/15">
          {course.targetAudience}
        </span>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
          {course.description}
        </p>

        {/* Meta: duration + lessons */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            {course.lessons} lecciones
          </span>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-1.5">
          {course.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* Footer: price + CTA */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="text-lg font-extrabold text-white">{course.price}</span>
          <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06080d] bg-gradient-to-r from-[#00ffff] to-[#7c3aed] hover:brightness-110 px-4 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-px shadow-[0_0_12px_rgba(0,255,255,0.2)] shrink-0">
            Inscríbete ahora
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Anterior" : "Siguiente"}
      className="flex-none self-center w-12 h-12 rounded-full bg-slate-800 border border-white/10 text-white flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-slate-700 hover:scale-110 hover:shadow-[0_10px_24px_rgba(0,0,0,0.5)] active:scale-95"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

const PER_PAGE = 3;
const GAP = 24;

export default function CoursesCarousel() {
  const maxIndex = Math.max(0, COURSES.length - PER_PAGE);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4200);
    return () => clearInterval(id);
  }, [paused, next]);

  const trackStyle = {
    transform: `translateX(calc(-${index} * ((100% - ${GAP * 2}px) / 3 + ${GAP}px)))`,
    transition: "transform 0.55s cubic-bezier(0.22,0.61,0.36,1)",
  };

  return (
    <section id="cursos" className="py-24 border-t border-white/5 bg-[#06080d]/40 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/8 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff007f] mb-3 block">
            Catálogo Especializado
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Programas de IA de Alto Impacto
          </h2>
          <p className="text-slate-400 font-medium text-base">
            Cursos prácticos basados en proyectos reales. Elige la especialización que se adapte a tu nivel y objetivos.
          </p>
        </div>

        {/* Carousel track */}
        <div
          className="w-full flex items-stretch gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ArrowBtn dir="left" onClick={prev} />

          <div className="flex-1 overflow-hidden py-2 -my-2">
            <div className="flex gap-6" style={trackStyle}>
              {COURSES.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>

          <ArrowBtn dir="right" onClick={next} />
        </div>

        {/* Dots */}
        <div className="flex gap-3 items-center mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Página ${i + 1}`}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === index ? "bg-[#00ffff] w-7" : "bg-white/25 w-2 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <button className="mt-10 font-semibold text-white bg-white/5 border border-white/10 hover:border-[#00ffff]/40 hover:bg-white/8 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm">
          Explorar todos los cursos
        </button>
      </div>
    </section>
  );
}
