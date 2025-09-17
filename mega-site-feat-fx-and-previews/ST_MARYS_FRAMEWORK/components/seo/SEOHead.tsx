import * as React from 'react';
import type { Metadata } from 'next';

// Props for building metadata and injecting JSON-LD scripts
export type SEOHeadProps = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Array<Record<string, any>>;
};

// Helper to build Next.js metadata based on page-level props
export function buildMetadata({ title, description, canonical, ogImage }: SEOHeadProps): Metadata {
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
      siteName: "St Mary's House Dental Care",
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

// Component to output JSON-LD scripts into the head of a page
export function SEOHead({ jsonLd }: { jsonLd?: Array<Record<string, any>> }) {
  if (!jsonLd || jsonLd.length === 0) return null;
  return (
    <>
      {jsonLd.map((obj, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
