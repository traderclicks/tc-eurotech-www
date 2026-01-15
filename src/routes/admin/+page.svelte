<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import ImagePicker from '$lib/components/ImagePicker.svelte';

  export let data: PageData;
  export let form: ActionData;

  let editingSlot: string | null = null;
  let editImages: string[] = [];
  let editNote = '';
  let pickerOpen = false;
  let currentSlotMaxImages: number | undefined = undefined;

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

  // Group slots by page
  $: slotsByPage = data.slots.reduce((acc, slot) => {
    const page = slot.page || 'Other';
    if (!acc[page]) acc[page] = [];
    acc[page].push(slot);
    return acc;
  }, {} as Record<string, typeof data.slots>);
</script>

<svelte:head>
  <title>Image Slots - Eurotech CMS</title>
</svelte:head>

<div class="admin-page">
  <header class="page-header">
    <h1>Image Slot Management</h1>
    {#if data.hasPendingChanges}
      <span class="pending-badge">Pending Changes</span>
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

  {#each Object.entries(slotsByPage) as [page, slots]}
    <section class="page-section">
      <h2 class="page-title">{page}</h2>

      <div class="slots-grid">
        {#each slots as slot}
          <div class="slot-card" class:has-pending={slot.pendingChange}>
            <div class="slot-header">
              <h3>{slot.label}</h3>
              <span class="slot-meta">
                {slot.images.length}{#if slot.maxImages}/{slot.maxImages}{/if} images
              </span>
            </div>

            <p class="slot-description">{slot.description}</p>

            {#if slot.pendingChange}
              <div class="pending-notice">
                <strong>Pending change</strong> by {slot.pendingChange.proposedBy}
                <br />
                <small>{new Date(slot.pendingChange.proposedAt).toLocaleString()}</small>
                {#if slot.pendingChange.note}
                  <p class="pending-note">"{slot.pendingChange.note}"</p>
                {/if}
              </div>
            {/if}

            {#if editingSlot === slot.id}
              <!-- Edit Mode -->
              <form method="POST" action="?/propose" class="edit-form">
                <input type="hidden" name="slotId" value={slot.id} />
                <input type="hidden" name="images" value={JSON.stringify(editImages)} />

                <div class="edit-images">
                  {#each editImages as image, i}
                    <div class="edit-image-item">
                      <div class="edit-image-preview">
                        <CloudflareImage src={image} alt="" width={100} height={67} />
                      </div>
                      <div class="edit-image-actions">
                        <button type="button" on:click={() => moveImage(i, 'up')} disabled={i === 0}>
                          ↑
                        </button>
                        <button
                          type="button"
                          on:click={() => moveImage(i, 'down')}
                          disabled={i === editImages.length - 1}
                        >
                          ↓
                        </button>
                        <button type="button" class="remove" on:click={() => removeImage(i)}>
                          ×
                        </button>
                      </div>
                    </div>
                  {/each}

                  <button
                    type="button"
                    class="add-images-btn"
                    on:click={openPicker}
                    disabled={currentSlotMaxImages ? editImages.length >= currentSlotMaxImages : false}
                  >
                    + Add Images
                  </button>
                </div>

                <div class="form-group">
                  <label for="note-{slot.id}">Note (optional)</label>
                  <input
                    type="text"
                    id="note-{slot.id}"
                    name="note"
                    bind:value={editNote}
                    placeholder="Describe your change..."
                  />
                </div>

                <div class="edit-actions">
                  <button type="button" class="btn-secondary" on:click={cancelEdit}>Cancel</button>
                  <button type="submit" class="btn-primary">Propose Change</button>
                </div>
              </form>
            {:else}
              <!-- View Mode -->
              <div class="slot-images">
                {#each slot.images.slice(0, 4) as image}
                  <div class="image-thumb">
                    <CloudflareImage src={image} alt="" width={150} height={100} />
                  </div>
                {/each}
                {#if slot.images.length > 4}
                  <div class="more-images">+{slot.images.length - 4}</div>
                {/if}
                {#if slot.images.length === 0}
                  <div class="no-images">No images assigned</div>
                {/if}
              </div>

              <div class="slot-actions">
                {#if data.canPropose && !slot.pendingChange}
                  <button class="btn-secondary" on:click={() => startEdit(slot.id, slot.images, slot.maxImages)}>
                    Edit
                  </button>
                {/if}

                {#if slot.pendingChange && data.canApprove}
                  <form method="POST" action="?/approve" style="display: inline;">
                    <input type="hidden" name="slotId" value={slot.id} />
                    <button type="submit" class="btn-primary">Approve</button>
                  </form>
                  <form method="POST" action="?/reject" style="display: inline;">
                    <input type="hidden" name="slotId" value={slot.id} />
                    <button type="submit" class="btn-danger">Reject</button>
                  </form>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/each}
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
  .admin-page {
    max-width: 1200px;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .page-header h1 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: #08141a;
    margin: 0;
  }

  .pending-badge {
    background: #fef3c7;
    color: #92400e;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
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
</style>
