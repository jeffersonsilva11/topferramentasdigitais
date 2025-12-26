import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ferramentas Digitais - Utilitários Online Gratuitos',
  description: 'Coleção completa de ferramentas online gratuitas: conversores, geradores, calculadoras e muito mais. Sem cadastro, sem limites!',
  keywords: ['ferramentas online', 'utilitários gratuitos', 'conversor', 'gerador', 'calculadora', 'qr code', 'pdf', 'imagem'],
  authors: [{ name: 'Ferramentas Digitais' }],
  openGraph: {
    title: 'Ferramentas Digitais - Utilitários Online Gratuitos',
    description: 'Coleção completa de ferramentas online gratuitas: conversores, geradores, calculadoras e muito mais.',
    url: 'https://ferramentasdigitais.com.br',
    siteName: 'Ferramentas Digitais',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferramentas Digitais - Utilitários Online Gratuitos',
    description: 'Coleção completa de ferramentas online gratuitas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Adicione aqui o código de verificação do Google Search Console quando disponível
    // google: 'seu-código-de-verificação',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics - Adicione seu ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}

        {/* Google AdSense - Adicione seu código */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
