<script lang="ts">
  import { fly } from 'svelte/transition';

  export let backgroundColor = '#000000';
  export let textColor = 'white';
  export let description = '';

  const logos = [
    '/jaguar-logo-white.svg',
    '/landrover-logo-white.svg',
    '/range-rover-logo-white.svg',
    '/bmw-logo-white.svg',
    '/mini-white.svg'
  ];
</script>

<section class="logo-bar-section" style="background: {backgroundColor}; color: {textColor};">
  <div class="logo-bar-wrapper">
    <div class="logo-bar-container">
      <div class="logo-bar-content">
        {#if description}
          <div class="description-text">
            <span>NZ's only factory-authorised Jaguar/Land Rover repairer</span>
            <span class="separator">•</span>
            <span>Expert BMW & Mini repairs</span>
            <span class="separator">•</span>
            <span>20+ years of operation</span>
          </div>
        {/if}
        <div class="logos-scroll">
          <div class="logos-track">
            {#each Array(10) as _, repeatIndex}
              {#each logos as logo, i}
                <img
                  src={logo}
                  alt="Brand logo"
                  class="brand-logo"
                  class:bmw-logo={logo.includes('bmw')}
                  class:landrover-logo={logo.includes('landrover') || logo.includes('range-rover')}
                />
              {/each}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .logo-bar-section {
    overflow: visible;
    padding-top: var(--space-8);
  }

  .logo-bar-wrapper {
    width: 68%;
    max-width: 1300px;
    margin: 0 auto;
    background: transparent;
    border-radius: var(--radius-xl);
    filter: drop-shadow(0 -12px 24px rgba(255, 255, 255, 0.2));
  }

  .logo-bar-container {
    width: 100%;
    padding: var(--space-6) var(--space-6) var(--space-4) var(--space-6);
    background: rgba(20, 25, 30, 0.79);
    border-radius: var(--radius-xl);
    backdrop-filter: blur(120px);
  }

  .logo-bar-content {
    overflow: hidden;
    width: 100%;
  }

  .description-text {
    color: #ffffff;
    font-size: var(--text-xl);
    font-weight: bold;
    font-style: italic;
    text-align: center;
    margin: var(--space-3) 0 var(--space-6) 0;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    line-height: 1.2;
  }

  .separator {
    opacity: 0.7;
  }

  .logos-scroll {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    background: rgba(90, 100, 105, 0.9);
    backdrop-filter: blur(10px);
    padding: var(--space-3) 0;
  }

  .logos-track {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--space-12) * 2);
    animation: scroll 60s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-10%);
    }
  }

  .brand-logo {
    width: 70px;
    height: auto;
    opacity: 1;
    flex-shrink: 0;
  }

  .brand-logo.bmw-logo {
    width: 35px;
  }

  .brand-logo.landrover-logo {
    width: 56px;
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .description-text {
      font-size: var(--text-sm);
      gap: 0.5rem;
      line-height: 1.2;
      margin: var(--space-2) 0 var(--space-4) 0;
    }

    .logos-track {
      gap: var(--space-8);
    }

    .brand-logo {
      width: 49px;
    }

    .brand-logo.bmw-logo {
      width: 21px;
    }

    .brand-logo.landrover-logo {
      width: 39px;
    }
  }
</style>