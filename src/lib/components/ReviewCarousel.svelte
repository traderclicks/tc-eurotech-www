<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import reviewsData from '$lib/data/google-reviews.json';

  export let autoPlay = true;
  export let interval = 4000; // Time between slides in ms

  let currentIndex = 0;
  let carouselContainer: HTMLDivElement;
  let intervalId: number;
  let isPaused = false;

  const reviews = reviewsData.reviews.filter(r => r.rating >= 4);

  function nextSlide() {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % reviews.length;
    }
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }

  function startAutoPlay() {
    if (autoPlay && !intervalId) {
      intervalId = setInterval(nextSlide, interval);
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
    <div class="section-header">
      <h2 class="section-title">Customer Reviews</h2>
      <div class="google-badge">
        <img src="/google-logo.svg" alt="Google" class="google-logo" />
        <div class="rating-summary">
          <span class="rating-number">{reviewsData.averageRating}</span>
          <div class="stars">
            {#each renderStars(Math.round(reviewsData.averageRating)) as filled}
              <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#FFA500' : '#DDD'}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            {/each}
          </div>
          <span class="total-reviews">({reviewsData.totalReviews} reviews)</span>
        </div>
      </div>
    </div>

    <div
      class="carousel-container"
      bind:this={carouselContainer}
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <div class="carousel-track" style="transform: translateX(-{currentIndex * 100}%)">
        {#each reviews as review (review.id)}
          <div class="review-slide">
            <div class="review-card">
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <h4 class="reviewer-name">{review.reviewerName}</h4>
                    <div class="review-stars">
                      {#each renderStars(review.rating) as filled}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#FFA500' : '#DDD'}>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      {/each}
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
          </div>
        {/each}
      </div>

      <button class="carousel-btn prev" on:click={prevSlide} aria-label="Previous review">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button class="carousel-btn next" on:click={nextSlide} aria-label="Next review">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="carousel-dots">
      {#each reviews as _, index}
        <button
          class="dot"
          class:active={index === currentIndex}
          on:click={() => goToSlide(index)}
          aria-label="Go to review {index + 1}"
        />
      {/each}
    </div>
  </div>
</section>

<style>
  .review-carousel-section {
    padding: var(--space-16) 0;
    background: var(--bg-secondary);
    position: relative;
    overflow: hidden;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .google-badge {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-4);
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .google-logo {
    height: 24px;
    width: auto;
  }

  .rating-summary {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .rating-number {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .stars {
    display: flex;
    gap: 2px;
  }

  .total-reviews {
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .carousel-container {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-xl);
  }

  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .review-slide {
    min-width: 100%;
    padding: 0 var(--space-2);
  }

  .review-card {
    background: white;
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    max-width: 800px;
    margin: 0 auto;
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
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-bold);
    font-size: var(--text-xl);
  }

  .reviewer-name {
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-1);
  }

  .review-stars {
    display: flex;
    gap: 2px;
  }

  .google-icon {
    flex-shrink: 0;
  }

  .review-comment {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    font-size: var(--text-lg);
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: white;
    border: none;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    z-index: 2;
  }

  .carousel-btn:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: var(--shadow-xl);
  }

  .carousel-btn.prev {
    left: var(--space-4);
  }

  .carousel-btn.next {
    right: var(--space-4);
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-6);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--color-gray-300);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .dot.active {
    width: 24px;
    background: var(--color-primary);
  }

  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      align-items: stretch;
    }

    .google-badge {
      justify-content: center;
    }

    .review-card {
      padding: var(--space-6);
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
    }

    .carousel-btn.prev {
      left: var(--space-2);
    }

    .carousel-btn.next {
      right: var(--space-2);
    }
  }
</style>