'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { showSuccess } from '@/lib/toast';

export default function AssinaturaEmail() {
  const locale = useLocale();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
        <tr>
            <td style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 20px; border-right: 3px solid ${primaryColor};">
                            <div style="width: 80px; height: 80px; background: ${primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: bold;">
                                ${name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                        </td>
                        <td style="padding-left: 20px;">
                            <div style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
                                ${name || 'Seu Nome'}
                            </div>
                            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                                ${title || 'Seu Cargo'}${company ? ` | ${company}` : ''}
                            </div>
                            <div style="margin-top: 12px;">
                                ${email ? `<div style="margin-bottom: 4px;">
                                    <span style="color: ${primaryColor};">✉</span>
                                    <a href="mailto:${email}" style="color: #4b5563; text-decoration: none;">${email}</a>
                                </div>` : ''}
                                ${phone ? `<div style="margin-bottom: 4px;">
                                    <span style="color: ${primaryColor};">📞</span>
                                    <span style="color: #4b5563;">${phone}</span>
                                </div>` : ''}
                                ${website ? `<div style="margin-bottom: 4px;">
                                    <span style="color: ${primaryColor};">🌐</span>
                                    <a href="${website}" style="color: #4b5563; text-decoration: none;">${website.replace(/^https?:\/\//, '')}</a>
                                </div>` : ''}
                                ${linkedin ? `<div style="margin-bottom: 4px;">
                                    <span style="color: ${primaryColor};">💼</span>
                                    <a href="${linkedin}" style="color: #4b5563; text-decoration: none;">LinkedIn</a>
                                </div>` : ''}
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
  };

  const copyHTML = () => {
    const html = generateHTML();
    navigator.clipboard.writeText(html);
    showSuccess(locale === 'pt' ? 'HTML copiado!' : 'HTML copied!');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {locale === 'pt' ? 'Informações:' : 'Information:'}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Nome Completo:' : 'Full Name:'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'pt' ? 'João Silva' : 'John Doe'}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Cargo:' : 'Job Title:'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={locale === 'pt' ? 'Desenvolvedor' : 'Developer'}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Empresa:' : 'Company:'}
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={locale === 'pt' ? 'Minha Empresa' : 'My Company'}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'E-mail:' : 'Email:'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joao@empresa.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Telefone:' : 'Phone:'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+55 11 98765-4321"
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Website:' : 'Website:'}
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://empresa.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn:
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/joaosilva"
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Cor Principal:' : 'Primary Color:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-dark-600"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                />
              </div>
            </div>

            <button
              onClick={copyHTML}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              {locale === 'pt' ? 'Copiar HTML' : 'Copy HTML'}
            </button>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {locale === 'pt' ? 'Pré-visualização:' : 'Preview:'}
            </h3>
            <div className="border-2 border-gray-200 dark:border-dark-600 rounded-lg p-6 bg-white">
              <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
            </div>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                💡 <strong>{locale === 'pt' ? 'Dica:' : 'Tip:'}</strong>{' '}
                {locale === 'pt'
                  ? 'Copie o HTML e cole nas configurações de assinatura do seu cliente de e-mail (Gmail, Outlook, etc.)'
                  : 'Copy the HTML and paste it into your email client signature settings (Gmail, Outlook, etc.)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
