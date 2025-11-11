# Mockavio - Implementation Roadmap

## Overview

**Goal:** Launch Mockavio from shared PicForge codebase in 14 days

**Strategy:** Leverage existing PicForge infrastructure, add B2B features, launch with core value proposition

---

## Week 1: Foundation & Core Features

### Day 1-2: Brand Detection & Theming Setup

**Tasks:**
1. ✅ Create brand configuration system
2. ✅ Implement domain detection middleware
3. ✅ Set up theme switching
4. ✅ Configure environment variables
5. ✅ Test on localhost with domain override

**Files to Create/Modify:**
- `middleware.ts` - Add domain detection
- `lib/brand-config.ts` - Brand configurations
- `hooks/useBrand.ts` - Brand context hook
- `app/layout.tsx` - Apply brand theme
- `.env.local` - Add Mockavio domain variables

**Deliverable:** PicForge and Mockavio themes working on same codebase

**Testing:**
```bash
# Test PicForge
http://localhost:3000

# Test Mockavio
http://localhost:3001 (with domain override)
```

---

### Day 3: Mockavio Landing Page

**Tasks:**
1. Create Mockavio homepage
2. Write professional copy
3. Design professional theme (blue/slate instead of teal/purple)
4. Add industry-specific sections
5. Create pricing table

**Files to Create:**
- `app/(mockavio)/page.tsx` - Homepage
- `components/mockavio/Hero.tsx` - Hero section
- `components/mockavio/Navigation.tsx` - Nav bar
- `components/mockavio/PricingTable.tsx` - Pricing
- `components/mockavio/IndustryShowcase.tsx` - Use cases

**Copy Needed:**
- Hero headline and subheadline
- Feature descriptions
- Industry use cases
- Testimonials (can use placeholders initially)
- Pricing tiers and features

