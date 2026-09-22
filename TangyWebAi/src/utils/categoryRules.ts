import type { Product } from '@/types/models'

export function isCategoryReferenced(categoryId: string, products: Product[]) {
  return products.some((product) => product.categoryId === categoryId)
}