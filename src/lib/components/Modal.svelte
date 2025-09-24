<script lang="ts">
  import { modals, type ModalType } from '$lib/stores/modal';
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import ContactForm from './ContactForm.svelte';

  let modalElements: HTMLDivElement[] = [];

  onMount(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && $modals.length > 0) {
        modals.close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  });

  // Prevent body scroll when modal is open
  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = $modals.length > 0 ? 'hidden' : '';
  }

  function handleBackdropClick(modalId: string, e: MouseEvent) {
    if (e.target === e.currentTarget) {
      modals.close(modalId);
    }
  }

  function getVideoEmbedUrl(url: string): string {
    // Convert YouTube watch URLs to embed URLs
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Convert Vimeo URLs to embed URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }
</script>

{#each $modals as modal, i (modal.id)}
  <div
    class="modal-backdrop"
    transition:fade={{ duration: 200 }}
    on:click={(e) => handleBackdropClick(modal.id, e)}
    bind:this={modalElements[i]}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title-{modal.id}"
  >
    <div class="modal-container" transition:scale={{ duration: 200, start: 0.95 }}>
      {#if modal.type !== 'image'}
        <div class="modal-header">
          {#if modal.title}
            <h2 id="modal-title-{modal.id}" class="modal-title">{modal.title}</h2>
          {/if}
          <button
            class="modal-close"
            on:click={() => modals.close(modal.id)}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      {/if}

      <div class="modal-content">
        {#if modal.type === 'form'}
          <ContactForm {...modal.props} />
        {:else if modal.type === 'image'}
          <div class="image-modal">
            <button
              class="image-close"
              on:click={() => modals.close(modal.id)}
              aria-label="Close image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img src={modal.content.src} alt={modal.content.alt || ''} />
          </div>
        {:else if modal.type === 'video'}
          <div class="video-modal">
            <iframe
              src={getVideoEmbedUrl(modal.content.url)}
              title={modal.title || 'Video'}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        {:else if modal.type === 'confirm'}
          <div class="confirm-modal">
            <p>{modal.content}</p>
            <div class="confirm-buttons">
              <button
                class="btn btn-secondary"
                on:click={() => {
                  modal.onCancel?.();
                  modals.close(modal.id);
                }}
              >
                Cancel
              </button>
              <button
                class="btn btn-primary"
                on:click={() => {
                  modal.onConfirm?.();
                  modals.close(modal.id);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        {:else if modal.type === 'alert'}
          <div class="alert-modal">
            <p>{modal.content}</p>
            <button
              class="btn btn-primary"
              on:click={() => modals.close(modal.id)}
            >
              OK
            </button>
          </div>
        {:else if modal.type === 'custom'}
          <!-- Slot for custom modal content -->
          <slot name="custom" {modal} />
        {/if}
      </div>
    </div>
  </div>
{/each}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal-backdrop);
    padding: var(--space-4);
    overflow-y: auto;
  }

  .modal-container {
    background: var(--bg-primary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: var(--z-modal);
  }

  .modal-header {
    padding: var(--space-6);
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .modal-title {
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .modal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--space-2);
    margin: calc(var(--space-2) * -1);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .modal-close:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .modal-content {
    padding: var(--space-6);
    overflow-y: auto;
    flex: 1;
  }

  /* Image Modal Styles */
  .image-modal {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-modal img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }

  .image-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius-full);
    transition: all var(--transition-fast);
  }

  .image-close:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  /* Video Modal Styles */
  .video-modal {
    aspect-ratio: 16 / 9;
    width: 100%;
  }

  .video-modal iframe {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
  }

  /* Confirm Modal Styles */
  .confirm-modal p {
    margin-bottom: var(--space-6);
    color: var(--text-secondary);
  }

  .confirm-buttons {
    display: flex;
    gap: var(--space-4);
    justify-content: flex-end;
  }

  /* Alert Modal Styles */
  .alert-modal {
    text-align: center;
  }

  .alert-modal p {
    margin-bottom: var(--space-6);
    color: var(--text-secondary);
  }

  /* Button Styles */
  .btn {
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    font-weight: var(--font-medium);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    background: var(--color-primary-dark);
  }

  .btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .btn-secondary:hover {
    background: var(--bg-tertiary);
  }

  /* Mobile Styles */
  @media (max-width: 640px) {
    .modal-backdrop {
      padding: var(--space-2);
    }

    .modal-container {
      max-width: 100%;
      max-height: 100vh;
      border-radius: var(--radius-lg);
    }

    .modal-header,
    .modal-content {
      padding: var(--space-4);
    }

    .modal-title {
      font-size: var(--text-xl);
    }

    .confirm-buttons {
      flex-direction: column-reverse;
    }

    .confirm-buttons .btn {
      width: 100%;
    }
  }
</style>