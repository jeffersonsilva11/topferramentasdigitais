import { Tool } from '@/types';

export default function StructuredData({ tool, locale, slug }: { tool: Tool; locale: string; slug: string }) {
  const baseUrl = 'https://ferramentasdigitais.com.br';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.metaDescription,
    url: `${baseUrl}/${locale}/${slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
    creator: {
      '@type': 'Organization',
      name: 'Ferramentas Digitais',
      url: baseUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
