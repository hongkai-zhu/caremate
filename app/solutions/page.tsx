import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2, Stethoscope, Home, Ambulance } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions | Caremate Medical Device",
  description: "Healthcare solutions for hospitals, clinics, home care, and emergency services. Find the right medical device solutions for your needs.",
}

const solutions = [
  {
    id: "hospital",
    name: "Hospital Solutions",
    icon: Building2,
    description: "Comprehensive medical device solutions designed for the demanding hospital environment. Our products meet the rigorous standards required for acute care settings.",
    image: "/images/hospital-solution.jpg",
    benefits: [
      "High-volume durability for continuous use",
      "Integration with hospital information systems",
      "Infection control compliant designs",
      "24/7 technical support available",
      "Bulk ordering and customization options",
    ],
    products: ["Blood Pressure Monitors", "Stethoscopes", "DVT Sleeves", "Infusion Pressure Bags"],
  },
  {
    id: "clinical",
    name: "Clinical Solutions",
    icon: Stethoscope,
    description: "Precision instruments for outpatient clinics, physician offices, and specialty practices. Reliable, accurate, and designed for daily clinical use.",
    image: "/images/clinic-solution.jpg",
    benefits: [
      "Compact designs for smaller spaces",
      "Quick and accurate readings",
      "Easy maintenance and cleaning",
      "Cost-effective solutions",
      "Training and certification support",
    ],
    products: ["Blood Pressure Monitors", "Stethoscopes", "DVT Sleeves"],
  },
  {
    id: "home-care",
    name: "Home Care Solutions",
    icon: Home,
    description: "User-friendly medical devices that bring hospital-grade accuracy to home health settings. Perfect for patient self-monitoring and home healthcare providers.",
    image: "/images/home-care-solution.jpg",
    benefits: [
      "Simple, intuitive operation",
      "Portable and lightweight designs",
      "Clear displays with large numbers",
      "Memory storage for tracking trends",
      "Affordable for individual purchase",
    ],
    products: ["Blood Pressure Monitors", "DVT Sleeves"],
  },
  {
    id: "emergency",
    name: "Emergency Care Solutions",
    icon: Ambulance,
    description: "Rugged, reliable equipment designed for emergency medical services. Built to perform in high-pressure situations where every second counts.",
    image: "/images/emergency-solution.jpg",
    benefits: [
      "Rapid deployment and setup",
      "Durable construction for field use",
      "Battery-powered operation options",
      "High visibility displays",
      "Compact storage configurations",
    ],
    products: ["Blood Pressure Monitors", "Stethoscopes", "Infusion Pressure Bags"],
  },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-foreground mb-4">
            Healthcare Solutions
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Tailored medical device solutions for every healthcare environment, from hospitals to home care.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`#${solution.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <solution.icon className="w-4 h-4" />
                {solution.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      {solutions.map((solution, index) => (
        <section
          key={solution.id}
          id={solution.id}
          className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-start gap-8 md:gap-16`}>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <solution.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary">Solution</p>
                    <h2 className="text-2xl md:text-3xl font-medium text-foreground">{solution.name}</h2>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">{solution.description}</p>
                
                <h3 className="text-sm font-semibold text-foreground mb-3">Key Benefits:</h3>
                <ul className="space-y-2 mb-6">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Products:</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {solution.products.map((product) => (
                    <span
                      key={product}
                      className="px-3 py-1 bg-muted text-sm text-muted-foreground rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Started <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-primary-foreground mb-4">
            Custom Solutions Available
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Don&apos;t see exactly what you need? Our team can work with you to develop customized solutions for your unique healthcare environment.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors"
          >
            Contact Our Solutions Team <ArrowRight className="inline-block w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}
