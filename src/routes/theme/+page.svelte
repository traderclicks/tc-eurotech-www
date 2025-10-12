<script lang="ts">
  import { onMount } from 'svelte';
  import { modal } from '$lib/stores/modal';

  // Import ACTUAL components used in the app
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Textarea from '$lib/components/form/Textarea.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import Checkbox from '$lib/components/form/Checkbox.svelte';
  import FeatureCard from '$lib/components/FeatureCard.svelte';
  import TestimonialCard from '$lib/components/TestimonialCard.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import StatsGrid from '$lib/components/StatsGrid.svelte';
  import HeroSlider from '$lib/components/HeroSlider.svelte';
  import HeroVariations from '$lib/components/HeroVariations.svelte';

  // Import centralized styles
  import { buttonStyles } from '$lib/styles/buttonStyles';
  import { tableStyles, filterStyles } from '$lib/styles/tableStyles';
  import { panelStyles, cardStyles } from '$lib/styles/panelStyles';
  import { formStyles } from '$lib/styles/formStyles';
  import { alertStyles, badgeStyles } from '$lib/styles/alertStyles';
  import { tabStyles } from '$lib/styles/tabStyles';

  // Import domain components registry
  import { domainComponents, groupComponentsByCategory } from '$lib/theme/domainComponents';

  let showModal = false;
  let selectedFilter = 'all';
  let activeTab: 'core' | 'heroes' | 'domain' = 'core';

  // Group domain components by category
  $: groupedDomainComponents = groupComponentsByCategory(domainComponents);

  // Sample data for components
  const sampleFeature = {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    title: 'Feature Title',
    description: 'This is how feature cards look in the actual app.'
  };

  const sampleTestimonial = {
    name: 'Jane Doe',
    role: 'CEO, Example Company',
    content: 'This testimonial component is exactly what appears in the app.',
    avatar: 'https://i.pravatar.cc/150?img=3'
  };

  const sampleService = {
    icon: '/images/icon-1.svg',
    title: 'Service Category',
    description: 'This service card is the same component used throughout.',
    buttonHref: '#'
  };

  const sampleFAQs = [
    {
      question: 'How do FAQ items appear?',
      answer: 'This is the exact FAQ component from the app with its accordion behavior.'
    },
    {
      question: 'Are these styles shared?',
      answer: 'Yes, these use the same styles as the FAQ section on the homepage.'
    }
  ];

  const sampleStats = [
    { number: '100+', label: 'Metric One' },
    { number: '95%', label: 'Metric Two' }
  ];

  const sampleTableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' }
  ];

  function openSampleModal() {
    modal.alert('Sample Modal', 'This modal uses the same system as the entire app.', true);
  }

  function openFormModal() {
    modal.form({ title: 'Contact Form' });
  }
</script>

<svelte:head>
  <title>Living Theme - UI Component Showcase</title>
  <meta name="description" content="A living showcase of all UI components and styles used in the application">
</svelte:head>

