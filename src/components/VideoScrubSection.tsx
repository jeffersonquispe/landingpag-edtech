'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrubSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);

  useGSAP(
    () => {
      if (!videoRef.current) return;

      const video = videoRef.current;

      // Handle video errors
      const handleVideoError = () => {
        console.warn('Video failed to load');
        setVideoError(true);
      };

      video.addEventListener('error', handleVideoError);

      // Wait for video metadata
      const onLoadedMetadata = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=4000',
            scrub: 0.5,
            pin: true,
            markers: false,
          },
        });

        // Scrub video based on scroll
        tl.to(video, {
          currentTime: video.duration,
          ease: 'none',
        });

        // Fade out overlay content
        tl.to(
          contentRef.current,
          {
            opacity: 0,
            y: -50,
            ease: 'power2.inOut',
          },
          0
        );

        // Add section title animation
        gsap.from('.scrub-title', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'top 20%',
            scrub: 1,
          },
          opacity: 0,
          y: 40,
          duration: 1,
        });
      };

      if (video.readyState >= 1) {
        onLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', onLoadedMetadata);
      }

      return () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('error', handleVideoError);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Fallback Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06080d] via-[#0a0f1f] to-[#06080d] z-0" />

      {/* Video Error Fallback */}
      {videoError ? (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-white text-xl font-bold mb-2">Video no disponible</h3>
            <p className="text-slate-400 text-sm">No pudimos cargar el video en este momento.</p>
          </div>
        </div>
      ) : null}

      {/* Video Element from YouTube */}
      {!videoError ? (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://img.youtube.com/vi/18FeGXyB-sI/maxresdefault.jpg"
        >
          <source src="/videos/scrub-video.mp4" type="video/mp4" />
        </video>
      ) : null}

      {/* Gradient Overlay */}
      {!videoError ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      ) : null}

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center"
      >
        <h2 className="scrub-title text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
          Aprende a Escala con{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff007f] to-[#39ff14]">
            Nano Banana
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
          Nuestras metodologías probadas han transformado miles de profesionales.
          Mira cómo funciona en esta sección interactiva.
        </p>
        <div className="flex items-center gap-2 text-sm text-[#39ff14] font-semibold">
          <span>Scroll para revelar</span>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#00ffff]/20 to-[#ff007f]/10 rounded-full filter blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#39ff14]/15 to-[#ff007f]/15 rounded-full filter blur-3xl opacity-20 -z-10" />
    </section>
  );
}
