<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import CloudflareImage from './CloudflareImage.svelte';

  export let open = false;

  // Lock body scroll when modal is open
  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Ensure body scroll is restored when component is destroyed
  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });
  export let gallery: { name: string; label: string; images: string[] }[] = [];
  export let selectedImages: string[] = [];
  export let maxImages: number | undefined = undefined;

  const dispatch = createEventDispatcher<{
    close: void;
    select: { images: string[] };
  }>();

  let activeFolder: string | null = null;
  let localSelection: string[] = [];
  let selectionSet: Set<string> = new Set();

  // Initialize local selection when modal opens
  $: if (open) {
    localSelection = [...selectedImages];
    selectionSet = new Set(selectedImages);
    activeFolder = gallery[0]?.name || null;
  }

  function toggleImage(imagePath: string) {
    if (selectionSet.has(imagePath)) {
      selectionSet.delete(imagePath);
      localSelection = localSelection.filter(img => img !== imagePath);
    } else {
      // Check max limit
      if (maxImages && localSelection.length >= maxImages) {
        return;
      }
      selectionSet.add(imagePath);
      localSelection = [...localSelection, imagePath];
    }
    selectionSet = selectionSet; // Trigger reactivity
  }

  function isSelected(imagePath: string): boolean {
    return selectionSet.has(imagePath);
  }

  function handleConfirm() {
    dispatch('select', { images: localSelection });
    dispatch('close');
  }

  function handleCancel() {
    dispatch('close');
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      dispatch('close');
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      dispatch('close');
    }
  }

  $: activeFolderImages = gallery.find(f => f.name === activeFolder)?.images || [];
  $: atMaxLimit = maxImages ? localSelection.length >= maxImages : false;
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-backdrop" on:click={handleBackdropClick}>
    <div class="modal">
      <div class="modal-header">
        <h2>Select Images</h2>
        <div class="selection-count">
          {localSelection.length}{#if maxImages}/{maxImages}{/if} selected
        </div>
        <button class="close-btn" on:click={handleCancel} aria-label="Close">×</button>
      </div>

      <div class="modal-body">
        <div class="folder-tabs">
          {#each gallery as folder}
            <button
              class="folder-tab"
              class:active={activeFolder === folder.name}
              on:click={() => (activeFolder = folder.name)}
            >
              {folder.label}
              <span class="count">({folder.images.length})</span>
            </button>
          {/each}
        </div>

        <div class="images-grid">
          {#each activeFolderImages as image}
            <button
              class="image-item"
              class:selected={isSelected(image)}
              class:disabled={atMaxLimit && !isSelected(image)}
              on:click={() => toggleImage(image)}
              disabled={atMaxLimit && !isSelected(image)}
            >
              <div class="image-wrapper">
                <CloudflareImage src={image} alt="" width={120} height={80} />
              </div>
              {#if isSelected(image)}
                <div class="selected-badge">
                  {localSelection.indexOf(image) + 1}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" on:click={handleCancel}>Cancel</button>
        <button class="btn-primary" on:click={handleConfirm}>
          Add {localSelection.length} Image{localSelection.length !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: var(--space-4);
  }

  .modal {
    background: white;
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 900px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-header h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin: 0;
    flex: 1;
  }

  .selection-count {
    font-size: var(--text-sm);
    color: #6b7280;
    background: #f3f4f6;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
  }

  .close-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    font-size: 24px;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
  }

  .close-btn:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .modal-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .folder-tabs {
    display: flex;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-6);
    border-bottom: 1px solid #e5e7eb;
    overflow-x: auto;
  }

  .folder-tab {
    padding: var(--space-2) var(--space-4);
    border: none;
    background: none;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: #6b7280;
    cursor: pointer;
    border-radius: var(--radius-md);
    white-space: nowrap;
    transition: all var(--transition-fast);
  }

  .folder-tab:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .folder-tab.active {
    background: var(--color-primary);
    color: white;
  }

  .folder-tab .count {
    opacity: 0.7;
    font-weight: var(--font-normal);
  }

  .images-grid {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-4) var(--space-6);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-3);
    content-visibility: auto;
  }

  .image-item {
    position: relative;
    border: 3px solid transparent;
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    background: #f3f4f6;
    transition: border-color 0.15s ease;
    contain: layout style;
  }

  .image-item:hover:not(:disabled) {
    border-color: #d1d5db;
  }

  .image-item.selected {
    border-color: var(--color-primary);
  }

  .image-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .image-wrapper {
    aspect-ratio: 3/2;
    overflow: hidden;
  }

  .image-wrapper :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .selected-badge {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    width: 24px;
    height: 24px;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid #e5e7eb;
  }

  .btn-primary,
  .btn-secondary {
    padding: var(--space-2) var(--space-5);
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
</style>
