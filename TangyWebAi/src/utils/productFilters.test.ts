import { describe, expect, it } from 'vitest'
import { filterProducts } from './productFilters'
import type { Product } from '@/types/models'

const products: Product[] = [
  {
    id: '1',
    name: 'Cacio e Pepe',
    description: 'Pecorino and pepper pasta',
    price: 18,
    imageUrl: 'https://example.com/pasta.jpg',
    categoryId: 'pasta',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Margherita',
    description: 'Tomato and basil pizza',
    price: 15,
    imageUrl: 'https://example.com/pizza.jpg',
    categoryId: 'pizza',
    isAvailable: true,
  },
]

describe('filterProducts', () => {
  it('matches name and description case-insensitively', () => {
    expect(filterProducts(products, 'CACIO', 'all')).toHaveLength(1)
    expect(filterProducts(products, 'basil', 'all')[0]?.name).toBe('Margherita')
  })

  it('combines search and category filtering', () => {
    expect(filterProducts(products, 'tomato', 'pasta')).toHaveLength(0)
    expect(filterProducts(products, 'tomato', 'pizza')[0]?.id).toBe('2')
  })

  it('returns every category when all is selected', () => {
    expect(filterProducts(products, '', 'all')).toHaveLength(2)
  })

  it('trims the search term before matching', () => {
    expect(filterProducts(products, '  pepper  ', 'all')[0]?.name).toBe('Cacio e Pepe')
  })

  it('returns no products when the search has no match', () => {
    expect(filterProducts(products, 'lasagna', 'all')).toEqual([])
  })
})