<div class="theme-container">
  <header class="theme-header">
    <h1>Living Theme System</h1>
    <p class="subtitle">Every component here is the ACTUAL component used in the app. When you update a component, this page updates automatically.</p>

    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <div class={tabStyles.container}>
        <button
          on:click={() => activeTab = 'core'}
          class="{tabStyles.button} {activeTab === 'core' ? tabStyles.buttonActive : tabStyles.buttonInactive}"
        >
          Core Design System
        </button>
        <button
          on:click={() => activeTab = 'heroes'}
          class="{tabStyles.button} {activeTab === 'heroes' ? tabStyles.buttonActive : tabStyles.buttonInactive}"
        >
          Hero Components
        </button>
        <button
          on:click={() => activeTab = 'domain'}
          class="{tabStyles.button} {activeTab === 'domain' ? tabStyles.buttonActive : tabStyles.buttonInactive}"
        >
          Domain Components
        </button>
      </div>
    </div>
  </header>

  {#if activeTab === 'core'}
    <!-- Core Design System Tab Content -->
    <div class="tab-content">


  <!-- Section: Colors -->
  <section class="theme-section">
    <h2>Color Palette</h2>
    <p class="section-description">Semantic colors used throughout the application</p>

    <div class="color-grid">
      <div class="color-group">
        <h3>Primary Colors</h3>
        <div class="color-swatches">
          <div class="color-swatch bg-primary">
            <span>Primary</span>
            <code>bg-primary</code>
          </div>
          <div class="color-swatch bg-primary-dark">
            <span>Primary Dark</span>
            <code>bg-primary-dark</code>
          </div>
          <div class="color-swatch bg-primary-light">
            <span>Primary Light</span>
            <code>bg-primary-light</code>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h3>Status Colors</h3>
        <div class="color-swatches">
          <div class="color-swatch bg-success">
            <span>Success</span>
            <code>bg-success</code>
          </div>
          <div class="color-swatch bg-warning">
            <span>Warning</span>
            <code>bg-warning</code>
          </div>
          <div class="color-swatch bg-danger">
            <span>Danger</span>
            <code>bg-danger</code>
          </div>
          <div class="color-swatch bg-info">
            <span>Info</span>
            <code>bg-info</code>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section: Typography -->
  <section class="theme-section">
    <h2>Typography</h2>
    <p class="section-description">Text styles as they appear in the app</p>

    <div class="typography-samples">
      <h1>Heading 1 - Main Title</h1>
      <h2>Heading 2 - Section Title</h2>
      <h3>Heading 3 - Subsection</h3>
      <h4>Heading 4 - Card Title</h4>
      <p>Regular paragraph text with <a href="/example">inline link</a> and <strong>bold text</strong>.</p>
      <p class="text-secondary">Secondary text color for descriptions</p>
      <p class="text-success">Success message text</p>
      <p class="text-danger">Error message text</p>
      <p class="text-warning">Warning message text</p>
      <p class="text-info">Info message text</p>
    </div>
  </section>

  <!-- Section: Buttons (Using actual Button component) -->
  <section class="theme-section">
    <h2>Buttons</h2>
    <p class="section-description">These are the ACTUAL Button components used everywhere</p>

    <div class="button-showcase">
      <h3>Variants</h3>
      <div class="button-row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <h3>Sizes</h3>
      <div class="button-row">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>

      <h3>States</h3>
      <div class="button-row">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>

      <h3>Full Width</h3>
      <Button fullWidth>Full Width Button</Button>
    </div>
  </section>

  <!-- Section: Form Elements (Using actual form components) -->
  <section class="theme-section">
    <h2>Form Elements</h2>
    <p class="section-description">Actual form components from the app</p>

    <div class="form-showcase">
      <div class="form-row">
        <Input label="Text Input" placeholder="Enter text..." />
        <Input label="With Error" placeholder="Enter text..." error="This field has an error" />
      </div>

      <div class="form-row">
        <Input type="email" label="Email Input" placeholder="email@example.com" required />
        <Input type="tel" label="Phone Input" placeholder="+1 (555) 123-4567" />
      </div>

      <Textarea label="Textarea" placeholder="Enter multiple lines..." rows={4} />

      <Select
        label="Select Dropdown"
        options={[
          { value: '', label: 'Choose an option' },
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' }
        ]}
      />

      <Checkbox>
        I agree to the terms and conditions
      </Checkbox>
    </div>
  </section>

  <!-- Section: Alerts (Using centralized alert styles) -->
  <section class="theme-section">
    <h2>Alerts & Messages</h2>
    <p class="section-description">Alert styles used throughout the app</p>

    <div class="alerts-showcase">
      <div class="{alertStyles.base} {alertStyles.variants.success}">
        <svg class={alertStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <div class={alertStyles.title}>Success!</div>
          <div class={alertStyles.message}>Your action was completed successfully.</div>
        </div>
      </div>

      <div class="{alertStyles.base} {alertStyles.variants.warning}">
        <svg class={alertStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <div>
          <div class={alertStyles.title}>Warning</div>
          <div class={alertStyles.message}>Please review this important information.</div>
        </div>
      </div>

      <div class="{alertStyles.base} {alertStyles.variants.danger}">
        <svg class={alertStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class={alertStyles.title}>Error</div>
          <div class={alertStyles.message}>Something went wrong. Please try again.</div>
        </div>
      </div>

      <div class="{alertStyles.base} {alertStyles.variants.info}">
        <svg class={alertStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class={alertStyles.title}>Information</div>
          <div class={alertStyles.message}>Here's some helpful information for you.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section: Badges -->
  <section class="theme-section">
    <h2>Badges</h2>
    <p class="section-description">Badge styles for labels and status indicators</p>

    <div class="badge-showcase">
      <span class="{badgeStyles.base} {badgeStyles.variants.default}">Default</span>
      <span class="{badgeStyles.base} {badgeStyles.variants.primary}">Primary</span>
      <span class="{badgeStyles.base} {badgeStyles.variants.success}">Success</span>
      <span class="{badgeStyles.base} {badgeStyles.variants.warning}">Warning</span>
      <span class="{badgeStyles.base} {badgeStyles.variants.danger}">Danger</span>
      <span class="{badgeStyles.base} {badgeStyles.variants.info}">Info</span>
    </div>
  </section>

  <!-- Section: Tables (Using centralized table styles) -->
  <section class="theme-section">
    <h2>Tables</h2>
    <p class="section-description">Table styles using centralized definitions</p>

    <div class={tableStyles.wrapper}>
      <table class={tableStyles.table}>
        <thead class={tableStyles.thead}>
          <tr>
            <th class={tableStyles.th}>ID</th>
            <th class={tableStyles.th}>Name</th>
            <th class={tableStyles.th}>Email</th>
            <th class={tableStyles.th}>Status</th>
          </tr>
        </thead>
        <tbody class={tableStyles.tbody}>
          {#each sampleTableData as row}
            <tr class={tableStyles.tr}>
              <td class={tableStyles.td}>{row.id}</td>
              <td class={tableStyles.td}>{row.name}</td>
              <td class={tableStyles.td}>{row.email}</td>
              <td class={tableStyles.td}>
                <span class="{badgeStyles.base} {row.status === 'Active' ? badgeStyles.variants.success : row.status === 'Pending' ? badgeStyles.variants.warning : badgeStyles.variants.default}">
                  {row.status}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Section: Filter Tabs (Using centralized filter styles) -->
  <section class="theme-section">
    <h2>Filter Tabs</h2>
    <p class="section-description">Filter component styles</p>

    <div class={filterStyles.container}>
      <button
        class="{filterStyles.button} {selectedFilter === 'all' ? filterStyles.buttonActive : filterStyles.buttonInactive}"
        on:click={() => selectedFilter = 'all'}
      >
        All Items
      </button>
      <button
        class="{filterStyles.button} {selectedFilter === 'active' ? filterStyles.buttonActive : filterStyles.buttonInactive}"
        on:click={() => selectedFilter = 'active'}
      >
        Active
      </button>
      <button
        class="{filterStyles.button} {selectedFilter === 'pending' ? filterStyles.buttonActive : filterStyles.buttonInactive}"
        on:click={() => selectedFilter = 'pending'}
      >
        Pending
      </button>
    </div>
  </section>

  <!-- Section: Cards/Panels (Using centralized panel styles) -->
  <section class="theme-section">
    <h2>Cards & Panels</h2>
    <p class="section-description">Panel components using shared styles</p>

    <div class="panels-grid">
      <div class="{panelStyles.base} {panelStyles.padded}">
        <h3 class={panelStyles.title}>Basic Panel</h3>
        <p>This panel uses centralized styles that are shared across the app.</p>
      </div>

      <div class="{panelStyles.base} {panelStyles.elevated}">
        <div class={panelStyles.header}>
          <h3 class={panelStyles.title}>Panel with Header</h3>
        </div>
        <div class={panelStyles.body}>
          <p>Content goes here</p>
        </div>
        <div class={panelStyles.footer}>
          Footer content
        </div>
      </div>

      <div class="{cardStyles.base} {cardStyles.padded} {cardStyles.interactive}">
        <h3 class={cardStyles.title}>Interactive Card</h3>
        <p class={cardStyles.description}>This card has hover effects and transitions.</p>
      </div>
    </div>
  </section>

  <!-- Section: Component Gallery (Using ACTUAL app components) -->
  <section class="theme-section">
    <h2>App Components</h2>
    <p class="section-description">These are the EXACT components used in the application</p>

    <div class="component-gallery">
      <div class="component-item">
        <h3>Feature Card</h3>
        <FeatureCard {...sampleFeature} />
      </div>

      <div class="component-item">
        <h3>Service Card</h3>
        <ServiceCard {...sampleService} />
      </div>

      <div class="component-item">
        <h3>Testimonial Card</h3>
        <TestimonialCard {...sampleTestimonial} />
      </div>

      <div class="component-item">
        <h3>Stats Grid</h3>
        <StatsGrid backgroundColor="var(--color-primary)" textColor="white" />
      </div>

      <div class="component-item">
        <h3>FAQ Component</h3>
        <FAQ items={sampleFAQs} />
      </div>
    </div>
  </section>

  <!-- Section: Modals -->
  <section class="theme-section">
    <h2>Modals</h2>
    <p class="section-description">Modal system used throughout the app</p>

    <div class="button-row">
      <Button on:click={openSampleModal}>Open Alert Modal</Button>
      <Button on:click={openFormModal}>Open Form Modal</Button>
      <Button on:click={() => modal.confirm('Confirm Action', 'Are you sure you want to proceed?', () => {})}>
        Open Confirm Modal
      </Button>
    </div>
  </section>

  <!-- Verification Section -->
  <section class="theme-section verification">
    <h2>🔍 Verification Checklist</h2>
    <p class="section-description">Use this to verify theme consistency</p>

    <div class="checklist">
      <label class="checklist-item">
        <input type="checkbox" />
        <span>Colors update everywhere when changed in variables</span>
      </label>
      <label class="checklist-item">
        <input type="checkbox" />
        <span>Button styles match exactly between theme and app</span>
      </label>
      <label class="checklist-item">
        <input type="checkbox" />
        <span>Form elements use identical styles</span>
      </label>
      <label class="checklist-item">
        <input type="checkbox" />
        <span>Table styles are consistent</span>
      </label>
      <label class="checklist-item">
        <input type="checkbox" />
        <span>Components render identically here and in app</span>
      </label>
      <label class="checklist-item">
        <input type="checkbox" />
        <span>No hardcoded colors (all use semantic classes)</span>
      </label>
    </div>
  </section>
    </div>
  {/if}

  {#if activeTab === 'heroes'}
    <!-- Hero Components Tab Content -->
    <div class="tab-content">
      <!-- Section: Hero Components -->
      <section class="theme-section">
        <h2>Hero Components</h2>
        <p class="section-description">Various hero/header layouts for landing pages</p>

        <div class="hero-showcase">
          <h3>Hero Slider</h3>
          <p class="component-description">Full-featured carousel with multiple slides</p>
          <div class="hero-demo">
            <HeroSlider height="medium" />
          </div>

          <h3 class="mt-8">Hero Variations</h3>
          <div class="hero-variations-grid">
            <div class="hero-variant-item">
              <h4>Minimal</h4>
              <div class="hero-variant-preview">
                <HeroVariations variant="minimal" title="Clean & Simple" description="Focus on typography and message" />
              </div>
            </div>

            <div class="hero-variant-item">
              <h4>With Stats</h4>
              <div class="hero-variant-preview">
                <HeroVariations variant="stats" title="Data Driven" description="Showcase key metrics" />
              </div>
            </div>

            <div class="hero-variant-item">
              <h4>Video Background</h4>
              <div class="hero-variant-preview">
                <HeroVariations variant="video" title="Engaging Visual" description="Video or animated background" />
              </div>
            </div>

            <div class="hero-variant-item">
              <h4>Particles Effect</h4>
              <div class="hero-variant-preview">
                <HeroVariations variant="particles" title="Dynamic Motion" description="Animated particle effects" />
              </div>
            </div>

            <div class="hero-variant-item">
              <h4>Angled Design</h4>
              <div class="hero-variant-preview">
                <HeroVariations variant="angled" title="Geometric Style" description="Modern angular design" />
              </div>
            </div>

            <div class="hero-variant-item">
              <h4>With Cards</h4>
              <div class="hero-variant-preview">
                <HeroVariations variant="cards" title="Feature Highlights" description="Integrated feature cards" />
              </div>
            </div>
          </div>

          <div class="hero-options">
            <h3>Configuration Options</h3>
            <div class="options-grid">
              <div class="option-card">
                <h4>Heights</h4>
                <ul>
                  <li>full (100vh)</li>
                  <li>large (80vh)</li>
                  <li>medium (60vh)</li>
                  <li>auto (content-based)</li>
                </ul>
              </div>
              <div class="option-card">
                <h4>Transitions</h4>
                <ul>
                  <li>fade</li>
                  <li>slide</li>
                  <li>scale</li>
                  <li>parallax</li>
                </ul>
              </div>
              <div class="option-card">
                <h4>Content Alignment</h4>
                <ul>
                  <li>left</li>
                  <li>center</li>
                  <li>right</li>
                  <li>split</li>
                </ul>
              </div>
              <div class="option-card">
                <h4>Background Types</h4>
                <ul>
                  <li>Image</li>
                  <li>Video</li>
                  <li>Gradient</li>
                  <li>Pattern</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  {/if}

  {#if activeTab === 'domain'}
    <!-- Domain Components Tab Content -->
    <div class="tab-content">
      <!--
        IMPLEMENTATION GUIDE:
        1. Create your domain-specific components in /lib/components/[domain]/
        2. Import them in /lib/theme/domainComponents.ts
        3. Add them to the domainComponents array
        4. They'll automatically appear here organized by category

        Keep Core Design System for universally reusable components.
        Use Domain Components for project-specific patterns.
      -->

      <section class="theme-section">
        <div class="domain-placeholder">
          <h2 class="domain-title">Domain Components</h2>
          <p class="domain-description">
            This section is for project-specific components that extend the core design system.
            In a boilerplate, this starts empty. Your project will add domain-specific UI here.
          </p>

          <div class="domain-examples">
            <h3>Examples of what goes here:</h3>
            <ul class="examples-list">
              <li><strong>E-commerce:</strong> Product cards, shopping carts, checkout flows</li>
              <li><strong>Analytics:</strong> Charts, dashboards, data visualizations</li>
              <li><strong>Social:</strong> User profiles, feeds, comment threads</li>
              <li><strong>Trading:</strong> Position indicators, P&L displays, order panels</li>
              <li><strong>Healthcare:</strong> Patient cards, appointment calendars, prescription forms</li>
            </ul>
          </div>

          <div class="code-example">
            <pre><code>// Add your domain components to /lib/theme/domainComponents.ts:

import {'{'} ProductCard {'}'} from '$lib/components/products/ProductCard.svelte';
import {'{'} ChartWidget {'}'} from '$lib/components/analytics/ChartWidget.svelte';

export const domainComponents = [
  {'{'}
    name: 'ProductCard',
    category: 'E-commerce',
    component: ProductCard,
    description: 'Display product with image, price, and actions'
  {'}'},
  // Add more components here...
];</code></pre>
          </div>
        </div>

        {#if domainComponents.length > 0}
          <!-- Display domain components when they exist -->
          <div class="domain-components-grid">
            {#each Object.entries(groupedDomainComponents) as [category, components]}
              <div class="category-section">
                <h3 class="category-title">{category}</h3>
                <div class="components-list">
                  {#each components as component}
                    <div class="component-showcase">
                      <h4>{component.name}</h4>
                      {#if component.description}
                        <p class="component-description">{component.description}</p>
                      {/if}
                      <div class="component-preview">
                        <svelte:component this={component.component} {...component.props} />
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <!-- Empty state message -->
          <div class="empty-state">
            <p>No domain components have been added yet.</p>
            <p>Follow the implementation guide above to add your first component.</p>
          </div>
        {/if}

        <!-- Placeholder for future domain components -->
        <div id="domain-components-mount" class="mount-point">
          <!-- Projects will add their components here -->
        </div>
      </section>
    </div>
  {/if}
</div>

<style>
  .theme-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
  }

  .theme-header {
    text-align: center;
    margin-bottom: var(--space-16);
    padding-bottom: var(--space-8);
    border-bottom: 2px solid var(--color-gray-200);
  }

  .theme-header h1 {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .subtitle {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .theme-section {
    margin-bottom: var(--space-16);
  }

  .theme-section h2 {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-2);
  }

  .section-description {
    color: var(--text-secondary);
    margin-bottom: var(--space-8);
  }

  /* Color Palette */
  .color-grid {
    display: grid;
    gap: var(--space-8);
  }

  .color-group h3 {
    font-size: var(--text-lg);
    margin-bottom: var(--space-4);
  }

  .color-swatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-4);
  }

  .color-swatch {
    height: 100px;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    box-shadow: var(--shadow-md);
  }

  .color-swatch span {
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-1);
  }

  .color-swatch code {
    font-size: var(--text-xs);
    opacity: 0.9;
  }

  /* Typography */
  .typography-samples {
    background: var(--bg-secondary);
    padding: var(--space-8);
    border-radius: var(--radius-lg);
  }

  .typography-samples > * {
    margin-bottom: var(--space-4);
  }

  /* Button Showcase */
  .button-showcase h3 {
    font-size: var(--text-lg);
    margin-top: var(--space-6);
    margin-bottom: var(--space-3);
  }

  .button-row {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    margin-bottom: var(--space-4);
  }

  /* Form Showcase */
  .form-showcase {
    max-width: 600px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  /* Alerts */
  .alerts-showcase {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 600px;
  }

  .alerts-showcase > div {
    max-width: 100%;
  }

  /* Badges */
  .badge-showcase {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  /* Panels Grid */
  .panels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-4);
  }

  /* Component Gallery */
  .component-gallery {
    display: grid;
    gap: var(--space-8);
  }

  .component-item {
    padding: var(--space-6);
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
  }

  .component-item h3 {
    margin-bottom: var(--space-4);
  }

  /* Verification */
  .verification {
    background: var(--bg-secondary);
    padding: var(--space-8);
    border-radius: var(--radius-lg);
    border: 2px solid var(--color-primary);
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .checklist-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
  }

  .checklist-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  /* Tab Navigation */
  .tab-navigation {
    margin-top: var(--space-8);
    display: flex;
    justify-content: center;
  }

  .tab-content {
    animation: fadeIn 0.3s ease-in-out;
  }

  /* Domain Components Tab Styles */
  .domain-placeholder {
    text-align: center;
    padding: var(--space-16) var(--space-8);
    border: 2px dashed var(--color-gray-300);
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
  }

  .domain-title {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-4);
    color: var(--text-primary);
  }

  .domain-description {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto var(--space-8);
  }

  .domain-examples {
    margin: var(--space-8) auto;
    text-align: left;
    max-width: 700px;
    background: var(--bg-primary);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
  }

  .domain-examples h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-3);
  }

  .examples-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .examples-list li {
    padding: var(--space-2) 0;
    color: var(--text-secondary);
    display: flex;
    align-items: flex-start;
  }

  .examples-list li:before {
    content: '→';
    margin-right: var(--space-2);
    color: var(--color-primary);
    flex-shrink: 0;
  }

  .examples-list strong {
    color: var(--text-primary);
    margin-right: var(--space-1);
  }

  .code-example {
    margin: var(--space-8) auto;
    max-width: 800px;
    background: var(--bg-primary);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-gray-200);
  }

  .code-example pre {
    margin: 0;
    overflow-x: auto;
  }

  .code-example code {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }

  .empty-state {
    margin-top: var(--space-8);
    padding: var(--space-8);
    text-align: center;
    color: var(--text-secondary);
  }

  .category-section {
    margin-bottom: var(--space-12);
  }

  .category-title {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 2px solid var(--color-gray-200);
  }

  .components-list {
    display: grid;
    gap: var(--space-6);
  }

  .component-showcase {
    padding: var(--space-6);
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
  }

  .component-showcase h4 {
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }

  .component-description {
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
  }

  .component-preview {
    padding: var(--space-4);
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-gray-200);
  }

  .mount-point {
    margin-top: var(--space-8);
  }

  /* Hero Showcase Styles */
  .hero-showcase {
    margin-top: var(--space-8);
  }

  .hero-demo {
    margin: var(--space-4) 0 var(--space-8) 0;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .hero-variations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-6);
    margin: var(--space-6) 0;
  }

  .hero-variant-item {
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .hero-variant-item h4 {
    padding: var(--space-3) var(--space-4);
    background: var(--bg-primary);
    border-bottom: 1px solid var(--color-gray-200);
    margin: 0;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
  }

  .hero-variant-preview {
    height: 300px;
    overflow: hidden;
    position: relative;
  }

  .hero-variant-preview :global(.hero) {
    min-height: 300px !important;
    padding: var(--space-8) var(--space-4) !important;
  }

  .hero-variant-preview :global(.hero-title) {
    font-size: clamp(1.5rem, 4vw, 2rem) !important;
  }

  .hero-variant-preview :global(.hero-description) {
    font-size: var(--text-sm) !important;
  }

  .hero-options {
    margin-top: var(--space-8);
    padding: var(--space-6);
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  .option-card {
    padding: var(--space-4);
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-gray-200);
  }

  .option-card h4 {
    margin: 0 0 var(--space-3) 0;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--color-primary);
  }

  .option-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .option-card li {
    padding: var(--space-1) 0;
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .option-card li:before {
    content: '→';
    margin-right: var(--space-2);
    color: var(--color-primary);
  }

  .mt-8 {
    margin-top: var(--space-8);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }

    .domain-examples {
      padding: var(--space-4);
    }

    .code-example {
      font-size: var(--text-xs);
    }
  }
</style>