'use client'

import { useState, useEffect } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  keyPrefix: string
  permissions: string[]
  isActive: boolean
  lastUsedAt: number | null
  createdAt: number
}

export default function ApiSettingsPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKey, setNewKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    loadKeys()
  }, [])

  const loadKeys = async () => {
    // Load API keys from database
    setLoading(false)
  }

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return

    try {
      const response = await fetch('/api/keys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKeyName,
          permissions: ['transform', 'batch'],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create API key')
      }

      const data = await response.json()
      setNewKey(data.apiKey)
      setShowKey(true)
      setNewKeyName('')
      loadKeys()
    } catch (error) {
      alert('Failed to create API key')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const handleRevoke = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return

    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to revoke key')
      }

      loadKeys()
    } catch (error) {
      alert('Failed to revoke API key')
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">API Access</h1>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
              >
                <Plus className="h-5 w-5" />
                Create API Key
              </button>
            </div>

            {/* New Key Display */}
            {newKey && showKey && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">New API Key Created</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Copy this key now. You won&apos;t be able to see it again!
                </p>
                <div className="flex items-center gap-2 bg-white p-3 rounded border">
                  <code className="flex-1 font-mono text-sm">
                    {showKey ? newKey : '••••••••'}
                  </code>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(newKey)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setNewKey(null)
                    setShowKey(false)
                    setShowCreateModal(false)
                  }}
                  className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  I&apos;ve copied it
                </button>
              </div>
            )}

            {/* API Keys List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              </div>
            ) : keys.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">No API keys yet</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
                >
                  Create Your First API Key
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {keys.map((key) => (
                  <div
                    key={key.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{key.name}</h3>
                        <p className="text-sm text-gray-600 font-mono mt-1">
                          {key.keyPrefix}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Permissions: {key.permissions.join(', ')}</span>
                          {key.lastUsedAt && (
                            <span>
                              Last used:{' '}
                              {new Date(key.lastUsedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRevoke(key.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Documentation */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h2>
              <p className="text-gray-600 mb-4">
                Use your API key to integrate Mockavio into your applications.
              </p>
              <div className="bg-gray-50 rounded p-4 font-mono text-sm">
                <pre>{`curl -X POST https://mockavio.com/api/v1/transform \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "base64_encoded_image",
    "prompt": "Modern farmhouse staging"
  }'`}</pre>
              </div>
              <a
                href="/api-docs"
                className="text-mockavio-primary hover:text-mockavio-accent mt-4 inline-block"
              >
                View full API documentation →
              </a>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Create API Key</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production API Key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowCreateModal(false)
                      setNewKeyName('')
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateKey}
                    disabled={!newKeyName.trim()}
                    className="flex-1 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
                  >
                    Create Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

