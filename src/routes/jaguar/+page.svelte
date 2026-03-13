<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import ReviewSection from '$lib/components/ReviewSection.svelte';
  import { site } from '$lib/config/site';

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

  const faqs = [
    {
      question: 'Are you authorized for Jaguar repairs?',
      answer: 'Yes, Eurotech is NZ\'s only authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
    },
    {
      question: 'Do you use genuine Jaguar parts?',
      answer: 'Absolutely. We only use genuine Jaguar parts for all repairs to maintain your vehicle\'s integrity, performance, and warranty.'
    },
    {
      question: 'Can you handle insurance claims for Jaguar repairs?',
      answer: 'Yes, we work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Jaguar repairs do you perform?',
      answer: 'We perform comprehensive repairs including structural damage, panel beating, paint work, and collision repairs for all Jaguar models.'
    },
    {
      question: 'How long do Jaguar repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Jaguar Specialist Repairs - Authorized | Eurotech Auto Repair"
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
  <ReviewSection slot="after-content" />
</ServicePageContent>
