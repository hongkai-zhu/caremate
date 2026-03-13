import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | Caremate Medical Device",
  description: "Explore our complete range of medical devices including blood pressure monitors, stethoscopes, DVT sleeves, and infusion pressure bags.",
}

const products = [
  {
    id: "blood-pressure",
    name: "Blood Pressure Monitors",
    description: "Hospital-grade digital blood pressure monitors for clinical and home use. Featuring advanced oscillometric technology, large easy-read displays, and irregular heartbeat detection.",
    image: "/images/blood-pressure-monitor.jpg",
    features: [
      "Digital oscillometric technology",
      "Irregular heartbeat detection",
      "Memory storage for multiple users",
      "Large backlit display",
      "Portable and desktop models",
    ],
  },
  {
    id: "stethoscopes",
    name: "Professional Stethoscopes",
    description: "Premium stethoscopes engineered for superior acoustic performance. Our cardiology and clinical series deliver exceptional sound quality for accurate diagnosis.",
    image: "/images/stethoscope.jpg",
    features: [
      "Dual-frequency diaphragm",
      "Stainless steel construction",
      "Ergonomic headset design",
      "Interchangeable ear tips",
      "Lifetime warranty available",
    ],
  },
  {
    id: "dvt-sleeves",
    name: "DVT Prevention Sleeves",
    description: "Sequential compression devices designed for deep vein thrombosis prevention. Comfortable, effective, and available in multiple sizes for optimal patient care.",
    image: "/images/dvt-sleeve.jpg",
    features: [
      "Sequential compression therapy",
      "Adjustable pressure settings",
      "Breathable fabric construction",
      "Multiple size options",
      "Quiet operation",
    ],
  },
  {
    id: "infusion-bags",
    name: "Infusion Pressure Bags",
    description: "Medical-grade pressure infusion bags for rapid fluid delivery. Essential equipment for emergency and surgical applications requiring controlled pressure infusion.",
    image: "/images/infusion-bag.jpg",
    features: [
      "Precise pressure control",
      "Clear pressure gauge",
      "Durable latex-free construction",
      "Multiple volume sizes",
      "Easy-clean surfaces",
    ],
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-foreground mb-4">
            Our Products
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Discover our complete line of medical devices designed for exceptional performance and reliability.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`#${product.id}`}
                className="px-4 py-2 bg-background border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      {products.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
          className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-xs uppercase tracking-widest text-primary mb-2">Product Category</p>
                <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">{product.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                
                <h3 className="text-sm font-semibold text-foreground mb-3">Key Features:</h3>
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Request Information <ArrowRight className="inline-block w-4 h-4 ml-1" />
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
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Our team of medical device specialists is ready to help you find the perfect solution for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors"
          >
            Contact Us Today <ArrowRight className="inline-block w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}
