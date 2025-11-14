# Mockavio Style Guide

## Critical Content Rules

### 1. NO EMOJIS EVER
- **Never use emojis** in any UI text, copy, components, or documentation
- This includes: 🏠 🎨 🍽️ ✨ 🚀 💰 🎯 📊 🤝 💵 ❓ 📈 📁 📚 🚦 🙋‍♂️ ❤️
- **Rationale:** Professional B2B audience expects clean, text-only content. Emojis undermine credibility.

**Examples:**
- ❌ "Get started today 🚀"
- ✅ "Get started today"

- ❌ `<span>🏠</span>` (in components)
- ✅ Use icon components from lucide-react instead

### 2. NO EM DASHES
- **Never use em dashes (—)** in any content
- Use regular hyphens (-) or restructure sentences with commas
- **Rationale:** Em dashes can cause rendering issues and aren't necessary for professional content

**Examples:**
- ❌ "Transform your space — instantly!"
- ✅ "Transform your space instantly!" or "Transform your space - instantly!"

- ❌ `— {author}` (for testimonials)
- ✅ `- {author}` or restructure as `By {author}`

### 3. Arrow Symbols (→)
- Arrow symbols (→) are acceptable for visual separators in lists
- Example: "Empty room → Fully furnished" is acceptable
- These are visual elements, not punctuation

## Implementation Checklist

When writing or updating content:

- [ ] Search codebase for emojis: `grep -r "[🏠🎨🍽️✨🚀💰🎯📊🤝💵❓📈📁📚🚦🙋‍♂️❤️]" .`
- [ ] Search for em dashes: `grep -r "—" .`
- [ ] Replace emojis with text or icon components
- [ ] Replace em dashes with hyphens or restructure sentences
- [ ] Test all components render correctly
- [ ] Review all user-facing text

## Files That Need Updates

### Components (Priority)
- `components/mockavio/ProblemStatement.tsx` - Remove 🏠 🎨 🍽️
- `components/mockavio/Hero.tsx` - Remove 🏠 ✨
- `components/mockavio/IndustryShowcase.tsx` - Replace — with -

### Documentation (Lower Priority)
- `README.md` - Remove emoji headers (optional, for consistency)
- `IMPLEMENTATION_SUMMARY.md` - Remove emoji headers (optional)
- `markdown-files/*.md` - Remove emoji headers (optional)

## Icon Alternatives

Instead of emojis, use lucide-react icons:

- 🏠 → `<Home className="h-6 w-6" />`
- 🎨 → `<Palette className="h-6 w-6" />`
- 🍽️ → `<UtensilsCrossed className="h-6 w-6" />`
- ✨ → `<Sparkles className="h-6 w-6" />` or remove entirely

## Enforcement

- All new code must follow these rules
- Code reviews should check for style guide compliance
- Automated linting can be added to catch violations

