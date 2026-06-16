import { Check, HelpCircle } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  badgeText?: string;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  ctaText,
  isPopular = false,
  badgeText = "",
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 ${
        isPopular
          ? "bg-slate-900/60 backdrop-blur-md border-2 border-primary shadow-xl shadow-primary/10 -translate-y-2"
          : "glass-panel border border-white/5 hover:border-white/10"
      }`}
    >
      {/* Background glow for popular card */}
      {isPopular && (
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full filter blur-3xl pointer-events-none -mr-12 -mt-12" />
      )}

      {/* Popular Badge */}
      {isPopular && badgeText && (
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/25">
            {badgeText}
          </span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Name & description */}
        <h4 className="text-lg font-bold text-slate-300 mb-2">{name}</h4>
        <p className="text-slate-400 text-xs mb-6 min-h-[32px]">{description}</p>

        {/* Price */}
        <div className="flex items-baseline mb-8">
          <span className="text-4xl font-extrabold text-white tracking-tight">{price}</span>
          <span className="text-slate-400 text-sm ml-2">{period}</span>
        </div>

        {/* Call to action button */}
        <a
          href="#contacto"
          className={`w-full py-3.5 rounded-xl text-center text-sm font-bold transition-all duration-300 mb-8 block ${
            isPopular
              ? "bg-gradient-to-r from-primary to-accent hover:brightness-110 text-white shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5"
              : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 hover:-translate-y-0.5"
          }`}
        >
          {ctaText}
        </a>

        {/* Feature list */}
        <div className="space-y-4">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
            ¿Qué incluye?
          </span>
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
