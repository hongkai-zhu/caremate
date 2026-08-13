import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CertificationsSection } from "@/components/certifications-section"

const productCategories = [
  { name: "All Products", href: "/products" },
  { name: "Stethoscopes", href: "/products/stethoscopes" },
  { name: "Blood Pressure Monitors", href: "/products/blood-pressure-monitoring" },
  { name: "Pressure Infusor Bags", href: "/products/patient-care/pressure-infusors" },
  { name: "DVT Sleeves", href: "/products/compression-therapy/dvt-compression-sleeves" },
]

const featuredProducts = [
  {
    title: "Aneroid Sphygmomanometers",
    description: "Our Aneroid Sphygmomanometers (mechanical blood pressure monitors) bring hospital-grade accuracy directly to your home. Featuring advanced measurement technology and thoughtful designs, Caremate monitors deliver fast, reliable, and stress-free readings.",
    image: "/images/blood-pressure-monitor.jpg",
    href: "/products/blood-pressure-monitoring/aneroid-sphygmomanometers",
    reverse: false,
  },
  {
    title: "Stethoscopes",
    description: "Caremate stethoscopes are known globally for their unrivaled acoustics, rugged durability, and superb value. Our Cardiology Series are the best of the best. Learn what makes these instruments so special.",
    image: "/images/stethoscope.jpg",
    href: "/products/stethoscopes",
    reverse: true,
  },
  {
    title: "Pressure Infusor Bags",
    description: "Our pressure infusor bags are designed for fast, controlled fluid delivery in emergency, surgical, and critical care settings. Built with durable materials and an easy-to-read pressure gauge, they provide reliable performance for a wide range of clinical applications.",
    image: "/images/pressure-infusor-bag.jpg",
    href: "/products/patient-care/pressure-infusors/cm-pi-pressure-infusor-series",
    reverse: false,
  },
  {
    title: "DVT Prevention Sleeves",
    description: "Our DVT compression sleeves feature a sleek, finished look with an extended design for optimal coverage. Function meets premium form, now available for all clinical applications.",
    image: "/images/dvt-sleeve.jpg",
    href: "/products/compression-therapy/dvt-compression-sleeves/cm-dvt-series",
    reverse: true,
  },
]

export default function HomePage() {
  return (
    
    <div className="min-h-screen">
      {/* Top Catalogue Bar */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="font-medium">
            Explore our latest product catalogue
          </p>
          <Link
            href="/files/maincatalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Catalogue <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[200px] md:h-[500px] lg:h-[550px]">
          <Image
            src="/images/hero-doctor.jpg"
            alt="Healthcare professional with medical equipment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
        </div>
        
        {/* Blue Banner */}
        <div className="bg-primary py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-primary-foreground italic">
              Extraordinary Tools for Exceptional Care
            </h1>
          </div>
        </div>

        {/* Category Links */}
        {/* <div className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex items-center justify-center px-4 py-3 bg-background border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors text-center"
                >
                  {category.name} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </div>*/}
      </section>

      {/* About Company Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/about-company.jpg"
                  alt="Caremate Medical Device manufacturing facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">About Us</p>
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">We Are Caremate Medical Device</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Caremate was an early pioneer of a global production model, sourcing components from the world&apos;s leading 
                ISO 9000 manufacturers then hand-fabricating domestically. Today, more than 50% of our products are 
                assembled, tested, and packaged in our state-of-the-art facility.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Learn more <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-primary mb-2">Featured Products</p>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Track, Trend, and Take Control of Your Health
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            The Caremate line of medical devices brings hospital-grade accuracy directly to healthcare facilities and homes. 
            Featuring advanced measurement technology and thoughtful designs, our products deliver fast, reliable, and stress-free results.
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Learn more <ArrowRight className="inline-block w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Resources Divider */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-background/70 mb-3">Insights & Resources</p>
              <h3 className="text-2xl md:text-3xl font-light leading-tight">
                Practical guidance for choosing and caring for medical devices.
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {["Product Guidance", "Care Standards", "Support Resources"].map((item) => (
                <div key={item} className="border-l border-background/30 pl-4">
                  <span className="block text-sm font-medium">{item}</span>
                  <span className="mt-3 block h-px w-12 bg-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.map((product, index) => (
        <section key={product.title} className={`py-12 md:py-16 ${index % 2 === 1 ? 'bg-muted/30' : 'bg-background'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className={`flex flex-col ${product.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-xs uppercase tracking-widest text-primary mb-2">Featured Product</p>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">{product.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                <Link
                  href={product.href}
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Learn more <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      

      

      {/* Product Catalog CTA */}
      {/* <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Product Catalog</p>
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">View the Caremate Catalog</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our latest full-line catalog is here! Inside you&apos;ll find our complete range of Blood Pressure Monitors, 
                Stethoscopes, DVT Sleeves, and Infusion Pressure Bags, along with dozens of upgrades across nearly every product family.
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View Products <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <Image
                    src="/images/blood-pressure-monitor.jpg"
                    alt="Blood pressure monitor"
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                  <Image
                    src="/images/stethoscope.jpg"
                    alt="Stethoscope"
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                  <Image
                    src="/images/dvt-sleeve.jpg"
                    alt="DVT Sleeve"
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                  <Image
                    src="/images/infusion-bag.jpg"
                    alt="Infusion bag"
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Quick Info Cards */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background p-8 border border-border">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Resources</p>
              <h3 className="text-xl font-medium text-foreground mb-4">Explore the Learning Center</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Access product guides, training materials, and healthcare resources.
              </p>
              <Link href="/products" className="text-primary hover:underline text-sm font-medium">
                Learn More <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-background p-8 border border-border">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Support</p>
              <h3 className="text-xl font-medium text-foreground mb-4">Browse FAQs</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Find answers to common questions about our products and services.
              </p>
              <Link href="/contact" className="text-primary hover:underline text-sm font-medium">
                Get Support <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* About Banner */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 bg-primary p-8 text-primary-foreground">
              <p className="text-xs uppercase tracking-widest mb-2 opacity-80">About Us</p>
              <h3 className="text-2xl font-bold">Caremate Medical Device</h3>
            </div>
            <div className="w-full md:w-2/3">
              <h4 className="text-xl font-medium text-foreground mb-4">About Caremate</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Diagnostic instruments of extraordinary design, exceptional quality, and superior performance — 
                all with the industry&apos;s most comprehensive warranties. For over 20 years, healthcare professionals 
                and institutions have relied on Caremate.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Watch Now <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
