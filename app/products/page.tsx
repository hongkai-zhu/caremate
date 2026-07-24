import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"

import {
  getCategoryContent,
  getCategoryCoverProduct,
  getHeroImage,
  getProductImageSrc,
  getSubcategories,
  productCatalogueStats,
  productCategories,
} from "@/lib/products"

export const metadata: Metadata = {
  title: "Products | Caremate Medical Device",
  description:
    "Browse the complete Caremate medical device catalogue by product category, subcategory, and model.",
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-14 text-primary-foreground sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
              Caremate product catalogue
            </p>
            <h1 className="text-3xl font-light leading-tight md:text-5xl">
              Medical products, organized for easier selection.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Explore the complete Caremate range by product type, then compare
              available models, images, features, and specifications.
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-4 border-t border-primary-foreground/25 pt-6">
              <div>
                <dt className="text-xs text-primary-foreground/65">Categories</dt>
                <dd className="mt-1 text-2xl font-light">{productCatalogueStats.categoryCount}</dd>
              </div>
              <div>
                <dt className="text-xs text-primary-foreground/65">Product families</dt>
                <dd className="mt-1 text-2xl font-light">{productCatalogueStats.productCount}</dd>
              </div>
              <div>
                <dt className="text-xs text-primary-foreground/65">Models</dt>
                <dd className="mt-1 text-2xl font-light">{productCatalogueStats.skuCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm font-medium">Prefer to browse the original catalogue?</p>
          <Link
            href="/files/maincatalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="h-4 w-4" />
            View catalogue PDF
          </Link>
        </div>
      </section>

      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
              Explore by product type
            </p>
            <h2 className="text-2xl font-medium text-foreground md:text-3xl">
              Choose a product category
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Each category opens into focused subcategories, so product families and
              related parts stay together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => {
              const content = getCategoryContent(category.id)
              const subcategories = getSubcategories(category.id)
              const categoryProductCount = subcategories.reduce(
                (total, subcategory) => total + subcategory.productCount,
                0,
              )
              const coverProduct = getCategoryCoverProduct(category.id)
              const coverImage = coverProduct ? getHeroImage(coverProduct) : undefined

              return (
                <Link
                  key={category.id}
                  href={`/products/${category.id}`}
                  className="group flex h-full flex-col border border-border bg-background transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                    {coverImage && (
                      <Image
                        src={getProductImageSrc(coverImage)}
                        alt={coverImage.alt.en || category.name.en || "Caremate product category"}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.025]"
                      />
                    )}
                    <span className="absolute left-4 top-4 bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                      {categoryProductCount} {categoryProductCount === 1 ? "product" : "products"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                      {content.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-medium text-foreground group-hover:text-primary">
                      {category.name.en}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {content.description}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {subcategories.length} {subcategories.length === 1 ? "subcategory" : "subcategories"}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary">
                      Browse category <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
            Product support
          </p>
          <h2 className="text-2xl font-medium text-foreground md:text-3xl">
            Need help selecting a model?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Share your application, preferred configuration, or required model with
            our team.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request product information <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
