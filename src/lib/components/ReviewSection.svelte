<script lang="ts">
  import ReviewCarousel from './ReviewCarousel.svelte';
  import { site } from '$lib/config/site';
</script>

<section class="reviews-section">
  <div class="container">
    <div class="section-header">
      <h2 class="reviews-title">
        What Our Customers Say
        <span class="title-separator">|</span>
        <span class="google-rating">
          <img src="/google-logo.svg" alt="Google" class="google-logo-inline" />
          <span class="star">★</span>
          {site.googleReviewRating} ({site.googleReviewCount} reviews)
        </span>
      </h2>
    </div>
  </div>
  <ReviewCarousel />
</section>

<style>
  .reviews-section {
    background: rgba(50, 75, 90, 0.12);
    padding: var(--space-12) 0 var(--space-8) 0;
  }

  .section-header {
    margin-bottom: var(--space-6);
    text-align: center;
  }

  .reviews-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: #1a1a1a;
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
  }

  .title-separator {
    margin: 0 var(--space-4);
    opacity: 0.5;
  }

  .google-rating {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    font-size: 0.8em;
    font-weight: normal;
    color: #1a1a1a;
  }

  .google-logo-inline {
    height: 1.1em;
    width: auto;
    filter: brightness(0);
    vertical-align: baseline;
    position: relative;
    top: 0.15em;
  }

  .google-rating .star {
    color: #fbbc04;
    font-size: 1.3em;
    line-height: 1;
  }

  @media (max-width: 768px) {
    .reviews-title {
      font-size: var(--text-xl);
    }
  }
</style>
