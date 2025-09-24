import { Z as fallback, $ as escape_html, a5 as slot, _ as bind_props, a1 as ensure_array_like, a2 as attr, a8 as head, a4 as spread_props } from "../../chunks/index2.js";
import { a as modal } from "../../chunks/Checkbox.svelte_svelte_type_style_lang.js";
import { M as Meta } from "../../chunks/Meta.js";
import { h as html } from "../../chunks/Button.js";
/* empty css                                                     */
import { S as StatsGrid, F as FeatureCard, a as ServiceCard, T as TestimonialCard, b as FAQ } from "../../chunks/ServiceCard.js";
function CTASection($$renderer, $$props) {
  let title = fallback($$props["title"], "Ready to Get Started?");
  let description = fallback($$props["description"], "Contact us today for a free consultation");
  $$renderer.push(`<section class="cta svelte-ck0zer"><div class="container"><h2 class="svelte-ck0zer">${escape_html(title)}</h2> <p class="svelte-ck0zer">${escape_html(description)}</p> <!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div></section>`);
  bind_props($$props, { title, description });
}
function photoPlaceholder(width, height, seed) {
  const seedParam = seed ? `?random=${seed}` : "";
  return `https://picsum.photos/${width}/${height}${seedParam}`;
}
function logoPlaceholder(company, size = 80) {
  const initial = company.charAt(0).toUpperCase();
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Crect width='${size}' height='${size}' rx='8' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='system-ui, sans-serif' font-size='${size / 2}' font-weight='bold' fill='%236b7280'%3E${initial}%3C/text%3E%3C/svg%3E`;
}
function iconPlaceholder(type = "feature", index = 1) {
  const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];
  const color = colors[(index - 1) % colors.length];
  const icons = {
    feature: "M13 10V3L4 14h7v7l9-11h-7z",
    // Lightning bolt
    service: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    // Star
    category: "M4 6h16M4 12h16M4 18h16"
    // Menu bars
  };
  const path = icons[type];
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='${path}'/%3E%3C/svg%3E`;
}
const PLACEHOLDERS = {
  hero: photoPlaceholder(1200, 600, "hero"),
  avatar: (index) => `https://i.pravatar.cc/150?img=${index}`,
  product: (index) => photoPlaceholder(400, 300, `product-${index}`),
  client: (company) => logoPlaceholder(company),
  icon: (index) => iconPlaceholder("feature", index),
  serviceIcon: (index) => iconPlaceholder("service", index),
  categoryIcon: (index) => iconPlaceholder("category", index)
};
function ClientLogos($$renderer, $$props) {
  let logos = fallback(
    $$props["logos"],
    () => [
      {
        src: "/jaguar-logo-lg.jpg",
        alt: "Jaguar Authorized Repairer"
      },
      { src: "/bmw-logo.jpg", alt: "BMW Specialist" },
      { src: "/mini-logo-lg.jpg", alt: "Mini Cooper Specialist" }
    ],
    true
  );
  $$renderer.push(`<div class="client-logos svelte-kivu6h"><!--[-->`);
  const each_array = ensure_array_like(logos);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let logo = each_array[$$index];
    $$renderer.push(`<div class="client-logo svelte-kivu6h"><img${attr("src", logo.src)}${attr("alt", logo.alt)} class="svelte-kivu6h"/></div>`);
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { logos });
}
function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
function generateLocalBusinessSchema(config) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.name,
    description: config.description,
    telephone: config.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.postalCode,
      addressCountry: config.address.country
    }
  };
  if (config.email) {
    schema.email = config.email;
  }
  if (config.hours && config.hours.length > 0) {
    schema.openingHoursSpecification = config.hours.map((hour) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hour.days,
      opens: hour.opens,
      closes: hour.closes
    }));
  }
  if (config.rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: config.rating.value.toString(),
      reviewCount: config.rating.count.toString()
    };
  }
  if (config.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: config.geo.latitude,
      longitude: config.geo.longitude
    };
  }
  return schema;
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function openContactModal() {
      modal.form({ title: "Get a Quote" });
    }
    const features = [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm0 8H3v2h6v-2zm12-4h-6v2h6v-2zm0-4h-6v2h6V7zm0 8h-6v2h6v-2z"/>
      </svg>`,
        title: "Factory Authorized",
        description: "New Zealand's only Jaguar/Land Rover factory-authorized structural repairer"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        <path d="M3 3h18v2H3zm0 16h18v2H3zm0-8h18v2H3z"/>
      </svg>`,
        title: "CRA Accredited",
        description: "20+ years experience with I-Car Gold certification and CRA accreditation"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>`,
        title: "Insurance Approved",
        description: "Trusted by all major insurance companies for quality repairs"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>`,
        title: "Latest Technology",
        description: "State-of-the-art equipment ensuring precision repairs"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`,
        title: "4.7★ Google Rating",
        description: "64+ reviews from satisfied customers averaging 4.7 stars"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z"/>
      </svg>`,
        title: "European Specialists",
        description: "BMW, Jaguar, Land Rover, and Mini repair specialists"
      }
    ];
    const testimonials = [
      {
        name: "Victor",
        role: "BMW Owner",
        content: "They know what they are doing. Great job.",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      {
        name: "Lesley",
        role: "Land Rover Owner",
        content: "Have had a few vehicles repaired with Marino and his team, always friendly and efficient service with cars returned in excellent condition, thank you.",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      {
        name: "Eric",
        role: "Jaguar Owner",
        content: "The team at Eurotech have been brilliant repairing my 2 vehicles. They've made it super easy with dealing with insurance etc and the repairs are exceptional!",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      {
        name: "George",
        role: "BMW Owner",
        content: "Great service and quality of workmanship.",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      {
        name: "Philip",
        role: "Land Rover Owner",
        content: "I was unfortunate to have to make a claim but have been stoked with the outcome. Thanks!",
        avatar: "https://i.pravatar.cc/150?img=7"
      },
      {
        name: "John",
        role: "Mini Owner",
        content: "Great service. Good communication. Happy client.",
        avatar: "https://i.pravatar.cc/150?img=3"
      }
    ];
    const faqs = [
      {
        question: "What brands do you specialize in?",
        answer: "We are European vehicle specialists, focusing on BMW, Jaguar, Land Rover, and Mini. We are New Zealand's only factory-authorized Jaguar/Land Rover structural repairer."
      },
      {
        question: "Do you work with insurance companies?",
        answer: "Yes, we work with all major insurance companies and can handle your claim from start to finish, making the process as smooth as possible for you."
      },
      {
        question: "What certifications do you have?",
        answer: "We are CRA accredited, I-Car Gold certified, and MTA members. We're also the only factory-authorized Jaguar/Land Rover structural repairer in New Zealand."
      },
      {
        question: "Where are you located?",
        answer: "We are located in Mount Wellington, Auckland. Our facility is equipped with the latest technology for European vehicle repairs."
      },
      {
        question: "How long have you been in business?",
        answer: "Eurotech has been providing quality European vehicle repairs for over 20 years, building a reputation for excellence and reliability."
      }
    ];
    const stats = [
      { number: "20+", label: "Years Experience" },
      { number: "4.7★", label: "Google Rating" },
      { number: "100%", label: "Insurance Approved" },
      { number: "#1", label: "JLR Authorized" }
    ];
    const services = [
      {
        icon: PLACEHOLDERS.serviceIcon(1),
        title: "Jaguar & Land Rover",
        description: "Factory-authorized structural repairs with genuine parts",
        buttonHref: "#jaguar-landrover"
      },
      {
        icon: PLACEHOLDERS.serviceIcon(2),
        title: "BMW & Mini",
        description: "Specialist repairs using latest BMW repair techniques",
        buttonHref: "#bmw-mini"
      },
      {
        icon: PLACEHOLDERS.serviceIcon(3),
        title: "Insurance Claims",
        description: "Complete claim management from assessment to completion",
        buttonHref: "#insurance"
      }
    ];
    const googleReviews = {
      rating: 4.7,
      totalReviews: 64,
      reviews: [
        {
          author: "Sarah M.",
          rating: 5,
          text: "Excellent service! My BMW looks brand new after the repair.",
          time: "2 weeks ago"
        },
        {
          author: "Michael T.",
          rating: 5,
          text: "Professional team, great communication throughout the process.",
          time: "1 month ago"
        },
        {
          author: "Emma L.",
          rating: 5,
          text: "Best panel beaters in Auckland for European vehicles!",
          time: "1 month ago"
        }
      ]
    };
    const businessSchema = generateLocalBusinessSchema({
      name: "Eurotech Auto Repair Centre",
      description: "European vehicle repair specialists. New Zealand's only factory-authorized Jaguar/Land Rover structural repairer.",
      address: {
        street: "Mount Wellington",
        city: "Auckland",
        state: "Auckland",
        postalCode: "1060",
        country: "NZ"
      },
      phone: "(09) 573 1093",
      email: "info@eurotech.co.nz",
      hours: [
        {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00"
        }
      ],
      rating: { value: 4.7, count: 64 },
      geo: { latitude: -36.909, longitude: 174.836 }
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`${html(`<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}<\/script>`)} ${html(`<script type="application/ld+json">${JSON.stringify(businessSchema)}<\/script>`)}`);
    });
    Meta($$renderer2, {
      title: "Eurotech Auto Repair Centre - European Vehicle Specialists Auckland",
      description: "New Zealand's only factory-authorized Jaguar/Land Rover structural repairer. Expert BMW and Mini repairs. Insurance approved. Call (09) 573 1093",
      keywords: "european car repair auckland, bmw repair, jaguar repair, land rover repair, mini repair, panel beaters auckland, insurance repairs",
      ogImage: "/og-eurotech.png"
    });
    $$renderer2.push(`<!---->  <section class="hero svelte-1uha8ag" style="background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&amp;w=2940&amp;auto=format&amp;fit=crop')"><div class="hero-overlay svelte-1uha8ag"></div> <div class="container hero-container svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> `);
    StatsGrid($$renderer2, { stats });
    $$renderer2.push(`<!----> <section class="section"><div class="container"><div class="section-header"><h2 class="section-title">Why Choose Eurotech</h2> <p class="section-subtitle">Auckland's premier European vehicle repair specialists</p></div> <div class="features-grid svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(features);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let feature = each_array_1[$$index_1];
      FeatureCard($$renderer2, spread_props([feature]));
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="section bg-secondary"><div class="container"><div class="section-header"><h2 class="section-title">Customer Reviews</h2> <div class="google-rating svelte-1uha8ag"><span class="rating-number svelte-1uha8ag">${escape_html(googleReviews.rating)}</span> <div class="rating-stars svelte-1uha8ag"><!--[-->`);
    const each_array_2 = ensure_array_like(Array(5));
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      each_array_2[i];
      $$renderer2.push(`<svg width="20" height="20"${attr("fill", i < Math.floor(googleReviews.rating) ? "#FFA500" : "#DDD")}><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></div> <span class="review-count svelte-1uha8ag">(${escape_html(googleReviews.totalReviews)} reviews)</span></div></div> <div class="google-reviews-grid svelte-1uha8ag"><!--[-->`);
    const each_array_3 = ensure_array_like(googleReviews.reviews);
    for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
      let review = each_array_3[$$index_4];
      $$renderer2.push(`<div class="google-review-card svelte-1uha8ag"><div class="review-header svelte-1uha8ag"><span class="review-author svelte-1uha8ag">${escape_html(review.author)}</span> <span class="review-time svelte-1uha8ag">${escape_html(review.time)}</span></div> <div class="review-rating svelte-1uha8ag"><!--[-->`);
      const each_array_4 = ensure_array_like(Array(5));
      for (let i = 0, $$length2 = each_array_4.length; i < $$length2; i++) {
        each_array_4[i];
        $$renderer2.push(`<svg width="16" height="16"${attr("fill", i < review.rating ? "#FFA500" : "#DDD")}><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></div> <p class="review-text svelte-1uha8ag">${escape_html(review.text)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="google-reviews-footer svelte-1uha8ag"><img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width="92" height="30"/> <a href="https://www.google.com/search?q=eurotech+auto+repair+centre" target="_blank" rel="noopener" class="view-all-reviews svelte-1uha8ag">View all reviews on Google →</a></div></div></section> <section class="section"><div class="container"><div class="section-header"><h2 class="section-title">Our Services</h2> <p class="section-subtitle">Comprehensive repair solutions for European vehicles</p></div> <div class="services-grid svelte-1uha8ag"><!--[-->`);
    const each_array_5 = ensure_array_like(services);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let service = each_array_5[$$index_5];
      ServiceCard($$renderer2, spread_props([service]));
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="section bg-gradient"><div class="container"><div class="section-header text-inverse svelte-1uha8ag"><h2 class="section-title svelte-1uha8ag">What Our Customers Say</h2></div> <div class="testimonials-grid svelte-1uha8ag"><!--[-->`);
    const each_array_6 = ensure_array_like(testimonials.slice(0, 3));
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let testimonial = each_array_6[$$index_6];
      TestimonialCard($$renderer2, spread_props([testimonial]));
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="section"><div class="container"><div class="section-header"><h2 class="section-title">Authorized Repairer</h2> <p class="section-subtitle">Factory-authorized for premium European brands</p></div> `);
    ClientLogos($$renderer2, {});
    $$renderer2.push(`<!----></div></section> <section class="section bg-secondary"><div class="container"><div class="section-header"><h2 class="section-title">Frequently Asked Questions</h2></div> <div class="faq-container svelte-1uha8ag">`);
    FAQ($$renderer2, { items: faqs });
    $$renderer2.push(`<!----></div></div></section> `);
    CTASection($$renderer2, {
      title: "Ready to Get Your European Vehicle Repaired?",
      subtitle: "Contact Auckland's premier European vehicle specialists today",
      buttonText: "Get a Quote",
      buttonAction: openContactModal
    });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
