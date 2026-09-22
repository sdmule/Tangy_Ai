import { describe, expect, it } from 'vitest'
import { getFirebaseErrorMessage } from './firebaseError'

describe('Firebase error messages', () => {
  it('returns the message from an Error instance', () => {
    expect(getFirebaseErrorMessage(new Error('Permission denied'))).toBe('Permission denied')
  })

  it('uses the fallback for unknown errors', () => {
    expect(getFirebaseErrorMessage({ code: 'permission-denied' }, 'Try again later.')).toBe(
      'Try again later.',
    )
  })

  it('uses the default fallback when none is provided', () => {
    expect(getFirebaseErrorMessage(null)).toBe('Something went wrong. Please try again.')
  })
})
