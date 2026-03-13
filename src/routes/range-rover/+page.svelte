<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import { site } from '$lib/config/site';

  const heroImages = [
    '/gallery/range-rover/range-rover-1725815761.jpg',
    '/gallery/range-rover/range-rover-1604054094.jpg',
    '/gallery/range-rover/range-rover-1604054089.jpg',
    '/gallery/range-rover/range-rover-1658547737.jpg',
    '/gallery/range-rover/range-rover-1736746419.jpg'
  ];

  const sections = [
    {
      image: '/gallery/range-rover/range-rover-1529438636731.jpg',
      imageAlt: 'Range Rover repair specialist',
      imageHeight: 900,
      title: 'Premium Materials, Premium Repair',
      paragraphs: [
        'Range Rovers are built with lightweight aluminium architectures that deliver performance and refinement — but they demand specialist repair methods. Incorrect techniques can compromise structural integrity and void your manufacturer\'s warranty.',
        'Our factory-trained technicians use approved tooling and repair procedures specific to each Range Rover model. Dedicated aluminium repair bays prevent cross-contamination, and every structural dimension is verified against manufacturer tolerances.'
      ]
    },
    {
      image: '/gallery/range-rover/range-rover-1736746871.jpg',
      imageAlt: 'Range Rover repair workshop',
      imageHeight: 675,
      title: 'Seamless Insurance Claims',
      paragraphs: [
        'We work with all major New Zealand insurers and manage the entire claims process on your behalf — from the initial damage assessment through to final quality inspection and delivery.',
        'All repairs are completed using genuine parts and the Glasurit 100 Line paint system for factory-accurate colour matching. Every Range Rover repair carries a written manufacturer guarantee, giving you complete confidence in the result.'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Are you authorized for Range Rover repairs?',
      answer: 'Yes, Eurotech is NZ\'s only authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
    },
    {
      question: 'Do you use genuine Range Rover parts?',
      answer: 'Absolutely. We only use genuine Range Rover parts for all repairs to maintain your vehicle\'s integrity, performance, and warranty.'
    },
    {
      question: 'Can you handle insurance claims for Range Rover repairs?',
      answer: 'Yes, we work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Range Rover repairs do you perform?',
      answer: 'We perform comprehensive repairs including structural damage, panel beating, paint work, and collision repairs for all Range Rover models.'
    },
    {
      question: 'How long do Range Rover repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Range Rover Specialist Repairs - Authorized | Eurotech Auto Repair"
  description={`NZ's only authorized Range Rover structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call ${site.phone}`}
  keywords="range rover repair auckland, range rover panel beaters, range rover collision repair, authorized range rover, genuine range rover parts"
/>

<ServiceHero
  title="Range Rover Repairs"
  description="NZ's only authorized Range Rover repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<ServicePageContent
  heading="Authorized Range Rover Repairs"
  leadText="As NZ's only authorized Jaguar/Land Rover structural repairer, Eurotech is equipped to handle the full Range Rover family — from the Sport and Velar to the full-size Range Rover. Every repair meets the manufacturer's exact specifications."
  {sections}
  {faqs}
/>
