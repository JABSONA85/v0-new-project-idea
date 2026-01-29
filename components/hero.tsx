"use client"

import { motion } from "framer-motion"
import { ArrowDown, Play } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Elegant geometric background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='none' stroke='currentColor' strokeWidth='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Corner decorative frames */}
      <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-gold/20 hidden lg:block" />
      <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-gold/20 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-gold/20 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-gold/20 hidden lg:block" />

      {/* Horizontal decorative lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.3 }}
        className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.5 }}
        className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent"
      />

      {/* Floating decorative dots */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-gold/30 hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-gold/20 hidden lg:block"
      />
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-gold/40 hidden lg:block"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Decorative line above overline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-px bg-gold mx-auto mb-8"
        />

        {/* Overline with decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-8 h-px bg-foreground/20" />
          <p className="text-accent text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
            Est. 2015 — Tbilisi, Georgia
          </p>
          <div className="w-8 h-px bg-foreground/20" />
        </motion.div>

        {/* Main Title - Elegant and refined */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] mb-10 text-balance tracking-wide"
          style={{
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
            letterSpacing: '0.02em',
          }}
        >
          <span className="block mb-2 bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text">
            {t.hero.title}
          </span>
        </motion.h1>

        {/* Luxury accent line under title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"
        />

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-gold/50" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Subtitle - Elegant and refined */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
          style={{ letterSpacing: '0.03em' }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons - Luxury styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase transition-all hover:bg-primary/90 shadow-lg"
          >
            <Play size={16} className="fill-current" />
            <span>{t.hero.cta}</span>
          </motion.a>
          <motion.a
            href="#calculator"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 bg-transparent text-foreground px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase border border-border hover:border-accent hover:text-accent transition-all"
          >
            <span>{t.hero.secondary}</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3 text-foreground/30"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>

      {/* Side decorative elements - Enhanced */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6"
      >
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
        <span className="text-[10px] tracking-[0.4em] text-foreground/30 rotate-90 origin-center whitespace-nowrap font-medium uppercase">
          Luxury Furniture
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
        <div className="w-px h-32 bg-gradient-to-b from-gold/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6"
      >
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
        <span className="text-[10px] tracking-[0.4em] text-foreground/30 -rotate-90 origin-center whitespace-nowrap font-medium uppercase">
          Granite Sinks
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
        <div className="w-px h-32 bg-gradient-to-b from-gold/40 via-transparent to-transparent" />
      </motion.div>
    </section>
  )
}
