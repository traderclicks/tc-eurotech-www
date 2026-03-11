<script lang="ts">
  import CognitoForm from './CognitoForm.svelte';
  import { site } from '$lib/config/site';

  export let title = 'Contact Us';
</script>

<div class="contact-form">
  <CognitoForm formId={site.cognitoFormId} />
</div>

<style>
  .contact-form {
    width: 100%;
  }
</style>
