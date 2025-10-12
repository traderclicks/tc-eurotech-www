# AI Implementation Guide: SvelteKit Agency Boilerplate

## Overview
This document provides comprehensive instructions for an AI assistant to recreate or extend this SvelteKit agency boilerplate system. The boilerplate features a living theme system, component library, and domain-specific architecture.

---

## 1. Living Theme System Implementation

### Core Concept
Create a theme page that serves as the SINGLE SOURCE OF TRUTH for all UI patterns. This page must import and use ACTUAL components - not mock versions.

### Requirements

#### A. Create Centralized Style System
Create style definition files in `/src/lib/styles/`:

```typescript
// buttonStyles.ts
export const buttonStyles = {
  base: 'inline-flex items-center justify-center...',
  variants: {
    primary: 'bg-primary text-white...',
    secondary: '...',
  },
  sizes: {
    small: 'text-sm px-3 py-1.5...',
    medium: '...',
  }
} as const;
```

Create similar files for:
- `tableStyles.ts` - Table and filter styles
- `panelStyles.ts` - Card and panel styles
- `formStyles.ts` - Form element styles
- `alertStyles.ts` - Alert and badge styles
- `tabStyles.ts` - Tab navigation styles

#### B. Semantic Color System
In `/src/lib/styles/global.css`, implement semantic colors:

```css
:root {
  --alert-bg-opacity: 0.15;

  /* Semantic colors - NEVER use color names like green/red */
  --color-success: rgb(20 184 166);
  --color-danger: rgb(239 68 68);
  --color-warning: rgb(251 191 36);
  --color-info: rgb(59 130 246);
}

/* Use semantic class names */
.text-success { color: var(--color-success); }
.bg-success { background-color: var(--color-success); }
/* etc. */
```

**CRITICAL**: Never use `text-green-500` or `bg-red-400`. Always use semantic names.

#### C. Theme Page Structure
Create `/src/routes/theme/+page.svelte` with three tabs:

1. **Core Design System** - Universal components
2. **Hero Components** - Hero/header variations
3. **Domain Components** - Project-specific (empty in boilerplate)

```svelte
<script lang="ts">
  let activeTab: 'core' | 'heroes' | 'domain' = 'core';

  // Import ACTUAL components
  import Button from '$lib/components/Button.svelte';
  import Alert from '$lib/components/Alert.svelte';
  // etc.

  // Import centralized styles
  import { buttonStyles } from '$lib/styles/buttonStyles';
  // etc.
</script>
```

### Verification Principle
The Nuclear Test: Delete the theme page. The app should work perfectly. Restore it. It should match the app exactly without adjustments.

---

## 2. Component Architecture

### Base Components Required

#### Form Components
Create in `/src/lib/components/form/`:
- `Input.svelte` - Text, email, tel, number inputs
- `Textarea.svelte` - Multi-line text input
- `Select.svelte` - Dropdown selection
- `Checkbox.svelte` - Checkbox with label

Each must:
- Accept `label`, `error`, `required` props
- Use centralized `formStyles`
- Display validation errors consistently

#### Layout Components
- `Header.svelte` - Navigation bar
- `Footer.svelte` - Site footer
- `MobileMenu.svelte` - Mobile navigation
- `Modal.svelte` - Multi-type modal system

#### Content Components
- `Button.svelte` - All button variants
- `FeatureCard.svelte` - Feature display cards
- `ServiceCard.svelte` - Service/category cards
- `TestimonialCard.svelte` - Customer testimonials
- `FAQ.svelte` - Accordion FAQ component
- `Alert.svelte` - Alert messages
- `Badge.svelte` - Status badges

### Hero System

#### HeroSlider Component
Create `/src/lib/components/HeroSlider.svelte`:

Features required:
- Multiple slides with autoplay
- Navigation arrows and indicators
- Transition types: fade, slide, scale
- Height options: full, large, medium, auto
- Content alignment: left, center, right
- Overlay opacity control

#### HeroVariations Component
Create 6 distinct hero styles:
1. **Minimal** - Clean, centered, gradient
2. **Stats** - With metrics display
3. **Video** - Video background placeholder
4. **Particles** - Animated effects
5. **Angled** - Geometric design
6. **Cards** - Integrated feature cards

---

## 3. Placeholder Image System

### Implementation
Create `/src/lib/utils/placeholders.ts`:

```typescript
// SVG placeholder with dimensions
export function svgPlaceholder(width: number, height: number, text?: string): string {
  // Return data URI SVG
}

// Picsum.photos for realistic images
export function photoPlaceholder(width: number, height: number, seed?: string): string {
  return `https://picsum.photos/${width}/${height}${seed ? `?random=${seed}` : ''}`;
}

// Company logo placeholders
export function logoPlaceholder(company: string, size = 80): string {
  // Return SVG with company initial
}
```

### Static Assets
Create essential brand icons in `/static/icons/`:
- `google.svg` - Google logo with official colors
- `facebook.svg` - Facebook logo
- `linkedin.svg` - LinkedIn logo
- `twitter.svg` - Twitter/X logo
- `instagram.svg` - Instagram logo

**IMPORTANT**: No heavy images. Use placeholders and external services.

---

## 4. Modal System

### Store Implementation
Create `/src/lib/stores/modal.ts`:

```typescript
interface ModalState {
  isOpen: boolean;
  type: 'form' | 'image' | 'video' | 'confirm' | 'alert';
  content?: any;
  props?: any;
}

