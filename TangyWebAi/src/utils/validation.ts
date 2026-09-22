import type { Category, CategoryInput, ProductInput } from '@/types/models'

const MAX_TAG_LENGTH = 30

export function validateProduct(input: ProductInput, categories: Category[]): string | null {
  if (!input.name.trim() || !input.description.trim()) return 'Name and description are required.'
  if (!Number.isFinite(input.price) || input.price <= 0) return 'Price must be greater than zero.'
  if (!isHttpsUrl(input.imageUrl)) return 'Image URL must be a valid HTTPS URL.'
  if (!categories.some((category) => category.id === input.categoryId))
    return 'Select an existing category.'
  if (input.tag && input.tag.trim().length > MAX_TAG_LENGTH)
    return `Highlight tag must be ${MAX_TAG_LENGTH} characters or fewer.`
  return null
}

export function validateCategory(
  input: CategoryInput,
  categories: Category[],
  exceptId?: string,
): string | null {
  const normalized = input.name.trim().toLocaleLowerCase()
  if (!normalized) return 'Category name is required.'
  if (
    categories.some(
      (category) =>
        category.id !== exceptId && category.name.trim().toLocaleLowerCase() === normalized,
    )
  ) {
    return 'A category with this name already exists.'
  }
  return null
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}
