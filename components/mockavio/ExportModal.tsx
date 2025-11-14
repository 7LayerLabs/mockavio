'use client'

import { useState } from 'react'
import { X, Download, Image as ImageIcon } from 'lucide-react'
import { applyWhiteLabel, type WhiteLabelSettings } from '@/lib/export-processor'
import { cn } from '@/lib/cn'

interface ExportModalProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
  whiteLabelEnabled?: boolean
  whiteLabelSettings?: WhiteLabelSettings
}

export function ExportModal({
  imageUrl,
  isOpen,
  onClose,
  whiteLabelEnabled = false,
  whiteLabelSettings,
}: ExportModalProps) {
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [quality, setQuality] = useState(90)
  const [applyBranding, setApplyBranding] = useState(whiteLabelEnabled)
  const [exporting, setExporting] = useState(false)

  if (!isOpen) return null

  const handleExport = async () => {
    setExporting(true)
    try {
      let exportUrl = imageUrl

      if (applyBranding && whiteLabelSettings) {
        exportUrl = await applyWhiteLabel({
          imageUrl,
          settings: whiteLabelSettings,
          format,
          quality: quality / 100,
        })
      }

      // Download the image
      const link = document.createElement('a')
      link.href = exportUrl
      link.download = `mockavio-export-${Date.now()}.${format}`
      link.click()

      onClose()
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export image')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Export Image</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <div className="flex gap-2">
              {(['png', 'jpeg', 'webp'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={cn(
                    'px-4 py-2 border rounded-md capitalize',
                    format === fmt
                      ? 'border-mockavio-primary bg-blue-50 text-mockavio-primary'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Quality (for JPEG/WebP) */}
          {(format === 'jpeg' || format === 'webp') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* White Label Toggle */}
          {whiteLabelEnabled && whiteLabelSettings && (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Apply White Label Branding</p>
                <p className="text-sm text-gray-500">
                  {applyBranding
                    ? 'Your logo and watermark will be added'
                    : 'Export without branding'}
                </p>
              </div>
              <button
                onClick={() => setApplyBranding(!applyBranding)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  applyBranding ? 'bg-mockavio-primary' : 'bg-gray-300'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    applyBranding ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          )}

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-mockavio-primary text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
          >
            {exporting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Export Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

