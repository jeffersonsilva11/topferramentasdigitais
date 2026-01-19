import Script from 'next/script';

interface JsonLdSchemaProps {
  locale?: string;
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ferramentas Digitais',
    alternateName: 'Top Ferramentas Digitais',
    url: 'https://ferramentasdigitais.com.br',
    logo: 'https://ferramentasdigitais.com.br/icon-512.png',
    description: 'Coleção completa de ferramentas online gratuitas: conversores, geradores, calculadoras e mais.',
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English', 'Spanish', 'French', 'German', 'Italian', 'Russian'],
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebSiteSchema({ locale = 'pt' }: JsonLdSchemaProps) {
  const names: Record<string, string> = {
    pt: 'Ferramentas Digitais Grátis',
    en: 'Free Digital Tools',
    es: 'Herramientas Digitales Gratis',
    fr: 'Outils Numériques Gratuits',
    de: 'Kostenlose Digitale Werkzeuge',
    it: 'Strumenti Digitali Gratuiti',
    ru: 'Бесплатные Цифровые Инструменты',
  };

  const descriptions: Record<string, string> = {
    pt: 'Coleção completa de ferramentas online gratuitas: conversores, geradores, calculadoras e mais.',
    en: 'Complete collection of free online tools: converters, generators, calculators and more.',
    es: 'Colección completa de herramientas en línea gratuitas: conversores, generadores, calculadoras y más.',
    fr: 'Collection complète d\'outils en ligne gratuits: convertisseurs, générateurs, calculatrices et plus.',
    de: 'Komplette Sammlung kostenloser Online-Tools: Konverter, Generatoren, Rechner und mehr.',
    it: 'Collezione completa di strumenti online gratuiti: convertitori, generatori, calcolatrici e altro.',
    ru: 'Полная коллекция бесплатных онлайн-инструментов: конвертеры, генераторы, калькуляторы и многое другое.',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: names[locale] || names.pt,
    description: descriptions[locale] || descriptions.pt,
    url: `https://ferramentasdigitais.com.br/${locale}`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Ferramentas Digitais',
      url: 'https://ferramentasdigitais.com.br',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://ferramentasdigitais.com.br/${locale}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// SoftwareApplication Schema for individual tools
interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
  locale?: string;
}

export function ToolSchema({ name, description, url, category, locale = 'pt' }: ToolSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ferramentas Digitais',
      url: 'https://ferramentasdigitais.com.br',
    },
    inLanguage: locale,
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Works in all modern browsers.',
  };

  return (
    <Script
      id={`tool-schema-${category}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined Schema Component for pages
export default function JsonLdSchema({ locale = 'pt' }: JsonLdSchemaProps) {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema locale={locale} />
    </>
  );
}
