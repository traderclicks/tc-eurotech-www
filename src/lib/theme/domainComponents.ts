/**
 * Registry for domain-specific components
 *
 * This file serves as the central registry for project-specific components
 * that extend the core design system. In the boilerplate, this starts empty.
 *
 * IMPLEMENTATION GUIDE:
 * 1. Create your domain-specific components in /lib/components/[domain]/
 * 2. Import them in this file
 * 3. Add them to the domainComponents array
 * 4. They'll automatically appear in the theme page organized by category
 *
 * Keep Core Design System for universally reusable components.
 * Use Domain Components for project-specific patterns.
 */

import type { ComponentType, SvelteComponent } from 'svelte';

export interface DomainComponent {
  name: string;
  category: string;
  component: ComponentType<SvelteComponent>;
  description?: string;
  props?: Record<string, any>;
}

// Empty array in boilerplate - projects will populate this
export const domainComponents: DomainComponent[] = [
  // Example (uncomment and modify for your project):
  // {
  //   name: 'ProductCard',
  //   category: 'E-commerce',
  //   component: ProductCard,
  //   description: 'Display product with image, price, and actions',
  //   props: {
  //     title: 'Sample Product',
  //     price: '$99.99',
  //     image: '/images/product.jpg'
  //   }
  // },
  // {
  //   name: 'DashboardWidget',
  //   category: 'Analytics',
  //   component: DashboardWidget,
  //   description: 'Analytics dashboard widget with charts',
  //   props: {
  //     title: 'Sales Overview',
  //     data: [...]
  //   }
  // }
];

// Group components by category for organized display
export function groupComponentsByCategory(components: DomainComponent[]): Record<string, DomainComponent[]> {
  return components.reduce((acc, component) => {
    const category = component.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {} as Record<string, DomainComponent[]>);
}