import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  const host = import.meta.env.VITE_FIREBASE_EMULATOR_HOST || '127.0.0.1'
  connectFirestoreEmulator(db, host, Number(import.meta.env.VITE_FIREBASE_EMULATOR_PORT || 8080))
  connectAuthEmulator(auth, `http://${host}:9099`)
}

let authReady: Promise<void> | null = null

// Firestore write rules require an authenticated request; anonymous sign-in satisfies that without a login flow.
export function ensureAuthenticated(): Promise<void> {
  if (!authReady) {
    authReady = new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            unsubscribe()
            resolve()
          }
        },
        (error) => {
          unsubscribe()
          reject(error)
        },
      )
      if (!auth.currentUser) {
        signInAnonymously(auth).catch((error) => {
          unsubscribe()
          reject(error)
        })
      }
    })
  }
  return authReady
}
