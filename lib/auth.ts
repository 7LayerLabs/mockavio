'use client'

import { db } from './db'

export function useAuth() {
  try {
    return db.useAuth()
  } catch (error) {
    // Return mock auth state if InstantDB not configured
    return {
      auth: { ready: false },
      user: null,
    }
  }
}

export async function getCurrentUser() {
  // Server-side function - would need to be implemented differently
  return null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}

