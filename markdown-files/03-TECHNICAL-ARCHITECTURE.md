# Mockavio - Technical Architecture

## Architecture Strategy: Shared Codebase with Domain Detection

### Core Concept
One Next.js application serves both PicForge and Mockavio with:
- Domain-based theme detection
- Shared API routes and AI engine
- Different feature sets enabled per brand
- Unified authentication and billing

### Benefits
✅ Share improvements automatically
✅ One codebase to maintain
✅ Launch in days, not weeks
✅ Bug fixes happen once
✅ Same AI infrastructure costs

---

## Domain Setup

### Production Domains
```
pic-forge.com          → Consumer brand (existing)
mockavio.com           → Professional brand (new)
```

### Development/Staging
```
localhost:3000         → PicForge dev
localhost:3001         → Mockavio dev (domain override)
```

### Implementation
```typescript
// middleware.ts
const domain = request.headers.get('host') || ''
const isMockavio = domain.includes('mockavio')

request.headers.set('x-brand', isMockavio ? 'mockavio' : 'picforge')
```

---

## Brand Detection & Theming

### Theme Configuration
```typescript
// lib/brand-config.ts
export const BRANDS = {
  picforge: {
    name: 'PicForge',
    tagline: 'Break Reality. Make Them Weird, Epic, Yours.',
    colors: {
      primary: '#14b8a6',    // teal
      secondary: '#9333ea',   // purple
      accent: '#f59e0b'       // amber
    },
    features: {
      forge: true,
      roulette: true,
      roast: true,
      nsfw: true,
      batch: true,
      canvas: true
    },
    pricing: {
      free: { images: 20 },
      pro: { price: 14, images: 'unlimited' }
    }
  },
  mockavio: {
    name: 'Mockavio',
    tagline: 'Transform Client Visions Into Reality',
    colors: {
      primary: '#1e40af',     // deep blue
      secondary: '#475569',   // slate
      accent: '#0ea5e9'       // sky blue
    },
    features: {
      forge: true,
      roulette: false,        // Hide playful features
      roast: false,
      nsfw: false,
      batch: true,
      canvas: true,
      teamWorkspace: true,    // B2B only
      clientGallery: true,
      whiteLabelExport: true,
      apiAccess: true
    },
    pricing: {
      starter: { price: 99, users: 1, images: 500 },
      professional: { price: 299, users: 5, images: 2000 },
      enterprise: { price: 'custom', users: 'unlimited', images: 'unlimited' }
    }
  }
}
```

### Using Brand Config
```typescript
// hooks/useBrand.ts
export function useBrand() {
  const headers = useHeaders()
  const brand = headers.get('x-brand') || 'picforge'
  return BRANDS[brand]
}

// In components
const brand = useBrand()
<h1 className={`text-${brand.colors.primary}`}>
  {brand.tagline}
</h1>
```

---

## File Structure

### Shared Components
```
app/
  ├── forge/              # Core image transformation
  ├── batch/              # Batch processing
  ├── canvas/             # Text-to-image generation
  ├── api/
  │   ├── process-image/  # Shared AI engine
  │   └── webhooks/stripe/ # Shared billing
  ├── components/
  │   └── shared/         # Brand-agnostic components
  └── layout.tsx          # Detects brand, applies theme
```

### Brand-Specific Components
```
app/
  ├── components/
  │   ├── picforge/
  │   │   ├── Navigation.tsx
  │   │   ├── Hero.tsx
  │   │   └── PricingTable.tsx
  │   └── mockavio/
  │       ├── Navigation.tsx
  │       ├── Hero.tsx
  │       └── PricingTable.tsx
```

### Brand-Specific Pages
```
app/
  ├── page.tsx                    # Root - detects brand
  ├── (picforge)/
  │   ├── roulette/
  │   └── roast/
  └── (mockavio)/
      ├── case-studies/
      ├── real-estate/
      ├── interior-design/
      └── restaurants/
```

---

## Database Schema (InstantDB)

### New Tables for Mockavio

#### Team Workspaces
```typescript
{
  teams: {
    id: string
    name: string
    ownerId: string
    plan: 'starter' | 'professional' | 'enterprise'
    createdAt: number
  }
}
```

#### Team Members
```typescript
{
  teamMembers: {
    id: string
    teamId: string
    userId: string
    role: 'owner' | 'admin' | 'member'
    invitedAt: number
    joinedAt: number
  }
}
```

