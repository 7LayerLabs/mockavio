'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Heart, MessageSquare, Download, Lock } from 'lucide-react'

interface GalleryImage {
  id: string
  imageUrl: string
  title: string
  votes: number
}

interface Gallery {
  title: string
  description: string
  images: GalleryImage[]
  allowDownloads: boolean
  allowComments: boolean
  expiresAt: number
  password?: string
}

export default function GalleryViewPage() {
  const params = useParams()
  const shareToken = params.shareToken as string
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    loadGallery()
  }, [shareToken])

  const loadGallery = async () => {
    try {
      const response = await fetch(`/api/galleries/${shareToken}`)
      if (response.status === 403) {
        setPasswordRequired(true)
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error('Failed to load gallery')
      }
      const data = await response.json()
      setGallery(data.gallery)
    } catch (error) {
      console.error('Failed to load gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/galleries/${shareToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!response.ok) {
        alert('Incorrect password')
        return
      }
      const data = await response.json()
      setGallery(data.gallery)
      setPasswordRequired(false)
    } catch (error) {
      alert('Failed to verify password')
    }
  }

  const handleVote = async (imageId: string) => {
    try {
      await fetch(`/api/galleries/${shareToken}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId }),
      })
      // Reload gallery to get updated votes
      loadGallery()
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (passwordRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Password Protected</h2>
            <p className="text-gray-600 mt-2">This gallery requires a password</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
            >
              Access Gallery
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Gallery not found or expired</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{gallery.title}</h1>
          {gallery.description && (
            <p className="text-gray-600">{gallery.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image.imageUrl)}
            >
              <div className="aspect-video relative">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVote(image.id)
                    }}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white"
                  >
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>
                  {gallery.allowDownloads && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const link = document.createElement('a')
                        link.href = image.imageUrl
                        link.download = `${image.title}.png`
                        link.click()
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white"
                    >
                      <Download className="h-5 w-5 text-gray-700" />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{image.votes} votes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

