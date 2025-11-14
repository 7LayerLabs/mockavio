'use client'

import { X, Download, Share2 } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface HistoryItem {
  id: string
  originalImageUrl: string
  transformedImageUrl: string
  prompt: string
  createdAt: number
}

interface HistorySidebarProps {
  history: HistoryItem[]
  isOpen: boolean
  onClose: () => void
  onSelectItem: (item: HistoryItem) => void
}

export function HistorySidebar({
  history,
  isOpen,
  onClose,
  onSelectItem,
}: HistorySidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Transformation History
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No transformations yet</p>
                <p className="text-sm mt-2">
                  Your transformation history will appear here
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <div className="aspect-video relative rounded overflow-hidden mb-2">
                    <img
                      src={item.transformedImageUrl}
                      alt={item.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {item.prompt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle download
                        const link = document.createElement('a')
                        link.href = item.transformedImageUrl
                        link.download = `transformation-${item.id}.png`
                        link.click()
                      }}
                      className="hover:text-mockavio-primary"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle share
                        navigator.clipboard.writeText(
                          window.location.origin + '/gallery/' + item.id
                        )
                        alert('Link copied to clipboard!')
                      }}
                      className="hover:text-mockavio-primary"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

