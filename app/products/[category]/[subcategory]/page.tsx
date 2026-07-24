import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { ProductBreadcrumbs } from "@/components/products/product-breadcrumbs"
import { ProductCard } from "@/components/products/product-card"
import {
  getCategory,
  getSubcategories,
  getSubcategory,
  getSubcategoryPath,
  productCategories,
} from "@/lib/products"

type SubcategoryPageProps = {
  params: Promise<{ category: string; subcategory: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return productCategories.flatMap((category) =>
    getSubcategories(category.id).map((subcategory) => ({
      category: category.id,
      subcategory: subcategory.id,
    })),
  )
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { category: categoryId, subcategory: subcategoryId } = await params
  const category = getCategory(categoryId)
  const subcategory = getSubcategory(categoryId, subcategoryId)

  if (!category || !subcategory) {
    return { title: "Product Type Not Found | Caremate Medical Device" }
  }

  return {
    title: `${subcategory.name} | ${category.name.en} | Caremate`,
    description: `Browse ${subcategory.productCount} Caremate ${subcategory.name.toLowerCase()} product families and their available models.`,
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categoryId, subcategory: subcategoryId } = await params
  const category = getCategory(categoryId)
  const subcategory = getSubcategory(categoryId, subcategoryId)

  if (!category || !subcategory) notFound()

  const siblingSubcategories = getSubcategories(category.id)

  return (
    <div className="min-h-screen">
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name.en || category.id, href: `/products/${category.id}` },
          { label: subcategory.name },
        ]}
      />

      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-12 text-primary-foreground sm:px-6 md:py-16 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
            {category.name.en}
          </p>
          <h1 className="text-3xl font-light md:text-5xl">{subcategory.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            View product images, available models, features, and specifications for
            every Caremate product family in this group.
          </p>
          <p className="mt-6 text-sm text-primary-foreground/70">
            {subcategory.productCount} {subcategory.productCount === 1 ? "product family" : "product families"}
            {subcategory.skuCount > 0 && ` · ${subcategory.skuCount} models`}
          </p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {siblingSubcategories.map((item) => (
              <Link
                key={item.id}
                href={getSubcategoryPath(category.id, item.id)}
                aria-current={item.id === subcategory.id ? "page" : undefined}
                className={`shrink-0 border px-4 py-2 text-sm font-medium ${
                  item.id === subcategory.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 border border-border bg-muted/20 p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                  {category.name.en}
                </p>
                <Link
                  href={`/products/${category.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  All subcategories <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <ul className="mt-5 space-y-1 border-t border-border pt-4">
                  {siblingSubcategories.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={getSubcategoryPath(category.id, item.id)}
                        aria-current={item.id === subcategory.id ? "page" : undefined}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition-colors ${
                          item.id === subcategory.id
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted hover:text-primary"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className={item.id === subcategory.id ? "text-primary-foreground/70" : "text-muted-foreground"}>
                          {item.productCount}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div>
              <div className="mb-7">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">Products</p>
                <h2 className="mt-2 text-2xl font-medium text-foreground">{subcategory.name}</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {subcategory.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">Product inquiry</p>
            <h2 className="mt-2 text-2xl font-medium text-foreground">Need a specific model or configuration?</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 self-start bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Caremate <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
