<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import ImagePicker from '$lib/components/ImagePicker.svelte';

  export let data: PageData;
  export let form: ActionData;

  // Image editing state
  let editingSlot: string | null = null;
  let editImages: string[] = [];
  let editNote = '';
  let pickerOpen = false;
  let currentSlotMaxImages: number | undefined = undefined;
  let selectedPage: string = 'website-home'; // Start with Website Home (CMS)

  // Text editing state
  let editingTextSlot: string | null = null;
  let editTextValue = '';
  let editTextNote = '';

  // Meta editing state
  let editingMetaSlot: string | null = null;
  let editMetaTitle = '';
  let editMetaDescription = '';
  let editMetaKeywords = '';
  let editMetaOgImage = '';

  function startEdit(slotId: string, currentImages: string[], maxImages?: number) {
    editingSlot = slotId;
    editImages = [...currentImages];
    editNote = '';
    currentSlotMaxImages = maxImages;
  }

  function cancelEdit() {
    editingSlot = null;
    editImages = [];
    editNote = '';
    currentSlotMaxImages = undefined;
  }

  function startTextEdit(slotId: string, currentValue: string) {
    editingTextSlot = slotId;
    editTextValue = currentValue;
    editTextNote = '';
  }

  function cancelTextEdit() {
    editingTextSlot = null;
    editTextValue = '';
    editTextNote = '';
  }

  function startMetaEdit(pageId: string, values: { title?: string; description?: string; keywords?: string; ogImage?: string }) {
    editingMetaSlot = pageId;
    editMetaTitle = values.title || '';
    editMetaDescription = values.description || '';
    editMetaKeywords = values.keywords || '';
    editMetaOgImage = values.ogImage || '';
  }

  function cancelMetaEdit() {
    editingMetaSlot = null;
    editMetaTitle = '';
    editMetaDescription = '';
    editMetaKeywords = '';
    editMetaOgImage = '';
  }

  // Store info editing state
  let editingStoreInfo = false;
  let editStoreValues: Record<string, string> = {};

  function startStoreEdit() {
    editingStoreInfo = true;
    editStoreValues = { ...data.storeInfo.values };
  }

  function cancelStoreEdit() {
    editingStoreInfo = false;
    editStoreValues = {};
  }

  // Overlay editing state
  let editingOverlay: string | null = null;
  let editOverlayValues: Record<string, string> = {};

  function startOverlayEdit(overlayId: string, currentValues: Record<string, string>) {
    editingOverlay = overlayId;
    editOverlayValues = { ...currentValues };
  }

  function cancelOverlayEdit() {
    editingOverlay = null;
    editOverlayValues = {};
  }

  function hasPendingOverlay(): boolean {
    return data.overlays?.some(o => o.pendingChange !== null) || false;
  }

  // Sidebar section expansion state
  const MAX_VISIBLE_ITEMS = 5;
  const MAX_VISIBLE_EXTRA_PAGES = 3;
  let expandedSections: Record<string, boolean> = {};

  function toggleSection(section: string) {
    expandedSections[section] = !expandedSections[section];
  }

  // Filtered page lists for sidebar
  $: extraPages = allPages.filter(page => getSlotCount(page) > 0 && page !== '/' && page !== '/privacy' && page !== '/terms' && page !== '/contact');
  $: overlaysList = data.overlays || [];

  function openPicker() {
    pickerOpen = true;
  }

  function handlePickerSelect(event: CustomEvent<{ images: string[] }>) {
    // Add new images that aren't already in the list
    const newImages = event.detail.images.filter(img => !editImages.includes(img));
    editImages = [...editImages, ...newImages];
  }

  function removeImage(index: number) {
    editImages = editImages.filter((_, i) => i !== index);
  }

  function moveImage(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= editImages.length) return;

    const newImages = [...editImages];
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    editImages = newImages;
  }

  // Group image slots by page
  $: slotsByPage = data.slots.reduce((acc, slot) => {
    const page = slot.page || 'Other';
    if (!acc[page]) acc[page] = [];
    acc[page].push(slot);
    return acc;
  }, {} as Record<string, typeof data.slots>);

  // Group text slots by page
  $: textSlotsByPage = data.textSlots.reduce((acc, slot) => {
    const page = slot.page || 'Other';
    if (!acc[page]) acc[page] = [];
    acc[page].push(slot);
    return acc;
  }, {} as Record<string, typeof data.textSlots>);

  // Get unique pages from both image and text slots, sorted with Home first
  $: allPages = [...new Set([...Object.keys(slotsByPage), ...Object.keys(textSlotsByPage)])].sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

  // Group slots by section for the selected page
  interface SectionData {
    textSlots: typeof data.textSlots;
    imageSlots: typeof data.slots;
  }

  $: sectionsByPage = (() => {
    const textSlots = textSlotsByPage[selectedPage] || [];
    const imageSlots = slotsByPage[selectedPage] || [];

    const sections: Record<string, SectionData> = {};

    // Add text slots to sections
    for (const slot of textSlots) {
      const section = slot.section || 'Other';
      if (!sections[section]) sections[section] = { textSlots: [], imageSlots: [] };
      sections[section].textSlots.push(slot);
    }

    // Add image slots to sections
    for (const slot of imageSlots) {
      const section = slot.section || 'Other';
      if (!sections[section]) sections[section] = { textSlots: [], imageSlots: [] };
      sections[section].imageSlots.push(slot);
    }

    return sections;
  })();

  // Order sections sensibly (Hero first, then alphabetical)
  $: orderedSections = Object.keys(sectionsByPage).sort((a, b) => {
    if (a === 'Hero') return -1;
    if (b === 'Hero') return 1;
    return a.localeCompare(b);
  });

  // Page display names
  const pageLabels: Record<string, string> = {
    '/': 'Home Page',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms & Conditions',
    '/contact': 'Contact',
    '/about': 'About Eurotech',
    '/jaguar': 'Jaguar',
    '/land-rover': 'Land Rover',
    '/range-rover': 'Range Rover',
    '/bmw': 'BMW',
    '/mini': 'Mini',
    '/services': 'Services',
    'search-engines': 'Search & Social',
    'website-home': 'Eurotech Auto'
  };

  function getPageLabel(page: string): string {
    if (page.startsWith('overlay:')) {
      const overlayId = page.replace('overlay:', '');
      const overlay = data.overlays?.find(o => o.id === overlayId);
      return overlay?.label || overlayId;
    }
    return pageLabels[page] || page;
  }

  function getSelectedOverlay() {
    if (!selectedPage.startsWith('overlay:')) return null;
    const overlayId = selectedPage.replace('overlay:', '');
    return data.overlays?.find(o => o.id === overlayId) || null;
  }

  function getSlotCount(page: string): number {
    const textCount = textSlotsByPage[page]?.length || 0;
    const imageCount = slotsByPage[page]?.length || 0;
    return textCount + imageCount;
  }

  function hasPendingInPage(page: string): boolean {
    const textPending = textSlotsByPage[page]?.some(s => s.pendingChange) || false;
    const imagePending = slotsByPage[page]?.some(s => s.pendingChange) || false;
    return textPending || imagePending;
  }

  function hasPendingMeta(): boolean {
    return data.metaSlots?.some(s => s.pendingChange) || false;
  }

  // Helper functions for Google preview truncation
  function truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  function getPageUrl(page: string): string {
    const domain = 'eurotechauto.co.nz';
    if (page === '/') return domain;
    return domain + page;
  }

  // Character limit thresholds
  const LIMITS = {
    title: { desktop: 60, mobile: 50 },
    description: { desktop: 160, mobile: 120 }
  };
