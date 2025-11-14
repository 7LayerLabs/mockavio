'use client'

import { useState, useEffect } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { useAuth } from '@/lib/auth'
import { Plus, Users, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Team {
  id: string
  name: string
  plan: string
  imageQuota: number
  imageUsed: number
  memberCount: number
}

export default function WorkspacePage() {
  const { user } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load teams from database
    // This would use InstantDB queries in a real implementation
    setLoading(false)
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Workspace</h1>
            <Link
              href="/workspace/create"
              className="flex items-center gap-2 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
            >
              <Plus className="h-5 w-5" />
              Create Team
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : teams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No teams yet
              </h2>
              <p className="text-gray-600 mb-6">
                Create a team to start collaborating with your colleagues
              </p>
              <Link
                href="/workspace/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
              >
                <Plus className="h-5 w-5" />
                Create Your First Team
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <Link
                  key={team.id}
                  href={`/workspace/${team.id}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {team.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Plan:</span>
                      <span className="font-semibold capitalize">{team.plan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Members:</span>
                      <span className="font-semibold">{team.memberCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Usage:</span>
                      <span className="font-semibold">
                        {team.imageUsed} / {team.imageQuota}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-mockavio-primary h-2 rounded-full"
                          style={{
                            width: `${(team.imageUsed / team.imageQuota) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

