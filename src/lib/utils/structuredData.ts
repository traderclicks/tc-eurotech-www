/**
 * Structured Data Utilities for SEO
 */
import { site } from '$lib/config/site';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  name: string;
  description: string;
  price?: string;
  image?: string;
}

export interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

/**
 * Generate FAQ Schema markup
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Service Schema markup
 */
export function generateServiceSchema(services: Service[], providerName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Professional Services',
    provider: {
      '@type': 'Organization',
      name: providerName || site.businessName,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          ...(service.image && { image: service.image }),
        },
        ...(service.price && { price: service.price }),
      })),
    },
  };
}

/**
 * Generate LocalBusiness Schema markup
 */
export function generateLocalBusinessSchema(config: {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email?: string;
  hours?: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>;
  rating?: {
    value: number;
    count: number;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.name,
    description: config.description,
    telephone: config.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.postalCode,
      addressCountry: config.address.country,
    },
  };

  if (config.email) {
    schema.email = config.email;
  }

  if (config.hours && config.hours.length > 0) {
    schema.openingHoursSpecification = config.hours.map((hour) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hour.days,
      opens: hour.opens,
      closes: hour.closes,
    }));
  }

  if (config.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: config.rating.value.toString(),
      reviewCount: config.rating.count.toString(),
    };
  }

  if (config.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: config.geo.latitude,
      longitude: config.geo.longitude,
    };
  }

  return schema;
}

/**
 * Generate Review Schema markup
 */
export function generateReviewSchema(reviews: Review[], itemReviewed: string) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: itemReviewed,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished || new Date().toISOString(),
  }));
}

/**
 * Generate BreadcrumbList Schema markup
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Article Schema markup
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string | string[];
  url: string;
}) {
  const images = Array.isArray(article.image) ? article.image : article.image ? [article.image] : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(images.length > 0 && { image: images }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.businessName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://eurotechauto.co.nz/eurotech-main-logo.png',
      },
    },
  };
}

/**
 * Generate Event Schema markup
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  organizer: string;
  offers?: {
    price: string;
    currency: string;
    availability: string;
    url: string;
  };
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
    },
  };

  if (event.endDate) {
    schema.endDate = event.endDate;
  }

  if (event.offers) {
    schema.offers = {
      '@type': 'Offer',
      price: event.offers.price,
      priceCurrency: event.offers.currency,
      availability: `https://schema.org/${event.offers.availability}`,
      url: event.offers.url,
    };
  }

  return schema;
}

/**
 * Helper to render structured data in Svelte components
 */
export function renderStructuredData(data: any): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}