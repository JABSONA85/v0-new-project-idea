"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function ChatWidget() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      setMessages([
        {
          id: 1,
          text: t.chat.greeting,
          isBot: true,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length, t.chat.greeting])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response (this would be replaced with n8n integration)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const botResponses = [
      "Thank you for your interest! Our team will review your inquiry and get back to you shortly.",
      "I can help you with custom furniture designs. What dimensions are you looking for?",
      "Our granite sinks are sourced from the finest quarries. Would you like to see our collection?",
      "For a detailed quote, please use our price calculator or leave your contact details.",
    ]

    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponses[Math.floor(Math.random() * botResponses.length)],
      isBot: true,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botMessage])
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-accent-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-accent-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-primary-foreground">
                  {t.chat.title}
                </h3>
                <p className="text-primary-foreground/60 text-xs">AI-Powered Assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-card/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.isBot
                        ? "bg-card text-card-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isBot ? "text-card-foreground/40" : "text-primary-foreground/40"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-card px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-card border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 px-4 py-3 rounded-full bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-accent-foreground" />
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Ready for n8n AI integration
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
