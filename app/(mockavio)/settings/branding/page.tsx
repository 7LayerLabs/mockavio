'use client'

import { useState } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { Upload, X } from 'lucide-react'

export default function BrandingSettingsPage() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [watermarkText, setWatermarkText] = useState('')
  const [showBranding, setShowBranding] = useState(true)
  const [position, setPosition] = useState('bottom-right')
  const [opacity, setOpacity] = useState(80)
  const [loading, setLoading] = useState(false)

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await fetch('/api/white-label/upload-logo', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload logo')
      }

      const data = await response.json()
      setLogoUrl(data.logoUrl)
    } catch (error) {
      alert('Failed to upload logo')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/white-label/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logoUrl,
          watermarkText,
          showBranding,
          position,
          opacity,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      alert('Settings saved!')
    } catch (error) {
      alert('Failed to save settings')
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Branding Settings</h1>

            {/* Logo Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Logo</h2>
              <div className="space-y-4">
                {logoUrl ? (
                  <div className="relative inline-block">
                    <img src={logoUrl} alt="Logo" className="max-h-20" />
                    <button
                      onClick={() => setLogoUrl(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload logo</span>
                    <span className="text-xs text-gray-500">PNG, SVG up to 2MB</span>
                    <input
                      type="file"
                      accept="image/png,image/svg+xml"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                )}
                <p className="text-sm text-gray-500">
                  Recommended size: 200x50px. Supported formats: PNG, SVG
                </p>
              </div>
            </div>

            {/* Watermark Text */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Watermark Text</h2>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g., Presented by Your Company"
                maxLength={50}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-2">Character limit: 50</p>
            </div>

            {/* Watermark Position */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Watermark Position</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'bottom-right',
                  'bottom-left',
                  'top-right',
                  'top-left',
                  'center',
                ].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`px-4 py-2 border rounded-md capitalize ${
                      position === pos
                        ? 'border-mockavio-primary bg-blue-50 text-mockavio-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Opacity: {opacity}%</h2>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Toggle Branding */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Show Branding</h2>
                  <p className="text-sm text-gray-500">
                    {showBranding
                      ? 'Your logo and watermark will appear on exports'
                      : 'Exports will have no branding'}
                  </p>
                </div>
                <button
                  onClick={() => setShowBranding(!showBranding)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showBranding ? 'bg-mockavio-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showBranding ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

