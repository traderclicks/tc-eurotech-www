<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import GoogleReviewsSection from '$lib/components/GoogleReviewsSection.svelte';
  import { site } from '$lib/config/site';
  import { page } from '$app/stores';
  import type { FaqsByPage } from '$lib/cms/faqs';

  const heroImages = [
    '/gallery/jaguar/introspectivedsgn-oUoLi5k7esA-unsplash.jpg',
    '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg',
    '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg',
    '/gallery/jaguar/escobar_kanishk-J1kmixRfys0-unsplash.jpg',
    '/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg'
  ];

  const sections = [
    {
      image: '/gallery/jaguar/imlst-OnppPkl1d3U-unsplash.jpg',
      imageAlt: 'Jaguar repair specialist',
      title: 'Aluminium Structural Expertise',
      paragraphs: [
        'Modern Jaguars are built with advanced aluminium architectures that require specialist knowledge, tooling, and training to repair safely. Our technicians have completed Jaguar\'s own aluminium structural repair courses — training only available to authorized repairers.',
        'We use dedicated aluminium repair bays with climate-controlled environments to prevent contamination, along with Jaguar-approved measuring and pulling equipment to restore every dimension to factory specification.'
      ]
    },
    {
      image: '/gallery/jaguar/switch_dtp_fotografie-01dxABUoCQA-unsplash.jpg',
      imageAlt: 'Jaguar repair workshop',
      imageHeight: 801,
      title: 'Factory-Grade Finish',
      paragraphs: [
        'Our refinish team uses the Glasurit 100 Line paint system — the same premium system trusted by manufacturers worldwide. With digital colour matching and over 90 tinting bases, we achieve colour accuracy that\'s indistinguishable from factory.',
        'Every Jaguar repair we complete carries a written manufacturer guarantee. We work directly with all major NZ insurers to manage your claim from assessment through to completion, so you can focus on getting back on the road.'
      ]
    }
  ];

  $: faqs = (($page.data.faqs as FaqsByPage | undefined)?.jaguar ?? []);
</script>

<Meta
  title="Jaguar Specialist Repairs - Authorized"
  description={`NZ's only authorized Jaguar structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call ${site.phone}`}
  keywords="jaguar repair auckland, jaguar panel beaters, jaguar collision repair, authorized jaguar, genuine jaguar parts"
/>

<ServiceHero
  title="Jaguar Repairs"
  description="NZ's only authorized Jaguar repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<ServicePageContent
  heading="NZ's Only Authorized Jaguar Repairer"
  leadText="Eurotech is the only body shop in New Zealand fully authorized by Jaguar to carry out structural aluminium repairs. That means every repair meets the exact specifications set by the manufacturer — protecting your vehicle's integrity, warranty, and resale value."
  {sections}
  {faqs}
>
  <GoogleReviewsSection slot="after-content" />
</ServicePageContent>
