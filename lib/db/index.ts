import { init } from '@instantdb/react'
import { schema } from './schema'

const appId = process.env.NEXT_PUBLIC_INSTANT_APP_ID || 'demo-app-id'

// Initialize with a demo app ID if not set (for development)
// Wrap in try-catch to prevent blocking if InstantDB isn't configured
let db: ReturnType<typeof init>
try {
  db = init({
    appId,
    schema,
  })
} catch (error) {
  console.warn('InstantDB initialization failed:', error)
  // Create a mock db object to prevent crashes
  db = {
    useAuth: () => ({ auth: { ready: false }, user: null }),
  } as any
}

export { db }
export type Database = typeof db

