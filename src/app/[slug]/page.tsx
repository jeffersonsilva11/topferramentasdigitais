import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getToolBySlug, getToolMetadata, tools } from '@/lib/tools';
import AdSlot from '@/components/AdSlot';

// Importar componentes das ferramentas
import MeuIP from '@/components/tools/MeuIP';
import GeradorQRCode from '@/components/tools/GeradorQRCode';
import ContadorPalavras from '@/components/tools/ContadorPalavras';
import ConverterPDFJPG from '@/components/tools/ConverterPDFJPG';
import ConverterJPGPDF from '@/components/tools/ConverterJPGPDF';
import ComprimirImagem from '@/components/tools/ComprimirImagem';
import RedimensionarImagem from '@/components/tools/RedimensionarImagem';
import CalculadoraPorcentagem from '@/components/tools/CalculadoraPorcentagem';
import GeradorSenha from '@/components/tools/GeradorSenha';
import ConverterPNGJPG from '@/components/tools/ConverterPNGJPG';
import ContadorCaracteres from '@/components/tools/ContadorCaracteres';
import GeradorLoremIpsum from '@/components/tools/GeradorLoremIpsum';
import SiteOnline from '@/components/tools/SiteOnline';
import MeuUserAgent from '@/components/tools/MeuUserAgent';
import ConverterWebPJPG from '@/components/tools/ConverterWebPJPG';
import RegraDeTres from '@/components/tools/RegraDeTres';
import GeradorHash from '@/components/tools/GeradorHash';
import JSONFormatter from '@/components/tools/JSONFormatter';
import ConversorBytes from '@/components/tools/ConversorBytes';
import GeradorUUID from '@/components/tools/GeradorUUID';

// Mapa de componentes por slug
const toolComponents: Record<string, React.ComponentType> = {
  'meu-ip': MeuIP,
  'gerador-qr-code': GeradorQRCode,
  'contador-palavras': ContadorPalavras,
  'converter-pdf-jpg': ConverterPDFJPG,
  'converter-jpg-pdf': ConverterJPGPDF,
  'comprimir-imagem': ComprimirImagem,
  'redimensionar-imagem': RedimensionarImagem,
  'calculadora-porcentagem': CalculadoraPorcentagem,
  'gerador-senha': GeradorSenha,
  'converter-png-jpg': ConverterPNGJPG,
  'contador-caracteres': ContadorCaracteres,
  'gerador-lorem-ipsum': GeradorLoremIpsum,
  'site-online': SiteOnline,
  'meu-user-agent': MeuUserAgent,
  'converter-webp-jpg': ConverterWebPJPG,
  'regra-de-tres': RegraDeTres,
  'gerador-hash': GeradorHash,
  'json-formatter': JSONFormatter,
  'conversor-bytes': ConversorBytes,
  'gerador-uuid': GeradorUUID,
};

// Gerar metadata dinâmica para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Ferramenta não encontrada',
    };
  }

  const metadata = getToolMetadata(tool);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
    alternates: {
      canonical: `/${tool.slug}`,
    },
  };
}

// Gerar rotas estáticas para todas as ferramentas (SSG)
export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[tool.slug];

  if (!ToolComponent) {
    return <div>Ferramenta em desenvolvimento...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Ad Slot - Top */}
      <div className="mb-8">
        <AdSlot position="top" />
      </div>

      {/* Tool Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-6xl mb-4">{tool.icon}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {tool.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {tool.description}
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
        <h2 className="text-2xl font-bold mb-4">Sobre esta ferramenta</h2>
        <p className="text-gray-700 mb-4">
          {tool.metaDescription}
        </p>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Palavras-chave relacionadas:</h3>
          <div className="flex flex-wrap gap-2">
            {tool.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
