<aside class="brand-strip" aria-label="Eurotech specialisations">
  <div class="brand-logos">
    <img src="/jaguar-logo-black.svg" alt="" style="height: 9px" />
    <img src="/landrover-logo-black.svg" alt="" style="height: 52px" />
    <img src="/range-rover-logo-black.svg" alt="" style="height: 46px" />
    <img src="/bmw-logo-black.svg" alt="" style="height: 32px" />
    <img src="/mini-black.svg" alt="" style="height: 20px" />
  </div>
  <p class="tagline">Expert &amp; Factory Authorised European Specialists · Auckland</p>
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

  .tagline {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    margin: 0;
  }

  @media (max-width: 768px) {
    .brand-strip {
      display: none;
    }
  }
</style>