</script>

<svelte:head>
  <title>CMS - Eurotech</title>
</svelte:head>

<div class="admin-layout">
  <!-- CMS Sidebar -->
  <aside class="sidebar">
    <nav class="page-nav">
      <button
        class="page-nav-item"
        class:active={selectedPage === 'overview'}
        on:click={() => selectedPage = 'overview'}
      >
        <span class="page-nav-label">Overview</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'media-store'}
        on:click={() => selectedPage = 'media-store'}
      >
        <span class="page-nav-label">Media Library</span>
      </button>

      <div class="page-nav-label-divider">Content</div>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'pages-list'}
        on:click={() => selectedPage = 'pages-list'}
      >
        <span class="page-nav-label">Pages</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'collections'}
        on:click={() => selectedPage = 'collections'}
      >
        <span class="page-nav-label">Collections</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'faqs'}
        on:click={() => selectedPage = 'faqs'}
      >
        <span class="page-nav-label">FAQs</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'blocks'}
        on:click={() => selectedPage = 'blocks'}
      >
        <span class="page-nav-label">Blocks</span>
      </button>

      <div class="page-nav-label-divider">Configuration</div>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'settings'}
        on:click={() => selectedPage = 'settings'}
      >
        <span class="page-nav-label">Settings</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'search-engines'}
        class:has-pending={hasPendingMeta()}
        on:click={() => selectedPage = 'search-engines'}
      >
        <span class="page-nav-label">Search & Social</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'forms'}
        on:click={() => selectedPage = 'forms'}
      >
        <span class="page-nav-label">Forms</span>
      </button>

      <button
        class="page-nav-item"
        class:active={selectedPage === 'users'}
        on:click={() => selectedPage = 'users'}
      >
        <span class="page-nav-label">Users</span>
      </button>
    </nav>
  </aside>

  <!-- Main Content -->
  <div class="admin-page">
    <header class="page-header">
      <h1>{selectedPage === 'overview' ? 'Eurotech Auto (Website)' : getPageLabel(selectedPage)}</h1>
      {#if data.hasPendingChanges}
        <div class="header-actions">
          <span class="unpublished-notice">Unpublished changes</span>
          <a href="/api/preview/enable" target="_blank" class="preview-site-btn">
            Preview Site
          </a>
        </div>
      {/if}
    </header>

    {#if form?.success}
      <div class="success-message">
        {#if form.action === 'proposed'}
          Change proposed for {form.slotId}. Awaiting approval.
        {:else if form.action === 'approved'}
          Change approved and published for {form.slotId}.
        {:else if form.action === 'rejected'}
          Change rejected for {form.slotId}.
        {/if}
      </div>
    {/if}

    {#if form?.error}
      <div class="error-message">{form.error}</div>
    {/if}

    <!-- Website Home - CMS Landing Page -->
    {#if selectedPage === 'website-home'}
      <div class="website-home-content">
        <div class="website-home-header">
          <div class="website-home-info">
            <span class="website-status"><span class="status-dot"></span> Live</span>
            <a href="https://eurotechauto.co.nz" target="_blank" rel="noopener" class="website-url">eurotechauto.co.nz ↗</a>
          </div>
        </div>

        <!-- Website Stats -->
        <div class="dashboard-stats" style="margin-bottom: var(--space-8);">
          <div class="stat-card">
            <span class="stat-value">{allPages.length}</span>
            <span class="stat-label">Pages</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{data.gallery?.reduce((sum, folder) => sum + folder.images.length, 0) || 0}</span>
            <span class="stat-label">Images</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{data.textSlots?.length || 0}</span>
            <span class="stat-label">Text Blocks</span>
          </div>
          <div class="stat-card clickable" class:has-pending={data.hasPendingChanges} on:click={() => selectedPage = 'overview'}>
            <span class="stat-value">{data.hasPendingChanges ? '!' : '✓'}</span>
            <span class="stat-label">{data.hasPendingChanges ? 'Pending' : 'Up to date'}</span>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div class="dashboard-section">
          <h3>Manage Content</h3>
          <div class="website-nav-grid">
            <button class="website-nav-card" on:click={() => selectedPage = 'overview'}>
              <span class="nav-card-title">Overview</span>
              <span class="nav-card-desc">Key info, logos, and page summary</span>
            </button>
            <button class="website-nav-card" on:click={() => selectedPage = 'pages-list'}>
              <span class="nav-card-title">Pages</span>
              <span class="nav-card-desc">Edit page content and images</span>
            </button>
            <button class="website-nav-card" on:click={() => selectedPage = 'media-store'}>
              <span class="nav-card-title">Media Library</span>
              <span class="nav-card-desc">Manage images and files</span>
            </button>
            <button class="website-nav-card" on:click={() => selectedPage = 'search-engines'}>
              <span class="nav-card-title">Search & Social</span>
              <span class="nav-card-desc">SEO titles and descriptions</span>
            </button>
            <button class="website-nav-card" on:click={() => selectedPage = 'blocks'}>
              <span class="nav-card-title">Blocks</span>
              <span class="nav-card-desc">Reusable content sections</span>
            </button>
            <button class="website-nav-card" on:click={() => selectedPage = 'settings'}>
              <span class="nav-card-title">Settings</span>
              <span class="nav-card-desc">Website configuration</span>
            </button>
          </div>
        </div>

        <!-- Key Display Information -->
        <div class="dashboard-section">
          <h3>Key Display Information</h3>
          <div class="key-info-card">
            <div class="key-info-grid">
              {#each Object.entries(data.storeInfo.schema) as [fieldId, field]}
                <div class="key-info-item">
                  <span class="key-info-label">{field.label}</span>
                  <span class="key-info-value">{data.storeInfo.values[fieldId] || '—'}</span>
                </div>
              {/each}
            </div>
            <button class="btn-secondary btn-sm" on:click={() => selectedPage = 'overview'}>Edit Key Info</button>
          </div>
        </div>
      </div>

    <!-- Overview -->
    {:else if selectedPage === 'overview'}
      <div class="overview-content">
        <p class="overview-intro">
          Manage text and images across all pages of the Eurotech website. Select a page from the menu to edit its content.
        </p>

        <!-- Key Information Section -->
        <div class="store-info-section">
          <h2>Key Information</h2>
          <p class="section-description">Business details displayed across the website (footer, contact page, etc.)</p>

          {#if data.storeInfo.pendingChange}
            <div class="pending-notice">
              <strong>Pending changes</strong> by {data.storeInfo.pendingChange.proposedBy}
              {#if data.canApprove}
                <div class="pending-actions">
                  <form method="POST" action="?/approveStore" style="display: inline;">
                    <button type="submit" class="btn-primary btn-sm">Approve</button>
                  </form>
                  <form method="POST" action="?/rejectStore" style="display: inline;">
                    <button type="submit" class="btn-danger btn-sm">Reject</button>
                  </form>
                </div>
              {/if}
            </div>
          {/if}

          {#if editingStoreInfo}
            <form method="POST" action="?/proposeStore" class="store-edit-form">
              <input type="hidden" name="values" value={JSON.stringify(editStoreValues)} />

              <div class="store-fields-grid">
                {#each Object.entries(data.storeInfo.schema) as [fieldId, field]}
                  <div class="form-group">
                    <label for="store-{fieldId}">{field.label}</label>
                    {#if field.type === 'textarea'}
                      <textarea
                        id="store-{fieldId}"
                        bind:value={editStoreValues[fieldId]}
                        class="text-input"
                        rows="3"
                        placeholder={field.placeholder}
                      ></textarea>
                    {:else}
                      <input
                        type="text"
                        id="store-{fieldId}"
                        bind:value={editStoreValues[fieldId]}
                        class="text-input"
                        placeholder={field.placeholder}
                      />
                    {/if}
                  </div>
                {/each}
              </div>

              <div class="edit-actions">
                <button type="button" class="btn-secondary" on:click={cancelStoreEdit}>Cancel</button>
                <button type="submit" class="btn-primary">Save Changes</button>
              </div>
            </form>
          {:else}
            <div class="store-display">
              <div class="store-fields-grid">
                {#each Object.entries(data.storeInfo.schema) as [fieldId, field]}
                  <div class="store-field">
                    <span class="store-field-label">{field.label}</span>
                    <span class="store-field-value">
                      {data.storeInfo.values[fieldId] || '—'}
                    </span>
                  </div>
                {/each}
              </div>
              {#if data.canPropose && !data.storeInfo.pendingChange}
                <button class="btn-secondary" on:click={startStoreEdit}>Edit Display Info</button>
              {/if}
            </div>
          {/if}
        </div>

        <!-- Logos Section -->
        <div class="logos-section">
          <h2>Logos</h2>
          <p class="section-description">Brand logos used across the website</p>

          <div class="logos-grid">
            <div class="logo-item">
              <span class="logo-label">Main Logo</span>
              <div class="logo-preview">
                <img src="/images/logo.svg" alt="Main logo" />
              </div>
            </div>
            <div class="logo-item">
              <span class="logo-label">Dark Version</span>
              <div class="logo-preview dark">
                <img src="/images/logo-dark.svg" alt="Dark logo" />
              </div>
            </div>
            <div class="logo-item">
              <span class="logo-label">Light Version</span>
              <div class="logo-preview light">
                <img src="/images/logo-light.svg" alt="Light logo" />
              </div>
            </div>
          </div>
        </div>

        <div class="overview-grid">
          {#each allPages as page}
            {@const textCount = textSlotsByPage[page]?.length || 0}
            {@const imageCount = slotsByPage[page]?.length || 0}
            {@const hasPending = hasPendingInPage(page)}
            <button
              class="overview-card"
              class:has-pending={hasPending}
              on:click={() => selectedPage = page}
            >
              <h3>{getPageLabel(page)}</h3>
              <div class="overview-card-stats">
                {#if textCount > 0}
                  <span>{textCount} text</span>
                {/if}
                {#if imageCount > 0}
                  <span>{imageCount} image{imageCount > 1 ? 's' : ''}</span>
                {/if}
              </div>
              {#if hasPending}
                <span class="overview-card-pending">Pending</span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {:else if selectedPage === 'search-engines'}
    <!-- Search Engines / Meta Content -->
    <div class="meta-content">
      <p class="overview-intro">
        Manage SEO meta content for each page. Changes to page titles and descriptions affect how your site appears in search engine results.
      </p>

      <div class="meta-slots-grid">
        {#each data.metaSlots || [] as slot}
          <div class="slot-card meta-slot" class:has-pending={slot.pendingChange}>
            <div class="slot-header">
              <h3>{slot.label}</h3>
              <span class="slot-meta">{slot.page}</span>
            </div>

            {#if editingMetaSlot === slot.id}
              <form method="POST" action="?/proposeMeta" class="edit-form">
                <input type="hidden" name="pageId" value={slot.id} />
                <div class="form-group">
                  <label for="meta-title-{slot.id}">Page Title</label>
                  <input
                    type="text"
                    id="meta-title-{slot.id}"
                    name="title"
                    bind:value={editMetaTitle}
                    class="text-input"
                    maxlength="60"
                  />
                  <span class="char-count">{editMetaTitle.length}/60</span>
                </div>
                <div class="form-group">
                  <label for="meta-desc-{slot.id}">Meta Description</label>
                  <textarea
                    id="meta-desc-{slot.id}"
                    name="description"
                    bind:value={editMetaDescription}
                    class="text-input"
                    rows="3"
                    maxlength="160"
                  ></textarea>
                  <span class="char-count">{editMetaDescription.length}/160</span>
                </div>
                <div class="form-group">
                  <label for="meta-keywords-{slot.id}">Keywords</label>
                  <input
                    type="text"
                    id="meta-keywords-{slot.id}"
                    name="keywords"
                    bind:value={editMetaKeywords}
                    class="text-input"
                  />
                </div>
                {#if slot.fields.ogImage}
                  <div class="form-group">
                    <label for="meta-og-{slot.id}">OG Image</label>
                    <input
                      type="text"
                      id="meta-og-{slot.id}"
                      name="ogImage"
                      bind:value={editMetaOgImage}
                      class="text-input"
                    />
                  </div>
                {/if}
                <div class="edit-actions">
                  <button type="button" class="btn-secondary" on:click={cancelMetaEdit}>Cancel</button>
                  <button type="submit" class="btn-primary">Save</button>
                </div>
              </form>
            {:else}
              <!-- Google Search Previews -->
              <div class="google-previews">
                <div class="google-preview-row">
                  <!-- Desktop Preview -->
                  <div class="google-preview-wrapper">
                    <div class="google-preview-label">Desktop</div>
                    <div class="google-preview desktop">
                      <div class="google-result">
                        <div class="google-title">{truncateText(slot.values.title || 'Page Title', LIMITS.title.desktop)}</div>
                        <div class="google-url">{getPageUrl(slot.page)}</div>
                        <div class="google-description">{truncateText(slot.values.description || 'Meta description not set', LIMITS.description.desktop)}</div>
                      </div>
                    </div>
                    <!-- Character Counts -->
                    <div class="char-counts">
                      <div class="char-count-item">
                        <span class="char-count-label">Title:</span>
                        <span class="char-count-value" class:warning={(slot.values.title?.length || 0) > LIMITS.title.mobile} class:ok={(slot.values.title?.length || 0) <= LIMITS.title.mobile}>
                          {slot.values.title?.length || 0} chars
                          <span class="char-limits">(mobile: {LIMITS.title.mobile}, desktop: {LIMITS.title.desktop})</span>
                        </span>
                      </div>
                      <div class="char-count-item">
                        <span class="char-count-label">Description:</span>
                        <span class="char-count-value" class:warning={(slot.values.description?.length || 0) > LIMITS.description.mobile} class:ok={(slot.values.description?.length || 0) <= LIMITS.description.mobile}>
                          {slot.values.description?.length || 0} chars
                          <span class="char-limits">(mobile: {LIMITS.description.mobile}, desktop: {LIMITS.description.desktop})</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Mobile Preview -->
                  <div class="google-preview-wrapper">
                    <div class="google-preview-label">Mobile</div>
                    <div class="google-preview mobile">
                      <div class="google-result">
                        <div class="google-url">{getPageUrl(slot.page)}</div>
                        <div class="google-title">{truncateText(slot.values.title || 'Page Title', LIMITS.title.mobile)}</div>
                        <div class="google-description">{truncateText(slot.values.description || 'Meta description not set', LIMITS.description.mobile)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- OG Image Preview -->
                {#if slot.fields.ogImage}
                  <div class="og-image-section">
                    <div class="og-image-label">Social Image (OG)</div>
                    {#if slot.values.ogImage}
                      <div class="og-image-preview">
                        <img
                          src={slot.values.ogImage}
                          alt="OG preview"
                          on:error={(e) => e.currentTarget.style.display = 'none'}
                        />
                        <div class="og-image-fallback">
                          <span class="og-image-path">{slot.values.ogImage}</span>
                          <span class="og-image-note">Image not found</span>
                        </div>
                      </div>
                    {:else}
                      <div class="og-image-missing">No image set</div>
                    {/if}
                  </div>
                {/if}

                <!-- Keywords (less prominent) -->
                {#if slot.values.keywords}
                  <div class="keywords-section">
                    <span class="keywords-label">Keywords:</span>
                    <span class="keywords-value">{slot.values.keywords}</span>
                  </div>
                {/if}
              </div>
              <div class="slot-actions">
                {#if data.canPropose && !slot.pendingChange}
                  <button class="btn-secondary btn-sm" on:click={() => startMetaEdit(slot.id, slot.values)}>Edit</button>
                {/if}
                {#if slot.pendingChange && data.canApprove}
                  <form method="POST" action="?/approveMeta" style="display: inline;">
                    <input type="hidden" name="pageId" value={slot.id} />
                    <button type="submit" class="btn-primary btn-sm">Approve</button>
                  </form>
                  <form method="POST" action="?/rejectMeta" style="display: inline;">
                    <input type="hidden" name="pageId" value={slot.id} />
                    <button type="submit" class="btn-danger btn-sm">Reject</button>
                  </form>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    {:else if selectedPage === 'pages-list'}
    <!-- Pages List -->
    <div class="pages-content">
      <p class="overview-intro">
        Manage content across all pages of the website.
      </p>

      <table class="pages-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Path</th>
            <th>Text</th>
            <th>Images</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="pages-table-section"><td colspan="6">Default Pages</td></tr>
          {#each ['/', '/privacy', '/terms', '/contact'] as page}
            {@const textCount = textSlotsByPage[page]?.length || 0}
            {@const imageCount = slotsByPage[page]?.length || 0}
            {@const hasPending = hasPendingInPage(page)}
            <tr class:has-pending={hasPending}>
              <td class="page-name">{getPageLabel(page)}</td>
              <td class="page-path">{page}</td>
              <td class="page-count">{textCount}</td>
              <td class="page-count">{imageCount}</td>
              <td class="page-status">
                {#if hasPending}
                  <span class="status-pending">Pending</span>
                {:else}
                  <span class="status-live">Live</span>
                {/if}
              </td>
              <td class="page-actions">
                <button class="btn-secondary btn-sm" on:click={() => selectedPage = page}>Edit</button>
              </td>
            </tr>
          {/each}

          {#if extraPages.length > 0}
            <tr class="pages-table-section"><td colspan="6">Extra Pages</td></tr>
            {#each extraPages as page}
              {@const textCount = textSlotsByPage[page]?.length || 0}
              {@const imageCount = slotsByPage[page]?.length || 0}
              {@const hasPending = hasPendingInPage(page)}
              <tr class:has-pending={hasPending}>
                <td class="page-name">{getPageLabel(page)}</td>
                <td class="page-path">{page}</td>
                <td class="page-count">{textCount}</td>
                <td class="page-count">{imageCount}</td>
                <td class="page-status">
                  {#if hasPending}
                    <span class="status-pending">Pending</span>
                  {:else}
                    <span class="status-live">Live</span>
                  {/if}
                </td>
                <td class="page-actions">
                  <button class="btn-secondary btn-sm" on:click={() => selectedPage = page}>Edit</button>
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
    {:else if selectedPage === 'blocks'}
    <!-- Blocks Content -->
    <div class="blocks-content">
      <p class="overview-intro">
        Blocks are reusable content sections that can be placed in designated regions across your website.
      </p>

      <!-- Filters -->
      <div class="blocks-filters">
        <span class="filter-label">Filter by page:</span>
        <div class="filter-pills">
          <button class="filter-pill active">All</button>
          <button class="filter-pill">Home</button>
          <button class="filter-pill">Services</button>
          <button class="filter-pill">BMW</button>
          <button class="filter-pill">Jaguar</button>
          <button class="filter-pill">Land Rover</button>
          <button class="filter-pill">Contact</button>
        </div>
      </div>

      <!-- Website Skeleton / Block Regions -->
      <div class="website-skeleton">
        <h2>Block Regions</h2>
        <div class="skeleton-page">
          <div class="skeleton-region region-slim"><span>top-of-page</span></div>
          <div class="skeleton-region region-header"><span>header</span></div>
          <div class="skeleton-region region-slim"><span>below-header</span></div>
          <div class="skeleton-region region-hero"><span>hero</span></div>
          <div class="skeleton-region region-slim"><span>below-hero</span></div>
          <div class="skeleton-region region-content"><span>content</span></div>
          <div class="skeleton-region region-slim"><span>above-footer</span></div>
          <div class="skeleton-region region-footer"><span>footer</span></div>
        </div>
      </div>

      <!-- Blocks Table -->
      <div class="blocks-table-section">
        <h2>All Blocks</h2>
        <table class="blocks-table">
          <thead>
            <tr>
              <th>Block</th>
              <th>Region</th>
              <th>Pages</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="block-name">Holiday Hours Notice</td>
              <td class="block-region">top-of-page</td>
              <td class="block-pages">All pages</td>
              <td class="block-status"><span class="status-inactive">Inactive</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td class="block-name">Main Navigation</td>
              <td class="block-region">header</td>
              <td class="block-pages">All pages</td>
              <td class="block-status"><span class="status-live">Active</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td class="block-name">Brand Logos Bar</td>
              <td class="block-region">below-header</td>
              <td class="block-pages">Home</td>
              <td class="block-status"><span class="status-live">Active</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td class="block-name">Homepage Hero Slider</td>
              <td class="block-region">hero</td>
              <td class="block-pages">Home</td>
              <td class="block-status"><span class="status-live">Active</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td class="block-name">Service Page Hero</td>
              <td class="block-region">hero</td>
              <td class="block-pages">Services, BMW, Jaguar...</td>
              <td class="block-status"><span class="status-live">Active</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td class="block-name">Call to Action Banner</td>
              <td class="block-region">above-footer</td>
              <td class="block-pages">All pages</td>
              <td class="block-status"><span class="status-live">Active</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td class="block-name">Footer</td>
              <td class="block-region">footer</td>
              <td class="block-pages">All pages</td>
              <td class="block-status"><span class="status-live">Active</span></td>
              <td class="block-actions"><button class="btn-secondary btn-sm">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {:else if selectedPage.startsWith('overlay:')}
    <!-- Overlay Content -->
    {@const overlay = getSelectedOverlay()}
    {#if overlay}
      <div class="overlay-content">
        <p class="overview-intro">
          Manage the content displayed in the {overlay.label} popup overlay.
        </p>

        {#if overlay.pendingChange}
          <div class="pending-notice">
            <strong>Pending changes</strong> by {overlay.pendingChange.proposedBy}
            {#if data.canApprove}
              <div class="pending-actions">
                <form method="POST" action="?/approveOverlay" style="display: inline;">
                  <input type="hidden" name="overlayId" value={overlay.id} />
                  <button type="submit" class="btn-primary btn-sm">Approve</button>
                </form>
                <form method="POST" action="?/rejectOverlay" style="display: inline;">
                  <input type="hidden" name="overlayId" value={overlay.id} />
                  <button type="submit" class="btn-danger btn-sm">Reject</button>
                </form>
              </div>
            {/if}
          </div>
        {/if}

        {#if editingOverlay === overlay.id}
          <form method="POST" action="?/proposeOverlay" class="overlay-edit-form">
            <input type="hidden" name="overlayId" value={overlay.id} />
            <input type="hidden" name="values" value={JSON.stringify(editOverlayValues)} />

            <div class="overlay-fields-grid">
              {#each Object.entries(overlay.fields) as [fieldId, field]}
                <div class="form-group">
                  <label for="overlay-{fieldId}">{field.label}</label>
                  {#if field.type === 'textarea'}
                    <textarea
                      id="overlay-{fieldId}"
                      bind:value={editOverlayValues[fieldId]}
                      class="text-input"
                      rows="4"
                      placeholder={field.placeholder}
                    ></textarea>
                  {:else}
                    <input
                      type="text"
                      id="overlay-{fieldId}"
                      bind:value={editOverlayValues[fieldId]}
                      class="text-input"
                      placeholder={field.placeholder}
                    />
                  {/if}
                </div>
              {/each}
            </div>

            <div class="edit-actions">
              <button type="button" class="btn-secondary" on:click={cancelOverlayEdit}>Cancel</button>
              <button type="submit" class="btn-primary">Save Changes</button>
            </div>
          </form>
        {:else}
          <div class="overlay-display">
            <div class="overlay-fields-grid">
              {#each Object.entries(overlay.fields) as [fieldId, field]}
                <div class="overlay-field">
                  <span class="overlay-field-label">{field.label}</span>
                  <span class="overlay-field-value" class:multiline={field.type === 'textarea'}>
                    {#if field.type === 'textarea'}
                      {#each (overlay.values[fieldId] || '—').split('\n') as line}
                        {line}<br/>
                      {/each}
                    {:else}
                      {overlay.values[fieldId] || '—'}
                    {/if}
                  </span>
                </div>
              {/each}
            </div>
            {#if data.canPropose && !overlay.pendingChange}
              <button class="btn-secondary" on:click={() => startOverlayEdit(overlay.id, overlay.values)}>Edit Overlay</button>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
    {:else if selectedPage === 'media-store'}
    <!-- Media Library -->
    <div class="media-library-content">
      <p class="overview-intro">
        Manage your media library. Images stored here can be used across all pages and slots.
      </p>

      <div class="media-library-stats">
        <div class="stat-card">
          <span class="stat-value">0</span>
          <span class="stat-label">Total Images</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">0</span>
          <span class="stat-label">Folders</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">—</span>
          <span class="stat-label">Storage</span>
        </div>
      </div>

      <div class="media-library-empty">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <h3>Media Library Coming Soon</h3>
        <p>
          The R2-backed media library is being set up. Once configured, you'll be able to:
        </p>
        <ul class="feature-list">
          <li>Upload and organize images in folders</li>
          <li>Edit image metadata (alt text, tags, attribution)</li>
          <li>Search and filter your media collection</li>
          <li>Track where images are used across the site</li>
        </ul>
        <p class="setup-note">
          Requires Cloudflare R2 bucket configuration. Contact your administrator for setup.
        </p>
      </div>
    </div>
    {:else}
    <!-- Sections with grouped text and image slots -->
    {#each orderedSections as sectionName}
      <section class="page-section">
        <h2 class="section-title">{sectionName}</h2>
        <div class="section-slots">
          <!-- Text slots in this section -->
          {#each sectionsByPage[sectionName].textSlots as slot}
            <div class="slot-card text-slot" class:has-pending={slot.pendingChange}>
              <div class="slot-header">
                <h3>{slot.label}</h3>
                <span class="slot-meta">{slot.type}</span>
              </div>

              {#if editingTextSlot === slot.id}
                <form method="POST" action="?/proposeText" class="edit-form">
                  <input type="hidden" name="slotId" value={slot.id} />
                  <div class="form-group">
                    {#if slot.type === 'textarea'}
                      <textarea name="value" bind:value={editTextValue} rows="3" class="text-input"></textarea>
                    {:else}
                      <input type="text" name="value" bind:value={editTextValue} class="text-input" />
                    {/if}
                  </div>
                  <div class="edit-actions">
                    <button type="button" class="btn-secondary" on:click={cancelTextEdit}>Cancel</button>
                    <button type="submit" class="btn-primary">Save</button>
                  </div>
                </form>
              {:else}
                <div class="text-preview">
                  {#if slot.value}
                    <p class="text-value">{slot.value}</p>
                  {:else}
                    <p class="no-content">No content set</p>
                  {/if}
                </div>
                <div class="slot-actions">
                  {#if data.canPropose && !slot.pendingChange}
                    <button class="btn-secondary btn-sm" on:click={() => startTextEdit(slot.id, slot.value)}>Edit</button>
                  {/if}
                  {#if slot.pendingChange && data.canApprove}
                    <form method="POST" action="?/approveText" style="display: inline;">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <button type="submit" class="btn-primary btn-sm">Approve</button>
                    </form>
                    <form method="POST" action="?/rejectText" style="display: inline;">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <button type="submit" class="btn-danger btn-sm">Reject</button>
                    </form>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}

          <!-- Image slots in this section -->
          {#each sectionsByPage[sectionName].imageSlots as slot}
            <div class="slot-card image-slot" class:has-pending={slot.pendingChange}>
              <div class="slot-header">
                <h3>{slot.label}</h3>
                <span class="slot-meta">{slot.images.length}{#if slot.maxImages}/{slot.maxImages}{/if}</span>
              </div>

              {#if editingSlot === slot.id}
                <form method="POST" action="?/propose" class="edit-form">
                  <input type="hidden" name="slotId" value={slot.id} />
                  <input type="hidden" name="images" value={JSON.stringify(editImages)} />
                  <div class="edit-images">
                    {#each editImages as image, i}
                      <div class="edit-image-item">
                        <div class="edit-image-preview">
                          <CloudflareImage src={image} alt="" width={80} height={54} />
                        </div>
                        <div class="edit-image-actions">
                          <button type="button" on:click={() => moveImage(i, 'up')} disabled={i === 0}>↑</button>
                          <button type="button" on:click={() => moveImage(i, 'down')} disabled={i === editImages.length - 1}>↓</button>
                          <button type="button" class="remove" on:click={() => removeImage(i)}>×</button>
                        </div>
                      </div>
                    {/each}
                    <button type="button" class="add-images-btn" on:click={openPicker} disabled={currentSlotMaxImages ? editImages.length >= currentSlotMaxImages : false}>+ Add</button>
                  </div>
                  <div class="edit-actions">
                    <button type="button" class="btn-secondary" on:click={cancelEdit}>Cancel</button>
                    <button type="submit" class="btn-primary">Save</button>
                  </div>
                </form>
              {:else}
                <div class="slot-images">
                  {#each slot.images as image}
                    <div class="image-thumb">
                      <CloudflareImage src={image} alt="" width={120} height={80} />
                    </div>
                  {/each}
                  {#if slot.images.length === 0}
                    <div class="no-images">No images</div>
                  {/if}
                </div>
                <div class="slot-actions">
                  {#if data.canPropose && !slot.pendingChange}
                    <button class="btn-secondary btn-sm" on:click={() => startEdit(slot.id, slot.images, slot.maxImages)}>Edit</button>
                  {/if}
                  {#if slot.pendingChange && data.canApprove}
                    <form method="POST" action="?/approve" style="display: inline;">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <button type="submit" class="btn-primary btn-sm">Approve</button>
                    </form>
                    <form method="POST" action="?/reject" style="display: inline;">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <button type="submit" class="btn-danger btn-sm">Reject</button>
                    </form>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </section>
    {/each}
    {/if}
  </div>
</div>

<ImagePicker
  bind:open={pickerOpen}
  gallery={data.gallery}
  selectedImages={editImages}
  maxImages={currentSlotMaxImages}
  on:close={() => (pickerOpen = false)}
  on:select={handlePickerSelect}
/>

<style>
  .admin-layout {
    display: flex;
    gap: var(--space-6);
    max-width: 1400px;
  }

  .sidebar {
    width: 200px;
    flex-shrink: 0;
  }

  .page-nav {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: var(--space-4);
  }

  .page-nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-2) var(--space-3);
    border: none;
    background: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
    color: #374151;
    transition: all var(--transition-fast);
    text-align: left;
  }

  .page-nav-item:hover {
    background: #f3f4f6;
  }

  .page-nav-item.active {
    background: var(--color-primary);
    color: white;
  }

  .page-nav-item.has-pending:not(.active) {
    background: #fef3c7;
  }

  .page-nav-label-divider {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    padding: var(--space-3) var(--space-3) var(--space-1);
    margin-top: var(--space-2);
    border-top: 1px solid #e5e7eb;
  }

  .page-nav-label {
    font-weight: var(--font-medium);
  }

  .page-nav-count {
    font-size: var(--text-xs);
    background: rgba(0, 0, 0, 0.1);
    padding: 2px 6px;
    border-radius: var(--radius-full);
  }

  .page-nav-item.active .page-nav-count {
    background: rgba(255, 255, 255, 0.2);
  }

  .page-nav-expand {
    display: block;
    width: 100%;
    padding: var(--space-1) var(--space-3);
    border: none;
    background: none;
    color: #b0b5bc;
    font-size: var(--text-xs);
    font-weight: normal;
    cursor: pointer;
    text-align: left;
    transition: color var(--transition-fast);
  }

  .page-nav-expand:hover {
    color: #6b7280;
  }

  .page-nav-divider {
    height: 1px;
    background: #e5e7eb;
    margin: var(--space-2) 0;
  }

  .admin-page {
    flex: 1;
    min-width: 0;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  /* Text slot styles */
  .text-preview {
    margin-bottom: var(--space-4);
  }

  .text-value {
    background: #f9fafb;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: #374151;
    white-space: pre-wrap;
    margin: 0;
  }

  .no-content {
    color: #9ca3af;
    font-style: italic;
    padding: var(--space-3);
    margin: 0;
  }

  .text-input {
    width: 100%;
    padding: var(--space-2) var(--space-3);
    border: 1px solid #d1d5db;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-family: inherit;
    resize: vertical;
  }

  .text-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(107, 139, 168, 0.1);
  }

  textarea.text-input {
    min-height: 100px;
  }

  .empty-state {
    text-align: center;
    padding: var(--space-8);
    color: #6b7280;
  }

  .page-header h1 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: #08141a;
    margin: 0;
  }

  .header-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .unpublished-notice {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fcd34d;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  .unpublished-notice::before {
    content: '●';
    color: #f59e0b;
  }

  .preview-site-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #f59e0b;
    color: white;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    transition: background var(--transition-fast);
  }

  .preview-site-btn:hover {
    background: #d97706;
  }

  .section-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: #6b7280;
    margin: 0 0 var(--space-4) 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 12px;
  }

  /* Overview styles */
  .overview-content,
  .blocks-content,
  .pages-content {
    max-width: 900px;
  }

  /* Pages Table */
  .pages-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .pages-table th {
    text-align: left;
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }

  .pages-table td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid #f3f4f6;
    font-size: var(--text-sm);
  }

  .pages-table tr:last-child td {
    border-bottom: none;
  }

  .pages-table tr.has-pending {
    background: #fefce8;
  }

  .pages-table-section td {
    background: #f3f4f6;
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    padding: var(--space-2) var(--space-4);
  }

  .page-name {
    font-weight: var(--font-medium);
    color: #08141a;
  }

  .page-path {
    font-family: monospace;
    font-size: var(--text-xs);
    color: #9ca3af;
  }

  .page-count {
    text-align: center;
    color: #6b7280;
  }

  .page-status {
    text-align: center;
  }

  .status-live {
    color: #059669;
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
  }

  .status-pending {
    background: #fef3c7;
    color: #92400e;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: var(--radius-full);
  }

  .page-actions {
    text-align: right;
  }

  .overview-intro {
    color: #6b7280;
    margin-bottom: var(--space-6);
    font-size: var(--text-base);
  }

  /* Website Skeleton Styles */
  .website-skeleton {
    margin-bottom: var(--space-8);
    max-width: 260px;
  }

  .website-skeleton h2 {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: #6b7280;
    margin-bottom: var(--space-3);
  }

  .skeleton-page {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skeleton-region {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6b7280;
    border-radius: var(--radius-lg);
  }

  .skeleton-region span {
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #d1d5db;
  }

  /* Slim block regions - small insertion points */
  .region-slim {
    padding: 6px 0;
  }

  /* Header region */
  .region-header {
    padding: 10px 0;
  }

  /* Hero region */
  .region-hero {
    padding: 20px 0;
  }

  /* Content region - largest */
  .region-content {
    padding: 35px 0;
  }

  /* Footer region */
  .region-footer {
    padding: 14px 0;
  }

  /* Blocks Filters */
  .blocks-filters {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
    padding: var(--space-3) var(--space-4);
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
  }

  .filter-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: #6b7280;
    white-space: nowrap;
  }

  .filter-pills {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .filter-pill {
    padding: var(--space-1) var(--space-3);
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    color: #6b7280;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .filter-pill:hover {
    background: #e5e7eb;
  }

  .filter-pill.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }

  /* Blocks Table */
  .blocks-table-section {
    margin-top: var(--space-8);
  }

  .blocks-table-section h2 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin: 0 0 var(--space-4) 0;
  }

  .blocks-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .blocks-table th {
    text-align: left;
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }

  .blocks-table td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid #f3f4f6;
    font-size: var(--text-sm);
  }

  .blocks-table tr:last-child td {
    border-bottom: none;
  }

  .block-name {
    font-weight: var(--font-medium);
    color: #08141a;
  }

  .block-region {
    font-family: monospace;
    font-size: var(--text-xs);
    color: #6b7280;
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }

  .block-pages {
    color: #6b7280;
  }

  .block-status {
    text-align: center;
  }

  .block-actions {
    text-align: right;
  }

  .status-inactive {
    color: #9ca3af;
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-4);
  }

  .overview-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
  }

  .overview-card:hover {
    border-color: var(--color-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .overview-card.has-pending {
    border-color: #fbbf24;
  }

  .overview-card h3 {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin: 0 0 var(--space-2) 0;
  }

  .overview-card-stats {
    display: flex;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: #6b7280;
  }

  .overview-card-pending {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    background: #fef3c7;
    color: #92400e;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: var(--radius-full);
  }

  /* Store Info Section */
  .store-info-section {
    margin-bottom: var(--space-8);
  }

  /* Logos Section */
  .logos-section {
    margin-bottom: var(--space-8);
  }

  .logos-section h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin: 0 0 var(--space-2) 0;
  }

  .logos-grid {
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;
    margin-top: var(--space-4);
  }

  .logo-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .logo-label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .logo-preview {
    width: 160px;
    height: 80px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3);
    background: #f9fafb;
    border: 1px solid #e5e7eb;
  }

  .logo-preview.dark {
    background: #1f2937;
    border-color: #374151;
  }

  .logo-preview.light {
    background: #ffffff;
    border-color: #e5e7eb;
    box-shadow: inset 0 0 0 1px #f3f4f6;
  }

  .logo-preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .store-info-section h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin: 0 0 var(--space-2) 0;
  }

  .section-description {
    color: #6b7280;
    font-size: var(--text-sm);
    margin-bottom: var(--space-6);
  }

  .pending-notice {
    background: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    margin-bottom: var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .pending-actions {
    display: flex;
    gap: var(--space-2);
  }

  .store-fields-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .store-edit-form {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .store-display {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .store-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .store-field-label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .store-field-value {
    font-size: var(--text-base);
    color: #08141a;
  }

  .store-display .btn-secondary {
    margin-top: var(--space-6);
  }

  /* Overlay Section Styles */
  .overlay-content {
    max-width: 800px;
  }

  .overlay-fields-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .overlay-edit-form {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .overlay-display {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .overlay-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .overlay-field-label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .overlay-field-value {
    font-size: var(--text-base);
    color: #08141a;
  }

  .overlay-field-value.multiline {
    line-height: 1.6;
  }

  .overlay-display .btn-secondary {
    margin-top: var(--space-6);
  }

  .success-message {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    padding: var(--space-4);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-6);
  }

  .error-message {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: var(--space-4);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-6);
  }

  .page-section {
    margin-bottom: var(--space-12);
  }

  .page-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 2px solid #e5e7eb;
  }

  .slots-grid {
    display: grid;
    gap: var(--space-6);
  }

  .section-slots {
    display: grid;
    gap: var(--space-4);
  }

  .slot-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
  }

  .slot-card.has-pending {
    border-color: #fbbf24;
  }

  .slot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-2);
  }

  .slot-header h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin: 0;
  }

  .slot-meta {
    font-size: var(--text-sm);
    color: #6b7280;
  }

  .slot-description {
    font-size: var(--text-sm);
    color: #6b7280;
    margin-bottom: var(--space-4);
  }

  .pending-notice {
    background: #fef3c7;
    border: 1px solid #fcd34d;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-4);
    font-size: var(--text-sm);
  }

  .pending-note {
    margin-top: var(--space-2);
    font-style: italic;
    color: #92400e;
  }

  .slot-images {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-4);
  }

  .image-thumb {
    width: 120px;
    height: 80px;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: #f3f4f6;
  }

  .image-thumb :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .more-images {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-md);
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-semibold);
    color: #6b7280;
  }

  .no-images {
    color: #9ca3af;
    font-style: italic;
    padding: var(--space-4);
  }

  .slot-actions {
    display: flex;
    gap: var(--space-2);
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    cursor: pointer;
    border: none;
    transition: all var(--transition-fast);
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    background: #5a7a9a;
  }

  .btn-secondary {
    background: #e5e7eb;
    color: #374151;
  }

  .btn-secondary:hover {
    background: #d1d5db;
  }

  .btn-danger {
    background: #dc2626;
    color: white;
  }

  .btn-danger:hover {
    background: #b91c1c;
  }

  .btn-sm {
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
  }

  /* Edit mode styles */
  .edit-form {
    margin-top: var(--space-4);
  }

  .edit-images {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .add-images-btn {
    padding: var(--space-3) var(--space-4);
    border: 2px dashed #d1d5db;
    background: #f9fafb;
    border-radius: var(--radius-md);
    color: #6b7280;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .add-images-btn:hover:not(:disabled) {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: white;
  }

  .add-images-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .edit-image-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: #f9fafb;
    padding: var(--space-2);
    border-radius: var(--radius-md);
  }

  .edit-image-preview {
    width: 100px;
    height: 67px;
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .edit-image-preview :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .edit-image-actions {
    display: flex;
    gap: var(--space-1);
  }

  .edit-image-actions button {
    width: 28px;
    height: 28px;
    border: 1px solid #d1d5db;
    background: white;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: var(--text-sm);
  }

  .edit-image-actions button:hover:not(:disabled) {
    background: #f3f4f6;
  }

  .edit-image-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .edit-image-actions button.remove {
    color: #dc2626;
    border-color: #fecaca;
  }

  .edit-image-actions button.remove:hover {
    background: #fef2f2;
  }

  .form-group {
    margin-bottom: var(--space-4);
  }

  .form-group label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: #374151;
    margin-bottom: var(--space-1);
  }

  .form-group input {
    width: 100%;
    padding: var(--space-2) var(--space-3);
    border: 1px solid #d1d5db;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
  }

  .edit-actions {
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
  }

  /* Meta slots styles */
  .meta-content {
    max-width: 1000px;
  }

  .meta-slots-grid {
    display: grid;
    gap: var(--space-6);
  }

  .meta-slot {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
  }

  .meta-slot.has-pending {
    border-color: #fbbf24;
  }

  /* Google Preview Styles */
  .google-previews {
    margin-bottom: var(--space-4);
  }

  .google-preview-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
    align-items: start;
  }

  .google-preview {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-md);
    padding: var(--space-3);
  }

  .google-preview.mobile {
    background: #e5e7eb;
    border-radius: 24px;
    padding: 12px 8px;
    border: 3px solid #d1d5db;
    box-shadow: inset 0 0 0 2px #e5e7eb;
    max-width: 280px;
  }

  .google-preview.mobile::before {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #c9cdd3;
    border-radius: 2px;
    margin: 0 auto 8px;
  }

  .google-preview.mobile .google-result {
    background: #fff;
    border-radius: 8px;
    padding: var(--space-3);
  }

  .google-preview-wrapper {
    display: flex;
    flex-direction: column;
  }

  .google-preview-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    margin-bottom: var(--space-2);
  }

  .google-result {
    font-family: Arial, sans-serif;
  }

  .google-preview.desktop .google-result {
    max-width: 600px;
  }

  .google-title {
    color: #1a0dab;
    font-size: 18px;
    line-height: 1.3;
    margin-bottom: 2px;
    cursor: pointer;
  }

  .google-title:hover {
    text-decoration: underline;
  }

  .google-url {
    color: #006621;
    font-size: 14px;
    line-height: 1.3;
    margin-bottom: 2px;
  }

  .google-preview.mobile .google-url {
    font-size: 12px;
  }

  .google-description {
    color: #545454;
    font-size: 13px;
    line-height: 1.4;
  }

  .google-preview.mobile .google-title {
    font-size: 16px;
  }

  .google-preview.mobile .google-description {
    font-size: 12px;
  }

  /* Character Counts */
  .char-counts {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    background: #f9fafb;
    border-radius: var(--radius-md);
    margin-top: var(--space-2);
  }

  .char-count-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
  }

  .char-count-label {
    font-weight: var(--font-medium);
    color: #6b7280;
  }

  .char-count-value {
    color: #374151;
  }

  .char-count-value.ok {
    color: #059669;
  }

  .char-count-value.warning {
    color: #d97706;
  }

  .char-limits {
    color: #9ca3af;
    font-size: var(--text-xs);
  }

  /* OG Image Preview */
  .og-image-section {
    margin-bottom: var(--space-4);
  }

  .og-image-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    margin-bottom: var(--space-2);
  }

  .og-image-preview {
    width: 200px;
    height: 105px;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    position: relative;
  }

  .og-image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .og-image-preview img + .og-image-fallback {
    display: none;
  }

  .og-image-fallback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    border: 1px dashed #d1d5db;
    border-radius: var(--radius-md);
  }

  .og-image-path {
    font-size: 10px;
    color: #6b7280;
    font-family: monospace;
  }

  .og-image-note {
    font-size: 10px;
    color: #9ca3af;
    margin-top: 2px;
  }

  .og-image-missing {
    width: 200px;
    height: 105px;
    border-radius: var(--radius-md);
    background: #f3f4f6;
    border: 1px dashed #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: var(--text-sm);
  }

  /* Keywords */
  .keywords-section {
    font-size: var(--text-sm);
    color: #6b7280;
  }

  .keywords-label {
    font-weight: var(--font-medium);
  }

  .keywords-value {
    color: #9ca3af;
  }

  .char-count {
    display: block;
    font-size: var(--text-xs);
    color: #9ca3af;
    text-align: right;
    margin-top: var(--space-1);
  }

  @media (max-width: 768px) {
    .google-preview-row {
      grid-template-columns: 1fr;
    }

    .char-counts {
      flex-direction: column;
      gap: var(--space-2);
    }
  }

  /* Website Home Styles */
  .website-home-content {
    max-width: 800px;
  }

  .dashboard-section {
    margin-bottom: var(--space-8);
  }

  .dashboard-section h3 {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    margin: 0 0 var(--space-3) 0;
  }

  /* Key Info Card */
  .key-info-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
  }

  .key-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .key-info-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .key-info-label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .key-info-value {
    font-size: var(--text-sm);
    color: #08141a;
    white-space: pre-line;
  }

  /* Website Home Styles */
  .website-home-header {
    margin-bottom: var(--space-6);
  }

  .website-home-info {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .website-status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: #059669;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: var(--radius-full);
  }

  .website-url {
    font-size: var(--text-sm);
    color: var(--color-primary);
    text-decoration: none;
  }

  .website-url:hover {
    text-decoration: underline;
  }

  /* Stats Cards */
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }

  .stat-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    text-align: center;
  }

  .stat-card.clickable {
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .stat-card.clickable:hover {
    border-color: var(--color-primary);
  }

  .stat-card.has-pending {
    border-color: #fbbf24;
    background: #fffbeb;
  }

  .stat-value {
    display: block;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: #08141a;
  }

  .stat-label {
    font-size: var(--text-sm);
    color: #6b7280;
  }

  /* Website Nav Grid */
  .website-nav-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }

  .website-nav-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-4);
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: left;
  }

  .website-nav-card:hover {
    border-color: var(--color-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .nav-card-title {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin-bottom: var(--space-1);
  }

  .nav-card-desc {
    font-size: var(--text-sm);
    color: #6b7280;
  }

  /* Media Library */
  .media-library-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .media-library-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  .stat-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--color-primary);
  }

  .stat-label {
    font-size: var(--text-sm);
    color: #6b7280;
  }

  .media-library-empty {
    background: white;
    border: 2px dashed #e5e7eb;
    border-radius: var(--radius-lg);
    padding: var(--space-10);
    text-align: center;
  }

  .media-library-empty .empty-icon {
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-4);
    color: #d1d5db;
  }

  .media-library-empty h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: #374151;
    margin-bottom: var(--space-2);
  }

  .media-library-empty p {
    color: #6b7280;
    margin-bottom: var(--space-4);
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-4) 0;
    display: inline-block;
    text-align: left;
  }

  .feature-list li {
    color: #6b7280;
    font-size: var(--text-sm);
    padding: var(--space-1) 0;
  }

  .feature-list li::before {
    content: '✓';
    color: var(--color-success);
    margin-right: var(--space-2);
  }

  .setup-note {
    font-size: var(--text-xs);
    color: #9ca3af;
    font-style: italic;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .admin-layout {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
    }

    .page-nav {
      position: static;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .page-nav-item {
      flex: 0 0 auto;
      padding: var(--space-2) var(--space-3);
    }

    .page-nav-divider {
      display: none;
    }

    .dashboard-stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .website-nav-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
