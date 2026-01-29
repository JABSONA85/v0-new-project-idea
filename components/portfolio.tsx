"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

type Category = "all" | "laminate" | "solidWood" | "granite" | "bedrooms"

interface PortfolioItem {
  id: number
  title: string
  category: Exclude<Category, "all">
  image: string
  description: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Modern Laminate Kitchen",
    category: "laminate",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    description: "Sleek white laminate with integrated handles",
  },
  {
    id: 2,
    title: "Natural Granite Sink",
    category: "granite",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    description: "Black granite with modern fixtures",
  },
  {
    id: 3,
    title: "Oak Wood Cabinet",
    category: "solidWood",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    description: "Handcrafted solid oak storage",
  },
  {
    id: 4,
    title: "Luxury Bedroom Suite",
    category: "bedrooms",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    description: "Complete bedroom furniture set",
  },
  {
    id: 5,
    title: "Contemporary Kitchen",
    category: "laminate",
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80",
    description: "Dark laminate with brass accents",
  },
  {
    id: 6,
    title: "Premium Granite Basin",
    category: "granite",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    description: "Grey granite with undermount design",
  },
  {
    id: 7,
    title: "Walnut Dining Set",
    category: "solidWood",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    description: "Solid walnut table and chairs",
  },
  {
    id: 8,
    title: "Master Bedroom",
    category: "bedrooms",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    description: "Custom wardrobe and bed frame",
  },
]

export function Portfolio() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: t.portfolio.categories.all },
    { key: "laminate", label: t.portfolio.categories.laminate },
    { key: "solidWood", label: t.portfolio.categories.solidWood },
    { key: "granite", label: t.portfolio.categories.granite },
    { key: "bedrooms", label: t.portfolio.categories.bedrooms },
  ]

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-32 lg:py-40 bg-primary relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-gold/10 hidden lg:block" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-gold/10 hidden lg:block" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-gold/10 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-gold/10 hidden lg:block" />

      {/* Background decorative lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary-foreground" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-primary-foreground" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-primary-foreground" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-px bg-gold mx-auto mb-10"
          />
          
          <span className="text-accent/80 text-xs md:text-sm tracking-[0.5em] uppercase mb-6 block font-medium">
            Our Portfolio
          </span>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-foreground mb-8 tracking-tight">
            {t.portfolio.title}
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-2 h-2 rotate-45 border border-gold/30" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          
          <p className="text-primary-foreground/50 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Category Filter - More elegant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 text-sm tracking-wider uppercase font-medium transition-all duration-300 ${
                activeCategory === category.key
                  ? "bg-accent text-accent-foreground"
                  : "bg-transparent text-primary-foreground/60 border border-primary-foreground/10 hover:border-accent/50 hover:text-primary-foreground"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative overflow-hidden cursor-pointer ${
                  index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${
                    index % 5 === 0 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Category tag */}
                      <span className="inline-block text-accent text-[10px] tracking-[0.3em] uppercase mb-4 pb-2 border-b border-accent/30">
                        {categories.find((c) => c.key === item.category)?.label}
                      </span>
                      
                      <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-primary-foreground/50 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
                  
                  {/* Corner accents on hover */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-20"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold/20" />
        </motion.div>
      </div>
    </section>
  )
}
