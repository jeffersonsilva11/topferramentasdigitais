import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { tools } from '@/lib/tools';
import AdSlot from '@/components/AdSlot';
import ClientToolLoader from '@/components/ClientToolLoader';

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: localeMap[locale] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        'en-US': `/en/${slug}`,
        'pt-BR': `/pt/${slug}`,
        'es-ES': `/es/${slug}`,
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Ad Slot - Top */}
      <div className="mb-8">
        <AdSlot position="top" />
      </div>

      {/* Tool Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-6xl mb-4">
          {toolExists.icon || '🛠️'}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t('name')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Tool Component - Loaded client-side only */}
      <div className="max-w-4xl mx-auto">
        <ClientToolLoader slug={slug} />
      </div>

      {/* Ad Slot - Bottom */}
      <div className="mt-12">
        <AdSlot position="bottom" />
      </div>

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">{tSite('about')}</h2>
        <p className="text-gray-700 mb-4">
          {t('metaDescription')}
        </p>
      </div>
    </div>
  );
}
