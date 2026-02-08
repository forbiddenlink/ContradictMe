# Quick Reference - Crystalline Intelligence Components

## 🎨 Component Cheat Sheet

### ArgumentCardEnhanced

```tsx
import ArgumentCardEnhanced from '@/components/arguments/ArgumentCardEnhanced';

<ArgumentCardEnhanced argument={arg} index={0} />;
```

**Features**: Faceted glass, progressive disclosure, confidence bars, citations
**When**: Replace ArgumentCard for production-grade argument display

---

### ConfidenceBar

```tsx
import ConfidenceBar from '@/components/ui/ConfidenceBar';

<ConfidenceBar score={89} label="Quality" size="md" animated={true} />;
```

**Colors**: Green (≥85), Amber (60-84), Gray (<60)
**When**: Replace numeric scores with visual indicators

---

### EvidenceBadge

```tsx
import EvidenceBadge from '@/components/ui/EvidenceBadge';

<EvidenceBadge strength="strong" type="empirical" animated={true} />;
```

**Levels**: Strong (●), Moderate (◐), Weak (○)
**When**: Show evidence quality at a glance

---

### SourceCredibilityBadge

```tsx
import SourceCredibilityBadge from '@/components/ui/SourceCredibilityBadge';

<SourceCredibilityBadge source={meta} score={92} compact={false} />;
```

**Modes**: Compact (badges) or Full (detailed card)
**When**: Display source metadata and credibility

---

### CitationTooltip

```tsx
import CitationTooltip from '@/components/ui/CitationTooltip';

<CitationTooltip source={meta} index={1} snippet="..." />;
```

**Interaction**: Hover (desktop) or Tap (mobile)
**When**: Add inline citations to text

---

### ThinkingIndicator

```tsx
import ThinkingIndicator from '@/components/ui/ThinkingIndicator';

<ThinkingIndicator phase={0} message="..." totalPhases={4} />;
```

**Features**: Morphing blob, progress ring, phase counter
**When**: Replace generic loading spinners

---

## 🎨 Color System

| Color       | Meaning         | Usage                                      |
| ----------- | --------------- | ------------------------------------------ |
| **Violet**  | Challenge       | Counterarguments, citations, quality rings |
| **Teal**    | Clarity         | Supporting args, evidence, links           |
| **Emerald** | High confidence | ≥85% scores, strong evidence               |
| **Amber**   | Caution         | 60-84% scores, limitations                 |
| **Gray**    | Uncertainty     | <60% scores, weak evidence                 |

---

## 🎬 Animation Timing

| Type        | Duration  | Easing                            |
| ----------- | --------- | --------------------------------- |
| Hover       | 200ms     | ease-out                          |
| Collapsible | 200-300ms | cubic-bezier(0.4, 0, 0.2, 1)      |
| Entrance    | 400-600ms | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Loading     | 300-500ms | ease-in-out                       |

---

## 📏 Sizing

| Component     | Sizes      | Default |
| ------------- | ---------- | ------- |
| ConfidenceBar | sm, md, lg | md      |
| Touch targets | ≥44px      | 44px    |
| Border radius | Various    | 12-24px |

---

## ♿ Accessibility

- ✅ Full keyboard navigation
- ✅ Screen reader friendly
- ✅ WCAG 2.2 AA compliant
- ✅ Touch targets ≥44px
- ✅ Respects `prefers-reduced-motion`
- ✅ Respects `prefers-color-scheme`

---

## 🚀 Quick Integration

### Step 1: Replace Argument Cards

```tsx
// In ChatMessage.tsx
- import ArgumentCard from '../arguments/ArgumentCard';
+ import ArgumentCardEnhanced from '../arguments/ArgumentCardEnhanced';

- <ArgumentCard key={arg.objectID} argument={arg} />
+ <ArgumentCardEnhanced key={arg.objectID} argument={arg} index={idx} />
```

### Step 2: Add Thinking Indicator

```tsx
// In ChatInterface.tsx
+ import ThinkingIndicator from '../ui/ThinkingIndicator';

{loadingPhase !== null && (
+  <ThinkingIndicator
+    phase={loadingPhase}
+    message={LOADING_PHASES[loadingPhase].message}
+    totalPhases={4}
+  />
)}
```

### Step 3: Test

- [ ] View arguments in light mode
- [ ] Toggle dark mode
- [ ] Test on mobile
- [ ] Test keyboard navigation
- [ ] Enable "Reduce motion"

---

## 📁 Files Created

```
components/
├── arguments/
│   └── ArgumentCardEnhanced.tsx      ✨
├── ui/
│   ├── CitationTooltip.tsx           ✨
│   ├── ConfidenceBar.tsx             ✨
│   ├── EvidenceBadge.tsx             ✨
│   ├── SourceCredibilityBadge.tsx    ✨
│   └── ThinkingIndicator.tsx         ✨
└── demo/
    └── ComponentShowcase.tsx         ✨

docs/
├── DESIGN_ENHANCEMENTS.md            ✨ (Full reference)
├── IMPLEMENTATION_CHECKLIST.md       ✨ (Step-by-step)
├── DESIGN_SUMMARY.md                 ✨ (Overview)
└── QUICK_REFERENCE.md                ✨ (This file)
```

---

## 🎯 Priority Order

1. **ArgumentCardEnhanced** - Biggest visual impact
2. **ThinkingIndicator** - Better loading UX
3. **ConfidenceBar** - Clearer metrics
4. **EvidenceBadge** - At-a-glance quality
5. **SourceCredibilityBadge** - Source transparency
6. **CitationTooltip** - Academic rigor (future)

---

## 📖 Full Documentation

- **Quick start**: This file
- **Complete guide**: `DESIGN_ENHANCEMENTS.md`
- **Step-by-step**: `IMPLEMENTATION_CHECKLIST.md`
- **Overview**: `DESIGN_SUMMARY.md`
- **Demo**: `components/demo/ComponentShowcase.tsx`

---

## 💡 Tips

1. **Start small**: Integrate one component at a time
2. **Test early**: Check dark mode and mobile after each change
3. **Use demo**: `/demo` route shows all components working
4. **Keep original**: ArgumentCard.tsx preserved for rollback
5. **Read docs**: Each component has inline documentation

---

## 🔍 Troubleshooting

**Glassmorphism not showing?**
→ Check `backdrop-filter` browser support

**Animations too intense?**
→ User should enable "Reduce motion" in system prefs

**Citations overflow on mobile?**
→ Already handled with responsive CSS

**Dark mode colors wrong?**
→ Verify Tailwind `darkMode: 'class'` config

---

## ✨ Remember

This is a **design system**, not just components:

- Use colors consistently (violet = challenge, teal = clarity)
- Maintain animation timing standards
- Follow glassmorphism patterns for new components
- Keep accessibility top of mind
- Document everything

**The "Crystalline Intelligence" aesthetic should guide all future design decisions.**

---

**Version**: 1.0.0
**Updated**: 2026-02-06
**By**: Claude Sonnet 4.5
