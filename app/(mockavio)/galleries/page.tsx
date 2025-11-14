'use client'

import { useState, useEffect } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { Plus, Link as LinkIcon, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Gallery {
  id: string
  title: string
  shareToken: string
  viewCount: number
  isActive: boolean
  expiresAt: number
  createdAt: number
}

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGalleries()
  }, [])

  const loadGalleries = async () => {
    // Load galleries from database
    // This would use InstantDB queries in a real implementation
    setLoading(false)
  }

  const copyShareLink = (shareToken: string) => {
    const shareUrl = `${window.location.origin}/gallery/${shareToken}`
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied to clipboard!')
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Client Galleries</h1>
            <Link
              href="/galleries/create"
              className="flex items-center gap-2 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
            >
              <Plus className="h-5 w-5" />
              Create Gallery
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-6">No galleries yet</p>
              <Link
                href="/galleries/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
              >
                <Plus className="h-5 w-5" />
                Create Your First Gallery
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {gallery.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Views:</span>
                      <span className="font-semibold">{gallery.viewCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <span
                        className={`font-semibold capitalize ${
                          gallery.isActive ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {gallery.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Expires:</span>
                      <span className="font-semibold">
                        {new Date(gallery.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyShareLink(gallery.shareToken)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Copy Link
                    </button>
                    <Link
                      href={`/gallery/${gallery.shareToken}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

