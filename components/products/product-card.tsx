import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  getHeroImage,
  getProductImageSrc,
  getProductPath,
  getSubcategoryName,
  type Product,
} from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const image = getHeroImage(product)
  const skus = product.variants.map((variant) => variant.sku).filter(Boolean)
  const visibleSkus = skus.slice(0, 3)
  const remainingSkuCount = Math.max(0, skus.length - visibleSkus.length)

  return (
    <Link
      href={getProductPath(product)}
      className="group flex h-full flex-col border border-border bg-background transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {image && (
          <Image
            src={getProductImageSrc(image)}
            alt={image.alt.en || product.name.en || "Caremate product"}
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.025]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
          {getSubcategoryName(product.subcategory)}
        </p>
        <h3 className="text-lg font-medium leading-snug text-foreground group-hover:text-primary">
          {product.name.en}
        </h3>
        {visibleSkus.length > 0 && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {visibleSkus.join(" · ")}
            {remainingSkuCount > 0 && ` · +${remainingSkuCount} more`}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary">
          View details
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
