"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Search, MapPin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const productCategories = [
  { name: "All Products", href: "/products" },
  { name: "Blood Pressure Monitoring", href: "/products/blood-pressure-monitoring" },
  { name: "Compression Therapy", href: "/products/compression-therapy" },
  { name: "Stethoscopes", href: "/products/stethoscopes" },
  { name: "Blood Pressure Accessories", href: "/products/blood-pressure-accessories" },
  { name: "Stethoscope Accessories", href: "/products/stethoscope-accessories" },
  { name: "Patient Care", href: "/products/patient-care" },
]

const solutionCategories = [
  { name: "Hospital Solutions", href: "/solutions#hospital" },
  { name: "Clinical Solutions", href: "/solutions#clinical" },
  { name: "Home Care Solutions", href: "/solutions#home-care" },
  { name: "Emergency Care", href: "/solutions#emergency" },
]

const aboutCategories = [
  { name: "Our Company", href: "/about" },
  { name: "Our Mission", href: "/about#mission" },
  { name: "Quality Assurance", href: "/about#quality" },
  { name: "Leadership Team", href: "/about#team" },
]

const navItems = [
  { name: "Products", href: "/products", dropdown: productCategories },
  //{ name: "Solutions", href: "/solutions", dropdown: solutionCategories },
  { name: "About", href: "/about", dropdown: aboutCategories },
  { name: "Contact", href: "/contact", dropdown: null },
]

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold text-primary tracking-tight">CAREMATE</span>
              <span className="text-[10px] lg:text-xs text-muted-foreground tracking-widest">MEDICAL DEVICE</span>
            </div>
          </Link>
          */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/caremate-logo.png"
              alt="Caremate Medical Device"
              width={220}
              height={60}
              priority
            />
          </Link>
          

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors",
                    activeDropdown === item.name && "text-primary"
                  )}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-64 bg-primary shadow-lg py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm text-primary-foreground hover:bg-primary/80 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden lg:flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact Us
              <MapPin className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            {navItems.map((item) => (
              <div key={item.name} className="py-2">
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-8 mt-1 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
