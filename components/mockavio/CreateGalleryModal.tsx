'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CreateGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  availableImages: string[]
}

export function CreateGalleryModal({
  isOpen,
  onClose,
  availableImages,
}: CreateGalleryModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [expiresInDays, setExpiresInDays] = useState(30)
  const [password, setPassword] = useState('')
  const [passwordProtected, setPasswordProtected] = useState(false)
  const [allowDownloads, setAllowDownloads] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [requireEmail, setRequireEmail] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const toggleImage = (imageUrl: string) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((url) => url !== imageUrl))
    } else {
      setSelectedImages([...selectedImages, imageUrl])
    }
  }

  const handleCreate = async () => {
    if (!title || selectedImages.length === 0) {
      alert('Please provide a title and select at least one image')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/galleries/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrls: selectedImages,
          expiresInDays,
          password: passwordProtected ? password : undefined,
          allowDownloads,
          allowComments,
          requireEmail,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create gallery')
      }

      const data = await response.json()
      router.push(`/galleries`)
      onClose()
    } catch (error) {
      alert('Failed to create gallery')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create Gallery</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Select Images</h3>
              <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {availableImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    onClick={() => toggleImage(imageUrl)}
                    className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImages.includes(imageUrl)
                        ? 'border-mockavio-primary'
                        : 'border-gray-200'
                    }`}
                  >
                    <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    {selectedImages.includes(imageUrl) && (
                      <div className="absolute top-2 right-2 bg-mockavio-primary rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedImages.length === 0}
                  className="px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
                >
                  Next ({selectedImages.length} selected)
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Gallery Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Kitchen Design Options - 123 Main St"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Optional description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires in (days)
                </label>
                <input
                  type="number"
                  value={expiresInDays}
                  onChange={(e) => setExpiresInDays(Number(e.target.value))}
                  min="1"
                  max="365"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={passwordProtected}
                    onChange={(e) => setPasswordProtected(e.target.checked)}
                  />
                  <span className="text-sm font-medium text-gray-700">Password protect</span>
                </label>
                {passwordProtected && (
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allowDownloads}
                    onChange={(e) => setAllowDownloads(e.target.checked)}
                  />
                  <span className="text-sm font-medium text-gray-700">Allow downloads</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allowComments}
                    onChange={(e) => setAllowComments(e.target.checked)}
                  />
                  <span className="text-sm font-medium text-gray-700">Allow comments</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={requireEmail}
                    onChange={(e) => setRequireEmail(e.target.checked)}
                  />
                  <span className="text-sm font-medium text-gray-700">Require email to view</span>
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={loading || !title}
                  className="flex-1 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Gallery'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

