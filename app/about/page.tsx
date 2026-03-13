import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Shield, Users, Globe } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Caremate Medical Device",
  description: "Learn about Caremate Medical Device - our mission, quality standards, and commitment to healthcare excellence.",
}

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue the highest standards in everything we do, from product design to customer service.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Healthcare professionals count on our products when it matters most. We never compromise on quality.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside healthcare providers to understand their needs and develop solutions that truly help.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Quality medical devices should be available to all. We strive to make our products affordable and accessible.",
  },
]

const milestones = [
  { year: "1985", event: "Mr. Liangyao Zhu founded a company in Wenzhou to specialize in technology of movement and diaphragm mainly." },
  { year: "1987", event: "The stethoscope and sphygmomanometer were successfully researched and developed and the mass production started." },
  { year: "1989", event: "Using precision equipment from Switzerland such as gear hobbing machine" },
  { year: "1995", event: "Approved the registration certificate of China Food and Drug Administration" },
  { year: "1996", event: "Develop zinc alloy case to improve productivity and efficiency, make appearance more beauty, and less weight" },
  { year: "1999", event: "ISO9001 certified & CE certification" },
  { year: "2005", event: "ISO 13485 certification achieved" },
  { year: "2007", event: "Shanghai Caremate Founded" },
  { year: "2009", event: "FDA 510K Approval" },
  { year: "2010", event: "Mr. Liaoyang Zhu retired, his grandson Mark Zhu took over his business" },
  { year: "2013", event: "Start to cooperate with Medline" },
  { year: "2023", event: "Set up production base in Indonesia" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-foreground mb-4">
            About Caremate
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Dedicated to creating exceptional medical devices that empower healthcare professionals and improve patient outcomes.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/about-company.jpg"
                  alt="Caremate Medical Device facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Our Story</p>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                We Are Caremate Medical Device
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2004, Caremate Medical Device has grown from a small startup to a leading manufacturer of diagnostic medical equipment. Our journey began with a simple mission: to create reliable, accurate, and affordable medical devices that healthcare professionals can trust.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Today, we serve healthcare facilities across the globe, from major hospital systems to individual physician practices and home healthcare providers. Our products are designed, tested, and manufactured to the highest international standards.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With over 50% of our products assembled and tested in our state-of-the-art domestic facility, we maintain strict quality control while supporting local manufacturing excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">Our Mission</p>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-6">
              Extraordinary Tools for Exceptional Care
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our mission is to design, manufacture, and deliver medical devices of extraordinary quality, exceptional accuracy, and superior durability. We are committed to supporting healthcare professionals with tools they can rely on, day after day.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section id="quality" className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/quality-control.jpg"
                  alt="Quality control laboratory"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Quality Assurance</p>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                Uncompromising Quality Standards
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every Caremate product undergoes rigorous testing and quality control procedures. Our manufacturing processes are certified to ISO 13485 standards, ensuring consistent quality across our entire product line.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  ISO 13485 certified manufacturing
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  FDA registered and compliant
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  CE marked for international markets
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  100% product testing before shipment
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Industry-leading warranty programs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">Our Journey</p>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground">
              40 Years of Healthcare Innovation
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary transform md:-translate-x-1/2 -translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/team.jpg"
                  alt="Caremate leadership team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Our Team</p>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                Leadership You Can Trust
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our leadership team brings together decades of experience in medical device manufacturing, healthcare, and business management. Together, we guide Caremate&apos;s strategic vision and maintain our commitment to quality.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beyond our executive team, Caremate employs over 200 dedicated professionals including engineers, quality specialists, manufacturing technicians, and customer service representatives—all focused on delivering the best possible products and support.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Join Our Team <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-primary-foreground mb-4">
            Partner With Caremate
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Ready to experience the Caremate difference? Contact us to learn how our products can support your healthcare organization.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors"
          >
            Contact Us <ArrowRight className="inline-block w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}
