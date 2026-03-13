<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import { site } from '$lib/config/site';

  const heroImages = [
    '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg',
    '/gallery/land-rover/grantritchie-j0YPbvXu4t0-unsplash.jpg',
    '/gallery/land-rover/richhemingway-UbTktGx_vdQ-unsplash.jpg',
    '/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg'
  ];

  const sections = [
    {
      image: '/gallery/land-rover/visionaryconcepts-jx4OyQHNhi0-unsplash.jpg',
      imageAlt: 'Land Rover repair specialist',
      title: 'Built for Land Rover\'s Architecture',
      paragraphs: [
        'Land Rovers use a combination of aluminium monocoque and body-on-frame constructions depending on the model. Repairing these structures correctly requires specialist knowledge and equipment that most body shops simply don\'t have.',
        'Our technicians are factory-trained in Land Rover\'s specific repair procedures, using approved measuring systems and dedicated aluminium tooling. Every structural repair is verified against manufacturer tolerances before leaving our workshop.'
      ]
    },
    {
      image: '/gallery/land-rover/withluke-Pn285tSRCNY-unsplash.jpg',
      imageAlt: 'Land Rover repair workshop',
      title: 'Insurance and Guarantee',
      paragraphs: [
        'We work with all major New Zealand insurers and manage the claims process directly — from initial assessment through to final delivery. Our team handles the paperwork so you don\'t have to.',
        'All Land Rover repairs carry a written manufacturer guarantee, and our Glasurit paint system ensures a finish that matches factory colour exactly. Over 20 years of specialising in European vehicles means we understand what it takes to get the result right.'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Are you authorized for Land Rover repairs?',
      answer: 'Yes, Eurotech is NZ\'s only authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
    },
    {
      question: 'Do you use genuine Land Rover parts?',
      answer: 'Absolutely. We only use genuine Land Rover parts for all repairs to maintain your vehicle\'s integrity, performance, and warranty.'
    },
    {
      question: 'Can you handle insurance claims for Land Rover repairs?',
      answer: 'Yes, we work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Land Rover repairs do you perform?',
      answer: 'We perform comprehensive repairs including structural damage, panel beating, paint work, and collision repairs for all Land Rover models.'
    },
    {
      question: 'How long do Land Rover repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Land Rover Specialist Repairs - Authorized"
  description={`NZ's only authorized Land Rover structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call ${site.phone}`}
  keywords="land rover repair auckland, land rover panel beaters, land rover collision repair, authorized land rover, genuine land rover parts"
/>

<ServiceHero
  title="Land Rover Repairs"
  description="NZ's only authorized Land Rover repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<ServicePageContent
  heading="NZ's Only Authorized Land Rover Repairer"
  leadText="Eurotech holds full factory authorization from Land Rover for structural aluminium repairs — the only body shop in New Zealand with this certification. Your vehicle is repaired to the exact specifications set by the manufacturer, preserving its safety, warranty, and value."
  {sections}
  {faqs}
/>
