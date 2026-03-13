<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import { site } from '$lib/config/site';

  const heroImages = [
    '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg',
    '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg',
    '/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg',
    '/gallery/mini/v1d-kySbGWdOmio-unsplash.jpg',
    '/gallery/mini/sonniehiles-PUBt7UPbJFY-unsplash.jpg'
  ];

  const sections = [
    {
      image: '/gallery/mini/huntleytography-0jdnuETGLRg-unsplash.jpg',
      imageAlt: 'Mini Cooper repair specialist',
      title: 'Repair Done Right',
      paragraphs: [
        'Whether it\'s a Hatchback, Countryman, Clubman, or Convertible, we follow the manufacturer\'s prescribed repair procedures for every Mini model. Our technicians are trained in the specific techniques required for Mini\'s construction methods.',
        'We use genuine parts and the Glasurit 100 Line paint system to ensure colour accuracy and a factory-quality finish. Every repair is backed by a written guarantee.'
      ]
    },
    {
      image: '/gallery/mini/picsbyjameslee-msFTpW3g9CA-unsplash.jpg',
      imageAlt: 'Mini repair workshop',
      title: 'Full Insurance Support',
      paragraphs: [
        'We work with all major New Zealand insurance companies and handle the entire claims process on your behalf — from initial assessment and quoting through to final inspection and delivery.',
        'Our experience with European vehicles means we know how to work within insurer requirements while maintaining the repair quality your Mini deserves. No shortcuts, no compromises.'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Do you specialize in Mini repairs?',
      answer: 'Yes, we are European vehicle specialists with extensive experience in Mini collision repairs, panel beating, and paint work.'
    },
    {
      question: 'Can you work with my insurance company?',
      answer: 'Absolutely. We work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Mini repairs do you perform?',
      answer: 'We perform comprehensive repairs including collision damage, panel beating, paint work, and structural repairs for all Mini models.'
    },
    {
      question: 'How long do Mini repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Mini Specialist Repairs - European Vehicle Experts"
  description={`Expert Mini collision repairs, panel beating & paint work. European vehicle specialists with 20+ years experience. Insurance approved. Call ${site.phone}`}
  keywords="mini repair auckland, mini panel beaters, mini collision repair, mini cooper repair, european vehicle specialists"
/>

<ServiceHero
  title="Mini Repairs"
  description="European vehicle specialists • Precision repairs • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<ServicePageContent
  heading="European Vehicle Specialists for Mini"
  leadText="Mini is part of the BMW Group, and modern Minis share the same engineering standards and advanced materials as their larger siblings. At Eurotech, we bring our BMW Group accreditation and 20+ years of European vehicle expertise to every Mini repair."
  {sections}
  {faqs}
/>
