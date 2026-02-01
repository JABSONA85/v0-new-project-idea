"use client"

import { LanguageProvider } from "@/lib/language-context"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { About } from "@/components/about"
import { CncAiServices } from "@/components/cnc-ai-services"
import { RoomVisualizer } from "@/components/room-visualizer"
import { Calculator } from "@/components/calculator"
import { ChatWidget } from "@/components/chat-widget"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative">
        <Navigation />
        <Hero />
        <Portfolio />
        <About />
        <CncAiServices />
        <RoomVisualizer />
        <Calculator />
        <Footer />
        <ChatWidget />
      </main>
    </LanguageProvider>
  )
}