// Provide convenience methods
export const modal = {
  form: (props) => modals.open({ type: 'form', ...props }),
  image: (src, alt) => modals.open({ type: 'image', content: { src, alt } }),
  confirm: (title, message, onConfirm) => // ...
  alert: (title, message, isSuccess) => // ...
};
```

---

## 5. Domain Components System

### Registry Pattern
Create `/src/lib/theme/domainComponents.ts`:

```typescript
export interface DomainComponent {
  name: string;
  category: string;
  component: ComponentType<SvelteComponent>;
  description?: string;
  props?: Record<string, any>;
}

// Empty in boilerplate - projects populate this
export const domainComponents: DomainComponent[] = [];
```

### Theme Page Integration
The Domain Components tab should:
- Display helpful placeholder when empty
- Show implementation instructions
- Auto-organize components by category when added
- Include code examples

---

## 6. Critical Implementation Rules

### CSS Architecture
1. **NEVER use Tailwind classes directly** - Create CSS classes
2. **Use CSS variables** for all colors and spacing
3. **Semantic naming** - `bg-success` not `bg-green-500`
4. **Centralized styles** - Import from `/lib/styles/`

### Component Rules
1. **Real components only** - Theme page uses actual app components
2. **No duplication** - Style once, use everywhere
3. **Props over hardcoding** - Make components configurable
4. **Responsive by default** - Mobile-first approach

### File Structure
```
/src/
├── lib/
│   ├── components/
│   │   ├── form/
│   │   ├── Button.svelte
│   │   ├── Modal.svelte
│   │   └── [other components]
│   ├── styles/
│   │   ├── buttonStyles.ts
│   │   ├── global.css
│   │   └── variables.css
│   ├── stores/
│   │   └── modal.ts
│   ├── theme/
│   │   └── domainComponents.ts
│   └── utils/
│       └── placeholders.ts
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   └── theme/
│       └── +page.svelte
└── app.html
```

---

## 7. Testing & Verification

### Build Verification
```bash
npm run build  # Must complete without errors
npx tsc --noEmit  # No TypeScript errors
```

### Visual Verification Checklist
- [ ] Theme page has 3 working tabs
- [ ] All components render identically in app and theme
- [ ] Alerts are bounded (max-width: 600px)
- [ ] Icons are properly sized (20px for alerts)
- [ ] Hero slider autoplay works
- [ ] Mobile menu functions correctly
- [ ] Modal system opens/closes properly
- [ ] No console errors

### The Coupling Test
Change a color variable in `/lib/styles/variables.css`:
- Theme page should update ✓
- App components should update ✓
- If not, styles are disconnected (FIX IMMEDIATELY)

---

## 8. Common Pitfalls to Avoid

### Style Pitfalls
- ❌ Using Tailwind classes that don't exist in project
- ❌ Hardcoding colors like `#3B82F6`
- ❌ Creating duplicate style definitions
- ❌ Using `bg-green-500` instead of `bg-success`

### Component Pitfalls
- ❌ Creating mock components for theme page
- ❌ Not using centralized styles
- ❌ Forgetting responsive design
- ❌ Inline styles instead of classes

### Architecture Pitfalls
- ❌ Putting domain-specific code in core
- ❌ Not following the file structure
- ❌ Skipping TypeScript types
- ❌ Ignoring the verification checklist

---

## 9. Extension Points

### Adding New Components
1. Create component in appropriate directory
2. Import centralized styles
3. Add to theme page in correct tab
4. Test in multiple contexts

### Adding Domain Components
1. Create in `/lib/components/[domain]/`
2. Register in `domainComponents.ts`
3. Appears automatically in Domain tab
4. Document usage patterns

### Adding New Hero Variations
1. Add to `HeroVariations.svelte`
2. Create new variant case
3. Add to theme page showcase
4. Document configuration options

---

## 10. AI-Specific Instructions

### When User Says "Can I see it?"
**NEVER** say "The server is running at localhost:3000"
**ALWAYS** say "Run your starto script or `npm run dev` in YOUR terminal"

### File Creation Order
1. Create directories first
2. Create utility files (placeholders, styles)
3. Create simple components (Button, Badge)
4. Create complex components (Modal, Hero)
5. Create theme page last

### Debugging Approach
1. Check imports are correct
2. Verify file paths are absolute in components
3. Ensure CSS variables are defined
4. Confirm components are exported properly

### Response Style
- Be concise - avoid long explanations
- Show code examples
- Fix issues immediately
- Test changes with build command

---

## Final Checklist

Before considering the implementation complete:

- [ ] All centralized styles created
- [ ] Semantic color system implemented
- [ ] Theme page with 3 tabs functional
- [ ] All base components created
- [ ] Hero system with 6+ variations
- [ ] Placeholder image system working
- [ ] Modal system operational
- [ ] Domain components registry ready
- [ ] No hardcoded colors or sizes
- [ ] Build completes successfully
- [ ] Mobile responsive
- [ ] No console errors

---

## Success Metric

The ultimate test: Can a developer look at the theme page and immediately understand every UI pattern available in the application? If yes, you've succeeded.

Remember: The theme page is not documentation - it's a living part of the app. Every style on the theme page must be actively used in the application. Every style in the application must be represented on the theme page.

---

*This guide should enable any AI assistant to recreate or extend this boilerplate system while maintaining consistency and quality.*