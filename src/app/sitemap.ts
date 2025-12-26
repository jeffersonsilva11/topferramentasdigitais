import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

const baseUrl = 'https://ferramentasdigitais.com.br'; // Replace with your actual domain

const locales = ['en', 'pt', 'es'];

// Map of tool slugs by locale
const toolSlugMap: Record<string, Record<string, string>> = {
  'meu-ip': { en: 'what-is-my-ip', pt: 'meu-ip', es: 'cual-es-mi-ip' },
  'gerador-qr-code': { en: 'qr-code-generator', pt: 'gerador-qr-code', es: 'generador-codigo-qr' },
  'contador-texto': { en: 'text-counter', pt: 'contador-texto', es: 'contador-texto' },
  'converter-pdf-jpg': { en: 'convert-pdf-to-jpg', pt: 'converter-pdf-jpg', es: 'convertir-pdf-jpg' },
  'converter-jpg-pdf': { en: 'convert-jpg-to-pdf', pt: 'converter-jpg-pdf', es: 'convertir-jpg-pdf' },
  'comprimir-imagem': { en: 'image-compressor', pt: 'comprimir-imagem', es: 'comprimir-imagen' },
  'redimensionar-imagem': { en: 'resize-image', pt: 'redimensionar-imagem', es: 'redimensionar-imagen' },
  'calculadora-porcentagem': { en: 'percentage-calculator', pt: 'calculadora-porcentagem', es: 'calculadora-porcentaje' },
  'gerador-senha': { en: 'password-generator', pt: 'gerador-senha', es: 'generador-contrasenas' },
  'converter-png-jpg': { en: 'convert-png-to-jpg', pt: 'converter-png-jpg', es: 'convertir-png-jpg' },
  'gerador-lorem-ipsum': { en: 'lorem-ipsum-generator', pt: 'gerador-lorem-ipsum', es: 'generador-lorem-ipsum' },
  'site-online': { en: 'website-status-checker', pt: 'site-online', es: 'sitio-online' },
  'meu-user-agent': { en: 'my-user-agent', pt: 'meu-user-agent', es: 'mi-user-agent' },
  'converter-webp-jpg': { en: 'convert-webp-to-jpg', pt: 'converter-webp-jpg', es: 'convertir-webp-jpg' },
  'regra-de-tres': { en: 'rule-of-three-calculator', pt: 'regra-de-tres', es: 'regla-de-tres' },
  'gerador-hash': { en: 'hash-generator', pt: 'gerador-hash', es: 'generador-hash' },
  'json-formatter': { en: 'json-formatter', pt: 'json-formatter', es: 'formateador-json' },
  'conversor-bytes': { en: 'bytes-converter', pt: 'conversor-bytes', es: 'conversor-bytes' },
  'gerador-uuid': { en: 'uuid-generator', pt: 'gerador-uuid', es: 'generador-uuid' },
  'gerador-link-whatsapp': { en: 'whatsapp-link-generator', pt: 'gerador-link-whatsapp', es: 'generador-enlace-whatsapp' },
  'gerador-chave-pix': { en: 'pix-key-generator', pt: 'gerador-chave-pix', es: 'generador-clave-pix' },
  'lista-emojis': { en: 'emoji-list', pt: 'lista-emojis', es: 'lista-emojis' },
  'cronometro-timer': { en: 'stopwatch-timer', pt: 'cronometro-timer', es: 'cronometro-temporizador' },
  'cotacao-moedas': { en: 'currency-exchange', pt: 'cotacao-moedas', es: 'cotizacion-monedas' },
  'conversor-json-csv': { en: 'json-csv-converter', pt: 'conversor-json-csv', es: 'conversor-json-csv' },
  'gerador-utm': { en: 'utm-generator', pt: 'gerador-utm', es: 'generador-utm' },
  'calculadora-juros': { en: 'compound-interest-calculator', pt: 'calculadora-juros', es: 'calculadora-intereses' },
  'consulta-whois': { en: 'whois-lookup', pt: 'consulta-whois', es: 'consulta-whois' },
  'feriados-2026': { en: 'holidays-2026', pt: 'feriados-2026', es: 'feriados-2026' },
  'teleprompter': { en: 'teleprompter', pt: 'teleprompter', es: 'teleprompter' },
  'calculadora-roi': { en: 'roi-calculator', pt: 'calculadora-roi', es: 'calculadora-roi' },
  'gravador-tela': { en: 'screen-recorder', pt: 'gravador-tela', es: 'grabador-pantalla' },
  'testador-microfone-camera': { en: 'microphone-camera-tester', pt: 'testador-microfone-camera', es: 'probador-microfono-camara' },
  'gerador-numero-aleatorio': { en: 'random-number-generator', pt: 'gerador-numero-aleatorio', es: 'generador-numero-aleatorio' },
  'gerador-loteria': { en: 'lottery-generator', pt: 'gerador-loteria', es: 'generador-loteria' },
  'amigo-oculto': { en: 'secret-santa', pt: 'amigo-oculto', es: 'amigo-secreto' },
  'roleta-sorte': { en: 'wheel-of-fortune', pt: 'roleta-sorte', es: 'rueda-fortuna' },
  'validador-regex': { en: 'regex-validator', pt: 'validador-regex', es: 'validador-regex' },
  'gerador-politicas': { en: 'policy-generator', pt: 'gerador-politicas', es: 'generador-politicas' },
  'gerador-paleta-cores': { en: 'color-palette-generator', pt: 'gerador-paleta-cores', es: 'generador-paleta-colores' },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          pt: `${baseUrl}/pt`,
          es: `${baseUrl}/es`,
        },
      },
    });
  });

  // Tool pages for each locale
  tools.forEach((tool) => {
    locales.forEach((locale) => {
      const slug = toolSlugMap[tool.slug][locale];

      routes.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${toolSlugMap[tool.slug].en}`,
            pt: `${baseUrl}/pt/${toolSlugMap[tool.slug].pt}`,
            es: `${baseUrl}/es/${toolSlugMap[tool.slug].es}`,
          },
        },
      });
    });
  });

  return routes;
}
