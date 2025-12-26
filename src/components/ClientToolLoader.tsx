'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic imports with ssr: false to prevent server-side rendering
// This prevents errors with libraries that use browser-only APIs (DOM, Canvas, etc.)
const toolComponents = {
  'meu-ip': dynamic(() => import('@/components/tools/MeuIP'), { ssr: false }),
  'what-is-my-ip': dynamic(() => import('@/components/tools/MeuIP'), { ssr: false }),
  'cual-es-mi-ip': dynamic(() => import('@/components/tools/MeuIP'), { ssr: false }),

  'gerador-qr-code': dynamic(() => import('@/components/tools/GeradorQRCode'), { ssr: false }),
  'qr-code-generator': dynamic(() => import('@/components/tools/GeradorQRCode'), { ssr: false }),
  'generador-codigo-qr': dynamic(() => import('@/components/tools/GeradorQRCode'), { ssr: false }),

  'contador-texto': dynamic(() => import('@/components/tools/ContadorTexto'), { ssr: false }),
  'text-counter': dynamic(() => import('@/components/tools/ContadorTexto'), { ssr: false }),

  'converter-pdf-jpg': dynamic(() => import('@/components/tools/ConverterPDFJPG'), { ssr: false }),
  'convert-pdf-to-jpg': dynamic(() => import('@/components/tools/ConverterPDFJPG'), { ssr: false }),
  'convertir-pdf-jpg': dynamic(() => import('@/components/tools/ConverterPDFJPG'), { ssr: false }),

  'converter-jpg-pdf': dynamic(() => import('@/components/tools/ConverterJPGPDF'), { ssr: false }),
  'convert-jpg-to-pdf': dynamic(() => import('@/components/tools/ConverterJPGPDF'), { ssr: false }),
  'convertir-jpg-pdf': dynamic(() => import('@/components/tools/ConverterJPGPDF'), { ssr: false }),

  'comprimir-imagem': dynamic(() => import('@/components/tools/ComprimirImagem'), { ssr: false }),
  'image-compressor': dynamic(() => import('@/components/tools/ComprimirImagem'), { ssr: false }),
  'comprimir-imagen': dynamic(() => import('@/components/tools/ComprimirImagem'), { ssr: false }),

  'redimensionar-imagem': dynamic(() => import('@/components/tools/RedimensionarImagem'), { ssr: false }),
  'resize-image': dynamic(() => import('@/components/tools/RedimensionarImagem'), { ssr: false }),
  'redimensionar-imagen': dynamic(() => import('@/components/tools/RedimensionarImagem'), { ssr: false }),

  'calculadora-porcentagem': dynamic(() => import('@/components/tools/CalculadoraPorcentagem'), { ssr: false }),
  'percentage-calculator': dynamic(() => import('@/components/tools/CalculadoraPorcentagem'), { ssr: false }),
  'calculadora-porcentaje': dynamic(() => import('@/components/tools/CalculadoraPorcentagem'), { ssr: false }),

  'gerador-senha': dynamic(() => import('@/components/tools/GeradorSenha'), { ssr: false }),
  'password-generator': dynamic(() => import('@/components/tools/GeradorSenha'), { ssr: false }),
  'generador-contrasenas': dynamic(() => import('@/components/tools/GeradorSenha'), { ssr: false }),

  'converter-png-jpg': dynamic(() => import('@/components/tools/ConverterPNGJPG'), { ssr: false }),
  'convert-png-to-jpg': dynamic(() => import('@/components/tools/ConverterPNGJPG'), { ssr: false }),
  'convertir-png-jpg': dynamic(() => import('@/components/tools/ConverterPNGJPG'), { ssr: false }),

  'gerador-lorem-ipsum': dynamic(() => import('@/components/tools/GeradorLoremIpsum'), { ssr: false }),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/GeradorLoremIpsum'), { ssr: false }),
  'generador-lorem-ipsum': dynamic(() => import('@/components/tools/GeradorLoremIpsum'), { ssr: false }),

  'site-online': dynamic(() => import('@/components/tools/SiteOnline'), { ssr: false }),
  'website-status-checker': dynamic(() => import('@/components/tools/SiteOnline'), { ssr: false }),
  'sitio-online': dynamic(() => import('@/components/tools/SiteOnline'), { ssr: false }),

  'meu-user-agent': dynamic(() => import('@/components/tools/MeuUserAgent'), { ssr: false }),
  'my-user-agent': dynamic(() => import('@/components/tools/MeuUserAgent'), { ssr: false }),
  'mi-user-agent': dynamic(() => import('@/components/tools/MeuUserAgent'), { ssr: false }),

  'converter-webp-jpg': dynamic(() => import('@/components/tools/ConverterWebPJPG'), { ssr: false }),
  'convert-webp-to-jpg': dynamic(() => import('@/components/tools/ConverterWebPJPG'), { ssr: false }),
  'convertir-webp-jpg': dynamic(() => import('@/components/tools/ConverterWebPJPG'), { ssr: false }),

  'regra-de-tres': dynamic(() => import('@/components/tools/RegraDeTres'), { ssr: false }),
  'rule-of-three-calculator': dynamic(() => import('@/components/tools/RegraDeTres'), { ssr: false }),
  'regla-de-tres': dynamic(() => import('@/components/tools/RegraDeTres'), { ssr: false }),

  'gerador-hash': dynamic(() => import('@/components/tools/GeradorHash'), { ssr: false }),
  'hash-generator': dynamic(() => import('@/components/tools/GeradorHash'), { ssr: false }),
  'generador-hash': dynamic(() => import('@/components/tools/GeradorHash'), { ssr: false }),

  'json-formatter': dynamic(() => import('@/components/tools/JSONFormatter'), { ssr: false }),
  'formateador-json': dynamic(() => import('@/components/tools/JSONFormatter'), { ssr: false }),

  'conversor-bytes': dynamic(() => import('@/components/tools/ConversorBytes'), { ssr: false }),
  'bytes-converter': dynamic(() => import('@/components/tools/ConversorBytes'), { ssr: false }),

  'gerador-uuid': dynamic(() => import('@/components/tools/GeradorUUID'), { ssr: false }),
  'uuid-generator': dynamic(() => import('@/components/tools/GeradorUUID'), { ssr: false }),
  'generador-uuid': dynamic(() => import('@/components/tools/GeradorUUID'), { ssr: false }),

  'gerador-link-whatsapp': dynamic(() => import('@/components/tools/GeradorLinkWhatsApp'), { ssr: false }),
  'whatsapp-link-generator': dynamic(() => import('@/components/tools/GeradorLinkWhatsApp'), { ssr: false }),
  'generador-enlace-whatsapp': dynamic(() => import('@/components/tools/GeradorLinkWhatsApp'), { ssr: false }),

  'gerador-chave-pix': dynamic(() => import('@/components/tools/GeradorChavePix'), { ssr: false }),
  'pix-key-generator': dynamic(() => import('@/components/tools/GeradorChavePix'), { ssr: false }),
  'generador-clave-pix': dynamic(() => import('@/components/tools/GeradorChavePix'), { ssr: false }),

  'lista-emojis': dynamic(() => import('@/components/tools/ListaEmojis'), { ssr: false }),
  'emoji-list': dynamic(() => import('@/components/tools/ListaEmojis'), { ssr: false }),
  'lista-emojis-es': dynamic(() => import('@/components/tools/ListaEmojis'), { ssr: false }),

  'cronometro-timer': dynamic(() => import('@/components/tools/CronometroTimer'), { ssr: false }),
  'stopwatch-timer': dynamic(() => import('@/components/tools/CronometroTimer'), { ssr: false }),
  'cronometro-temporizador': dynamic(() => import('@/components/tools/CronometroTimer'), { ssr: false }),

  'cotacao-moedas': dynamic(() => import('@/components/tools/CotacaoMoedas'), { ssr: false }),
  'currency-exchange': dynamic(() => import('@/components/tools/CotacaoMoedas'), { ssr: false }),
  'cotizacion-monedas': dynamic(() => import('@/components/tools/CotacaoMoedas'), { ssr: false }),

  'conversor-json-csv': dynamic(() => import('@/components/tools/ConversorJSONCSV'), { ssr: false }),
  'json-csv-converter': dynamic(() => import('@/components/tools/ConversorJSONCSV'), { ssr: false }),
  'conversor-json-csv-es': dynamic(() => import('@/components/tools/ConversorJSONCSV'), { ssr: false }),

  'gerador-utm': dynamic(() => import('@/components/tools/GeradorUTM'), { ssr: false }),
  'utm-generator': dynamic(() => import('@/components/tools/GeradorUTM'), { ssr: false }),
  'generador-utm': dynamic(() => import('@/components/tools/GeradorUTM'), { ssr: false }),

  'calculadora-juros': dynamic(() => import('@/components/tools/CalculadoraJuros'), { ssr: false }),
  'compound-interest-calculator': dynamic(() => import('@/components/tools/CalculadoraJuros'), { ssr: false }),
  'calculadora-intereses': dynamic(() => import('@/components/tools/CalculadoraJuros'), { ssr: false }),

  'feriados-2026': dynamic(() => import('@/components/tools/FeriadosNacionais'), { ssr: false }),
  'holidays-2026': dynamic(() => import('@/components/tools/FeriadosNacionais'), { ssr: false }),
  'feriados-2026-es': dynamic(() => import('@/components/tools/FeriadosNacionais'), { ssr: false }),

  'teleprompter': dynamic(() => import('@/components/tools/Teleprompter'), { ssr: false }),

  'calculadora-roi': dynamic(() => import('@/components/tools/CalculadoraROI'), { ssr: false }),
  'roi-calculator': dynamic(() => import('@/components/tools/CalculadoraROI'), { ssr: false }),
  'calculadora-roi-es': dynamic(() => import('@/components/tools/CalculadoraROI'), { ssr: false }),

  'gravador-tela': dynamic(() => import('@/components/tools/GravadorTela'), { ssr: false }),
  'screen-recorder': dynamic(() => import('@/components/tools/GravadorTela'), { ssr: false }),
  'grabador-pantalla': dynamic(() => import('@/components/tools/GravadorTela'), { ssr: false }),

  'testador-microfone-camera': dynamic(() => import('@/components/tools/TestadorMicrofoneCamera'), { ssr: false }),
  'microphone-camera-tester': dynamic(() => import('@/components/tools/TestadorMicrofoneCamera'), { ssr: false }),
  'probador-microfono-camara': dynamic(() => import('@/components/tools/TestadorMicrofoneCamera'), { ssr: false }),

  'gerador-numero-aleatorio': dynamic(() => import('@/components/tools/GeradorNumeroAleatorio'), { ssr: false }),
  'random-number-generator': dynamic(() => import('@/components/tools/GeradorNumeroAleatorio'), { ssr: false }),
  'generador-numero-aleatorio': dynamic(() => import('@/components/tools/GeradorNumeroAleatorio'), { ssr: false }),

  'gerador-loteria': dynamic(() => import('@/components/tools/GeradorLoteria'), { ssr: false }),
  'lottery-generator': dynamic(() => import('@/components/tools/GeradorLoteria'), { ssr: false }),
  'generador-loteria': dynamic(() => import('@/components/tools/GeradorLoteria'), { ssr: false }),

  'amigo-oculto': dynamic(() => import('@/components/tools/AmigoOculto'), { ssr: false }),
  'secret-santa': dynamic(() => import('@/components/tools/AmigoOculto'), { ssr: false }),
  'amigo-secreto': dynamic(() => import('@/components/tools/AmigoOculto'), { ssr: false }),

  'roleta-sorte': dynamic(() => import('@/components/tools/RoletaSorte'), { ssr: false }),
  'wheel-of-fortune': dynamic(() => import('@/components/tools/RoletaSorte'), { ssr: false }),
  'rueda-fortuna': dynamic(() => import('@/components/tools/RoletaSorte'), { ssr: false }),

  'validador-regex': dynamic(() => import('@/components/tools/ValidadorRegex'), { ssr: false }),
  'regex-validator': dynamic(() => import('@/components/tools/ValidadorRegex'), { ssr: false }),
  'validador-regex-es': dynamic(() => import('@/components/tools/ValidadorRegex'), { ssr: false }),

  'gerador-politicas': dynamic(() => import('@/components/tools/GeradorPoliticas'), { ssr: false }),
  'policy-generator': dynamic(() => import('@/components/tools/GeradorPoliticas'), { ssr: false }),
  'generador-politicas': dynamic(() => import('@/components/tools/GeradorPoliticas'), { ssr: false }),

  'gerador-paleta-cores': dynamic(() => import('@/components/tools/GeradorPaletaCores'), { ssr: false }),
  'color-palette-generator': dynamic(() => import('@/components/tools/GeradorPaletaCores'), { ssr: false }),
  'generador-paleta-colores': dynamic(() => import('@/components/tools/GeradorPaletaCores'), { ssr: false }),
};

interface ClientToolLoaderProps {
  slug: string;
}

export default function ClientToolLoader({ slug }: ClientToolLoaderProps) {
  const ToolComponent = toolComponents[slug as keyof typeof toolComponents];

  if (!ToolComponent) {
    return null;
  }

  return <ToolComponent />;
}
