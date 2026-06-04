<script lang="ts">
  import { locationOpen } from '$lib/stores/locationModal';
</script>

<aside class="brand-strip" aria-label="Eurotech specialisations">
  <div class="brand-logos">
    <img src="/jaguar-logo-black.svg" alt="" style="height: 9px" />
    <img src="/landrover-logo-black.svg" alt="" style="height: 52px" />
    <img src="/range-rover-logo-black.svg" alt="" style="height: 46px" />
    <img src="/bmw-logo-black.svg" alt="" style="height: 32px" />
    <img src="/mini-black.svg" alt="" style="height: 30px" />
  </div>
  <p class="business-name">
    Eurotech Auto Repair Centre &mdash; <button type="button" class="location-link" on:click={() => locationOpen.set(true)}>Mt Wellington, Auckland</button>
  </p>
  <p class="tagline">Expert &amp; Factory Authorised European Auto Repair Specialists</p>
</aside>

<style>
  .brand-strip {
    text-align: right;
    opacity: 0.55;
  }

  .brand-logos {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-4);
    margin-bottom: 2px;
  }

  .brand-logos img {
    display: block;
    width: auto;
  }

  .business-name {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    margin: 0;
  }

  .tagline {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    margin: 0;
  }

  .location-link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-weight: var(--font-medium);
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  .location-link:hover {
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .brand-strip {
      display: none;
    }
  }
</style>
