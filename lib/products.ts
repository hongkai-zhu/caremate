import "server-only"

import productIndexSource from "@/public/caremate-product-database/database/generated/products-index.json"

export type LocalizedText = {
  en?: string
  zh?: string
}

export type ProductVariant = {
  sku: string
  label?: LocalizedText
  specifications?: {
    en?: string[]
    zh?: string[]
  }
}

export type ProductImage = {
  role: string
  file: string
  alt: LocalizedText
  modelSkus?: string[]
  sourceType: string
  contentHash: string
}

export type Product = {
  schemaVersion: number
  id: string
  slug: string
  status: string
  reviewStatus: string
  category: string
  subcategory: string
  name: LocalizedText
  variants: ProductVariant[]
  description: LocalizedText
  features: {
    en?: string[]
    zh?: string[]
  }
  images: ProductImage[]
  editorialNotes: string[]
  sortOrder: number
}

export type ProductCategory = {
  id: string
  name: LocalizedText
  sortOrder: number
}

type ProductIndex = {
  schemaVersion: number
  metadata: {
    productRecordCount: number
    skuCount: number
    assetBase: string
  }
  categories: ProductCategory[]
  products: Product[]
}

export type SubcategoryGroup = {
  id: string
  name: string
  products: Product[]
  productCount: number
  skuCount: number
}

const productIndex = productIndexSource as unknown as ProductIndex

const categoryContent: Record<
  string,
  { eyebrow: string; description: string; featuredProductId: string }
> = {
  "blood-pressure-monitoring": {
    eyebrow: "Diagnostic essentials",
    description:
      "Browse aneroid and palm sphygmomanometers, blood pressure kits, and EMT systems for clinical and home-care use.",
    featuredProductId: "cm-1222",
  },
  "compression-therapy": {
    eyebrow: "Circulation support",
    description:
      "Explore Caremate deep vein thrombosis compression sleeves and their available configurations.",
    featuredProductId: "cm-dvt-series",
  },
  stethoscopes: {
    eyebrow: "Auscultation",
    description:
      "Find general, deluxe, pediatric, professional, teaching, and specialty stethoscopes across the Caremate range.",
    featuredProductId: "cm-4146",
  },
  "blood-pressure-accessories": {
    eyebrow: "Parts & accessories",
    description:
      "Browse cuffs, gauges, bladders, bulbs, valves, connectors, gauge guards, and carrying cases.",
    featuredProductId: "nylon-calibrated-cuff-series",
  },
  "stethoscope-accessories": {
    eyebrow: "Parts & accessories",
    description:
      "Explore replacement chestpieces, eartips, and protective covers for stethoscope systems.",
    featuredProductId: "chestpiece-6719",
  },
  "patient-care": {
    eyebrow: "Patient care",
    description:
      "Browse pressure infusors and pressure-relief products for patient-care settings.",
    featuredProductId: "cm-pi-pressure-infusor-series",
  },
}

const subcategoryNames: Record<string, string> = {
  "aneroid-sphygmomanometers": "Aneroid Sphygmomanometers",
  "blood-pressure-kits": "Blood Pressure Kits",
  "palm-sphygmomanometers": "Palm Sphygmomanometers",
  "emt-kits": "EMT Kits",
  "dvt-compression-sleeves": "DVT Compression Sleeves",
  "general-stethoscopes": "General Stethoscopes",
  "deluxe-stethoscopes": "Deluxe Stethoscopes",
  "sprague-rappaport-stethoscopes": "Sprague Rappaport Stethoscopes",
  "specialty-stethoscopes": "Specialty Stethoscopes",
  "pediatric-stethoscopes": "Pediatric Stethoscopes",
  "professional-stethoscopes": "Professional Stethoscopes",
  "teaching-stethoscopes": "Teaching Stethoscopes",
  "disposable-stethoscopes": "Disposable Stethoscopes",
  "blood-pressure-cuffs": "Blood Pressure Cuffs",
  gauges: "Gauges",
  "gauge-guards": "Gauge Guards",
  bladders: "Bladders",
  "inflation-bulbs": "Inflation Bulbs",
  valves: "Valves",
  connectors: "Connectors",
  "carrying-cases": "Carrying Cases",
  "stethoscope-covers": "Stethoscope Covers",
  chestpieces: "Chestpieces",
  eartips: "Eartips",
  "pressure-relief": "Pressure Relief",
  "pressure-infusors": "Pressure Infusors",
}

export const productCategories = [...productIndex.categories].sort(
  (a, b) => a.sortOrder - b.sortOrder,
)

export const products = [...productIndex.products].sort(
  (a, b) => a.sortOrder - b.sortOrder,
)

export const productCatalogueStats = {
  productCount: productIndex.metadata.productRecordCount,
  skuCount: productIndex.metadata.skuCount,
  categoryCount: productIndex.categories.length,
}

export function getCategory(categoryId: string) {
  return productCategories.find((category) => category.id === categoryId)
}

export function getCategoryContent(categoryId: string) {
  return (
    categoryContent[categoryId] ?? {
      eyebrow: "Product category",
      description: "Browse the Caremate products available in this category.",
      featuredProductId: "",
    }
  )
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((product) => product.category === categoryId)
}

export function getSubcategoryName(subcategoryId: string) {
  return (
    subcategoryNames[subcategoryId] ??
    subcategoryId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  )
}

export function getSubcategories(categoryId: string): SubcategoryGroup[] {
  const groups = new Map<string, Product[]>()

  for (const product of getProductsByCategory(categoryId)) {
    const group = groups.get(product.subcategory) ?? []
    group.push(product)
    groups.set(product.subcategory, group)
  }

  return Array.from(groups.entries()).map(([id, groupProducts]) => ({
    id,
    name: getSubcategoryName(id),
    products: groupProducts,
    productCount: groupProducts.length,
    skuCount: groupProducts.reduce(
      (total, product) => total + product.variants.length,
      0,
    ),
  }))
}

export function getSubcategory(categoryId: string, subcategoryId: string) {
  return getSubcategories(categoryId).find(
    (subcategory) => subcategory.id === subcategoryId,
  )
}

export function getProduct(
  categoryId: string,
  subcategoryId: string,
  slug: string,
) {
  return products.find(
    (product) =>
      product.category === categoryId &&
      product.subcategory === subcategoryId &&
      product.slug === slug,
  )
}

export function getHeroImage(product: Product) {
  return product.images.find((image) => image.role === "hero") ?? product.images[0]
}

export function getProductImageSrc(image: ProductImage) {
  const relativePath = `${productIndex.metadata.assetBase}${image.file}`.replace(
    /^\/+/,
    "",
  )
  return `/caremate-product-database/${relativePath}?v=${image.contentHash.slice(0, 12)}`
}

export function getProductPath(product: Product) {
  return `/products/${product.category}/${product.subcategory}/${product.slug}`
}

export function getSubcategoryPath(categoryId: string, subcategoryId: string) {
  return `/products/${categoryId}/${subcategoryId}`
}

export function getCategoryCoverProduct(categoryId: string) {
  const content = getCategoryContent(categoryId)
  return (
    products.find((product) => product.id === content.featuredProductId) ??
    getProductsByCategory(categoryId)[0]
  )
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameSubcategory = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.category === product.category &&
      candidate.subcategory === product.subcategory,
  )
  const sameCategory = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.category === product.category &&
      candidate.subcategory !== product.subcategory,
  )

  return [...sameSubcategory, ...sameCategory].slice(0, limit)
}
