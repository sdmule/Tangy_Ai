import { readFile } from 'node:fs/promises'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

const seed = JSON.parse(await readFile(new URL('./seed-data.json', import.meta.url), 'utf8'))
const projectId =
  process.env.GCLOUD_PROJECT || process.env.VITE_FIREBASE_PROJECT_ID || 'tangy-local'
const target = process.env.SEED_TARGET || 'emulator'

if (target === 'emulator' && !process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error('Set FIRESTORE_EMULATOR_HOST before running an emulator seed.')
}

if (target === 'remote' && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Set GOOGLE_APPLICATION_CREDENTIALS before running a remote seed.')
}

initializeApp({ projectId })

const db = getFirestore()
const batch = db.batch()

for (const category of seed.categories) {
  const reference = db.collection('categories').doc(category.id)
  batch.set(
    reference,
    {
      name: category.name,
      nameNormalized: category.name.trim().toLocaleLowerCase(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
}

for (const product of seed.products) {
  const reference = db.collection('products').doc(product.id)
  batch.set(
    reference,
    {
      ...product,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
}

await batch.commit()
console.log(
  `Seeded ${seed.categories.length} categories and ${seed.products.length} products into ${projectId} (${target}).`,
)
