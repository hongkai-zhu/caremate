import Link from "next/link"
import { MapPin, Mail, Phone, HelpCircle, Download, Facebook, Linkedin, Instagram } from "lucide-react"

const quickLinks = [
  { name: "Contact Us", href: "/contact", icon: MapPin },
  { name: "FAQs", href: "/contact", icon: HelpCircle },
  { name: "Download Catalogue", href: "/files/maincatalogue.pdf", icon: Download, external: true },
]

const footerLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Careers", href: "/careers" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Quick Links Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-3 p-4 text-center hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                  <link.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Phone: +1 919-641-2671</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Email: sales2@carematemed.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              {footerLinks.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                  {index < footerLinks.length - 1 && <span className="text-border">|</span>}
                </span>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              <p>Copyright 2026</p>
              <p>Caremate Medical Device Co. Ltd.</p>
              <p>No 4, 281 HongAn Road, Zhujing, Jinshan District, Shanghai, China</p>
            </div>

            <div className="flex items-center gap-4">
              <Link href="http://www.facebook.com/carematemed" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Facebook className="w-4 h-4 text-primary-foreground" />
              </Link>
              <Link href="https://www.linkedin.com/company/caremate-medical/" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Linkedin className="w-4 h-4 text-primary-foreground" />
              </Link>
              <Link href="https://www.instagram.com/carematemedical/" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Instagram className="w-4 h-4 text-primary-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
