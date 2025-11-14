import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { detectBrand } from './lib/brand-config'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const brand = detectBrand(host)

  // Add brand header for use in components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-brand', brand)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

