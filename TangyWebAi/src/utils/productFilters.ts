import type { Product } from '@/types/models'

export function filterProducts(products: Product[], searchTerm: string, categoryId: string) {
  const term = searchTerm.trim().toLocaleLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      !term ||
      product.name.toLocaleLowerCase().includes(term) ||
      product.description.toLocaleLowerCase().includes(term)
    const matchesCategory = categoryId === 'all' || product.categoryId === categoryId
    return matchesSearch && matchesCategory
  })
}
