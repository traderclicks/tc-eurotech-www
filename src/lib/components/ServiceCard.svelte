<script lang="ts">
  export let icon = '';
  export let title = '';
  export let description = '';
  export let buttonText = 'Learn More →';
  export let buttonHref = '#';
  export let backgroundImage = '';

  // Determine logo type from filename
  let logoClass = '';
  if (icon.includes('bmw')) logoClass = 'logo-bmw';
  else if (icon.includes('landrover') || icon.includes('range-rover')) logoClass = 'logo-landrover';
  else if (icon.includes('data:image')) logoClass = 'logo-insurance';
</script>

<div class="service-card" class:has-background={backgroundImage} style={backgroundImage ? `background-image: url('${backgroundImage}')` : ''}>
  {#if backgroundImage}
    <div class="service-overlay"></div>
  {/if}

  <div class="service-content">
    {#if icon}
      <img src={icon} alt={title} class="service-icon {logoClass}" />
    {/if}

    {#if title}
      <h3 class="service-title">{title}</h3>
    {/if}

    {#if description}
      <p class="service-description">{description}</p>
    {/if}

    {#if buttonText && buttonHref}
      <a href={buttonHref} class="service-link">
        {buttonText}
      </a>
    {/if}
  </div>
</div>

<style>
  .service-card {
    text-align: center;
    padding: var(--space-6);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .service-card.has-background {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }

  .service-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
    z-index: 1;
    transition: all var(--transition-base);
  }

  .service-card:hover .service-overlay {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
  }

  .service-card:hover .service-link {
    text-decoration: none;
  }

  .service-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .service-card.has-background .service-title,
  .service-card.has-background .service-description {
    color: white;
  }

  .service-card:hover {
    transform: scale(1.02);
  }

  .service-icon {
    width: 174px;
    height: 138px;
    margin: var(--space-1) auto var(--space-3);
    object-fit: contain;
    opacity: 0.95;
  }

  /* BMW logo - 50% of base size */
  .service-icon.logo-bmw {
    width: 87px;
  }

  /* Land Rover & Range Rover - 80% of base size */
  .service-icon.logo-landrover {
    width: 139px;
  }

  /* Insurance icon - same as BMW */
  .service-icon.logo-insurance {
    width: 87px;
  }

  .service-card.has-background .service-icon {
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  }

  .service-title {
    margin-bottom: var(--space-3);
    font-size: var(--text-2xl);
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .service-description {
    color: var(--text-secondary);
    margin-bottom: var(--space-6);
    line-height: var(--leading-relaxed);
    font-size: var(--text-base);
    font-weight: 600;
  }

  .service-card.has-background .service-description {
    color: rgba(255, 255, 255, 0.9);
  }

  .service-link {
    display: block;
    color: white;
    text-decoration: underline;
    font-size: var(--text-base);
    font-weight: 600;
    letter-spacing: 0.02em;
    align-self: flex-end;
    margin-top: auto;
    transition: opacity var(--transition-fast);
  }

  .service-link:hover {
    opacity: 0.8;
  }
</style>