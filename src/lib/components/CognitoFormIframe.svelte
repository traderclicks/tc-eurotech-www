<script lang="ts">
  import { onMount } from 'svelte';
  import { site } from '$lib/config/site';

  export let formId: string;
  export let title = 'Form';

  /**
   * Initial iframe height before Cognito's resize script kicks in. Cognito's
   * iframe.js posts the real rendered height back via postMessage so the iframe
   * grows/shrinks to fit the form (including its dropdowns and multi-page steps).
   */
  export let height = 1085;

  $: src = `https://www.cognitoforms.com/f/${site.cognitoDataKey}/${formId}`;

  onMount(() => {
    // Load the resize helper once for the whole app. It attaches a global
    // message listener, so iframes added later (this modal mounts on open) are
    // still resized when they post their height.
    if (!document.querySelector('script[src*="cognitoforms.com/f/iframe.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.cognitoforms.com/f/iframe.js';
      s.async = true;
      document.body.appendChild(s);
    }
  });
</script>

<!--
  Iframe embed (not the "seamless" script embed). Rendering the form inside its
  own document gives it an isolated stacking/overflow context, so Cognito's
  dropdown panels can't be clipped by, or render behind, the parent modal —
  which is the bug the seamless embed had inside Modal.svelte.
-->
<iframe
  {src}
  {title}
  allow="payment"
  style="border:0;width:100%;"
  {height}
></iframe>

<style>
  iframe {
    display: block;
    width: 100%;
  }
</style>
