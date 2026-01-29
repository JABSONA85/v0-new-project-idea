"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center bg-white/10 rounded-full p-1">
        <div className="w-8 h-8 rounded-full" />
      </div>
    )
  }

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ]

  return (
    <div className="flex items-center bg-white/10 rounded-full p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-2 rounded-full transition-all ${
            theme === value
              ? "bg-gold text-obsidian"
              : "text-offwhite/70 hover:text-offwhite"
          }`}
          title={label}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={16} />
            </motion.div>
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  )
}
