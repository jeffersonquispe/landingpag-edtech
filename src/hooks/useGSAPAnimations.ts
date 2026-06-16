'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function useHeroEntrance() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Badge entrada
      tl.from('.hero-badge', {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Título: revelar por caracteres (fade + slide)
      tl.from(
        '.hero-title',
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Descripción
      tl.from(
        '.hero-desc',
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Botones staggered
      tl.from(
        '.hero-button',
        {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
        },
        '-=0.3'
      );

      // Trust badges con pulse
      tl.from(
        '.trust-badge',
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.08,
        },
        '-=0.2'
      );

      // Terminal graphic parallax fade
      tl.from(
        '.hero-terminal',
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.out',
        },
        0
      );
    },
    { scope: containerRef }
  );

  return containerRef;
}

export function useScrollReveals() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Beneficios cards fade-up
      gsap.utils.toArray<HTMLElement>('.benefit-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      // Pricing cards staggered on scroll
      const pricingCards = gsap.utils.toArray<HTMLElement>('.pricing-card');
      if (pricingCards.length > 0) {
        gsap.from(pricingCards, {
          scrollTrigger: {
            trigger: '.pricing-section',
            start: 'top 70%',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        });
      }

      // CTA section glow animation
      gsap.to('.cta-glow', {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        opacity: 1,
        scale: 1.2,
        ease: 'none',
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

export function useCardMicroInteractions() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Hover effects para cards y botones
      const interactiveEls = gsap.utils.toArray<HTMLElement>(
        '[data-interactive]'
      );

      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            y: -4,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      });

      // Button scale on click
      gsap.utils.toArray<HTMLElement>('button, a[role="button"]').forEach((btn) => {
        btn.addEventListener('mousedown', () => {
          gsap.to(btn, {
            scale: 0.97,
            duration: 0.15,
            overwrite: 'auto',
          });
        });

        btn.addEventListener('mouseup', () => {
          gsap.to(btn, {
            scale: 1,
            duration: 0.15,
            overwrite: 'auto',
          });
        });
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

export function useParallaxText(selector: string) {
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
      });
    });
  });
}

export function useCarouselAnimations() {
  useGSAP(() => {
    // Animate carousel cards on scroll
    gsap.utils.toArray<HTMLElement>('.carousel-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: '.courses-carousel',
          start: 'top 75%',
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'back.out(1.2)',
      });
    });
  });
}
