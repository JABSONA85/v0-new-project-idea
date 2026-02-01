"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Cpu, Sparkles, Layers, Wand2 } from "lucide-react"

const services = [
  {
    icon: Cpu,
    titleKey: "parametric",
    descKey: "parametricDesc",
  },
  {
    icon: Sparkles,
    titleKey: "aiDesign",
    descKey: "aiDesignDesc",
  },
  {
    icon: Layers,
    titleKey: "precision",
    descKey: "precisionDesc",
  },
  {
    icon: Wand2,
    titleKey: "custom",
    descKey: "customDesc",
  },
]

const showcaseItems = [
  {
    image: "/images/cnc-coffee-table.jpg",
    titleKey: "coffeeTable",
    descKey: "coffeeTableDesc",
  },
  {
    image: "/images/cnc-wall-art.jpg",
    titleKey: "wallArt",
    descKey: "wallArtDesc",
  },
]

export function CncAiServices() {
  const { t } = useLanguage()

  return (
    <section id="cnc-ai" className="py-32 lg:py-40 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary-foreground" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-primary-foreground" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-primary-foreground" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-accent/20" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-accent/20" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-accent/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-accent/20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent/80 text-xs md:text-sm tracking-[0.5em] uppercase mb-6 block font-medium">
            {t.cncAi?.badge || "Innovation & Technology"}
          </span>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-foreground mb-8 tracking-tight">
            {t.cncAi?.title || "CNC + AI"}
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />

          <p className="text-primary-foreground/50 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            {t.cncAi?.subtitle || "Parametric design meets artificial intelligence. Create unique, one-of-a-kind furniture pieces with cutting-edge technology."}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <service.icon className="w-10 h-10 text-accent mb-6" strokeWidth={1.5} />
              
              <h3 className="font-serif text-xl text-primary-foreground mb-3">
                {t.cncAi?.services?.[service.titleKey] || service.titleKey}
              </h3>
              
              <p className="text-primary-foreground/50 text-sm leading-relaxed">
                {t.cncAi?.services?.[service.descKey] || service.descKey}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={t.cncAi?.showcase?.[item.titleKey] || item.titleKey}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block text-accent text-[10px] tracking-[0.3em] uppercase mb-3 pb-2 border-b border-accent/30">
                    CNC + AI
                  </span>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {t.cncAi?.showcase?.[item.titleKey] || item.titleKey}
                  </h3>
                  
                  <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-md">
                    {t.cncAi?.showcase?.[item.descKey] || item.descKey}
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-accent/0 group-hover:border-accent/50 transition-all duration-500" />
                <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-accent/0 group-hover:border-accent/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#calculator"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-5 text-sm font-medium tracking-[0.15em] uppercase transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            <Sparkles size={18} />
            {t.cncAi?.cta || "Design Your Piece"}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
