"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  FolderKanban,
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Search,
  Filter,
} from "lucide-react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"

// Mock Data Types
interface PriceRequest {
  id: number
  customerName: string
  email: string
  category: string
  dimensions: string
  material: string
  addons: string[]
  total: number
  status: "pending" | "contacted" | "completed"
  date: string
}

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  featured: boolean
}

interface PricingRate {
  id: number
  category: string
  material: string
  ratePerSqM: number
}

// Initial Mock Data
const initialPriceRequests: PriceRequest[] = [
  {
    id: 1,
    customerName: "Giorgi Beridze",
    email: "giorgi@example.com",
    category: "Kitchen",
    dimensions: "300x60x90 cm",
    material: "Premium Laminate",
    addons: ["LED Lighting", "Soft-close"],
    total: 2450,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: 2,
    customerName: "Nino Chikhladze",
    email: "nino@example.com",
    category: "Bedroom",
    dimensions: "250x50x220 cm",
    material: "Natural Oak",
    addons: ["Premium Handles"],
    total: 3800,
    status: "contacted",
    date: "2024-01-14",
  },
  {
    id: 3,
    customerName: "David Lomidze",
    email: "david@example.com",
    category: "Sink",
    dimensions: "80x50x20 cm",
    material: "Granite",
    addons: [],
    total: 1200,
    status: "completed",
    date: "2024-01-12",
  },
]

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Modern White Kitchen",
    category: "laminate",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Sleek modern design with integrated appliances",
    featured: true,
  },
  {
    id: 2,
    title: "Classic Oak Wardrobe",
    category: "solidWood",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400",
    description: "Handcrafted solid oak storage solution",
    featured: false,
  },
  {
    id: 3,
    title: "Black Granite Basin",
    category: "granite",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
    description: "Premium black granite with modern fixtures",
    featured: true,
  },
]

const initialPricingRates: PricingRate[] = [
  { id: 1, category: "Kitchen", material: "Premium Laminate", ratePerSqM: 450 },
  { id: 2, category: "Kitchen", material: "Natural Oak", ratePerSqM: 810 },
  { id: 3, category: "Kitchen", material: "Granite", ratePerSqM: 990 },
  { id: 4, category: "Bedroom", material: "Premium Laminate", ratePerSqM: 350 },
  { id: 5, category: "Bedroom", material: "Natural Oak", ratePerSqM: 630 },
  { id: 6, category: "Sink", material: "Granite", ratePerSqM: 1760 },
]

type Tab = "requests" | "projects" | "pricing"

