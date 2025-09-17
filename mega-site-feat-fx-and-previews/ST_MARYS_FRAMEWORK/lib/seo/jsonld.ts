// Minimal, typed JSON-LD helpers. Import into pages and pass into <SEOHead/>

// Define a generic type for JSON-LD objects

export type Thing = Record<string, any>;

// Helper to add @context to our objects
const asScript = (obj: Thing) => ({
  '@context': 'https://schema.org',
  ...obj
});

export function organizationJsonLd(opts: {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}): Thing {
  return asScript({
    '@type': 'Organization',
    name: opts.name,
    url: opts.url,
    logo: opts.logo,
    sameAs: opts.sameAs
  });
}

export function localBusinessDentistJsonLd(opts: {
  name: string;
  url: string;
  telephone?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: 'GB' | string;
  };
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  image?: string;
}): Thing {
  return asScript({
    '@type': ['Dentist', 'LocalBusiness'],
    name: opts.name,
    url: opts.url,
    telephone: opts.telephone,
    address: {
      '@type': 'PostalAddress',
      ...opts.address
    },
    geo: opts.geo ? { '@type': 'GeoCoordinates', ...opts.geo } : undefined,
    openingHours: opts.openingHours,
    image: opts.image
  });
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  providerName: string;
  areaServed?: string | string[];
  serviceType?: string;
  url?: string;
  image?: string;
}): Thing {
  return asScript({
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    provider: { '@type': 'Dentist', name: opts.providerName },
    areaServed: opts.areaServed,
    serviceType: opts.serviceType ?? opts.name,
    url: opts.url,
    image: opts.image
  });
}

export function offerJsonLd(opts: {
  name: string;
  price?: number;
  priceCurrency?: 'GBP';
  availability?: 'https://schema.org/InStock' | 'https://schema.org/LimitedAvailability';
  url?: string;
  eligibleRegion?: string;
}): Thing {
  return asScript({
    '@type': 'Offer',
    name: opts.name,
    price: opts.price,
    priceCurrency: opts.priceCurrency ?? 'GBP',
    availability: opts.availability,
    url: opts.url,
    eligibleRegion: opts.eligibleRegion
  });
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]): Thing {
  return asScript({
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  });
}

export function imageObjectJsonLd(opts: {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}): Thing {
  return asScript({
    '@type': 'ImageObject',
    contentUrl: opts.url,
    url: opts.url,
    width: opts.width,
    height: opts.height,
    caption: opts.caption
  });
}
