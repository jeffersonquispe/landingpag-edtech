"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Terminal,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building2,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import CoursesCarousel from "@/components/CoursesCarousel";
import Hero3DScene from "@/components/Hero3DScene";
import VideoScrubSection from "@/components/VideoScrubSection";
import {
  useHeroEntrance,
  useScrollReveals,
  useCardMicroInteractions,
} from "@/hooks/useGSAPAnimations";

gsap.registerPlugin(ScrollTrigger);

// Simulated Terminal steps for the Hero visualization
const terminalSteps = [
  { text: "NetCompiler v2.1.0 initializing...", type: "system" },
  { text: "> Loading prompt: 'Crear agente con Nano Banana IA'", type: "input" },
  { text: "> Loading Nano Banana modules...", type: "process" },
  { text: "> Running LLM reasoning pipeline (Xenon 9)...", type: "process" },
  { text: "> Code compiled successfully with neon-grade elements.", type: "success" },
  { text: "> Banana Agent online. Status: CRITICAL_DYNAMISM [OK]", type: "success" },
];

export default function Home() {
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useHeroEntrance();
  const scrollRef = useScrollReveals();
  const interactiveRef = useCardMicroInteractions();

  // Terminal loop simulation with GSAP timing
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalIndex((prev) => (prev + 1) % (terminalSteps.length + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Terminal lines animation
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".terminal-line").forEach((line, i) => {
      gsap.from(line, {
        opacity: 0,
        x: -10,
        duration: 0.4,
        delay: i * 0.05,
        ease: "power2.out",
      });
    });
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#06080d] overflow-x-hidden selection:bg-[#ff007f]/30 selection:text-white" ref={interactiveRef}>
      {/* Neon Radial Glow Backgrounds */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#00ffff]/10 to-[#ff007f]/5 rounded-full filter blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#39ff14]/8 to-[#00ffff]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[700px] h-[700px] bg-[#ff007f]/5 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden" ref={heroRef}>
          {/* 3D Background Scene */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <Hero3DScene />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              {/* Neon Badge */}
              <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-[#00ffff]/30 text-xs font-semibold text-[#00ffff] w-fit mx-auto lg:mx-0 mb-6 shadow-[0_0_15px_rgba(0,255,255,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-[#00ffff] animate-pulse-slow" />
                <span>La Academia de Inteligencia Artificial del Futuro</span>
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Domina la{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff007f] to-[#39ff14] drop-shadow-[0_0_30px_rgba(255,0,127,0.2)]">
                  Inteligencia Artificial
                </span>
                . Conecta con el Mañana.
              </h1>

              <p className="hero-desc text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-10 mx-auto lg:mx-0">
                Aprende de manera práctica a programar agentes inteligentes, optimizar flujos de trabajo corporativos y automatizar tus proyectos con el carismático **Nano Banana**. Para profesionales, estudiantes y empresas.
              </p>

              {/* Action Buttons with Neon Shadows */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#cursos"
                  className="hero-button flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#ff007f] hover:brightness-110 text-base font-bold text-[#06080d] shadow-[0_0_20px_rgba(0,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,0,127,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                  data-interactive
                >
                  Explorar Cursos
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#planes"
                  className="hero-button flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-base font-bold text-white border border-white/10 hover:border-[#39ff14]/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
                  data-interactive
                >
                  Ver Planes
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="trust-badge">
                  <span className="block text-2xl md:text-3xl font-extrabold text-[#00ffff]">+5,000</span>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Graduados</span>
                </div>
                <div className="trust-badge">
                  <span className="block text-2xl md:text-3xl font-extrabold text-[#ff007f]">4.9/5</span>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Calificación</span>
                </div>
                <div className="trust-badge">
                  <span className="block text-2xl md:text-3xl font-extrabold text-[#39ff14]">100%</span>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Práctico</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive Terminal Graphic with Neon Border */}
            <div className="hero-terminal lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00ffff] via-[#ff007f] to-[#39ff14] opacity-25 blur-xl animate-pulse-slow" />
              <div className="relative rounded-2xl border border-white/10 bg-[#0c101c]/90 backdrop-blur-md overflow-hidden shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#080b11]/80">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 tracking-wider">net-terminal --nano-banana</span>
                  <Terminal className="w-4 h-4 text-slate-500" />
                </div>
                {/* Body */}
                <div className="p-6 font-mono text-xs md:text-sm space-y-3.5 min-h-[300px] flex flex-col justify-start">
                  {terminalSteps.slice(0, terminalIndex).map((step, idx) => (
                    <div
                      key={idx}
                      className={`terminal-line leading-relaxed transition-all duration-300 ${
                        step.type === "system"
                          ? "text-slate-500"
                          : step.type === "input"
                          ? "text-[#00ffff] font-semibold"
                          : step.type === "success"
                          ? "text-[#39ff14]"
                          : "text-slate-300"
                      }`}
                    >
                      {step.text}
                    </div>
                  ))}
                  {terminalIndex === 0 && (
                    <div className="text-slate-600 animate-pulse">
                      Esperando compilador de plátano...
                    </div>
                  )}
                  {terminalIndex > 0 && terminalIndex < terminalSteps.length && (
                    <span className="inline-block w-1.5 h-4 bg-slate-400 animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CARRUSEL DE CURSOS — Catálogo Especializado */}
        <CoursesCarousel />

        {/* VIDEO SCROLL SCRUB SECTION */}
        <VideoScrubSection />

        {/* BENEFICIOS / AUDIENCE FOCUS */}
        <section id="beneficios" className="py-24 relative overflow-hidden" ref={scrollRef}>
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-[#39ff14] mb-3 block">
                Educación a Tu Medida
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Diseñado para Cada Perfil Profesional
              </h2>
              <p className="text-slate-400 font-medium text-base">
                No importa tu punto de partida, estructuramos el aprendizaje según tus objetivos específicos.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="benefit-card rounded-2xl glass-panel p-8 flex flex-col h-full hover:border-[#00ffff]/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300" data-interactive>
                <div className="w-12 h-12 rounded-xl bg-[#00ffff]/10 flex items-center justify-center text-[#00ffff] mb-6 border border-[#00ffff]/20">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Reconversión Laboral</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  Pasa de cero a experto tecnológico sin necesidad de saber programar. Te capacitamos en las habilidades de IA que hoy están demandando todos los sectores para liderar la transformación digital en tu empresa actual o futura.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00ffff]">
                  <span>Enfoque: Productividad y Herramientas No-Code</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="benefit-card rounded-2xl glass-panel p-8 flex flex-col h-full hover:border-[#ff007f]/30 hover:shadow-[0_0_20px_rgba(255,0,127,0.1)] transition-all duration-300" data-interactive>
                <div className="w-12 h-12 rounded-xl bg-[#ff007f]/10 flex items-center justify-center text-[#ff007f] mb-6 border border-[#ff007f]/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Estudiantes Universitarios</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  Obtén una ventaja competitiva masiva. Mientras la educación formal sigue desactualizada, en Net Academy aprendes a programar agentes inteligentes, usar RAG y construir portfolios reales que llamarán la atención de reclutadores inmediatamente.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#ff007f]">
                  <span>Enfoque: Proyectos, Código y Bases Técnicas</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="benefit-card rounded-2xl glass-panel p-8 flex flex-col h-full hover:border-[#39ff14]/30 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all duration-300" data-interactive>
                <div className="w-12 h-12 rounded-xl bg-[#39ff14]/10 flex items-center justify-center text-[#39ff14] mb-6 border border-[#39ff14]/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Equipos de Empresa</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  Optimiza la eficiencia interna de tu equipo. Capacitamos a tus colaboradores para crear bots de atención al cliente avanzados, configurar flujos automatizados de análisis documental y automatizar procesos repetitivos con seguridad de datos.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#39ff14]">
                  <span>Enfoque: ROI, Escalabilidad y Privacidad de Datos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLANES Y PRECIOS */}
        <section id="planes" className="pricing-section py-24 border-t border-white/5 bg-[#06080d]/40 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00ffff] mb-3 block">
                Inversión en tu Futuro
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Planes Sencillos y Transparentes
              </h2>
              <p className="text-slate-400 font-medium text-base">
                Elige la modalidad de aprendizaje que se alinee mejor con tu ritmo de vida y metas de carrera.
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch font-sans">
              <div className="pricing-card">
                <PricingCard
                  name="Curso Individual"
                  price="$79 USD"
                  period="pago único por curso"
                  description="Ideal para aprender un tema específico a tu propio ritmo, con acceso de por vida."
                  ctaText="Comprar Curso"
                  features={[
                    "Acceso de por vida al curso elegido",
                    "Actualizaciones gratuitas permanentes",
                    "Soporte básico en la comunidad",
                    "Certificado de finalización del curso",
                    "Código fuente y recursos descargables",
                  ]}
                />
              </div>
              <div className="pricing-card">
                <PricingCard
                  name="Suscripción Anual Pro"
                  price="$29 USD"
                  period="/ mes (cobrado anualmente)"
                  description="Nuestra opción recomendada para profesionales y estudiantes que buscan una formación continua."
                  ctaText="Suscribirse Ahora"
                  isPopular={true}
                  badgeText="Más Recomendado"
                  features={[
                    "Acceso ilimitado a todos los cursos (+15)",
                    "Nuevos cursos y bootcamps cada mes",
                    "Mentorías grupales en vivo semanales",
                    "Ruta de aprendizaje guiada y mentorizada",
                    "Acceso prioritario a bolsa de empleo",
                    "Certificados de especialidad profesional",
                  ]}
                />
              </div>
              <div className="pricing-card">
                <PricingCard
                  name="Bootcamp / Enterprise"
                  price="$599 USD"
                  period="pago único / planes a medida"
                  description="Acompañamiento intensivo y mentorías individuales 1-a-1 para una transformación total."
                  ctaText="Solicitar Acceso"
                  features={[
                    "Todo lo incluido en el plan Suscripción Pro",
                    "Mentoría y feedback individualizado 1-a-1",
                    "Desarrollo de un proyecto real para empresa",
                    "Revisión de portafolio y simulacros de entrevista",
                    "Canal exclusivo con asesores de carrera",
                    "Planes a medida y facturación para empresas",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL BLOCK / LEAD CAPTURE */}
        <section id="contacto" className="cta-section py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#00ffff]/20 p-8 md:p-14 text-center shadow-[0_0_35px_rgba(0,255,255,0.05)]">
              {/* Background gradient light */}
              <div className="cta-glow absolute top-0 left-1/2 w-[400px] h-[400px] bg-[#00ffff]/10 rounded-full filter blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#39ff14] mb-4 block">
                  Comienza Gratis Hoy
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                  ¿Listo para dominar la era de la IA?
                </h2>
                <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
                  Suscríbete para recibir nuestro **Minicurso Introductorio de IA y Automatización** con Nano Banana directamente en tu correo y da tu primer paso tecnológico.
                </p>

                {/* Lead Form */}
                {!submitted ? (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-3.5 max-w-lg mx-auto" data-interactive>
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_15px_rgba(0,255,255,0.15)] transition-all text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#ff007f] hover:brightness-110 text-sm font-bold text-[#06080d] shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all duration-200 shrink-0 hover:-translate-y-0.5"
                      data-interactive
                    >
                      Obtener Minicurso
                    </button>
                  </form>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-300">
                    <svg className="w-12 h-12 text-emerald-400 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-white font-bold text-base mb-1">¡Registro completado!</h4>
                    <p className="text-slate-300 text-sm">
                      Hemos enviado el primer módulo de tu minicurso por correo electrónico. Revisa tu bandeja de entrada.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#00ffff] hover:text-white mt-4 underline font-medium"
                    >
                      Registrar otro correo
                    </button>
                  </div>
                )}

                <p className="text-slate-500 text-xs mt-6">
                  Respetamos tu privacidad. Cancela tu suscripción cuando quieras con un solo clic.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
