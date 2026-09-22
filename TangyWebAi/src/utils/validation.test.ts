import { describe, expect, it } from 'vitest'
import { validateCategory, validateProduct } from './validation'
import type { Category } from '@/types/models'

const categories: Category[] = [{ id: 'pasta', name: 'Pasta' }]
const product = {
  name: 'Pasta',
  description: 'A dish',
  price: 12,
  imageUrl: 'https://example.com/pasta.jpg',
  categoryId: 'pasta',
  isAvailable: true,
}

describe('validation', () => {
  it('rejects invalid products', () => {
    expect(validateProduct({ ...product, price: 0 }, categories)).toContain('greater than zero')
    expect(
      validateProduct({ ...product, imageUrl: 'http://example.com/pasta.jpg' }, categories),
    ).toContain('HTTPS')
    expect(validateProduct({ ...product, categoryId: 'missing' }, categories)).toContain(
      'existing category',
    )
  })

  it('rejects products with missing required text', () => {
    expect(validateProduct({ ...product, name: ' ' }, categories)).toContain('required')
    expect(validateProduct({ ...product, description: '' }, categories)).toContain('required')
  })

  it('rejects malformed image URLs', () => {
    expect(validateProduct({ ...product, imageUrl: 'not-a-url' }, categories)).toContain('HTTPS')
  })

  it('accepts a valid product', () => {
    expect(validateProduct(product, categories)).toBeNull()
  })

  it('rejects duplicate category names without rejecting the edited category', () => {
    expect(validateCategory({ name: ' pasta ' }, categories)).toContain('already exists')
    expect(validateCategory({ name: ' pasta ' }, categories, 'pasta')).toBeNull()
  })

  it('rejects an empty category name', () => {
    expect(validateCategory({ name: '   ' }, categories)).toContain('required')
  })
})
