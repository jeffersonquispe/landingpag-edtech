"use client";

import { useState, useEffect } from "react";
import { Brain, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#080b11]/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
            <div className="w-full h-full bg-[#080b11] rounded-[10px] flex items-center justify-center">
              <Brain className="w-5.5 h-5.5 text-secondary group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight">
            Net<span className="text-secondary"> Academy</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#cursos"
            className="text-sm font-medium text-slate-300 hover:text-white hover:text-secondary transition-colors duration-200"
          >
            Cursos
          </a>
          <a
            href="#planes"
            className="text-sm font-medium text-slate-300 hover:text-white hover:text-secondary transition-colors duration-200"
          >
            Planes
          </a>
          <a
            href="#beneficios"
            className="text-sm font-medium text-slate-300 hover:text-white hover:text-secondary transition-colors duration-200"
          >
            Beneficios
          </a>
          <a
            href="#contacto"
            className="text-sm font-medium text-slate-300 hover:text-white hover:text-secondary transition-colors duration-200"
          >
            Contacto
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#planes"
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:brightness-110 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Empezar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#080b11]/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <a
            href="#cursos"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white py-2 transition-colors border-b border-white/5"
          >
            Cursos
          </a>
          <a
            href="#planes"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white py-2 transition-colors border-b border-white/5"
          >
            Planes
          </a>
          <a
            href="#beneficios"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white py-2 transition-colors border-b border-white/5"
          >
            Beneficios
          </a>
          <a
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white py-2 transition-colors border-b border-white/5"
          >
            Contacto
          </a>
          <div className="pt-2">
            <a
              href="#planes"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold text-white shadow-lg shadow-primary/20"
            >
              Empezar Ahora
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
