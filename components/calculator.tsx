"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Ruler, Sparkles, Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type ProductCategory = "kitchen" | "bedroom" | "sink"
type Material = "premiumLaminate" | "naturalOak" | "granite"

interface PriceConstants {
  baseRatePerSqM: Record<ProductCategory, number>
  materialMultiplier: Record<Material, number>
  addons: {
    ledLighting: number
    premiumHandles: number
    softClose: number
  }
}

const PRICE_CONSTANTS: PriceConstants = {
  baseRatePerSqM: {
    kitchen: 450,
    bedroom: 350,
    sink: 800,
  },
  materialMultiplier: {
    premiumLaminate: 1.0,
    naturalOak: 1.8,
    granite: 2.2,
  },
  addons: {
    ledLighting: 250,
    premiumHandles: 180,
    softClose: 120,
  },
}

export function Calculator() {
  const { t } = useLanguage()
  const [category, setCategory] = useState<ProductCategory>("kitchen")
  const [dimensions, setDimensions] = useState({
    length: 200,
    width: 60,
    height: 90,
  })
  const [material, setMaterial] = useState<Material>("premiumLaminate")
  const [addons, setAddons] = useState({
    ledLighting: false,
    premiumHandles: false,
    softClose: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const categories: { key: ProductCategory; label: string }[] = [
    { key: "kitchen", label: t.portfolio.categories.laminate },
    { key: "bedroom", label: t.portfolio.categories.bedrooms },
    { key: "sink", label: t.portfolio.categories.granite },
  ]

  const materials: { key: Material; label: string }[] = [
    { key: "premiumLaminate", label: t.calculator.materials.premiumLaminate },
    { key: "naturalOak", label: t.calculator.materials.naturalOak },
    { key: "granite", label: t.calculator.materials.granite },
  ]

  const totalPrice = useMemo(() => {
    const areaInSqM = (dimensions.length * dimensions.width) / 10000
    const basePrice = areaInSqM * PRICE_CONSTANTS.baseRatePerSqM[category]
    const materialPrice = basePrice * PRICE_CONSTANTS.materialMultiplier[material]

    let addonPrice = 0
    if (addons.ledLighting) addonPrice += PRICE_CONSTANTS.addons.ledLighting
    if (addons.premiumHandles) addonPrice += PRICE_CONSTANTS.addons.premiumHandles
    if (addons.softClose) addonPrice += PRICE_CONSTANTS.addons.softClose

    return Math.round(materialPrice + addonPrice)
  }, [category, dimensions, material, addons])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="calculator" className="py-32 lg:py-40 bg-offwhite relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-obsidian" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-obsidian" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-obsidian" />
      </div>

      {/* Corner decorative frames */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-gold/15 hidden lg:block" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-gold/15 hidden lg:block" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-gold/15 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-gold/15 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-px bg-gold mx-auto mb-10"
          />

          <div className="flex items-center justify-center gap-3 mb-6">
            <Ruler className="w-4 h-4 text-gold" />
            <span className="text-gold/80 text-xs md:text-sm tracking-[0.5em] uppercase font-medium">
              Price Calculator
            </span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-obsidian mb-8 tracking-tight">
            {t.calculator.title}
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <div className="w-2 h-2 rotate-45 border border-gold/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <p className="text-obsidian/50 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Category Selection */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase font-medium text-obsidian/70 mb-6">
                {t.calculator.category}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-5 text-sm tracking-wide font-medium transition-all duration-300 ${
                      category === cat.key
                        ? "bg-obsidian text-offwhite"
                        : "bg-white text-obsidian border border-obsidian/10 hover:border-gold/50"
                    }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase font-medium text-obsidian/70 mb-6">
                {t.calculator.dimensions}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: "length", label: t.calculator.length },
                  { key: "width", label: t.calculator.width },
                  { key: "height", label: t.calculator.height },
                ].map((dim) => (
                  <div key={dim.key}>
                    <label className="block text-xs text-obsidian/50 mb-3 tracking-wide">
                      {dim.label}
                    </label>
                    <input
                      type="number"
                      value={dimensions[dim.key as keyof typeof dimensions]}
                      onChange={(e) =>
                        setDimensions((prev) => ({
                          ...prev,
                          [dim.key]: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-5 py-4 bg-white border border-obsidian/10 text-obsidian text-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase font-medium text-obsidian/70 mb-6">
                {t.calculator.material}
              </label>
              <div className="space-y-3">
                {materials.map((mat) => (
                  <motion.button
                    key={mat.key}
                    onClick={() => setMaterial(mat.key)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full px-6 py-5 text-left text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                      material === mat.key
                        ? "bg-obsidian text-offwhite"
                        : "bg-white text-obsidian border border-obsidian/10 hover:border-gold/50"
                    }`}
                  >
                    <span className="tracking-wide">{mat.label}</span>
                    <span className={`text-xs ${material === mat.key ? 'text-gold' : 'text-obsidian/40'}`}>
                      x{PRICE_CONSTANTS.materialMultiplier[mat.key]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase font-medium text-obsidian/70 mb-6">
                {t.calculator.addons}
              </label>
              <div className="space-y-4 bg-white p-8 border border-obsidian/10">
                {[
                  {
                    key: "ledLighting",
                    label: t.calculator.ledLighting,
                    price: PRICE_CONSTANTS.addons.ledLighting,
                  },
                  {
                    key: "premiumHandles",
                    label: t.calculator.premiumHandles,
                    price: PRICE_CONSTANTS.addons.premiumHandles,
                  },
                  {
                    key: "softClose",
                    label: t.calculator.softClose,
                    price: PRICE_CONSTANTS.addons.softClose,
                  },
                ].map((addon) => (
                  <div
                    key={addon.key}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-4">
                      <Switch
                        id={addon.key}
                        checked={addons[addon.key as keyof typeof addons]}
                        onCheckedChange={(checked) =>
                          setAddons((prev) => ({ ...prev, [addon.key]: checked }))
                        }
                      />
                      <Label
                        htmlFor={addon.key}
                        className="text-sm text-obsidian cursor-pointer tracking-wide"
                      >
                        {addon.label}
                      </Label>
                    </div>
                    <span className="text-sm text-gold font-medium">+${addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Price Display - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-obsidian p-10 lg:p-14 text-center relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-gold/20" />
              <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-gold/20" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-gold/20" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-gold/20" />

              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />

              <div className="relative">
                <Sparkles className="w-10 h-10 text-gold mx-auto mb-8" />
                
                <p className="text-offwhite/50 text-xs tracking-[0.4em] uppercase mb-6 font-medium">
                  {t.calculator.total}
                </p>
                
                <motion.div
                  key={totalPrice}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-10"
                >
                  <span className="font-serif text-7xl lg:text-8xl xl:text-9xl text-offwhite tracking-tight">
                    ${totalPrice.toLocaleString()}
                  </span>
                </motion.div>

                {/* Price breakdown */}
                <div className="space-y-4 mb-10 text-left bg-white/5 p-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-offwhite/50 tracking-wide">Base price</span>
                    <span className="text-offwhite font-medium">
                      ${Math.round(
                        ((dimensions.length * dimensions.width) / 10000) *
                          PRICE_CONSTANTS.baseRatePerSqM[category]
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-offwhite/50 tracking-wide">Material multiplier</span>
                    <span className="text-offwhite font-medium">
                      x{PRICE_CONSTANTS.materialMultiplier[material]}
                    </span>
                  </div>
                  {Object.entries(addons).some(([, v]) => v) && (
                    <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                      <span className="text-offwhite/50 tracking-wide">Add-ons</span>
                      <span className="text-gold font-medium">
                        +$
                        {(
                          (addons.ledLighting
                            ? PRICE_CONSTANTS.addons.ledLighting
                            : 0) +
                          (addons.premiumHandles
                            ? PRICE_CONSTANTS.addons.premiumHandles
                            : 0) +
                          (addons.softClose
                            ? PRICE_CONSTANTS.addons.softClose
                            : 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 font-medium flex items-center justify-center gap-3 transition-all text-lg tracking-wide ${
                    submitted
                      ? "bg-green-500 text-white"
                      : "bg-gold text-obsidian hover:bg-gold/90"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                  ) : submitted ? (
                    "Request Sent"
                  ) : (
                    <>
                      <Send size={18} />
                      {t.calculator.requestQuote}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
