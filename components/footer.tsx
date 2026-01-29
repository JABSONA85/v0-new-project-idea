"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="bg-primary py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Decorative corner elements */}
      <div className="absolute top-12 left-12 w-20 h-20 border-l border-t border-accent/10 hidden lg:block" />
      <div className="absolute top-12 right-12 w-20 h-20 border-r border-t border-accent/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Top decorative section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="w-16 h-px bg-accent mx-auto mb-10" />
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 tracking-tight">
            ARTISAN<span className="text-accent">.</span>
          </h3>
          <p className="text-primary-foreground/40 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
            Premium custom furniture and granite sinks, crafted with passion since 2015.
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-accent/30" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-accent/80 font-medium mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: t.nav.portfolio, href: "#portfolio" },
                { label: t.nav.calculator, href: "#calculator" },
                { label: t.nav.about, href: "#about" },
                { label: t.nav.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/50 hover:text-accent transition-colors text-lg font-light tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-accent/80 font-medium mb-8">Services</h4>
            <ul className="space-y-4">
              {[
                t.portfolio.categories.laminate,
                t.portfolio.categories.solidWood,
                t.portfolio.categories.granite,
                t.portfolio.categories.bedrooms,
              ].map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/50 text-lg font-light tracking-wide">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-accent/80 font-medium mb-8">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent/60 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/50 font-light leading-relaxed">{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-accent/60 flex-shrink-0" />
                <a
                  href="tel:+995555123456"
                  className="text-primary-foreground/50 hover:text-accent transition-colors font-light"
                >
                  {t.footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-accent/60 flex-shrink-0" />
                <a
                  href="mailto:info@artisan.ge"
                  className="text-primary-foreground/50 hover:text-accent transition-colors font-light"
                >
                  info@artisan.ge
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-accent/80 font-medium mb-8">Follow Us</h4>
            <div className="flex gap-4 mb-8">
              <a
                href="#"
                className="w-12 h-12 bg-white/5 flex items-center justify-center text-primary-foreground/50 hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/5 flex items-center justify-center text-primary-foreground/50 hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-primary-foreground/30 text-sm font-light leading-relaxed">
              Follow us for the latest projects and behind-the-scenes content.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-primary-foreground/30 text-sm font-light tracking-wide">
              &copy; {new Date().getFullYear()} ARTISAN Studio. {t.footer.rights}
            </p>
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-primary-foreground/30 text-sm hover:text-accent transition-colors font-light tracking-wide"
              >
                Privacy Policy
              </a>
              <div className="w-1 h-1 rounded-full bg-offwhite/20" />
              <a
                href="#"
                className="text-primary-foreground/30 text-sm hover:text-accent transition-colors font-light tracking-wide"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold/10" />
          <div className="w-1 h-1 rounded-full bg-accent/30" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold/10" />
        </motion.div>
      </div>
    </footer>
  )
}
