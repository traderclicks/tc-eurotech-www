# Theme System Documentation

## Overview

The theme system is divided into two main sections:

1. **Core Design System** - Universal, reusable components that form the foundation
2. **Domain Components** - Project-specific components that extend the core system

## Core Design System

Located in the main "Core Design System" tab, this includes:

- Color Palette
- Typography
- Buttons
- Form Elements
- Alerts & Messages
- Tables
- Cards & Panels
- Modals

These components are universally reusable across any project.

## Domain Components

The "Domain Components" tab is for project-specific UI patterns. In the boilerplate, this starts empty, but projects should add their domain-specific components here.

### How to Add Domain Components

1. **Create Your Component**
   ```svelte
   <!-- /src/lib/components/products/ProductCard.svelte -->
   <script lang="ts">
     export let title: string;
     export let price: string;
     // ... component props
   </script>

   <!-- Component template -->
   ```

2. **Register in Domain Components**
   ```typescript
   // /src/lib/theme/domainComponents.ts
   import ProductCard from '$lib/components/products/ProductCard.svelte';

   export const domainComponents = [
     {
       name: 'ProductCard',
       category: 'E-commerce',
       component: ProductCard,
       description: 'Product display card',
       props: {
         title: 'Sample Product',
         price: '$99.99'
       }
     }
   ];
   ```

3. **View in Theme Page**
   Navigate to `/theme` and click the "Domain Components" tab to see your component.

## Examples by Domain

### E-commerce Domain
- Product Cards
- Shopping Carts
- Checkout Forms
- Order Summaries
- Payment Methods

### Analytics Domain
- Charts & Graphs
- Dashboard Widgets
- Data Tables
- KPI Cards
- Report Generators

### Social Domain
- User Profiles
- Feed Items
- Comment Threads
- Like/Share Buttons
- Notification Cards

### Trading Domain
- Position Indicators
- P&L Displays
- Order Panels
- Price Charts
- Market Depth

### Healthcare Domain
- Patient Cards
- Appointment Calendars
- Prescription Forms
- Medical Records
- Lab Results

## Best Practices

1. **Keep Separation Clear**
   - Core = Universal patterns
   - Domain = Project-specific

2. **Use Centralized Styles**
   - Import from `/lib/styles/`
   - Never hardcode colors

3. **Document Props**
   - Provide clear descriptions
   - Include example values

4. **Category Organization**
   - Group related components
   - Use consistent naming

5. **Testing in Theme Page**
   - Add realistic sample data
   - Test all component states

## File Structure

```
/src/lib/
├── components/        # Core components
│   ├── Button.svelte
│   ├── Modal.svelte
│   └── ...
├── components/[domain]/  # Domain-specific components
│   ├── products/
│   │   └── ProductCard.svelte
│   └── analytics/
│       └── ChartWidget.svelte
├── styles/           # Centralized styles
│   ├── buttonStyles.ts
│   ├── tableStyles.ts
│   └── ...
└── theme/           # Theme system
    ├── domainComponents.ts
    └── README.md
```

## Adding New Categories

To add a new domain category:

1. Create a folder: `/src/lib/components/[your-domain]/`
2. Add components to that folder
3. Register them in `domainComponents.ts` with your category name
4. They'll automatically appear grouped in the theme page

## Example Component

See `/src/lib/components/examples/ExampleProductCard.svelte.example` for a complete example of a domain component.