function AdminContent() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<Tab>("requests")
  const [priceRequests, setPriceRequests] = useState(initialPriceRequests)
  const [projects, setProjects] = useState(initialProjects)
  const [pricingRates, setPricingRates] = useState(initialPricingRates)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingRate, setEditingRate] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const tabs = [
    { key: "requests" as Tab, label: t.admin.priceRequests, icon: FileText },
    { key: "projects" as Tab, label: t.admin.projectManager, icon: FolderKanban },
    { key: "pricing" as Tab, label: t.admin.pricingTable, icon: DollarSign },
  ]

  const updateRequestStatus = (id: number, status: PriceRequest["status"]) => {
    setPriceRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    )
  }

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const toggleFeatured = (id: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    )
  }

  const updatePricingRate = (id: number) => {
    const newRate = parseFloat(editValue)
    if (!isNaN(newRate) && newRate > 0) {
      setPricingRates((prev) =>
        prev.map((rate) =>
          rate.id === id ? { ...rate, ratePerSqM: newRate } : rate
        )
      )
    }
    setEditingRate(null)
    setEditValue("")
  }

  const filteredRequests = priceRequests.filter(
    (req) =>
      req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: PriceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-500"
      case "contacted":
        return "bg-blue-500/20 text-blue-500"
      case "completed":
        return "bg-green-500/20 text-green-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="font-serif text-2xl text-primary-foreground">
                  {t.admin.title}
                </h1>
                <p className="text-primary-foreground/60 text-sm">Manage your studio</p>
              </div>
            </div>
            <span className="font-serif text-xl text-primary-foreground">
              ARTISAN<span className="text-accent">.</span>
            </span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-primary/95 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "text-accent border-accent"
                    : "text-primary-foreground/60 border-transparent hover:text-primary-foreground"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Price Requests Tab */}
          {activeTab === "requests" && (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Search Bar */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                <button className="px-4 py-3 bg-card border border-border rounded-xl flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Filter size={18} />
                  Filter
                </button>
              </div>

              {/* Requests Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Customer
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Details
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Total
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-t border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">
                                {request.customerName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p>
                                {request.category} • {request.material}
                              </p>
                              <p className="text-muted-foreground">
                                {request.dimensions}
                              </p>
                              {request.addons.length > 0 && (
                                <p className="text-accent text-xs mt-1">
                                  + {request.addons.join(", ")}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-serif text-lg">
                              {request.total.toLocaleString()} ₾
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                request.status
                              )}`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {request.status === "pending" && (
                                <button
                                  onClick={() =>
                                    updateRequestStatus(request.id, "contacted")
                                  }
                                  className="px-3 py-1.5 bg-blue-500/20 text-blue-500 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors"
                                >
                                  Mark Contacted
                                </button>
                              )}
                              {request.status === "contacted" && (
                                <button
                                  onClick={() =>
                                    updateRequestStatus(request.id, "completed")
                                  }
                                  className="px-3 py-1.5 bg-green-500/20 text-green-500 rounded-lg text-xs font-medium hover:bg-green-500/30 transition-colors"
                                >
                                  Complete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Add Button */}
              <div className="mb-6 flex justify-end">
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-xl flex items-center gap-2 font-medium hover:bg-accent/90 transition-colors">
                  <Plus size={18} />
                  Add Project
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="bg-card rounded-2xl border border-border overflow-hidden group"
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                      <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="w-10 h-10 bg-red-500/20 backdrop-blur rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {project.category}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            project.featured
                              ? "bg-accent/20 text-accent"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill={project.featured ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-serif text-xl">Price per Square Meter</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update base rates for each category and material combination
                  </p>
                </div>
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                        Category
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                        Material
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                        Rate / m²
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRates.map((rate) => (
                      <tr
                        key={rate.id}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">
                          {rate.category}
                        </td>
                        <td className="px-6 py-4">{rate.material}</td>
                        <td className="px-6 py-4">
                          {editingRate === rate.id ? (
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-24 px-3 py-1.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                              autoFocus
                            />
                          ) : (
                            <span className="font-serif text-lg">
                              {rate.ratePerSqM} ₾
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingRate === rate.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updatePricingRate(rate.id)}
                                className="w-8 h-8 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-colors"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingRate(null)
                                  setEditValue("")
                                }}
                                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingRate(rate.id)
                                setEditValue(rate.ratePerSqM.toString())
                              }}
                              className="w-8 h-8 bg-muted text-muted-foreground rounded-lg flex items-center justify-center hover:text-foreground transition-colors"
                            >
                              <Edit3 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Addon Prices */}
              <div className="mt-8 bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-serif text-xl">Add-on Prices</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fixed prices for additional features
                  </p>
                </div>
                <div className="p-6 grid md:grid-cols-3 gap-6">
                  {[
                    { name: "LED Lighting", price: 250 },
                    { name: "Premium Handles", price: 180 },
                    { name: "Soft-close Mechanisms", price: 120 },
                  ].map((addon) => (
                    <div
                      key={addon.name}
                      className="p-4 bg-muted/50 rounded-xl flex items-center justify-between"
                    >
                      <span className="font-medium">{addon.name}</span>
                      <span className="font-serif text-lg text-accent">
                        {addon.price} ₾
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <LanguageProvider>
      <AdminContent />
    </LanguageProvider>
  )
}
