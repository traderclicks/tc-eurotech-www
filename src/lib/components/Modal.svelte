<script lang="ts">
  import { modals, type ModalType } from '$lib/stores/modal';
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import ContactForm from './ContactForm.svelte';
  import CognitoFormIframe from './CognitoFormIframe.svelte';
  import PhoneIcon from './PhoneIcon.svelte';
  import { page } from '$app/stores';
  import type { Insurer } from '$lib/cms/insurers';

  $: insurers = ($page.data.insurers ?? []) as Insurer[];
  $: insurerContacts = insurers.filter((i) => i.phone);

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
    on:keydown={(e) => e.key === 'Enter' && handleBackdropClick(modal.id, e as any)}
    bind:this={modalElements[i]}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title-{modal.id}"
    tabindex="-1"
  >
    <div class="modal-container" class:image-container={modal.type === 'image'} class:insurance-container={modal.type === 'insurance'} class:cognito-container={modal.type === 'cognito'} transition:scale={{ duration: 200, start: 0.95 }}>
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
            {#if modal.content.attribution}
              <div class="image-attribution">
                Photo by <a
                  href={modal.content.attribution.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {modal.content.attribution.photographer}
                </a> on <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </a>
              </div>
            {/if}
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
        {:else if modal.type === 'insurance'}
          <div class="insurance-modal">
            <div class="insurance-list">
              {#each insurerContacts as insurer}
                <div class="insurance-item">
                  <div class="insurer-avatar" style="background-image: url('{insurer.logo}')"></div>
                  <div class="insurance-name">{insurer.name}</div>
                  <a href="tel:{insurer.phoneTel}" class="insurance-phone"><PhoneIcon size={16} /> {insurer.phone}</a>
                </div>
              {/each}
            </div>
          </div>
        {:else if modal.type === 'cognito'}
          <CognitoFormIframe formId={modal.content.formId} title={modal.title} />
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
    /* Pin to the *visible* viewport. `dvh` tracks the mobile browser chrome
       (address bar) expanding/collapsing; `vh` is the fallback for browsers
       without `dvh`. This is what stops the overlay being measured taller than
       the screen on Android/iOS, which was pushing the modal's top and bottom
       off-screen. */
    height: 100vh;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    /* `safe center` centers as normal, but when the modal is taller than the
       viewport it falls back to start-alignment so the top can never be clipped
       or become unreachable — the classic flexbox-centering + overflow trap. */
    align-items: safe center;
    justify-content: center;
    z-index: 10001;
    padding: var(--space-4);
    overflow-y: auto;
  }

  .modal-container.cognito-container {
    max-width: 800px;
  }

  .modal-container {
    background: var(--bg-primary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    max-height: 90dvh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10002;
  }

  .modal-container.image-container {
    max-width: 1200px;
    background: transparent;
    box-shadow: none;
  }

  .modal-container.insurance-container {
    max-width: 520px;
    background: var(--bg-content);
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
    max-height: 80dvh;
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

  .image-attribution {
    position: absolute;
    bottom: var(--space-4);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    white-space: nowrap;
    z-index: 10;
  }

  .image-attribution a {
    color: white;
    text-decoration: underline;
    font-weight: var(--font-medium);
    transition: opacity var(--transition-fast);
  }

  .image-attribution a:hover {
    opacity: 0.8;
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

  /* Insurance Modal Styles */
  .insurance-modal {
    padding: var(--space-6) var(--space-2);
  }

  .insurance-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .insurance-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .insurance-item:last-child {
    border-bottom: none;
  }

  .insurer-avatar {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-full);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    flex-shrink: 0;
  }

  .insurance-name {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    flex: 1;
  }

  .insurance-phone {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-base);
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--transition-fast);
  }

  .insurance-phone:hover {
    color: var(--color-primary-dark);
    text-decoration: none;
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
      max-height: 100dvh;
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