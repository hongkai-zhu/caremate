import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Download } from "lucide-react"
import { notFound } from "next/navigation"

import { ProductBreadcrumbs } from "@/components/products/product-breadcrumbs"
import { ProductCard } from "@/components/products/product-card"
import {
  getCategory,
  getProduct,
  getProductImageSrc,
  getRelatedProducts,
  getSubcategory,
  products,
} from "@/lib/products"

type ProductPageProps = {
  params: Promise<{ category: string; subcategory: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    subcategory: product.subcategory,
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category, subcategory, slug } = await params
  const product = getProduct(category, subcategory, slug)

  if (!product) {
    return { title: "Product Not Found | Caremate Medical Device" }
  }

  const description =
    product.description.en ||
    product.features.en?.slice(0, 2).join(". ") ||
    `View models and product information for ${product.name.en} from Caremate Medical Device.`

  return {
    title: `${product.name.en} | Caremate Medical Device`,
    description,
  }
}

function imageRoleLabel(role: string) {
  const labels: Record<string, string> = {
    gallery: "Gallery",
    detail: "Product detail",
    packaging: "Packaging",
    instruction: "Instructions",
  }
  return labels[role] ?? "Product image"
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categoryId, subcategory: subcategoryId, slug } = await params
  const product = getProduct(categoryId, subcategoryId, slug)
  const category = getCategory(categoryId)
  const subcategory = getSubcategory(categoryId, subcategoryId)

  if (!product || !category || !subcategory) notFound()

  const images = [...product.images].sort((a, b) =>
    a.role === "hero" ? -1 : b.role === "hero" ? 1 : 0,
  )
  const heroImage = images[0]
  const supportingImages = images.slice(1)
  const features = product.features.en ?? []
  const description = product.description.en
  const relatedProducts = getRelatedProducts(product)

  return (
    <div className="min-h-screen">
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name.en || category.id, href: `/products/${category.id}` },
          {
            label: subcategory.name,
            href: `/products/${category.id}/${subcategory.id}`,
          },
          { label: product.name.en || product.id },
        ]}
      />

      <section className="bg-background py-10 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <div>
            <div className="relative aspect-square overflow-hidden border border-border bg-muted/30">
              {heroImage && (
                <Image
                  src={getProductImageSrc(heroImage)}
                  alt={heroImage.alt.en || product.name.en || "Caremate product"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-8 md:p-12"
                />
              )}
            </div>

            {supportingImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {supportingImages.map((image, index) => (
                  <figure key={`${image.file}-${index}`} className="border border-border bg-muted/30">
                    <div className="relative aspect-square">
                      <Image
                        src={getProductImageSrc(image)}
                        alt={image.alt.en || `${product.name.en} ${imageRoleLabel(image.role)}`}
                        fill
                        sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                      {imageRoleLabel(image.role)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>

          <div className="lg:pt-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {category.name.en} · {subcategory.name}
            </p>
            <h1 className="mt-3 text-3xl font-medium leading-tight text-foreground md:text-4xl">
              {product.name.en}
            </h1>

            {product.variants.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <span
                    key={variant.sku}
                    className="border border-border bg-muted/30 px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {variant.sku}
                  </span>
                ))}
              </div>
            )}

            {description && (
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            )}

            {features.length > 0 && (
              <div className="mt-8 border-t border-border pt-7">
                <h2 className="text-sm font-semibold text-foreground">Product features</h2>
                <ul className="mt-4 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request information <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/files/maincatalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border bg-background px-7 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Download className="h-4 w-4" /> View catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {product.variants.length > 0 && (
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">Ordering information</p>
              <h2 className="mt-2 text-2xl font-medium text-foreground md:text-3xl">
                Models & specifications
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {product.variants.map((variant) => {
                const specifications = variant.specifications?.en ?? []
                return (
                  <article key={variant.sku} className="border border-border bg-background p-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">Model</p>
                    <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-xl font-medium text-foreground">{variant.sku}</h3>
                      {variant.label?.en && (
                        <span className="text-sm text-muted-foreground">{variant.label.en}</span>
                      )}
                    </div>
                    {specifications.length > 0 && (
                      <ul className="mt-5 space-y-2 border-t border-border pt-4">
                        {specifications.map((specification) => (
                          <li key={specification} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {specification}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="bg-background py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-primary">Related products</p>
                <h2 className="mt-2 text-2xl font-medium text-foreground md:text-3xl">
                  Related {category.name.en}
                </h2>
              </div>
              <Link
                href={`/products/${category.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View category <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
