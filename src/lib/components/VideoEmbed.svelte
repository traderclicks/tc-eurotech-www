<script lang="ts">
  import { getVideoEmbed, type BlogVideo } from '$lib/cms/blog-types';

  export let video: BlogVideo;

  $: embed = getVideoEmbed(video);
</script>

{#if embed}
  <div class="video-embed" class:youtube={embed.provider === 'youtube'} class:vimeo={embed.provider === 'vimeo'}>
    <iframe
      src={embed.embedUrl}
      title={video.title ?? 'Video'}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
{/if}

<style>
  .video-embed {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    margin: var(--space-8) 0;
    background: var(--color-neutral-100);
  }

  .video-embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
