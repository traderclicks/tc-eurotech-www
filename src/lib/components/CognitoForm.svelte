<script lang="ts">
  import { onMount } from 'svelte';
  import { site } from '$lib/config/site';

  export let formId: string;
  export let dataKey = site.cognitoDataKey;

  let container: HTMLDivElement;

  onMount(() => {
    // Load Cognito Forms seamless script if not already loaded
    const existingScript = document.querySelector('script[src*="cognitoforms.com/f/seamless.js"]');

    if (existingScript) {
      // Script already loaded — trigger re-render into this container
      if (window.Cognito) {
        window.Cognito.load('seamless', { id: formId, entry: { Token: dataKey } }, { container });
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.cognitoforms.com/f/seamless.js';
      script.dataset.key = dataKey;
      script.dataset.form = formId;
      container.appendChild(script);
    }
  });
</script>

<div class="cognito-form" bind:this={container}></div>

<style>
  .cognito-form {
    min-height: 200px;
  }

  .cognito-form :global(iframe) {
    width: 100%;
    border: none;
  }
</style>