**Design Elements:**
- Professional color scheme (deep blue #1e40af, slate #475569)
- Clean, corporate typography
- Professional imagery (real estate, design, food)
- Trust signals (security, privacy, testimonials)

**Deliverable:** Complete landing page ready for preview

---

### Day 4-5: Database Schema & Team Features

**Tasks:**
1. Extend InstantDB schema for teams
2. Build team creation flow
3. Implement member invitation system
4. Create team workspace UI
5. Add team context to image processing

**Database Changes:**
```typescript
// Add to InstantDB schema
teams: {
  id: string
  name: string
  ownerId: string
  plan: 'starter' | 'professional' | 'enterprise'
  imageQuota: number
  imageUsed: number
  createdAt: number
}

teamMembers: {
  id: string
  teamId: string
  userId: string
  role: 'owner' | 'admin' | 'member'
  status: 'pending' | 'active'
  joinedAt: number
}
```

**API Endpoints:**
- `POST /api/teams/create`
- `POST /api/teams/invite`
- `POST /api/teams/accept-invite`
- `GET /api/teams/{id}/members`

**UI Pages:**
- `/workspace` - Team workspace dashboard
- `/settings/team` - Team management

**Deliverable:** Working team workspace for 2+ users

---

### Day 6-7: White Label Exports & Testing

**Tasks:**
1. Build branding settings page
2. Implement logo upload
3. Create export with branding logic
4. Add white label toggle to export modal
5. End-to-end testing of all features

**Files to Create:**
- `app/(mockavio)/settings/branding/page.tsx`
- `lib/export-processor.ts` - Branding logic
- `components/mockavio/ExportModal.tsx`
- `app/api/white-label/upload-logo/route.ts`

**Testing Checklist:**
- [ ] Brand detection works (PicForge vs Mockavio)
- [ ] Theme switching works correctly
- [ ] Team creation and invites work
- [ ] Image processing works for both brands
- [ ] White label export removes Mockavio branding
- [ ] Custom logo applies correctly
- [ ] Pricing and billing work
- [ ] Mobile responsive on both brands

**Deliverable:** Fully functional MVP ready for beta testing

---

## Week 2: Polish, Content & Launch

### Day 8-9: Content Creation & Case Studies

**Tasks:**
1. Write industry-specific content
2. Create use case examples
3. Generate sample transformations
4. Write FAQ content
5. Create tutorial videos/GIFs

**Content Needed:**

**Real Estate:**
- 3 before/after examples (staging, renovation, landscaping)
- ROI calculator copy
- Case study: "How Sarah saved $12K in staging costs"
- Tutorial: "Virtual staging in 60 seconds"

**Interior Design:**
- 3 before/after examples (style transfer, color schemes, furniture swap)
- Change order prevention messaging
- Case study: "How Jamie eliminated 80% of change orders"
- Tutorial: "Client presentation with history sidebar"

**Restaurants:**
- 3 before/after examples (plating styles, seasonal themes, ambiance)
- Social content strategy
- Case study: "10x content from 1 photoshoot"
- Tutorial: "Creating menu variations"

**Deliverable:** Complete content for all landing page sections

---

### Day 10: Client Gallery Feature

**Tasks:**
1. Create gallery database schema
2. Build gallery creation modal
3. Create public gallery view (no login required)
4. Implement commenting and voting
5. Add analytics tracking

**Files to Create:**
- `app/api/galleries/create/route.ts`
- `app/gallery/[shareToken]/page.tsx` - Public view
- `app/(mockavio)/galleries/page.tsx` - Management
- `components/mockavio/CreateGalleryModal.tsx`

**Features:**
- Create gallery from image history
- Generate shareable link
- Password protection (optional)
- 30-day expiration
- Client commenting
- Vote/like images
- Download original images

**Deliverable:** Working gallery system for client sharing

---

### Day 11: Stripe Integration & Billing

**Tasks:**
1. Create Mockavio pricing products in Stripe
2. Set up subscription plans
3. Implement upgrade/downgrade flows
4. Add usage tracking and limits
5. Configure webhooks

**Stripe Products:**

**Starter ($99/mo)**
- 500 images/month
- 1 user
- All core features

**Professional ($299/mo)**
- 2000 images/month
- 5 users
- Team workspaces
- White label
- Client galleries
- API access

**Enterprise (Custom)**
- Unlimited everything
- Custom integrations
- Dedicated support

**Implementation:**
- `app/api/checkout/route.ts` - Checkout session
- `app/api/webhooks/stripe/route.ts` - Handle events
- `app/(mockavio)/settings/billing/page.tsx` - Billing management
- `lib/usage-tracker.ts` - Track image usage

**Testing:**
- [ ] Checkout works for all plans
- [ ] Webhooks update database correctly
- [ ] Usage limits enforced
- [ ] Upgrade/downgrade works
- [ ] Billing portal accessible

**Deliverable:** Complete payment system working

---

### Day 12: Domain Setup & Deployment

**Tasks:**
1. Purchase mockavio.com domain
2. Configure DNS records
3. Add domain to Vercel
4. Set up SSL certificates
5. Configure production environment variables
6. Deploy to production

**Domain Configuration:**
```
DNS Records:
A     @     76.76.21.21 (Vercel IP)
CNAME www   cname.vercel-dns.com
```

**Environment Variables:**
```env
# Production
NEXT_PUBLIC_MOCKAVIO_DOMAIN=mockavio.com
NEXT_PUBLIC_PICFORGE_DOMAIN=pic-forge.com

# Stripe (use live keys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# InstantDB
INSTANTDB_APP_ID=...
INSTANTDB_ADMIN_TOKEN=...

# Gemini
GEMINI_API_KEY=...
```

**Deployment:**
```bash
# Deploy to production
git add .
git commit -m "Launch Mockavio"
git push origin main

# Vercel auto-deploys
# Verify at mockavio.com
```

**Testing Checklist:**
- [ ] mockavio.com loads correctly
- [ ] pic-forge.com still works
- [ ] SSL certificates active
- [ ] Environment variables set
- [ ] Payment processing works
- [ ] Image transformations work
- [ ] Database operations work
- [ ] Email notifications work

**Deliverable:** Live site at mockavio.com

---

### Day 13: Beta Testing & Feedback

**Tasks:**
1. Invite 10 beta testers
2. Schedule 1-on-1 demos
3. Collect feedback
4. Fix critical bugs
5. Iterate on UX issues

**Beta Tester Recruitment:**
- Real estate agents in Derek's network
- Interior designers from LinkedIn
- Restaurant owners (Bobola's connections)
- MenuSparks customers

**Feedback Collection:**
- Google Form for structured feedback
- Loom videos of user sessions
- Direct calls for detailed feedback
- Track usage analytics

**Metrics to Watch:**
- Sign-up completion rate
- Feature usage (which features used most)
- Time to first transformation
- Transformation success rate
- User retention day 2, 7, 14

**Critical Issues to Address:**
- Bugs that block core workflows
- Confusing UX that stops users
- Performance issues
- Payment failures

**Deliverable:** 10 beta users actively testing, feedback collected

---

### Day 14: Launch Preparation & Marketing

**Tasks:**
1. Write launch announcement
2. Create social media posts
3. Prepare email campaign
4. Set up analytics tracking
5. Schedule Product Hunt launch (future)
6. Soft launch to beta users

**Launch Assets:**

**Email to Beta Users:**
Subject: "Mockavio is Live! Here's Your Exclusive 50% Off"
- Thank beta testers
- Announce official launch
- Offer 50% off first 3 months
- Request testimonials

**Social Media Posts:**
- LinkedIn: Professional announcement with use cases
- Twitter: Short demo video
- Instagram: Before/after transformations
- Facebook Groups: Share in real estate/design groups

**Analytics Setup:**
- Google Analytics 4
- Mixpanel events tracking
- Vercel Analytics
- Stripe revenue tracking

**Success Metrics:**
- Day 1: 5 signups
- Week 1: 20 signups
- Month 1: 50 signups, $5K MRR

**Deliverable:** Official launch completed, marketing in motion

---

## Month 2: Growth & Iteration

### Week 3-4: API Access & Advanced Features

**Tasks:**
1. Build API key generation system
2. Create API documentation site
3. Implement rate limiting
4. Build usage dashboard
5. Launch Professional/Enterprise plans

**Deliverable:** API access available for Pro/Enterprise customers

---

### Week 5-6: Content Marketing & SEO

**Tasks:**
1. Write 10 blog posts (SEO optimized)
2. Create video tutorials for YouTube
3. Build case studies with real customers
4. Optimize landing pages for conversion
5. Start paid ad campaigns

**Blog Topics:**
- "Virtual Staging Cost Comparison 2025"
- "How to Show Renovation Potential Without Renovating"
- "Interior Design Client Presentations: The AI Revolution"
- "10x Your Restaurant Menu Photography"

**Deliverable:** Content machine producing 2-3 pieces/week

---

### Week 7-8: Partnership Development

**Tasks:**
1. Reach out to real estate brokerages
2. Partner with food photographers
3. Integrate with MenuSparks (cross-sell)
4. Explore integration opportunities
5. Build affiliate program

**Partnership Targets:**
- Keller Williams offices
- Independent brokerages
- Food photography studios
- Interior design firms

**Deliverable:** 3-5 partnership conversations started

---

## Month 3: Scale & Enterprise

### Week 9-10: Enterprise Features

**Tasks:**
1. Custom integrations
2. Dedicated support channels
3. SLA agreements
4. White-glove onboarding
5. Custom contract terms

**Deliverable:** Enterprise plan ready for large clients

---

### Week 11-12: Expansion & Optimization

**Tasks:**
1. Add new industry templates
2. Improve AI transformation quality
3. Reduce processing time
4. Build community features
5. Plan international expansion

**Deliverable:** Product improvements based on 90 days of data

---

## Technical Milestones

### Phase 1: MVP (Day 1-7)
- ✅ Brand detection working
- ✅ Mockavio theme applied
- ✅ Landing page complete
- ✅ Team workspaces functional
- ✅ White label exports working
- ✅ Core features tested

### Phase 2: Launch (Day 8-14)
- ✅ Content complete
- ✅ Client galleries working
- ✅ Payment system live
- ✅ Domain configured
- ✅ Beta testing complete
- ✅ Public launch

### Phase 3: Growth (Month 2)
- ✅ API access available
- ✅ Content marketing started
- ✅ Partnerships initiated
- ✅ 50+ customers

### Phase 4: Scale (Month 3)
- ✅ Enterprise features
- ✅ Integration ecosystem
- ✅ $10K+ MRR
- ✅ Profitable unit economics

---

## Risk Management

### Technical Risks

**Risk:** Domain detection doesn't work reliably
**Mitigation:** Test thoroughly on localhost with different port/domain overrides before deployment

**Risk:** Image processing overloads server with high usage
**Mitigation:** Implement queue system (BullMQ/Redis), rate limiting per plan

**Risk:** Stripe webhook failures cause billing issues
**Mitigation:** Implement retry logic, manual reconciliation process, monitoring alerts

**Risk:** Database performance degrades with scale
**Mitigation:** Index optimization, caching strategy, read replicas if needed

### Business Risks

**Risk:** No one signs up at $99/mo price point
**Mitigation:** Beta test pricing, offer first-month discount, validate ROI messaging

**Risk:** Customer churns after first month
**Mitigation:** Onboarding flow, usage tracking, proactive support, feature education

**Risk:** Market doesn't see value over DIY tools
**Mitigation:** Focus on time savings and professional quality, build strong case studies

**Risk:** Competitors copy and undercut pricing
**Mitigation:** Build moat with integrations, community, customer success

### Timeline Risks

**Risk:** Underestimate implementation time
**Mitigation:** Cut scope if needed, launch with core features first, add advanced features later

**Risk:** Beta testing reveals major issues
**Mitigation:** Build in buffer time (Day 13), have backup launch date

**Risk:** Domain/infrastructure issues delay launch
**Mitigation:** Set up infrastructure early (Day 12), test thoroughly

---

## Success Criteria

### Week 1
- [x] Mockavio theme working on shared codebase
- [ ] Landing page live with professional design
- [ ] Team workspaces functional
- [ ] White label exports working
- [ ] Beta ready for testing

### Week 2
- [ ] 10 beta users actively testing
- [ ] Domain live at mockavio.com
- [ ] Payment system working
- [ ] Client galleries functional
- [ ] Public launch completed

### Month 1
- [ ] 50 signups (any plan)
- [ ] $5K MRR
- [ ] 3 video testimonials
- [ ] <5% churn
- [ ] NPS > 40

### Month 2
- [ ] 100 signups
- [ ] $15K MRR
- [ ] 5 case studies published
- [ ] API customers onboarded
- [ ] Content marketing producing weekly

### Month 3
- [ ] 200 signups
- [ ] $30K MRR
- [ ] 3 integration partners
- [ ] Enterprise customers signed
- [ ] Profitable unit economics

---

## Daily Standups (During Build)

### What to Track:
1. **Yesterday:** What got done
2. **Today:** What's the focus
3. **Blockers:** What's in the way
4. **Metrics:** Signups, revenue, usage

### Example Day 5 Standup:
**Yesterday:**
- ✅ Completed team invitation system
- ✅ Built team workspace UI
- ⚠️ Database schema deployed but needs testing

**Today:**
- Focus on white label export feature
- Test team features end-to-end
- Fix any bugs found

**Blockers:**
- Need to decide on logo upload storage (S3 vs Vercel Blob)
- Waiting on feedback from beta tester #1

**Metrics:**
- N/A (not launched yet)

---

## Post-Launch Review (Day 30)

### Questions to Answer:
1. Did we hit $5K MRR goal?
2. What was actual CAC vs projected?
3. Which industry signed up most?
4. What features are used most?
5. What features are ignored?
6. What's the churn rate?
7. What feedback is most common?
8. What should we build next?
9. What should we cut?
10. Should we adjust pricing?

### Decisions to Make:
- Double down on best-performing industry?
- Cut features with low usage?
- Adjust pricing based on willingness to pay?
- Hire first team member (if revenue supports)?
- Expand marketing or stay lean?

---

## Budget Tracking

### Development (Derek's Time)
- Week 1: 60 hours (full-time)
- Week 2: 40 hours (launch prep)
- Ongoing: 20 hours/week (maintenance, features)

### Infrastructure Costs (Monthly)
- Vercel Pro: $20
- Domain: $12/year
- InstantDB: $25 (scales with usage)
- Email (SendGrid): $15
- Analytics (Mixpanel): $0 (free tier initially)
- Gemini API: ~$50-200 (usage-based)
- **Total: ~$120-220/month**

### Marketing Budget (Month 1-3)
- Facebook Ads: $500/mo
- Content Creation: $300/mo
- Tools: $200/mo
- **Total: $1,000/mo**

### Break-Even Analysis
- Fixed costs: $220/mo (infrastructure)
- Variable costs: Gemini API (scales with usage)
- Revenue needed: 3 Starter customers ($297) to cover infrastructure
- Profit margin: ~90% after infrastructure costs

**Conclusion:** Very low burn rate, profitable at scale quickly

---

## Next Steps After Launch

### Immediate (Week 3-4)
1. Monitor analytics daily
2. Respond to all customer feedback within 24 hours
3. Fix bugs as they're reported
4. Start content marketing engine
5. Reach out to first 10 beta users for testimonials

### Short-term (Month 2)
1. Build API access
2. Create 10 blog posts
3. Start partnership conversations
4. Implement feature requests from customers
5. Optimize conversion funnel

### Long-term (Month 3+)
1. Scale marketing budget if CAC/LTV works
2. Hire first team member (customer success or marketing)
3. Build integration ecosystem
4. Expand to new industries
5. Consider fundraising if growth warrants it

---

## Conclusion

This roadmap is aggressive but achievable by leveraging:
1. ✅ Existing PicForge infrastructure (no rebuild)
2. ✅ Proven AI transformation engine (already works)
3. ✅ Derek's restaurant industry connections (warm intros)
4. ✅ MenuSparks cross-sell opportunity (existing customers)
5. ✅ Low overhead (solo founder, lean operations)

**The key to success:** Ship fast, learn from customers, iterate based on real usage data.

**Let's build this!** 🚀
