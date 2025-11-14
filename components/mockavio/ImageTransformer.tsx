'use client'

import { useState, useRef } from 'react'
import { Upload, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ImageTransformerProps {
  onTransform: (imageUrl: string, prompt: string) => void
}

export function ImageTransformer({ onTransform }: ImageTransformerProps) {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleTransform = async () => {
    if (!image || !prompt.trim()) {
      return
    }

    setLoading(true)
    try {
      // Convert image to base64 if needed
      const imageData = image.startsWith('data:') ? image.split(',')[1] : image

      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: image,
          prompt: prompt.trim(),
          style: 'professional',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to transform image')
      }

      const data = await response.json()
      onTransform(data.transformedImageUrl, prompt)
      
      // Reset form
      setPrompt('')
    } catch (error) {
      console.error('Transformation error:', error)
      alert('Failed to transform image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Image Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          dragActive
            ? 'border-mockavio-primary bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          image && 'border-solid border-gray-300'
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="space-y-4">
            <img
              src={image}
              alt="Uploaded"
              className="max-h-96 mx-auto rounded-lg shadow-lg"
            />
            <button
              onClick={() => {
                setImage(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Remove image
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-mockavio-primary hover:text-mockavio-accent font-medium"
              >
                Click to upload
              </label>
              <span className="text-gray-600"> or drag and drop</span>
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  handleFileSelect(file)
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Prompt Input */}
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Describe what you want to see
        </label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Modern farmhouse staging with gray sectional and neutral colors"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-mockavio-primary focus:border-mockavio-primary"
        />
        <p className="text-xs text-gray-500">
          Be specific about style, colors, furniture, and mood
        </p>
      </div>

      {/* Transform Button */}
      <button
        onClick={handleTransform}
        disabled={!image || !prompt.trim() || loading}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-white transition-colors',
          !image || !prompt.trim() || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-mockavio-primary hover:bg-blue-800'
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Transforming...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Transform Image
          </>
        )}
      </button>
    </div>
  )
}

