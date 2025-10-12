<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import reviewsData from '$lib/data/google-reviews.json';

  export let autoPlay = true;
  export let interval = 6750; // Time between slides in ms (slowed by 35%)
  export let reviewsPerSlide = 4; // Number of reviews to show at once

  let currentIndex = 0;
  let carouselContainer: HTMLDivElement;
  let intervalId: number | null = null;
  let isPaused = false;

  // Filter out low ratings and reviews without comments or very short comments
  const reviews = reviewsData.reviews.filter(r =>
    r.rating >= 4 &&
    r.comment &&
    r.comment.length > 20 &&
    !r.comment.includes('reviews · ') // Filter out empty reviews that just have stats
  );

  // Calculate total number of slides (groups of reviews)
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  function nextSlide() {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % totalSlides;
    }
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }

  function startAutoPlay() {
    if (autoPlay && !intervalId) {
      intervalId = setInterval(nextSlide, interval) as unknown as number;
    }
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function handleMouseEnter() {
    isPaused = true;
    stopAutoPlay();
  }

  function handleMouseLeave() {
    isPaused = false;
    startAutoPlay();
  }

  onMount(() => {
    startAutoPlay();
  });

  onDestroy(() => {
    stopAutoPlay();
  });

  function renderStars(rating: number) {
    return Array(5).fill(0).map((_, i) => i < rating);
  }
</script>

<section class="review-carousel-section">
  <div class="container">
    <div
      class="carousel-container"
      bind:this={carouselContainer}
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      role="region"
      aria-label="Customer reviews carousel"
    >
      <div class="carousel-track" style="transform: translateX(-{currentIndex * 100}%)">
        {#each Array(totalSlides) as _, slideIndex}
          <div class="review-slide">
            <div class="reviews-grid">
              {#each reviews.slice(slideIndex * reviewsPerSlide, (slideIndex + 1) * reviewsPerSlide) as review (review.id)}
                <div class="review-card">
                  <div class="review-header">
                    <div class="reviewer-info">
                      {#if review.profileImage}
                        <img src={review.profileImage} alt={review.reviewerName} class="reviewer-avatar" />
                      {:else}
                        <div class="reviewer-avatar-placeholder">
                          {review.reviewerName.charAt(0)}
                        </div>
                      {/if}
                      <div>
                        <h4 class="reviewer-name">{review.reviewerName}</h4>
                        <div class="review-meta">
                          <div class="review-stars">
                            {#each renderStars(review.rating) as filled}
                              <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#6B8CAE' : 'rgba(255, 255, 255, 0.2)'}>
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                              </svg>
                            {/each}
                          </div>
                          {#if review.isLocalGuide}
                            <span class="local-guide-badge">Local Guide</span>
                          {/if}
                        </div>
                      </div>
                    </div>
                    <svg class="google-icon" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <p class="review-comment">{review.comment}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="carousel-controls">
      <div class="carousel-dots">
      {#each Array(totalSlides) as _, index}
        <button
          class="dot"
          class:active={index === currentIndex}
          on:click={() => goToSlide(index)}
          aria-label="Go to slide {index + 1}"
        ></button>
      {/each}
      </div>

      <div class="carousel-arrows">
        <button class="carousel-nav-btn prev" on:click={prevSlide} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="carousel-nav-btn next" on:click={nextSlide} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .review-carousel-section {
    padding: 0;
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  .carousel-container {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    min-height: 400px;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.675s ease-in-out;
    height: 100%;
  }

  .review-slide {
    min-width: 100%;
    padding: 0;
    height: 100%;
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    gap: var(--space-6);
    height: 100%;
  }

  .review-card {
    background: rgba(255, 255, 255, 0.1);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    border: none;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-4);
  }

  .reviewer-info {
    display: flex;
    gap: var(--space-3);
    align-items: center;
  }

  .reviewer-avatar {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    object-fit: cover;
    flex-shrink: 0;
  }

  .reviewer-avatar-placeholder {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-bold);
    font-size: var(--text-xl);
    flex-shrink: 0;
  }

  .reviewer-name {
    font-weight: var(--font-semibold);
    color: white;
    margin-bottom: var(--space-1);
  }

  .review-stars {
    display: flex;
    gap: 2px;
  }

  .google-icon {
    flex-shrink: 0;
  }

  .review-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .local-guide-badge {
    font-size: var(--text-xs);
    color: white;
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    font-weight: var(--font-medium);
  }

  .review-comment {
    color: rgba(255, 255, 255, 0.8);
    line-height: var(--leading-relaxed);
    font-size: var(--text-base);
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .carousel-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--space-3);
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    flex: 1;
  }

  .carousel-arrows {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .carousel-nav-btn {
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    color: white;
    opacity: 0.7;
  }

  .carousel-nav-btn:hover {
    opacity: 1;
  }

  .carousel-nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .dot.active {
    width: 6px;
    background: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 1024px) {
    .reviews-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      align-items: stretch;
    }

    .google-badge {
      justify-content: center;
    }

    .reviews-grid {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    .review-card {
      padding: var(--space-4);
    }

    .carousel-nav-btn {
      width: 32px;
      height: 32px;
    }
  }
</style>