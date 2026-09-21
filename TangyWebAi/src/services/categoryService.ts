import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { Category, CategoryInput } from '@/types/models'

const categoriesCollection = collection(db, 'categories')

const normalizeName = (name: string) => name.trim().toLocaleLowerCase()

const toCategory = (snapshot: { id: string; data: () => Record<string, unknown> }) => ({
  id: snapshot.id,
  name: String(snapshot.data().name ?? ''),
  createdAt: snapshot.data().createdAt as Category['createdAt'],
  updatedAt: snapshot.data().updatedAt as Category['updatedAt'],
})

export async function listCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoriesCollection)
  return snapshot.docs.map(toCategory).sort((left, right) => left.name.localeCompare(right.name))
}

export async function categoryNameExists(name: string, exceptId?: string): Promise<boolean> {
  const snapshot = await getDocs(
    query(categoriesCollection, where('nameNormalized', '==', normalizeName(name)), limit(2)),
  )
  return snapshot.docs.some((category) => category.id !== exceptId)
}

export async function createCategory(input: CategoryInput): Promise<string> {
  const reference = await addDoc(categoriesCollection, {
    name: input.name.trim(),
    nameNormalized: normalizeName(input.name),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return reference.id
}

export async function updateCategory(id: string, input: CategoryInput): Promise<void> {
  await updateDoc(doc(db, 'categories', id), {
    name: input.name.trim(),
    nameNormalized: normalizeName(input.name),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', id))
}
