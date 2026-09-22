import { describe, expect, it } from 'vitest'
import { isCategoryReferenced } from './categoryRules'
import type { Product } from '@/types/models'

const products = [
  {
    id: '1',
    name: 'Pasta',
    description: 'A dish',
    price: 12,
    imageUrl: 'https://example.com/pasta.jpg',
    categoryId: 'entree',
    isAvailable: true,
  },
] satisfies Product[]

describe('category deletion protection', () => {
  it('detects a category referenced by a product', () => {
    expect(isCategoryReferenced('entree', products)).toBe(true)
  })

  it('allows deletion when no product references the category', () => {
    expect(isCategoryReferenced('desert', products)).toBe(false)
  })
})