#### Client Galleries
```typescript
{
  clientGalleries: {
    id: string
    teamId: string
    createdBy: string
    title: string
    shareToken: string  // UUID for sharing
    expiresAt: number
    images: string[]    // Array of image URLs
    createdAt: number
  }
}
```

#### Usage Tracking (Extended)
```typescript
{
  usage: {
    id: string
    userId: string
    teamId: string | null    // NEW: Associate with team
    tier: 'free' | 'pro' | 'starter' | 'professional' | 'enterprise'
    count: number
    lastReset: number
    subscriptionId: string
    whiteLabelEnabled: boolean  // NEW: For export branding
  }
}
```

---

## New Features Implementation

### 1. Team Workspaces

**Create Team**
```typescript
// app/api/teams/create/route.ts
POST /api/teams/create
Body: { name, plan }
Response: { teamId, inviteLink }
```

**Invite Members**
```typescript
// app/api/teams/invite/route.ts
POST /api/teams/invite
Body: { teamId, email, role }
Response: { inviteToken }
```

**Member sees all team images in shared workspace**

---

### 2. White Label Exports

**Toggle in Export Modal**
```typescript
// components/mockavio/ExportModal.tsx
const { whiteLabelEnabled } = useBrand()

if (whiteLabelEnabled) {
  // Remove "Generated by Mockavio" watermark
  // Add client's logo if configured
}
```

**Team Settings**
```typescript
// app/(mockavio)/settings/branding/page.tsx
- Upload custom logo
- Set brand colors
- Configure watermark text
```

---

### 3. Client Galleries

**Create Gallery**
```typescript
// app/api/galleries/create/route.ts
POST /api/galleries/create
Body: { title, images[] }
Response: { galleryId, shareUrl }
```

**Share Link Format**
```
mockavio.com/gallery/[shareToken]
- No login required
- Expires after 30 days
- Client can download images
- Collect feedback (optional)
```

---

### 4. API Access (Professional/Enterprise)

**Generate API Key**
```typescript
// app/(mockavio)/settings/api/page.tsx
- Generate API key
- View usage stats
- Rate limits based on plan
```

**API Endpoint**
```typescript
// app/api/v1/transform/route.ts
POST /api/v1/transform
Headers: { Authorization: Bearer <api_key> }
Body: { image: base64, prompt: string }
Response: { transformedImage: base64 }
```

---

## Deployment Strategy

### Phase 1: Subdomain (Week 1)
```
studio.pic-forge.com → Mockavio preview
- Test with early adopters
- Validate pricing
- Collect feedback
```

### Phase 2: Full Domain (Week 2-3)
```
mockavio.com → Full launch
- Custom domain
- Professional branding
- Full feature set
```

### Phase 3: Scale (Month 2+)
```
- Add more industry templates
- Build API ecosystem
- Enterprise features
```

---

## Environment Variables

### New Variables for Mockavio
```env
# Brand Detection
NEXT_PUBLIC_MOCKAVIO_DOMAIN=mockavio.com

# Team Features
NEXT_PUBLIC_MAX_TEAM_SIZE_STARTER=1
NEXT_PUBLIC_MAX_TEAM_SIZE_PRO=5

# API Access
MOCKAVIO_API_SECRET=xxx
MOCKAVIO_API_RATE_LIMIT=100  # per hour

# White Label
NEXT_PUBLIC_ENABLE_WHITE_LABEL=true
```

---

## Performance Considerations

### Caching Strategy
- Cache brand config in memory
- CDN for static assets per brand
- Separate Redis keys per brand

### Cost Optimization
- Share AI API costs across brands
- Tiered rate limiting (consumer vs commercial)
- Batch processing reduces API calls

### Monitoring
- Track usage per brand
- Separate analytics dashboards
- Alert on unusual patterns per domain

---

## Migration Path

### Day 1: Setup
- Add brand detection middleware
- Create Mockavio theme files
- Configure mockavio.com domain

### Day 2-3: Features
- Build team workspace UI
- Implement white label exports
- Create client gallery system

### Day 4-5: Content
- Write landing page copy
- Create case studies
- Design professional theme

### Day 6-7: Testing
- Test both brands work independently
- Verify billing works per brand
- Load testing

### Day 8: Launch
- Deploy mockavio.com
- Announce to target industries
- Monitor early signups
