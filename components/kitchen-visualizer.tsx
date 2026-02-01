"use client"

import React from "react"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, ImageIcon, Sparkles, X, Download, RefreshCw, Wand2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function KitchenVisualizer() {
  const { t } = useLanguage()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [kitchenStyle, setKitchenStyle] = useState<string>("modern")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const kitchenStyles = [
    { key: "modern", label: t.visualizer?.styles?.modern || "თანამედროვე" },
    { key: "classic", label: t.visualizer?.styles?.classic || "კლასიკური" },
    { key: "minimalist", label: t.visualizer?.styles?.minimalist || "მინიმალისტური" },
    { key: "rustic", label: t.visualizer?.styles?.rustic || "რუსტიკული" },
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
    if (file && file.type.startsWith("image/")) {
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
    
    // Simulate AI generation delay - replace with actual Fal AI call when connected
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // For now, show a placeholder message since Fal AI is not connected
    // When Fal AI is connected, this will be replaced with actual generation
    setIsGenerating(false)
    
    // Placeholder: In production, this would be the generated image URL
    // setGeneratedImage(result.imageUrl)
    alert(t.visualizer?.notConnected || "AI სერვისი ჯერ არ არის დაკავშირებული. გთხოვთ დააკავშიროთ Fal AI.")
  }

  const handleReset = () => {
    setUploadedImage(null)
    setGeneratedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <section id="visualizer" className="py-32 lg:py-40 bg-secondary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-foreground" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-foreground" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-foreground" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-accent/20" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-accent/20" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-accent/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-accent/20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent/50" />
            <Wand2 className="w-5 h-5 text-accent" />
            <div className="w-12 h-px bg-accent/50" />
          </div>
          
          <span className="text-accent text-xs md:text-sm tracking-[0.4em] uppercase mb-6 block font-medium">
            AI Visualization
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-wide">
            {t.visualizer?.title || "სამზარეულოს ვიზუალიზატორი"}
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.visualizer?.subtitle || "ატვირთეთ თქვენი ოთახის ფოტო და ნახეთ როგორი იქნება ახალი სამზარეულო"}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground tracking-wide uppercase">
                <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">1</span>
                {t.visualizer?.step1 || "ატვირთეთ ფოტო"}
              </div>

              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-[4/3] rounded-lg border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
                  isDragOver 
                    ? "border-accent bg-accent/5" 
                    : uploadedImage 
                      ? "border-accent/50" 
                      : "border-border hover:border-accent/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {uploadedImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded room"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleReset() }}
                      className="absolute top-3 right-3 w-8 h-8 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                      <p className="text-primary-foreground text-sm">
                        {t.visualizer?.imageUploaded || "ფოტო ატვირთულია"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Upload className="w-7 h-7 text-accent" />
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      {t.visualizer?.dragDrop || "ჩააგდეთ ფოტო აქ"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {t.visualizer?.orClick || "ან დააჭირეთ ასარჩევად"}
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-4">
                      PNG, JPG, WEBP (max. 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Style Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground tracking-wide uppercase">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">2</span>
                  {t.visualizer?.step2 || "აირჩიეთ სტილი"}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {kitchenStyles.map((style) => (
                    <button
                      key={style.key}
                      onClick={() => setKitchenStyle(style.key)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        kitchenStyle === style.key
                          ? "bg-accent text-accent-foreground"
                          : "bg-card border border-border text-foreground hover:border-accent/50"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={!uploadedImage || isGenerating}
                whileHover={{ scale: uploadedImage && !isGenerating ? 1.02 : 1 }}
                whileTap={{ scale: uploadedImage && !isGenerating ? 0.98 : 1 }}
                className={`w-full py-4 rounded-lg font-medium tracking-wide uppercase text-sm flex items-center justify-center gap-3 transition-all ${
                  uploadedImage && !isGenerating
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t.visualizer?.generating || "გენერირება..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t.visualizer?.generate || "გენერირება"}
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Result Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground tracking-wide uppercase">
                <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">3</span>
                {t.visualizer?.step3 || "შედეგი"}
              </div>

              {/* Result Display */}
              <div className="relative aspect-[4/3] rounded-lg border border-border bg-card overflow-hidden">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-card"
                    >
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                        <Wand2 className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-foreground font-medium mt-6">
                        {t.visualizer?.aiWorking || "AI მუშაობს..."}
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        {t.visualizer?.pleaseWait || "გთხოვთ დაელოდოთ"}
                      </p>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={generatedImage || "/placeholder.svg"}
                        alt="Generated kitchen"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-primary-foreground text-sm font-medium">
                            {t.visualizer?.resultReady || "შედეგი მზადაა"}
                          </p>
                          <button className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                            <Download size={16} />
                            {t.visualizer?.download || "ჩამოტვირთვა"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <ImageIcon className="w-7 h-7 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {t.visualizer?.resultPlaceholder || "აქ გამოჩნდება გენერირებული სურათი"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info Card */}
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {t.visualizer?.howItWorks || "როგორ მუშაობს?"}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t.visualizer?.howItWorksDesc || "AI ანალიზებს თქვენს ოთახს და ქმნის რეალისტურ ვიზუალიზაციას არჩეული სტილის სამზარეულოთი."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
