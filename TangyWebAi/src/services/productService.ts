import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, ensureAuthenticated } from '@/firebase/config'
import type { Product, ProductInput } from '@/types/models'

const productsCollection = collection(db, 'products')

const toProduct = (snapshot: { id: string; data: () => Record<string, unknown> }) => ({
  id: snapshot.id,
  name: String(snapshot.data().name ?? ''),
  description: String(snapshot.data().description ?? ''),
  price: Number(snapshot.data().price ?? 0),
  imageUrl: String(snapshot.data().imageUrl ?? ''),
  categoryId: String(snapshot.data().categoryId ?? ''),
  isAvailable: Boolean(snapshot.data().isAvailable),
  tag: String(snapshot.data().tag ?? '').trim() || null,
  createdAt: snapshot.data().createdAt as Product['createdAt'],
  updatedAt: snapshot.data().updatedAt as Product['updatedAt'],
})

export async function listProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection)
  return snapshot.docs.map(toProduct)
}

export async function listProductsByCategory(categoryId: string): Promise<Product[]> {
  const snapshot = await getDocs(query(productsCollection, where('categoryId', '==', categoryId)))
  return snapshot.docs.map(toProduct)
}

export async function createProduct(input: ProductInput): Promise<string> {
  await ensureAuthenticated()
  const reference = await addDoc(productsCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return reference.id
}

export async function updateProduct(id: string, input: ProductInput): Promise<void> {
  await ensureAuthenticated()
  await updateDoc(doc(db, 'products', id), {
    ...input,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteProduct(id: string): Promise<void> {
  await ensureAuthenticated()
  await deleteDoc(doc(db, 'products', id))
}
