"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Award, Users, Clock, Gem } from "lucide-react"

export function About() {
  const { t } = useLanguage()

  const stats = [
    { icon: Clock, value: "15+", labelKa: "წლის გამოცდილება", labelEn: "Years Experience", labelRu: "Лет опыта" },
    { icon: Users, value: "2000+", labelKa: "კმაყოფილი მომხმარებელი", labelEn: "Happy Clients", labelRu: "Довольных клиентов" },
    { icon: Award, value: "500+", labelKa: "დასრულებული პროექტი", labelEn: "Projects Completed", labelRu: "Завершенных проектов" },
    { icon: Gem, value: "100%", labelKa: "ხარისხის გარანტია", labelEn: "Quality Guarantee", labelRu: "Гарантия качества" },
  ]

  const getLabel = (stat: typeof stats[0]) => {
    const lang = t.nav.portfolio === "პორტფოლიო" ? "ka" : t.nav.portfolio === "Portfolio" ? "en" : "ru"
    return lang === "ka" ? stat.labelKa : lang === "en" ? stat.labelEn : stat.labelRu
  }

  return (
    <section id="about" className="relative py-32 md:py-40 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23B8A078' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-px h-32 bg-gradient-to-t from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-transparent via-gold/30 to-transparent" />

      {/* Corner Frames */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold/20" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-gold/20" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-gold/20" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gold/20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-gold/60" />
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              {t.nav.portfolio === "პორტფოლიო" ? "ჩვენს შესახებ" : t.nav.portfolio === "Portfolio" ? "About Us" : "О нас"}
            </span>
            <span className="w-12 h-px bg-gold/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-8 text-balance"
          >
            {t.nav.portfolio === "პორტფოლიო" 
              ? "ოსტატობა და ხარისხი" 
              : t.nav.portfolio === "Portfolio" 
              ? "Craftsmanship & Quality" 
              : "Мастерство и Качество"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-foreground/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {t.nav.portfolio === "პორტფოლიო" 
              ? "15 წელზე მეტია ვქმნით უნიკალურ ავეჯს და გრანიტის ნიჟარებს. ყოველი პროექტი არის ხელოვნების ნიმუში, შექმნილი თქვენი ხედვისა და ჩვენი ოსტატობის შერწყმით." 
              : t.nav.portfolio === "Portfolio" 
              ? "For over 15 years, we have been creating unique furniture and granite sinks. Each project is a work of art, created by combining your vision with our craftsmanship." 
              : "Более 15 лет мы создаём уникальную мебель и гранитные мойки. Каждый проект — это произведение искусства, созданное сочетанием вашего видения и нашего мастерства."}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-gold/30 transition-all duration-500">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-500" />

                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-6 group-hover:bg-gold/20 transition-colors">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                
                <div className="font-serif text-4xl md:text-5xl text-primary-foreground mb-3">
                  {stat.value}
                </div>
                
                <div className="text-primary-foreground/50 text-sm tracking-wide uppercase">
                  {getLabel(stat)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-20"
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <span className="w-2 h-2 rotate-45 border border-gold/40" />
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>
      </div>
    </section>
  )
}
