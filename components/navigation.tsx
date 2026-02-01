"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage, type Language } from "@/lib/language-context"
import { ThemeToggle } from "@/components/theme-toggle"

const languages: { code: Language; label: string }[] = [
  { code: "ka", label: "ქარ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "РУ" },
]

export function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#cnc-ai", label: t.nav.cncAi },
    { href: "#visualizer", label: t.nav.visualizer },
    { href: "#calculator", label: t.nav.calculator },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="mx-4 mt-4 rounded-2xl bg-obsidian/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <span className="text-2xl font-serif font-bold text-offwhite tracking-tight">
                  ARTISAN
                </span>
                <span className="text-gold ml-1">.</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="text-offwhite/80 hover:text-gold transition-colors text-sm tracking-wide"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle, Language Switcher & Admin */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center bg-white/10 rounded-full p-1">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      language === lang.code
                        ? "bg-gold text-obsidian"
                        : "text-offwhite/70 hover:text-offwhite"
                    }`}
                  >
                    {lang.label}
                  </motion.button>
                ))}
              </div>
              <Link href="/admin">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-offwhite/60 hover:text-gold transition-colors text-xs tracking-wide"
                >
                  {t.nav.admin}
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-offwhite p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-offwhite/80 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block text-offwhite/60 hover:text-gold transition-colors text-sm"
                >
                  {t.nav.admin}
                </Link>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          language === lang.code
                            ? "bg-gold text-obsidian"
                            : "bg-white/10 text-offwhite/70"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
