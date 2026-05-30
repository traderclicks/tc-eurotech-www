<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import TextPage from '$lib/components/TextPage.svelte';
  import type { PageData as RouteData } from './$types';

  export let data: RouteData;
</script>

<Meta title={data.page.meta.title} description={data.page.meta.description} keywords={data.page.meta.keywords} />

<TextPage data={data.page} />
