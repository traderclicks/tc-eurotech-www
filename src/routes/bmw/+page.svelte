<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import { site } from '$lib/config/site';

  const heroImages = [
    '/gallery/bmw/tyler_clemmensen-h5XcT5T0ST8-unsplash.jpg',
    '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg',
    '/gallery/bmw/jakobnoahrosen-rC1Llibcis0-unsplash.jpg',
    '/gallery/bmw/stephanlouis-mN8H_fe040Y-unsplash.jpg',
    '/gallery/bmw/huntleytography-2h3UGhof_fU-unsplash.jpg'
  ];

  const sections = [
    {
      image: '/gallery/bmw/arteum-KiTalJFRkcg-unsplash.jpg',
      imageAlt: 'BMW repair specialist',
      title: 'Carbon Fibre and Multi-Material Expertise',
      paragraphs: [
        'BMW\'s latest models use a mix of carbon fibre reinforced plastic (CFRP), aluminium, and high-strength steel. Repairing these multi-material structures requires specific training, dedicated tooling, and strict contamination controls that most body shops don\'t have.',
        'As NZ\'s only accredited BMW Carbon Fibre Body Shop, we\'re equipped to handle the full range of BMW structural and cosmetic repairs — from the carbon-intensive i-series to the latest 3, 5, and 7 Series models.'
      ]
    },
    {
      image: '/gallery/bmw/romaxp-PzCGId2ljsY-unsplash.jpg',
      imageAlt: 'BMW repair workshop',
      imageHeight: 1800,
      title: 'Quality You Can Trust',
      paragraphs: [
        'We use genuine BMW parts and the Glasurit 100 Line paint system to deliver a finish that\'s indistinguishable from factory. Every repair is backed by a written guarantee, and our I-CAR certified technicians follow BMW\'s prescribed repair methods to the letter.',
        'We work with all major New Zealand insurers and handle the claims process from start to finish. With over 20 years of European vehicle specialisation, we understand what BMW owners expect — and we deliver it.'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Do you specialize in BMW repairs?',
      answer: 'Yes, we are European vehicle specialists with extensive experience in BMW collision repairs, panel beating, and paint work.'
    },
    {
      question: 'Can you work with my insurance company?',
      answer: 'Absolutely. We work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of BMW repairs do you perform?',
      answer: 'We perform comprehensive repairs including collision damage, panel beating, paint work, and structural repairs for all BMW models.'
    },
    {
      question: 'How long do BMW repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="BMW Specialist Repairs - European Vehicle Experts | Eurotech Auto Repair"
  description={`Expert BMW collision repairs, panel beating & paint work. European vehicle specialists with 20+ years experience. Insurance approved. Call ${site.phone}`}
  keywords="bmw repair auckland, bmw panel beaters, bmw collision repair, european vehicle specialists"
/>

<ServiceHero
  title="BMW Repairs"
  description="European vehicle specialists • Precision repairs • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<ServicePageContent
  heading="Accredited BMW Group Body Shop"
  leadText="Eurotech is an accredited BMW Group Body Shop and NZ's only accredited BMW Carbon Fibre Body Shop. We have the training, equipment, and authorization to repair BMW vehicles to the standard the manufacturer demands."
  {sections}
  {faqs}
/>
