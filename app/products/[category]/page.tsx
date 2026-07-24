import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { ProductBreadcrumbs } from "@/components/products/product-breadcrumbs"
import {
  getCategory,
  getCategoryContent,
  getHeroImage,
  getProductImageSrc,
  getSubcategories,
  getSubcategoryPath,
  productCategories,
} from "@/lib/products"

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.id }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params
  const category = getCategory(categoryId)

  if (!category) {
    return { title: "Product Category Not Found | Caremate Medical Device" }
  }

  return {
    title: `${category.name.en} | Caremate Products`,
    description: getCategoryContent(category.id).description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params
  const category = getCategory(categoryId)

  if (!category) notFound()

  const content = getCategoryContent(category.id)
  const subcategories = getSubcategories(category.id)
  const productCount = subcategories.reduce(
    (total, subcategory) => total + subcategory.productCount,
    0,
  )
  const skuCount = subcategories.reduce(
    (total, subcategory) => total + subcategory.skuCount,
    0,
  )

  return (
    <div className="min-h-screen">
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name.en || category.id },
        ]}
      />

      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-12 text-primary-foreground sm:px-6 md:py-16 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
            {content.eyebrow}
          </p>
          <h1 className="text-3xl font-light md:text-5xl">{category.name.en}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            {content.description}
          </p>
          <p className="mt-6 text-sm text-primary-foreground/70">
            {productCount} {productCount === 1 ? "product family" : "product families"}
            {skuCount > 0 && ` · ${skuCount} models`}
          </p>
        </div>
      </section>

      <nav aria-label="Product categories" className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          {productCategories.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              aria-current={item.id === category.id ? "page" : undefined}
              className={`shrink-0 border px-4 py-2 text-sm font-medium transition-colors ${
                item.id === category.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {item.name.en}
            </Link>
          ))}
        </div>
      </nav>

      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
              Subcategories
            </p>
            <h2 className="text-2xl font-medium text-foreground md:text-3xl">
              Browse {category.name.en}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Select a product type to see every available family and model in that group.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((subcategory) => {
              const coverProduct = subcategory.products[0]
              const coverImage = getHeroImage(coverProduct)

              return (
                <Link
                  key={subcategory.id}
                  href={getSubcategoryPath(category.id, subcategory.id)}
                  className="group flex h-full flex-col border border-border bg-background transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                    {coverImage && (
                      <Image
                        src={getProductImageSrc(coverImage)}
                        alt={coverImage.alt.en || subcategory.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain p-7 transition-transform duration-300 group-hover:scale-[1.025]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-muted-foreground">
                      {subcategory.productCount} {subcategory.productCount === 1 ? "product" : "products"}
                      {subcategory.skuCount > 0 && ` · ${subcategory.skuCount} models`}
                    </p>
                    <h2 className="mt-2 text-xl font-medium text-foreground group-hover:text-primary">
                      {subcategory.name}
                    </h2>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary">
                      View products <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">Need assistance?</p>
            <h2 className="mt-2 text-2xl font-medium text-foreground">Talk with our product team.</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 self-start bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request information <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
