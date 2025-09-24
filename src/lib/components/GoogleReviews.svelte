<script lang="ts">
  export let rating = 4.9;
  export let reviewCount = 127;
</script>

<div class="google-reviews">
  <img src="/icons/google.svg" alt="Google" class="google-logo" />
  <div class="rating-info">
    <div class="stars">
      {#each Array(5) as _, i}
        <span class="star" class:filled={i < Math.floor(rating)}>★</span>
      {/each}
    </div>
    <div class="rating-text">
      {rating} out of 5 ({reviewCount} reviews)
    </div>
  </div>
</div>

<style>
  .google-reviews {
    display: inline-flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
  }

  .google-logo {
    width: 60px;
    height: 20px;
  }

  .stars {
    display: flex;
    color: #ddd;
    font-size: var(--text-xl);
  }

  .star.filled {
    color: #fbbc04;
  }

  .rating-text {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin-top: var(--space-1);
  }
</style>