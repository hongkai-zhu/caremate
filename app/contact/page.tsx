"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import type { Metadata } from "next"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+86 5734-1588", "+1 (919) 641-2671"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["sales2@carematemed.com", "mark@carematemed.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    lines: ["No4, 281 HongAn Road", "Zhujing, Jinshan District", "Shanghai, China"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday - Friday: 8am - 6pm EST", "Saturday: 9am - 1pm EST"],
  },
]

const inquiryTypes = [
  "Product Information",
  "Sales Inquiry",
  "Technical Support",
  "Warranty/Returns",
  "Partnership Opportunities",
  "Careers",
  "Other",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-background p-6 border border-border text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
{/* sss 
      {/* Contact Form Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">Get In Touch</p>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and a member of our team will contact you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-muted/50 border border-border p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for contacting Caremate Medical Device. Our team will review your message and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      inquiryType: "",
                      message: "",
                    })
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Healthcare Inc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                    Inquiry Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select an option</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/*
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How do I register my product for warranty?",
                a: "You can register your product by filling out the contact form above and selecting 'Warranty/Returns' as your inquiry type. Include your product model and serial number in the message.",
              },
              {
                q: "Where can I download product manuals?",
                a: "Product manuals are available on our Products page. Visit the specific product section and look for the downloadable PDF manual link.",
              },
              {
                q: "Do you offer bulk pricing for healthcare facilities?",
                a: "Yes, we offer competitive bulk pricing for hospitals, clinics, and healthcare organizations. Contact our sales team for a custom quote.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unused products in original packaging. For defective items, please contact our support team for warranty service options.",
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-background border border-border p-6">
                <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Map Section Placeholder */}
      <section className="bg-muted h-64 md:h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No4, 281 HongAn Road, Zhujing, Jinshan District, Shanghai, China
          </p>
        </div>
      </section>
    </div>
  )
}
