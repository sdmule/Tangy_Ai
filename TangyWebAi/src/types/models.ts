import type { Timestamp } from 'firebase/firestore'

export interface Category {
  id: string
  name: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
  isAvailable: boolean
  tag: string | null
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface ProductInput {
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
  isAvailable: boolean
  tag: string | null
}

export interface CategoryInput {
  name: string
}
