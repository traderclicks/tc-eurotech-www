# SvelteKit Agency Boilerplate 🚀

A comprehensive, production-ready SvelteKit boilerplate with living theme system, advanced SEO, and component library for rapid agency website development.

🔗 **[Live Demo](https://sveltekit-agency-boilerplate.vercel.app)** | 📦 **[NPM Package](https://www.npmjs.com/package/@traderclicks/sveltekit-boilerplate)**

## ✨ Key Features

### 🎯 Living Theme System
- **Theme Page** (`/theme`) - Single source of truth for all UI patterns
- **Three Tabs**: Core Design System, Hero Components, Domain Components
- **Real Components** - Theme page uses actual app components, not mocks
- **Nuclear Test Ready** - Delete theme page, app works; restore it, perfectly synced

### 🚀 SEO & Performance
- **Enhanced Meta Component** - Full Open Graph, Twitter Cards, structured data
- **Dynamic Sitemap** - Auto-generated XML sitemap with priorities
- **Robots.txt** - Smart crawler management
- **Structured Data** - Organization, FAQ, Service, LocalBusiness schemas
- **Core Web Vitals** - Optimized for 95+ Lighthouse scores

### 🎨 Design System
- **Semantic Colors** - Success/danger/warning/info (never hardcoded colors)
- **CSS Variables** - Centralized theming with semantic naming
- **Mobile First** - Responsive from 320px up
- **Dark Mode Ready** - CSS variable-based theming

### 📦 Component Library
- **Hero System** - 6 hero variations (minimal, stats, video, particles, angled, cards)
- **Hero Slider** - Multiple transitions (fade, slide, scale)
- **Modal System** - Form, image, video, confirm, alert modals
- **Form Components** - Input, Textarea, Select, Checkbox with validation
- **Content Components** - FAQ, Testimonials, Features, Services
- **Social Proof** - Google Reviews, Trust Badges, Client Logos
- **Navigation** - Responsive Header, Mobile Menu, Footer

## 🚀 Quick Start

### Clone from GitHub
```bash
# Clone the repository
git clone https://github.com/traderclicks/sveltekit-agency-boilerplate.git my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Or Use as Template
```bash
# Create new project from template
npx degit traderclicks/sveltekit-agency-boilerplate my-project
cd my-project
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable components
│   │   ├── form/         # Form field components
│   │   └── [others]      # Various UI components
│   ├── stores/           # Svelte stores (modal, theme, etc.)
│   ├── styles/           # Global CSS and variables
│   └── utils/            # Helper functions
├── routes/               # SvelteKit pages
│   ├── +layout.svelte    # Root layout with header/footer
│   └── +page.svelte      # Homepage
└── app.html             # HTML template
```

## 🎨 Customization

### Brand Colors
Edit `/src/lib/styles/variables.css`:
```css
:root {
  --color-primary: #2563eb;    /* Your primary color */
  --color-secondary: #10b981;  /* Your secondary color */
  --color-accent: #f59e0b;     /* Accent color */
}
```

### Typography
```css
--font-sans: 'Your Font', system-ui, sans-serif;
```

## 🔧 Component Usage

### Modal System
```javascript
import { modal } from '$lib/stores/modal';

// Open contact form
modal.form({ title: 'Get Quote' });

// Show image
modal.image('/path/to/image.jpg', 'Alt text');

// Confirm dialog
modal.confirm('Delete?', 'This cannot be undone', () => {
  console.log('Confirmed');
});

// Alert with auto-dismiss
modal.alert('Success!', 'Saved', true);
```

### Forms
```svelte
<ContactForm
  title="Get in Touch"
  subtitle="We'll respond within 24 hours"
  on:success={(e) => console.log('Form:', e.detail)}
/>
```

## 📱 Responsive Breakpoints

- **Mobile**: 0-639px (mobile-first base)
- **Tablet**: 640px-1023px
- **Desktop**: 1024px+
- **Wide**: 1280px+

## 🎯 Performance Targets

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: < 50KB initial JS

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Netlify
```bash
npm run build
netlify deploy
```

## 📝 Key Features Demo

The homepage (`/src/routes/+page.svelte`) demonstrates:
- Hero section with gradient
- Statistics counter
- Feature cards grid
- Service showcase
- Testimonials
- FAQ section
- Newsletter signup
- Social proof elements
- Mobile-responsive layout

## 🛠️ Development Tips

1. **Mobile First**: Always develop at 375px width first
2. **Use CSS Variables**: For consistent theming
3. **Component Props**: Make components flexible with props
4. **Accessibility**: All interactive elements have proper ARIA labels
5. **Performance**: Lazy load images and use transitions sparingly

## 📚 Documentation

- **[AI Implementation Guide](./AI_IMPLEMENTATION_GUIDE.md)** - Complete instructions for AI assistants
- **[SEO Implementation Guide](./SEO_IMPLEMENTATION_GUIDE.md)** - Comprehensive SEO patterns and setup
- **[Boilerplate Features](./BOILERPLATE_FEATURES.md)** - Detailed feature documentation
- **[Theme System](./src/lib/theme/README.md)** - Domain components and theme architecture

## 🏗️ Living Theme System

The `/theme` route is your design system dashboard:

1. **Core Design System Tab** - Typography, colors, buttons, forms, tables, alerts
2. **Hero Components Tab** - 6 hero variations, hero slider configurations
3. **Domain Components Tab** - Add your project-specific components here

**The Nuclear Test**: Delete the theme page → app works perfectly. Restore it → instantly synced.

## 🔍 SEO Features

### Built-in SEO Tools
- Dynamic `sitemap.xml` at `/sitemap.xml`
- Smart `robots.txt` at `/robots.txt`
- Enhanced Meta component with OG/Twitter support
- Structured data helpers for all schema types
- FAQ schema auto-generated from content

### Quick SEO Setup
```svelte
<Meta
  title="Your Page Title"
  description="Your page description"
  ogImage="/your-og-image.png"
/>
```

## 📄 License

MIT - Use freely for client projects

---

**Built for agencies, by agencies** 🎨

Perfect for:
- Local service businesses
- Professional services
- Restaurants
- Real estate
- Educational institutions
- Product showcases
- And more!

## 🤝 Contributing

Contributions welcome! Please check the [GitHub repository](https://github.com/traderclicks/sveltekit-agency-boilerplate) for issues and PRs.
