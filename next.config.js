const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Fix for workspace root detection with multiple lockfiles
  outputFileTracingRoot: __dirname,

  // Mark client-only libraries as external for server-side rendering
  // These libraries use browser APIs (DOM, Canvas, etc) and cannot run in Node.js
  serverExternalPackages: [
    'html2canvas',
    'jspdf',
    'qrcode',
    'crypto-js',
    'dompurify',
    'browser-image-compression',
    'pdfjs-dist',
  ],

  // next-intl automatically configured via plugin
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig);
