# Mockavio

**Transform Client Visions Into Reality**

Mockavio is a professional-grade AI visualization platform for realtors, interior designers, and restaurateurs. Built on proven PicForge technology, Mockavio helps professionals close more deals by instantly showing clients what's possible.

## 🎯 Vision

Create a B2B SaaS platform that transforms how professionals present visual concepts to clients. Leverage AI to replace expensive staging, rendering, and photography services with instant, unlimited iterations.

## 💰 Business Model

**B2B SaaS Subscription:**
- **Starter:** $99/mo (500 images/month, 1 user)
- **Professional:** $299/mo (2,000 images/month, 5 users, API access)
- **Enterprise:** Custom pricing (unlimited everything)

**Target:** $10K MRR in 90 days, $50K MRR in 12 months

## 🏗️ Technical Architecture

### Shared Codebase Strategy
Mockavio shares infrastructure with PicForge through domain-based theme detection:
- Same AI transformation engine (Gemini 2.5 Flash Image)
- Same Next.js 15 codebase with Turbopack
- Same InstantDB for auth and data
- Same Stripe for payments
- Different branding, features, and pricing per domain

### Key Technologies
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI:** Google Gemini 2.5 Flash Image (Nano Banana)
- **Database:** InstantDB (real-time, no backend needed)
- **Payments:** Stripe Checkout & Subscriptions
- **Hosting:** Vercel
- **Email:** Resend
- **Rate Limiting:** Vercel KV (Redis)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- API keys (see `.env.example`)

### Installation

```bash
# Clone the repository
git clone https://github.com/7LayerLabs/mockavio.git
cd mockavio

# Install dependencies
npm install

# Copy environment file and fill in your API keys
copy .env.example .env.local
# Edit .env.local with your actual API keys

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see Mockavio in development mode.

### Environment Setup

See `.env.example` for all required environment variables. Key items:

**Required:**
- `GEMINI_API_KEY` - Google Gemini for AI transformations
- `NEXT_PUBLIC_INSTANT_APP_ID` - InstantDB for database/auth
- `STRIPE_SECRET_KEY` - Stripe for payments
- `STRIPE_WEBHOOK_SECRET` - Stripe webhooks (set up after deployment)

**Recommended:**
- `KV_*` variables - Vercel KV for rate limiting
- `RESEND_API_KEY` - Email notifications

## 📁 Project Structure

```
mockavio/
├── markdown-files/          # Strategic documentation
│   ├── 01-PROJECT-OVERVIEW.md
│   ├── 02-INDUSTRY-USE-CASES.md
│   ├── 03-TECHNICAL-ARCHITECTURE.md
│   ├── 04-MARKETING-STRATEGY.md
│   ├── 05-LANDING-PAGE-COPY.md
│   ├── 06-FEATURE-SPECIFICATIONS.md
│   ├── 07-IMPLEMENTATION-ROADMAP.md
│   └── 08-PRICING-STRATEGY.md
├── app/                     # Next.js 15 app directory (to be built)
├── components/              # React components (to be built)
├── lib/                     # Utility functions (to be built)
└── public/                  # Static assets (to be built)
```

## 🎨 Brand Identity

**PicForge (Consumer):**
- Tagline: "Break Reality. Make Them Weird, Epic, Yours."
- Vibe: Edgy, playful, experimental
- Pricing: $14/mo unlimited

**Mockavio (Professional):**
- Tagline: "Transform Client Visions Into Reality"
- Vibe: Professional, reliable, results-driven
- Pricing: $99-$299/mo + Enterprise

## 🎯 Target Industries

### Real Estate Agents
- Virtual staging (save $2,000+ per listing)
- Renovation visualization
- Seasonal transformations
- **ROI:** Break even after 1 listing

### Interior Designers
- Style transfer and color exploration
- Eliminate change orders (save $3,500+ per project)
- Client presentation tool
- **ROI:** 474% return in first year

### Restaurants
- Menu photography variations (10x content from 1 shoot)
- Seasonal menu mockups
- Social media content factory
- **ROI:** Save $6,800/year vs professional shoots

## 🔑 Key Features (Planned)

### Phase 1 (MVP - Week 1-2)
- [x] Domain detection and brand theming
- [ ] Professional landing page
- [ ] Team workspaces (multi-user collaboration)
- [ ] White label exports (remove branding)
- [ ] Image transformation engine
- [ ] Stripe integration

### Phase 2 (Launch - Week 3-4)
- [ ] Client galleries (shareable links)
- [ ] Batch processing
- [ ] Usage tracking and limits
- [ ] Email notifications
- [ ] Analytics dashboard

### Phase 3 (Growth - Month 2-3)
- [ ] API access (Professional/Enterprise)
- [ ] Advanced analytics
- [ ] Integration partnerships
- [ ] Custom features per industry

## 📈 Success Metrics

**Month 1:**
- 50 signups
- $5K MRR
- 3 video testimonials

**Month 3:**
- 200 signups
- $30K MRR
- <5% churn
- NPS > 50

**Month 12:**
- 500+ customers
- $75K MRR
- Profitable unit economics
- Multiple integration partners

## 🤝 Contributing

This is a private repository for 7LayerLabs. If you're a team member:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

Proprietary - All Rights Reserved

Copyright © 2025 7LayerLabs. This software and associated documentation are confidential and proprietary.

## 🙋‍♂️ Contact

**Derek Bobola**
- Email: derek.bobola@gmail.com
- GitHub: [@7LayerLabs](https://github.com/7LayerLabs)
- Website: [menusparks.com](https://menusparks.com)

---

## 📚 Documentation

Comprehensive strategic documentation is in the `/markdown-files/` directory:

1. **Project Overview** - Vision, positioning, revenue model
2. **Industry Use Cases** - Real estate, design, restaurants with ROI
3. **Technical Architecture** - Shared codebase, database schema
4. **Marketing Strategy** - Go-to-market, content, partnerships
5. **Landing Page Copy** - Complete website copy ready to build
6. **Feature Specifications** - Detailed specs for all B2B features
7. **Implementation Roadmap** - 14-day build plan
8. **Pricing Strategy** - Tier breakdown, ROI calculators, experiments

## 🚦 Status

**Current Phase:** Documentation Complete, Implementation Starting

**Next Steps:**
1. Set up domain detection middleware
2. Build Mockavio landing page
3. Implement team workspaces
4. Launch beta program

---

Built with ❤️ by [7LayerLabs](https://github.com/7LayerLabs)

**Let's build this!** 🚀
