'use client'

import { useState, useEffect } from 'react'
import { ImageTransformer } from '@/components/mockavio/ImageTransformer'
import { HistorySidebar, type HistoryItem } from '@/components/mockavio/HistorySidebar'
import { Menu, X } from 'lucide-react'
import { AuthGuard } from '@/components/shared/AuthGuard'

export default function ForgePage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    // Load history from localStorage or database
    const savedHistory = localStorage.getItem('transformation-history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to load history:', e)
      }
    }
  }, [])

  const handleTransform = (imageUrl: string, prompt: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      originalImageUrl: '', // Could store original if needed
      transformedImageUrl: imageUrl,
      prompt,
      createdAt: Date.now(),
    }

    const updatedHistory = [newItem, ...history]
    setHistory(updatedHistory)
    localStorage.setItem('transformation-history', JSON.stringify(updatedHistory))
    setSelectedImage(imageUrl)
  }

  const handleSelectItem = (item: HistoryItem) => {
    setSelectedImage(item.transformedImageUrl)
    setSidebarOpen(false)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-mockavio-primary">Mockavio</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {selectedImage ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <img
                    src={selectedImage}
                    alt="Transformed"
                    className="w-full rounded-lg"
                  />
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-mockavio-primary hover:text-mockavio-accent"
                >
                  ← Transform another image
                </button>
              </div>
            ) : (
              <ImageTransformer onTransform={handleTransform} />
            )}
          </main>

          {/* History Sidebar */}
          <aside className="hidden lg:block w-80">
            <HistorySidebar
              history={history}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onSelectItem={handleSelectItem}
            />
          </aside>
        </div>

        {/* Mobile Sidebar */}
        <HistorySidebar
          history={history}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSelectItem={handleSelectItem}
        />
      </div>
    </AuthGuard>
  )
}

