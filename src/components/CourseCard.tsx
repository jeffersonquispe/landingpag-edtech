import { Clock, BookOpen, ArrowUpRight, CheckCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  lessons: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  price: string;
  targetAudience: string;
  features: string[];
  imageUrl: string;
}

export default function CourseCard({
  title,
  description,
  category,
  duration,
  lessons,
  level,
  price,
  targetAudience,
  features,
  imageUrl,
}: CourseCardProps) {
  const getLevelColor = (lvl: string) => {
    switch (lvl) {
      case "Principiante":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Intermedio":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Avanzado":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="group relative rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col h-full">
      {/* Decorative top border neon glow */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Course Image Banner */}
      <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] to-transparent opacity-60" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5">
            {targetAudience}
          </span>
          <span
            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${getLevelColor(
              level
            )}`}
          >
            {level}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Features list */}
        <div className="space-y-2 mb-5">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 py-3 border-y border-white/5 text-slate-400 text-[11px] mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>{lessons} Lecciones</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Inversión</span>
            <span className="text-xl font-extrabold text-white">{price}</span>
          </div>
          <a
            href="#contacto"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary text-slate-300 group-hover:text-white transition-all duration-300"
          >
            <ArrowUpRight className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}
