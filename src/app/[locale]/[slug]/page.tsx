import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { tools } from '@/lib/tools';
import { getToolContent, getDefaultContent } from '@/lib/toolsContent';
import AdSlot from '@/components/AdSlot';
import ClientToolLoader from '@/components/ClientToolLoader';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ToolSchema, FAQSchema, BreadcrumbSchema } from '@/components/JsonLdSchema';

function getToolKeyBySlug(slug: string) {
  const slugMap: Record<string, string> = {
    'what-is-my-ip': 'meu-ip',
    'cual-es-mi-ip': 'meu-ip',
    'qr-code-generator': 'gerador-qr-code',
    'generador-codigo-qr': 'gerador-qr-code',
    'text-counter': 'contador-texto',
    'convert-pdf-to-jpg': 'converter-pdf-jpg',
    'convertir-pdf-jpg': 'converter-pdf-jpg',
    'convert-jpg-to-pdf': 'converter-jpg-pdf',
    'convertir-jpg-pdf': 'converter-jpg-pdf',
    'image-compressor': 'comprimir-imagem',
    'comprimir-imagen': 'comprimir-imagem',
    'resize-image': 'redimensionar-imagem',
    'redimensionar-imagen': 'redimensionar-imagem',
    'percentage-calculator': 'calculadora-porcentagem',
    'calculadora-porcentaje': 'calculadora-porcentagem',
    'password-generator': 'gerador-senha',
    'generador-contrasenas': 'gerador-senha',
    'convert-png-to-jpg': 'converter-png-jpg',
    'convertir-png-jpg': 'converter-png-jpg',
    'lorem-ipsum-generator': 'gerador-lorem-ipsum',
    'generador-lorem-ipsum': 'gerador-lorem-ipsum',
    'website-status-checker': 'site-online',
    'sitio-online': 'site-online',
    'my-user-agent': 'meu-user-agent',
    'mi-user-agent': 'meu-user-agent',
    'convert-webp-to-jpg': 'converter-webp-jpg',
    'convertir-webp-jpg': 'converter-webp-jpg',
    'rule-of-three-calculator': 'regra-de-tres',
    'regla-de-tres': 'regra-de-tres',
    'hash-generator': 'gerador-hash',
    'generador-hash': 'gerador-hash',
    'formateador-json': 'json-formatter',
    'bytes-converter': 'conversor-bytes',
    'uuid-generator': 'gerador-uuid',
    'generador-uuid': 'gerador-uuid',
    'whatsapp-link-generator': 'gerador-link-whatsapp',
    'generador-enlace-whatsapp': 'gerador-link-whatsapp',
    'pix-key-generator': 'gerador-chave-pix',
    'generador-clave-pix': 'gerador-chave-pix',
    'emoji-list': 'lista-emojis',
    'lista-emojis-es': 'lista-emojis',
    'stopwatch-timer': 'cronometro-timer',
    'cronometro-temporizador': 'cronometro-timer',
    'currency-exchange': 'cotacao-moedas',
    'cotizacion-monedas': 'cotacao-moedas',
    'json-csv-converter': 'conversor-json-csv',
    'conversor-json-csv-es': 'conversor-json-csv',
    'utm-generator': 'gerador-utm',
    'generador-utm': 'gerador-utm',
    'compound-interest-calculator': 'calculadora-juros',
    'calculadora-intereses': 'calculadora-juros',
    'whois-lookup': 'consulta-whois',
    'consulta-whois-es': 'consulta-whois',
    'holidays-2026': 'feriados-2026',
    'feriados-2026-es': 'feriados-2026',
    'internet-speed-test': 'teste-velocidade-internet',
    'prueba-velocidad-internet': 'teste-velocidade-internet',
    'internet-geschwindigkeitstest': 'teste-velocidade-internet',
    'test-vitesse-internet': 'teste-velocidade-internet',
    'test-skorosti-interneta': 'teste-velocidade-internet',
    'test-velocita-internet': 'teste-velocidade-internet',
  };

  return slugMap[slug] || slug;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const toolKey = getToolKeyBySlug(slug);
  const t = await getTranslations({ locale, namespace: `tools.${toolKey}` });

  const title = `${t('name')} - Free Digital Tools`;
  const description = t('metaDescription');

  const localeMap: Record<string, string> = {
    en: 'en_US',
    pt: 'pt_BR',
    es: 'es_ES',
  };

  // Get tool data for keywords
  const tool = tools.find(t => t.slug === toolKey);
  const keywords = tool?.keywords || [];

  const baseUrl = 'https://ferramentasdigitais.com.br';
  const currentUrl = `${baseUrl}/${locale}/${slug}`;
  const ogImage = `${baseUrl}/og-image.png`; // Default OG image

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Ferramentas Digitais' }],
    creator: 'Ferramentas Digitais',
    publisher: 'Ferramentas Digitais',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: 'Ferramentas Digitais',
      locale: localeMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@ferramentasdigit',
      creator: '@ferramentasdigit',
      images: [ogImage],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'en-US': `${baseUrl}/en/${slug}`,
        'pt-BR': `${baseUrl}/pt/${slug}`,
        'es-ES': `${baseUrl}/es/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'pt', 'es'];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const t = await getTranslations({ locale, namespace: 'tools' });

    for (const tool of tools) {
      const slug = t(`${tool.slug}.slug`);
      params.push({ locale, slug });
    }
  }

  return params;
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const toolKey = getToolKeyBySlug(slug);

  return <ToolPageContent locale={locale} slug={slug} toolKey={toolKey} />;
}

async function ToolPageContent({ locale, slug, toolKey }: { locale: string; slug: string; toolKey: string }) {
  const t = await getTranslations({ locale, namespace: `tools.${toolKey}` });
  const tSite = await getTranslations({ locale, namespace: 'site' });

  // Verify tool exists
  const toolExists = tools.find(tool => tool.slug === toolKey);
  if (!toolExists) {
    notFound();
  }

  // Get rich content for the tool
  const toolContent = getToolContent(locale, toolKey) || getDefaultContent(locale);

  // Labels for content sections
  const labels: Record<string, Record<string, string>> = {
    pt: {
      about: 'Sobre esta ferramenta',
      howToUse: 'Como usar',
      faq: 'Perguntas Frequentes',
      useCases: 'Casos de uso',
    },
    en: {
      about: 'About this tool',
      howToUse: 'How to use',
      faq: 'Frequently Asked Questions',
      useCases: 'Use cases',
    },
    es: {
      about: 'Sobre esta herramienta',
      howToUse: 'Cómo usar',
      faq: 'Preguntas frecuentes',
      useCases: 'Casos de uso',
    },
    fr: {
      about: 'À propos de cet outil',
      howToUse: 'Comment utiliser',
      faq: 'Questions fréquentes',
      useCases: "Cas d'utilisation",
    },
    de: {
      about: 'Über dieses Tool',
      howToUse: 'Wie man es benutzt',
      faq: 'Häufig gestellte Fragen',
      useCases: 'Anwendungsfälle',
    },
    it: {
      about: 'Informazioni su questo strumento',
      howToUse: 'Come usare',
      faq: 'Domande frequenti',
      useCases: 'Casi d\'uso',
    },
    ru: {
      about: 'Об этом инструменте',
      howToUse: 'Как использовать',
      faq: 'Часто задаваемые вопросы',
      useCases: 'Примеры использования',
    },
  };

  const currentLabels = labels[locale] || labels['pt'];
  const baseUrl = 'https://ferramentasdigitais.com.br';

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/${locale}` },
    { name: t('name'), url: `${baseUrl}/${locale}/${slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD Schemas */}
      <ToolSchema
        name={t('name')}
        description={t('metaDescription')}
        url={`${baseUrl}/${locale}/${slug}`}
        category={toolExists.category}
        locale={locale}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {toolContent.faq.length > 0 && <FAQSchema items={toolContent.faq} />}

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Ad Slot - Top */}
      <div className="mb-8">
        <AdSlot position="top" />
      </div>

      {/* Tool Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-6xl mb-4" role="img" aria-label={t('name')}>
          {toolExists.icon || '🛠️'}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {t('name')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Tool Component - Loaded client-side only */}
      <div className="max-w-4xl mx-auto">
        <ClientToolLoader slug={slug} />
      </div>

      {/* Ad Slot - Middle */}
      <div className="mt-12">
        <AdSlot position="middle" />
      </div>

      {/* Rich SEO Content Section */}
      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        {/* About Section */}
        <section className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-900/50 p-6 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {currentLabels.about}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {toolContent.longDescription}
          </p>
        </section>

        {/* How to Use Section */}
        <section className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-900/50 p-6 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {currentLabels.howToUse}
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            {toolContent.howToUse.map((step, index) => (
              <li key={index} className="leading-relaxed pl-2">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Use Cases Section */}
        <section className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-900/50 p-6 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {currentLabels.useCases}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {toolContent.useCases.map((useCase, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-green-500">✓</span>
                {useCase}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-900/50 p-6 transition-colors">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {currentLabels.faq}
          </h2>
          <div className="space-y-6">
            {toolContent.faq.map((item, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Ad Slot - Bottom */}
      <div className="mt-12">
        <AdSlot position="bottom" />
      </div>
    </div>
  );
}
