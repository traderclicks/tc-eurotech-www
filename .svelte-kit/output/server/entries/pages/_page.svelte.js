import { Z as fallback, a2 as attr, _ as escape_html, $ as bind_props, a8 as head, a9 as attr_style, a1 as ensure_array_like, a5 as spread_props, a4 as stringify } from "../../chunks/index2.js";
import "../../chunks/modal.js";
import { M as Meta } from "../../chunks/Meta.js";
import { h as html } from "../../chunks/Button.svelte_svelte_type_style_lang.js";
/* empty css                                                     */
import { S as ServiceCard } from "../../chunks/ServiceCard.js";
import { F as FAQ } from "../../chunks/FAQ.js";
import { S as StatsGrid } from "../../chunks/StatsGrid.js";
import { R as ReviewCarousel } from "../../chunks/ReviewCarousel.js";
import "../../chunks/HeroCTAButtons.svelte_svelte_type_style_lang.js";
function BlogCard($$renderer, $$props) {
  let title = fallback($$props["title"], "");
  let excerpt = fallback($$props["excerpt"], "");
  let image = fallback($$props["image"], "");
  let category = fallback($$props["category"], "");
  let date = fallback($$props["date"], "");
  let href = fallback($$props["href"], "#");
  $$renderer.push(`<a${attr("href", href)} class="blog-card svelte-pf7zc2"><div class="blog-image svelte-pf7zc2"><img${attr("src", image)}${attr("alt", title)} class="svelte-pf7zc2"/> `);
  if (category) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<span class="blog-category svelte-pf7zc2">${escape_html(category)}</span>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> <div class="blog-content svelte-pf7zc2">`);
  if (date) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<time class="blog-date svelte-pf7zc2">${escape_html(date)}</time>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <h3 class="blog-title svelte-pf7zc2">${escape_html(title)}</h3> `);
  if (excerpt) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="blog-excerpt svelte-pf7zc2">${escape_html(excerpt)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <span class="blog-link svelte-pf7zc2">Learn More</span></div></a>`);
  bind_props($$props, { title, excerpt, image, category, date, href });
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
    let currentSlide = 0;
    const baseImages = [
      "/gallery/bmw/tyler_clemmensen-h5XcT5T0ST8-unsplash.jpg",
      // 71
      "/images/DSC00619.jpg",
      // 80
      "/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg",
      // 35
      "/images/DSC00748.jpg",
      // 93
      "/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg",
      // 44
      "/images/DSC00972.jpg",
      // 99
      "/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg",
      // 10
      "/images/DSC00773.jpg",
      // 97
      "/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg",
      // 30
      "/images/DSC00751.jpg",
      // 94
      "/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg",
      // 67
      "/images/DSC00727.jpg",
      // 90
      "/gallery/range-rover/range-rover-1725815761.jpg"
      // 116
    ];
    const heroBackgrounds = Array(10).fill(baseImages).flat();
    const totalSlides = heroBackgrounds.length;
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
    const heroData = {
      description: "NZ's only factory-authorized Jaguar/Land Rover repairer  •  Expert BMW & Mini repairs  •  Over 20 years experience"
    };
    const services = [
      {
        icon: "/jaguar-logo-white.svg",
        title: "Jaguar",
        description: "Factory-authorized structural repairs with genuine parts",
        buttonHref: "/jaguar",
        backgroundImage: "/gallery/jaguar/fourfour_44-w4aIu8mhxX8-unsplash.jpg"
      },
      {
        icon: "/landrover-logo-white.svg",
        title: "Land Rover",
        description: "Factory-authorized Land Rover specialist repairs",
        buttonHref: "/land-rover",
        backgroundImage: "/gallery/land-rover/timtrad-CLm3pWXrS9Q-unsplash.jpg"
      },
      {
        icon: "/range-rover-logo-white.svg",
        title: "Range Rover",
        description: "Premium Range Rover repair and maintenance",
        buttonHref: "/range-rover",
        backgroundImage: "/gallery/range-rover/range-rover-1725815761.jpg"
      },
      {
        icon: "/bmw-logo-white.svg",
        title: "BMW",
        description: "Specialist BMW repairs using latest repair techniques",
        buttonHref: "/bmw",
        backgroundImage: "/bmw.jpg"
      },
      {
        icon: "/mini-white.svg",
        title: "Mini",
        description: "Expert Mini servicing and collision repairs",
        buttonHref: "/mini",
        backgroundImage: "/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg"
      },
      {
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1"%3E%3Cpath d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/%3E%3Cpath d="M9 12l2 2 4-4"/%3E%3C/svg%3E',
        title: "Insurance Claims",
        description: "Complete claim management from assessment to completion",
        buttonHref: "/insurance",
        backgroundImage: "/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg"
      }
    ];
    const googleReviews = {
      rating: 4.7,
      totalReviews: 64
    };
    const blogArticles = [
      {
        title: "Why Choose Factory-Authorized Repairs for Your Jaguar or Land Rover",
        excerpt: "Learn about the importance of factory-authorized repairs and how they protect your vehicle's value and warranty.",
        image: "/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg",
        category: "Expert Advice",
        date: "March 15, 2025",
        href: "#blog"
      },
      {
        title: "Common BMW Repair Issues and How to Prevent Them",
        excerpt: "Discover the most common repair issues for BMW vehicles and our expert tips for preventative maintenance.",
        image: "/bmw.jpg",
        category: "Maintenance",
        date: "March 10, 2025",
        href: "#blog"
      },
      {
        title: "Understanding Your Insurance Claim Process",
        excerpt: "A comprehensive guide to navigating insurance claims for European vehicle repairs in New Zealand.",
        image: "/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg",
        category: "Insurance",
        date: "March 5, 2025",
        href: "#blog"
      }
    ];
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
    $$renderer2.push(`<!---->  <section class="hero svelte-1uha8ag"><div class="hero-slider-track svelte-1uha8ag"${attr_style(`transform: translateX(-${stringify(currentSlide * (100 / (totalSlides + 1)))}%); transition: ${stringify("transform 0.8s ease-in-out")}`)}><!--[-->`);
    const each_array = ensure_array_like([...heroBackgrounds, heroBackgrounds[0]]);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let bg = each_array[i];
      $$renderer2.push(`<div class="hero-background svelte-1uha8ag"${attr_style(`background-image: url('${stringify(bg)}')`)}></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="hero-overlay svelte-1uha8ag"></div> <button class="hero-nav-btn prev svelte-1uha8ag" aria-label="Previous slide"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="svelte-1uha8ag"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <button class="hero-nav-btn next svelte-1uha8ag" aria-label="Next slide"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="svelte-1uha8ag"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <div class="container hero-container svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="hero-white-block svelte-1uha8ag"></div> <div class="logo-bar svelte-1uha8ag">`);
    StatsGrid($$renderer2, {
      backgroundColor: "transparent",
      textColor: "white",
      description: heroData.description
    });
    $$renderer2.push(`<!----></div></section> <section class="section bg-blog svelte-1uha8ag"><div class="container"><div class="services-grid svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(services);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let service = each_array_1[$$index_1];
      ServiceCard($$renderer2, spread_props([service]));
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="section"><div class="container"><div class="section-header"><h2 class="section-title">Expert Insights &amp; Advice</h2> <p class="section-subtitle">Latest articles from our European vehicle repair specialists</p></div> <div class="blog-grid svelte-1uha8ag"><!--[-->`);
    const each_array_2 = ensure_array_like(blogArticles);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let article = each_array_2[$$index_2];
      BlogCard($$renderer2, spread_props([article]));
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="section bg-dark reviews-section svelte-1uha8ag"><div class="container"><div class="section-header text-inverse svelte-1uha8ag"><h2 class="section-title reviews-title svelte-1uha8ag">What Our Customers Say <span class="title-separator svelte-1uha8ag">|</span> <span class="google-rating svelte-1uha8ag"><img src="/icons/google-wordmark-white.svg" alt="Google" class="google-logo-inline svelte-1uha8ag"/> <span class="star filled svelte-1uha8ag">★</span> ${escape_html(googleReviews.rating)} (${escape_html(googleReviews.totalReviews)} reviews)</span></h2></div></div> `);
    ReviewCarousel($$renderer2, {});
    $$renderer2.push(`<!----></section> <section class="section bg-secondary"><div class="container"><div class="section-header text-center svelte-1uha8ag"><h2 class="section-title">Frequently Asked Questions</h2></div> <div class="faq-container svelte-1uha8ag">`);
    FAQ($$renderer2, { items: faqs });
    $$renderer2.push(`<!----></div></div></section>`);
  });
}
export {
  _page as default
};
