import { type Schema } from '@instantdb/react'

export const schema: Schema = {
  // User accounts (extends InstantDB's built-in auth.users)
  users: {
    $: {
      email: { type: 'string' },
      name: { type: 'string' },
      image: { type: 'string' },
      createdAt: { type: 'number' },
      updatedAt: { type: 'number' },
    },
  },

  // Teams for Mockavio
  teams: {
    $: {
      name: { type: 'string' },
      ownerId: { type: 'string' },
      plan: { type: 'string' }, // 'starter' | 'professional' | 'enterprise'
      imageQuota: { type: 'number' },
      imageUsed: { type: 'number' },
      quotaResetDate: { type: 'number' },
      stripeCustomerId: { type: 'string' },
      stripeSubscriptionId: { type: 'string' },
      createdAt: { type: 'number' },
      updatedAt: { type: 'number' },
    },
  },

  // Team members
  teamMembers: {
    $: {
      teamId: { type: 'string' },
      userId: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' }, // 'owner' | 'admin' | 'member'
      status: { type: 'string' }, // 'pending' | 'active' | 'suspended'
      invitedAt: { type: 'number' },
      invitedBy: { type: 'string' },
      joinedAt: { type: 'number' },
      lastActiveAt: { type: 'number' },
    },
  },

  // Team projects
  teamProjects: {
    $: {
      teamId: { type: 'string' },
      name: { type: 'string' },
      createdBy: { type: 'string' },
      images: { type: 'string[]' },
      sharedWith: { type: 'string[]' },
      createdAt: { type: 'number' },
      updatedAt: { type: 'number' },
    },
  },

  // Image transformations (shared between brands)
  transformations: {
    $: {
      userId: { type: 'string' },
      teamId: { type: 'string' },
      originalImageUrl: { type: 'string' },
      transformedImageUrl: { type: 'string' },
      prompt: { type: 'string' },
      style: { type: 'string' },
      createdAt: { type: 'number' },
    },
  },

  // Client galleries
  clientGalleries: {
    $: {
      teamId: { type: 'string' },
      userId: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      shareToken: { type: 'string' },
      password: { type: 'string' },
      expiresAt: { type: 'number' },
      isActive: { type: 'boolean' },
      allowDownloads: { type: 'boolean' },
      allowComments: { type: 'boolean' },
      requireEmail: { type: 'boolean' },
      viewCount: { type: 'number' },
      createdAt: { type: 'number' },
      lastViewedAt: { type: 'number' },
    },
  },

  // Gallery images
  galleryImages: {
    $: {
      galleryId: { type: 'string' },
      imageUrl: { type: 'string' },
      thumbnailUrl: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      order: { type: 'number' },
      votes: { type: 'number' },
      createdAt: { type: 'number' },
    },
  },

  // Gallery comments
  galleryComments: {
    $: {
      galleryId: { type: 'string' },
      imageId: { type: 'string' },
      visitorName: { type: 'string' },
      visitorEmail: { type: 'string' },
      comment: { type: 'string' },
      rating: { type: 'number' },
      createdAt: { type: 'number' },
    },
  },

  // Gallery views (analytics)
  galleryViews: {
    $: {
      galleryId: { type: 'string' },
      visitorEmail: { type: 'string' },
      ipAddress: { type: 'string' },
      userAgent: { type: 'string' },
      viewedAt: { type: 'number' },
    },
  },

  // White label settings
  whiteLabelSettings: {
    $: {
      userId: { type: 'string' },
      teamId: { type: 'string' },
      logoUrl: { type: 'string' },
      watermarkText: { type: 'string' },
      brandColors: { type: 'json' },
      showBranding: { type: 'boolean' },
      position: { type: 'string' },
      opacity: { type: 'number' },
      createdAt: { type: 'number' },
      updatedAt: { type: 'number' },
    },
  },

  // API keys
  apiKeys: {
    $: {
      userId: { type: 'string' },
      teamId: { type: 'string' },
      name: { type: 'string' },
      keyHash: { type: 'string' },
      keyPrefix: { type: 'string' },
      permissions: { type: 'string[]' },
      rateLimit: { type: 'number' },
      isActive: { type: 'boolean' },
      lastUsedAt: { type: 'number' },
      createdAt: { type: 'number' },
      expiresAt: { type: 'number' },
    },
  },

  // API usage tracking
  apiUsage: {
    $: {
      apiKeyId: { type: 'string' },
      endpoint: { type: 'string' },
      method: { type: 'string' },
      statusCode: { type: 'number' },
      responseTime: { type: 'number' },
      imageCount: { type: 'number' },
      errorMessage: { type: 'string' },
      requestedAt: { type: 'number' },
    },
  },

  // Usage tracking
  usage: {
    $: {
      userId: { type: 'string' },
      teamId: { type: 'string' },
      tier: { type: 'string' },
      count: { type: 'number' },
      lastReset: { type: 'number' },
      subscriptionId: { type: 'string' },
      whiteLabelEnabled: { type: 'boolean' },
    },
  },
}

