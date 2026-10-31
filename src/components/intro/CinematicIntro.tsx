'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitLogo } from '../brand/GitLogo';
import { useGitFlow } from '@/lib/store';
import { FastForward } from 'lucide-react';

export const CinematicIntro: React.FC = () => {
  const { isCinematicIntroComplete, completeIntro } = useGitFlow();
  const [phase, setPhase] = useState<number>(0);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);

    // If user already completed or prefers reduced motion, skip automatically
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || sessionStorage.getItem('gitflow_intro_played')) {
      completeIntro();
      return;
    }

    // Sequence timing
    // 0-2s: Dark screen, glowing Git orange symbol emerges
    // 2-4s: Rotating 3D Git logo with circulating purple energy rings
    // 4-5.5s: Wordmark appears
    // 5.5-7s: Tagline appears
    // 7s+: Exit to homepage

    const timer1 = setTimeout(() => setPhase(1), 2000); // 2s
    const timer2 = setTimeout(() => setPhase(2), 4000); // 4s
    const timer3 = setTimeout(() => setPhase(3), 5500); // 5.5s
    const timer4 = setTimeout(() => {
      sessionStorage.setItem('gitflow_intro_played', 'true');
      completeIntro();
    }, 7000); // 7s

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sessionStorage.setItem('gitflow_intro_played', 'true');
        completeIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeIntro]);

  const handleSkip = () => {
    sessionStorage.setItem('gitflow_intro_played', 'true');
    completeIntro();
  };

  if (!hasMounted || isCinematicIntroComplete) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none"
      >
        {/* Background Grid Pattern with Radial Falloff */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-15 pointer-events-none" />
        
        {/* Ambient Dark Horizon Radial Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-git-orange/10 blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-purple/15 blur-[160px] pointer-events-none" />

        {/* Central Visual Stage */}
        <div className="relative flex flex-col items-center justify-center z-10">
          {/* Phase 1 & 2: Purple Energy Rings (appears at 2-4s) */}
          {phase >= 1 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.9, 1.4, 1.8], opacity: [0.7, 0.4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-48 h-48 rounded-full border-2 border-brand-purple/60"
              />
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.7, 1.2, 1.6], opacity: [0.8, 0.3, 0] }}
                transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-64 h-64 rounded-full border border-brand-electric/50"
              />
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.8, 1.3, 1.9], opacity: [0.6, 0.2, 0] }}
                transition={{ duration: 2.2, delay: 1.4, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-80 h-80 rounded-full border border-git-orange/30"
              />
            </div>
          )}

          {/* Official Git Logo 3D Elevation / Rotation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, filter: 'blur(20px)' }}
            animate={{
              opacity: 1,
              scale: phase >= 1 ? [1, 1.08, 1] : 1,
              rotateY: phase >= 1 ? [0, 180, 360] : 0,
              filter: 'blur(0px)',
            }}
            transition={{
              opacity: { duration: 1.8, ease: 'easeOut' },
              scale: { duration: 2.5, ease: 'easeInOut' },
              rotateY: { duration: 2.5, ease: 'easeInOut' },
            }}
            className="relative p-6 rounded-2xl bg-bg-surface/50 border border-border/50 backdrop-blur-xl shadow-[0_0_80px_rgba(240,80,50,0.35)]"
          >
            <GitLogo size={80} />
          </motion.div>

          {/* Phase 2: Wordmark appears (4.0s - 5.5s) */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="mt-8 text-center"
            >
              <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-widest text-white">
                GIT<span className="text-git-orange">FLOW</span>
              </h1>
            </motion.div>
          )}

          {/* Phase 3: Tagline appears (5.5s - 7.0s) */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-4 flex flex-col items-center gap-2"
            >
              <p className="font-mono font-bold tracking-[0.25em] text-sm sm:text-base text-brand-electric uppercase">
                AUTOMATE. CONTRIBUTE. GROW.
              </p>
              <span className="text-xs font-mono tracking-wider text-text-muted">
                365 DAYS. REAL CODE. REAL DEVELOPER GROWTH.
              </span>
            </motion.div>
          )}
        </div>

        {/* Accessible Skip Button (Always available, bottom-right) */}
        <motion.button
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface/80 border border-border text-xs font-mono text-text-muted hover:text-white hover:border-git-orange transition-all"
          aria-label="Skip Introduction"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] bg-bg-elevated px-1.5 py-0.5 rounded border border-border">ESC</span>
          <FastForward className="w-3.5 h-3.5 text-git-orange" />
        </motion.button>

        {/* Progress bar along the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/40">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 7, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-git-orange via-brand-purple to-brand-electric"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
