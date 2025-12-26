import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { tools } from '@/lib/tools';
import AdSlot from '@/components/AdSlot';

// Import tool components
import MeuIP from '@/components/tools/MeuIP';
import GeradorQRCode from '@/components/tools/GeradorQRCode';
import ContadorTexto from '@/components/tools/ContadorTexto';
import ConverterPDFJPG from '@/components/tools/ConverterPDFJPG';
import ConverterJPGPDF from '@/components/tools/ConverterJPGPDF';
import ComprimirImagem from '@/components/tools/ComprimirImagem';
import RedimensionarImagem from '@/components/tools/RedimensionarImagem';
import CalculadoraPorcentagem from '@/components/tools/CalculadoraPorcentagem';
import GeradorSenha from '@/components/tools/GeradorSenha';
import ConverterPNGJPG from '@/components/tools/ConverterPNGJPG';
import GeradorLoremIpsum from '@/components/tools/GeradorLoremIpsum';
import SiteOnline from '@/components/tools/SiteOnline';
import MeuUserAgent from '@/components/tools/MeuUserAgent';
import ConverterWebPJPG from '@/components/tools/ConverterWebPJPG';
import RegraDeTres from '@/components/tools/RegraDeTres';
import GeradorHash from '@/components/tools/GeradorHash';
import JSONFormatter from '@/components/tools/JSONFormatter';
import ConversorBytes from '@/components/tools/ConversorBytes';
import GeradorUUID from '@/components/tools/GeradorUUID';
// New tools
import GeradorLinkWhatsApp from '@/components/tools/GeradorLinkWhatsApp';
import GeradorChavePix from '@/components/tools/GeradorChavePix';
import ListaEmojis from '@/components/tools/ListaEmojis';
import CronometroTimer from '@/components/tools/CronometroTimer';
import CotacaoMoedas from '@/components/tools/CotacaoMoedas';
import ConversorJSONCSV from '@/components/tools/ConversorJSONCSV';
import GeradorUTM from '@/components/tools/GeradorUTM';
import CalculadoraJuros from '@/components/tools/CalculadoraJuros';
import ConsultaWHOIS from '@/components/tools/ConsultaWHOIS';
import FeriadosNacionais from '@/components/tools/FeriadosNacionais';

const toolComponents: Record<string, React.ComponentType> = {
  'meu-ip': MeuIP,
  'what-is-my-ip': MeuIP,
  'cual-es-mi-ip': MeuIP,
  'gerador-qr-code': GeradorQRCode,
  'qr-code-generator': GeradorQRCode,
  'generador-codigo-qr': GeradorQRCode,
  'contador-texto': ContadorTexto,
  'text-counter': ContadorTexto,
  'converter-pdf-jpg': ConverterPDFJPG,
  'convert-pdf-to-jpg': ConverterPDFJPG,
  'convertir-pdf-jpg': ConverterPDFJPG,
  'converter-jpg-pdf': ConverterJPGPDF,
  'convert-jpg-to-pdf': ConverterJPGPDF,
  'convertir-jpg-pdf': ConverterJPGPDF,
  'comprimir-imagem': ComprimirImagem,
  'image-compressor': ComprimirImagem,
  'comprimir-imagen': ComprimirImagem,
  'redimensionar-imagem': RedimensionarImagem,
  'resize-image': RedimensionarImagem,
  'redimensionar-imagen': RedimensionarImagem,
  'calculadora-porcentagem': CalculadoraPorcentagem,
  'percentage-calculator': CalculadoraPorcentagem,
  'calculadora-porcentaje': CalculadoraPorcentagem,
  'gerador-senha': GeradorSenha,
  'password-generator': GeradorSenha,
  'generador-contrasenas': GeradorSenha,
  'converter-png-jpg': ConverterPNGJPG,
  'convert-png-to-jpg': ConverterPNGJPG,
  'convertir-png-jpg': ConverterPNGJPG,
  'gerador-lorem-ipsum': GeradorLoremIpsum,
  'lorem-ipsum-generator': GeradorLoremIpsum,
  'generador-lorem-ipsum': GeradorLoremIpsum,
  'site-online': SiteOnline,
  'website-status-checker': SiteOnline,
  'sitio-online': SiteOnline,
  'meu-user-agent': MeuUserAgent,
  'my-user-agent': MeuUserAgent,
  'mi-user-agent': MeuUserAgent,
  'converter-webp-jpg': ConverterWebPJPG,
  'convert-webp-to-jpg': ConverterWebPJPG,
  'convertir-webp-jpg': ConverterWebPJPG,
  'regra-de-tres': RegraDeTres,
  'rule-of-three-calculator': RegraDeTres,
  'regla-de-tres': RegraDeTres,
  'gerador-hash': GeradorHash,
  'hash-generator': GeradorHash,
  'generador-hash': GeradorHash,
  'json-formatter': JSONFormatter,
  'formateador-json': JSONFormatter,
  'conversor-bytes': ConversorBytes,
  'bytes-converter': ConversorBytes,
  'gerador-uuid': GeradorUUID,
  'uuid-generator': GeradorUUID,
  'generador-uuid': GeradorUUID,
  'gerador-link-whatsapp': GeradorLinkWhatsApp,
  'whatsapp-link-generator': GeradorLinkWhatsApp,
  'generador-enlace-whatsapp': GeradorLinkWhatsApp,
  'gerador-chave-pix': GeradorChavePix,
  'pix-key-generator': GeradorChavePix,
  'generador-clave-pix': GeradorChavePix,
  'lista-emojis': ListaEmojis,
  'emoji-list': ListaEmojis,
  'lista-emojis-es': ListaEmojis,
  'cronometro-timer': CronometroTimer,
  'stopwatch-timer': CronometroTimer,
  'cronometro-temporizador': CronometroTimer,
  'cotacao-moedas': CotacaoMoedas,
  'currency-exchange': CotacaoMoedas,
  'cotizacion-monedas': CotacaoMoedas,
  'conversor-json-csv': ConversorJSONCSV,
  'json-csv-converter': ConversorJSONCSV,
  'conversor-json-csv-es': ConversorJSONCSV,
  'gerador-utm': GeradorUTM,
  'utm-generator': GeradorUTM,
  'generador-utm': GeradorUTM,
  'calculadora-juros': CalculadoraJuros,
  'compound-interest-calculator': CalculadoraJuros,
  'calculadora-intereses': CalculadoraJuros,
  'consulta-whois': ConsultaWHOIS,
  'whois-lookup': ConsultaWHOIS,
  'consulta-whois-es': ConsultaWHOIS,
  'feriados-2026': FeriadosNacionais,
  'holidays-2026': FeriadosNacionais,
  'feriados-2026-es': FeriadosNacionais,
};

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

  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
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
          {tools.find(tool => tool.slug === toolKey)?.icon || '🛠️'}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t('name')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Tool Component */}
      <div className="max-w-4xl mx-auto">
        <ToolComponent />
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
