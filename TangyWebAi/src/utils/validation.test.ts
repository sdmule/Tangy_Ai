import { describe, expect, it } from 'vitest'
import { validateCategory, validateProduct } from './validation'
import type { Category } from '@/types/models'

const categories: Category[] = [{ id: 'pasta', name: 'Pasta' }]
const product = { name: 'Pasta', description: 'A dish', price: 12, imageUrl: 'https://example.com/pasta.jpg', categoryId: 'pasta', isAvailable: true }

describe('validation', () => {
  it('rejects invalid products', () => {
    expect(validateProduct({ ...product, price: 0 }, categories)).toContain('greater than zero')
    expect(validateProduct({ ...product, imageUrl: 'http://example.com/pasta.jpg' }, categories)).toContain('HTTPS')
    expect(validateProduct({ ...product, categoryId: 'missing' }, categories)).toContain('existing category')
  })

  it('accepts a valid product', () => {
    expect(validateProduct(product, categories)).toBeNull()
  })

  it('rejects duplicate category names without rejecting the edited category', () => {
    expect(validateCategory({ name: ' pasta ' }, categories)).toContain('already exists')
    expect(validateCategory({ name: ' pasta ' }, categories, 'pasta')).toBeNull()
  })
})
