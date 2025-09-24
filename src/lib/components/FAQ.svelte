<script lang="ts">
  import { slide } from 'svelte/transition';

  export let items: Array<{ question: string; answer: string }> = [];
  export let allowMultiple = false;

  let openItems: Set<number> = new Set();

  function toggleItem(index: number) {
    if (openItems.has(index)) {
      openItems.delete(index);
    } else {
      if (!allowMultiple) {
        openItems.clear();
      }
      openItems.add(index);
    }
    openItems = openItems;
  }
</script>

<div class="faq">
  {#each items as item, index}
    <div class="faq-item" class:open={openItems.has(index)}>
      <button
        class="faq-question"
        on:click={() => toggleItem(index)}
        aria-expanded={openItems.has(index)}
        aria-controls="faq-answer-{index}"
      >
        <span class="question-text">{item.question}</span>
        <span class="question-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            {#if openItems.has(index)}
              <line x1="5" y1="12" x2="19" y2="12" />
            {:else}
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            {/if}
          </svg>
        </span>
      </button>

      {#if openItems.has(index)}
        <div
          id="faq-answer-{index}"
          class="faq-answer"
          transition:slide={{ duration: 300 }}
        >
          <p>{item.answer}</p>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .faq {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .faq-item {
    background: var(--bg-primary);
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-base);
  }

  .faq-item.open {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  .faq-question {
    width: 100%;
    padding: var(--space-4) var(--space-6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .faq-question:hover {
    background: var(--bg-secondary);
  }

  .question-text {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  .question-icon {
    flex-shrink: 0;
    color: var(--color-primary);
    transition: transform var(--transition-base);
  }

  .faq-item.open .question-icon {
    transform: rotate(45deg);
  }

  .faq-answer {
    padding: 0 var(--space-6) var(--space-4);
  }

  .faq-answer p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  @media (max-width: 640px) {
    .faq-question {
      padding: var(--space-3) var(--space-4);
    }

    .question-text {
      font-size: var(--text-base);
    }

    .faq-answer {
      padding: 0 var(--space-4) var(--space-3);
    }
  }
</style>