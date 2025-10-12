<script lang="ts">
  import { badgeStyles } from '$lib/styles/alertStyles';

  export let variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  export let size: 'small' | 'medium' | 'large' = 'medium';

  $: classes = [
    badgeStyles.base,
    badgeStyles.variants[variant],
    badgeStyles.sizes[size]
  ].join(' ');
</script>

<span class={classes}>
  <slot />
</span>