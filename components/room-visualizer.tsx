"use client"

import React from "react"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Upload, 
  Sparkles, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  ImageIcon,
  ChefHat,
  BedDouble,
  TreeDeciduous,
  Droplets,
  Info
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

type ProductCategory = "kitchen" | "bedroom" | "solidwood" | "granite"
type StyleType = "modern" | "classic" | "minimalist" | "rustic"

const productIcons = {
  kitchen: ChefHat,
  bedroom: BedDouble,
  solidwood: TreeDeciduous,
  granite: Droplets,
}

export function RoomVisualizer() {
  const { t } = useLanguage()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory>("kitchen")
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("modern")

  const products: { key: ProductCategory; label: string }[] = [
    { key: "kitchen", label: t.visualizer.products.kitchen },
    { key: "bedroom", label: t.visualizer.products.bedroom },
    { key: "solidwood", label: t.visualizer.products.solidwood },
    { key: "granite", label: t.visualizer.products.granite },
  ]

  const styles: { key: StyleType; label: string }[] = [
    { key: "modern", label: t.visualizer.styles.modern },
    { key: "classic", label: t.visualizer.styles.classic },
    { key: "minimalist", label: t.visualizer.styles.minimalist },
    { key: "rustic", label: t.visualizer.styles.rustic },
  ]

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setGeneratedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setGeneratedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleGenerate = async () => {
    if (!uploadedImage) return
    
    setIsGenerating(true)
    
    // TODO: დააკავშირეთ Fal AI სერვისი
    // API endpoint: /api/visualize
    // Request body: { image: uploadedImage, product: selectedProduct, style: selectedStyle }
    // Response: { generatedImageUrl: string }
    
    // დემო რეჟიმი - 3 წამის შემდეგ აჩვენებს placeholder-ს
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // სიმულაცია - რეალურ იმპლემენტაციაში აქ იქნება Fal AI-დან მიღებული URL
    setGeneratedImage("/placeholder.svg?height=600&width=800&text=AI+Generated+" + selectedProduct)
    setIsGenerating(false)
  }

  const handleReset = () => {
    setUploadedImage(null)
    setGeneratedImage(null)
  }

  const currentStep = !uploadedImage ? 1 : !generatedImage ? 2 : 3

  return (
    <section id="visualizer" className="py-32 lg:py-40 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-foreground" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-foreground" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-foreground" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-accent/20" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-accent/20" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-accent/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-accent/20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent/50" />
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent text-xs tracking-[0.4em] uppercase font-medium">
              AI Powered
            </span>
            <Sparkles className="w-5 h-5 text-accent" />
            <div className="w-12 h-px bg-accent/50" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {t.visualizer.title}
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.visualizer.subtitle}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { step: 1, label: t.visualizer.step1 },
            { step: 2, label: t.visualizer.step2 },
            { step: 3, label: t.visualizer.step3 },
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentStep >= item.step 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-xs font-medium">
                  {currentStep > item.step ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                </span>
                <span className="text-sm font-medium tracking-wide hidden sm:inline">{item.label}</span>
              </div>
              {index < 2 && (
                <div className={`w-8 md:w-16 h-px mx-2 ${
                  currentStep > item.step ? "bg-accent" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Upload & Settings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={() => setIsDragOver(false)}
              className={`relative aspect-[4/3] rounded-lg border-2 border-dashed transition-all overflow-hidden ${
                isDragOver 
                  ? "border-accent bg-accent/5" 
                  : uploadedImage 
                    ? "border-accent/50 bg-card" 
                    : "border-border bg-card hover:border-accent/50"
              }`}
            >
              {uploadedImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded room"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-primary-foreground text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {t.visualizer.imageUploaded}
                    </span>
                    <button
                      onClick={handleReset}
                      className="text-primary-foreground/80 hover:text-primary-foreground text-sm underline"
                    >
                      {t.visualizer.change}
                    </button>
                  </div>
                </div>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <motion.div
                    animate={{ y: isDragOver ? -5 : 0 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-foreground font-medium mb-2">{t.visualizer.dragDrop}</p>
                    <p className="text-muted-foreground text-sm">{t.visualizer.orClick}</p>
                  </motion.div>
                </label>
              )}
            </div>

            {/* Product Selection */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-sm font-medium text-foreground mb-4 tracking-wide uppercase">
                {t.visualizer.selectProduct}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => {
                  const Icon = productIcons[product.key]
                  return (
                    <motion.button
                      key={product.key}
                      onClick={() => setSelectedProduct(product.key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                        selectedProduct === product.key
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-accent/50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${selectedProduct === product.key ? "text-accent" : ""}`} />
                      <span className="text-sm font-medium">{product.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Style Selection */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-sm font-medium text-foreground mb-4 tracking-wide uppercase">
                {t.visualizer.selectStyle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <motion.button
                    key={style.key}
                    onClick={() => setSelectedStyle(style.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-3 rounded-lg border transition-all text-sm font-medium ${
                      selectedStyle === style.key
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {style.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={handleGenerate}
              disabled={!uploadedImage || isGenerating}
              whileHover={{ scale: uploadedImage && !isGenerating ? 1.02 : 1 }}
              whileTap={{ scale: uploadedImage && !isGenerating ? 0.98 : 1 }}
              className={`w-full py-4 rounded-lg font-medium tracking-wide uppercase text-sm transition-all flex items-center justify-center gap-3 ${
                uploadedImage && !isGenerating
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {t.visualizer.generating}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t.visualizer.generate}
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Right Side - Result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Result Display */}
            <div className="relative aspect-[4/3] rounded-lg border border-border bg-card overflow-hidden">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-primary/95"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                      <Sparkles className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-primary-foreground font-medium mt-6">{t.visualizer.aiWorking}</p>
                    <p className="text-primary-foreground/60 text-sm mt-2">{t.visualizer.pleaseWait}</p>
                  </motion.div>
                ) : generatedImage ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated visualization"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.visualizer.resultReady}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <ImageIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground text-sm text-center px-8">
                      {t.visualizer.resultPlaceholder}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download Button */}
            {generatedImage && (
              <motion.a
                href={generatedImage}
                download="artisan-visualization.jpg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-4 rounded-lg font-medium tracking-wide uppercase text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                {t.visualizer.download}
              </motion.a>
            )}

            {/* Info Box */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t.visualizer.howItWorks}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t.visualizer.howItWorksDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Service Notice */}
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
              <p className="text-accent text-sm text-center">
                {t.visualizer.notConnected}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
