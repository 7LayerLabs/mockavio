'use client'

import { useState } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { Plus, Mail, UserX } from 'lucide-react'

interface TeamMember {
  id: string
  email: string
  role: string
  status: string
  joinedAt: number | null
}

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return

    try {
      const response = await fetch('/api/teams/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: 'team-id-placeholder',
          email: inviteEmail,
          role: inviteRole,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send invitation')
      }

      setInviteEmail('')
      setInviteRole('member')
      setShowInviteModal(false)
      alert('Invitation sent!')
    } catch (error) {
      alert('Failed to send invitation')
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
              >
                <Plus className="h-5 w-5" />
                Invite Member
              </button>
            </div>

            <div className="space-y-4">
              {members.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No members yet</p>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{member.email}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {member.role} • {member.status}
                      </p>
                    </div>
                    {member.role !== 'owner' && (
                      <button className="text-red-600 hover:text-red-800">
                        <UserX className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Invite Team Member</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="colleague@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInvite}
                    className="flex-1 px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
                  >
                    Send Invitation
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

