'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/ui/Button';

type PolicyType = 'privacy' | 'terms' | 'cookies';

interface FormData {
  companyName: string;
  websiteUrl: string;
  country: string;
  contactEmail: string;
  lastUpdated: string;
}

export default function GeradorPoliticas() {
  const t = useTranslations('policyGeneratorUI');
  const locale = useLocale();
  const [policyType, setPolicyType] = useState<PolicyType>('privacy');
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    websiteUrl: '',
    country: '',
    contactEmail: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });
  const [generatedPolicy, setGeneratedPolicy] = useState('');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrivacyPolicy = () => {
    if (locale === 'pt') {
      return `POLÍTICA DE PRIVACIDADE

Última atualização: ${formData.lastUpdated}

Esta Política de Privacidade descreve como ${formData.companyName} ("nós", "nosso" ou "nossa empresa") coleta, usa e compartilha suas informações pessoais quando você visita ${formData.websiteUrl} (o "Website").

1. INFORMAÇÕES QUE COLETAMOS

Coletamos informações que você nos fornece diretamente quando usa nosso Website, incluindo:
- Informações de contato (nome, email, telefone)
- Informações de uso (páginas visitadas, tempo gasto, cliques)
- Informações técnicas (endereço IP, tipo de navegador, sistema operacional)

2. COMO USAMOS SUAS INFORMAÇÕES

Usamos as informações coletadas para:
- Fornecer e melhorar nossos serviços
- Comunicar com você sobre atualizações e ofertas
- Personalizar sua experiência
- Analisar e melhorar o desempenho do Website
- Cumprir obrigações legais

3. COMPARTILHAMENTO DE INFORMAÇÕES

Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
- Prestadores de serviços que nos ajudam a operar o Website
- Autoridades legais quando exigido por lei
- Parceiros de negócios com seu consentimento

4. COOKIES E TECNOLOGIAS DE RASTREAMENTO

Usamos cookies e tecnologias similares para melhorar sua experiência. Você pode controlar o uso de cookies através das configurações do seu navegador.

5. SEUS DIREITOS

Você tem o direito de:
- Acessar suas informações pessoais
- Corrigir informações incorretas
- Solicitar a exclusão de suas informações
- Optar por não receber comunicações de marketing
- Solicitar portabilidade de dados

6. SEGURANÇA DE DADOS

Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.

7. ALTERAÇÕES NESTA POLÍTICA

Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "Última atualização".

8. ENTRE EM CONTATO

Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
Email: ${formData.contactEmail}
Website: ${formData.websiteUrl}
País: ${formData.country}

---
AVISO LEGAL: Este é um modelo e não constitui aconselhamento jurídico. Consulte um advogado qualificado para garantir conformidade com as leis aplicáveis.
`;
    }

    return `PRIVACY POLICY

Last updated: ${formData.lastUpdated}

This Privacy Policy describes how ${formData.companyName} ("we", "us", or "our") collects, uses, and shares your personal information when you visit ${formData.websiteUrl} (the "Website").

1. INFORMATION WE COLLECT

We collect information that you provide directly to us, including:
- Name and contact information (email address, phone number)
- Account credentials
- Payment information
- Any other information you choose to provide

We also automatically collect certain information about your device when you use our Website, including:
- IP address
- Browser type and version
- Device type
- Operating system
- Referral URLs
- Pages viewed and time spent on pages

2. HOW WE USE YOUR INFORMATION

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send you technical notices and support messages
- Respond to your comments and questions
- Monitor and analyze trends and usage
- Detect, prevent, and address technical issues
- Comply with legal obligations

3. SHARING OF INFORMATION

We may share your information with:
- Service providers who perform services on our behalf
- Professional advisors such as lawyers and accountants
- Authorities when required by law
- Other parties with your consent

4. DATA SECURITY

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. YOUR RIGHTS

Depending on your location, you may have certain rights regarding your personal information, including:
- Access to your personal information
- Correction of inaccurate information
- Deletion of your information
- Restriction of processing
- Data portability
- Objection to processing

6. COOKIES

We use cookies and similar tracking technologies to track activity on our Website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

7. CHANGES TO THIS PRIVACY POLICY

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

8. CONTACT US

If you have any questions about this Privacy Policy, please contact us at:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: This is a template and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws.
`;
  };

  const generateTermsOfService = () => {
    if (locale === 'pt') {
      return `TERMOS DE SERVIÇO

Última atualização: ${formData.lastUpdated}

Por favor, leia estes Termos de Serviço ("Termos") cuidadosamente antes de usar ${formData.websiteUrl} (o "Website") operado por ${formData.companyName} ("nós", "nosso" ou "nossa empresa").

1. ACEITAÇÃO DOS TERMOS

Ao acessar ou usar o Website, você concorda em estar vinculado a estes Termos. Se você não concorda com qualquer parte destes termos, não deve usar nosso Website.

2. USO DO WEBSITE

Você concorda em usar o Website apenas para fins legais e de maneira que não viole os direitos de terceiros ou restrinja ou iniba o uso do Website por terceiros.

3. PROPRIEDADE INTELECTUAL

O Website e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva de ${formData.companyName}. O Website é protegido por leis de direitos autorais, marcas registradas e outras leis.

4. CONTEÚDO DO USUÁRIO

Nosso Website permite que você publique, vincule, armazene, compartilhe e disponibilize certas informações, textos, gráficos ou outros materiais ("Conteúdo").

Você é responsável pelo Conteúdo que publica no Website, incluindo sua legalidade, confiabilidade e adequação.

5. LINKS PARA OUTROS WEBSITES

Nosso Website pode conter links para websites ou serviços de terceiros que não são de propriedade ou controlados por ${formData.companyName}.

Não temos controle sobre e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de websites ou serviços de terceiros.

6. RESCISÃO

Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.

7. LIMITAÇÃO DE RESPONSABILIDADE

Em nenhuma circunstância ${formData.companyName} será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso ou outros prejuízos intangíveis.

8. ISENÇÃO DE GARANTIAS

O Website é fornecido "como está" e "conforme disponível" sem garantias de qualquer tipo, expressas ou implícitas.

9. LEI APLICÁVEL

Estes Termos serão regidos e interpretados de acordo com as leis de ${formData.country}, sem considerar suas disposições sobre conflito de leis.

10. ALTERAÇÕES

Reservamos o direito de modificar ou substituir estes Termos a qualquer momento. É sua responsabilidade verificar periodicamente estes Termos para quaisquer alterações.

11. ENTRE EM CONTATO

Se você tiver dúvidas sobre estes Termos, entre em contato conosco:
Email: ${formData.contactEmail}
Website: ${formData.websiteUrl}
País: ${formData.country}

---
AVISO LEGAL: Este é um modelo e não constitui aconselhamento jurídico. Consulte um advogado qualificado para garantir conformidade com as leis aplicáveis.
`;
    }

    return `TERMS OF SERVICE

Last updated: ${formData.lastUpdated}

Please read these Terms of Service ("Terms") carefully before using ${formData.websiteUrl} (the "Website") operated by ${formData.companyName} ("us", "we", or "our").

1. ACCEPTANCE OF TERMS

By accessing and using this Website, you accept and agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.

2. USE LICENSE

Permission is granted to temporarily access and use the Website for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.

Under this license, you may not:
- Modify or copy the materials
- Use the materials for any commercial purpose
- Attempt to reverse engineer any software on the Website
- Remove any copyright or proprietary notations
- Transfer the materials to another person
- Use the Website in any way that violates applicable laws

3. USER ACCOUNTS

When you create an account with us, you are responsible for:
- Maintaining the security of your account
- All activities that occur under your account
- Notifying us immediately of any unauthorized use

We reserve the right to terminate accounts, remove or edit content at our sole discretion.

4. CONTENT

Our Website allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content").

You are responsible for the Content that you post on or through the Website, including its legality, reliability, and appropriateness.

By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content.

5. INTELLECTUAL PROPERTY

The Website and its original content, features, and functionality are and will remain the exclusive property of ${formData.companyName}. The Website is protected by copyright, trademark, and other laws.

6. PROHIBITED USES

You may not use the Website:
- In any way that violates any applicable law or regulation
- To exploit, harm, or attempt to exploit or harm minors
- To transmit any advertising or promotional material
- To impersonate or attempt to impersonate the Company
- In any way that infringes upon the rights of others
- To engage in any other conduct that restricts or inhibits anyone's use of the Website

7. DISCLAIMER OF WARRANTIES

THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, REGARDING THE WEBSITE'S OPERATION OR THE INFORMATION, CONTENT, OR MATERIALS INCLUDED.

8. LIMITATION OF LIABILITY

IN NO EVENT SHALL ${formData.companyName} BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE WEBSITE.

9. GOVERNING LAW

These Terms shall be governed by the laws of ${formData.country}, without regard to its conflict of law provisions.

10. CHANGES TO TERMS

We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page.

11. CONTACT US

If you have any questions about these Terms, please contact us at:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: This is a template and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws.
`;
  };

  const generateCookiePolicy = () => {
    if (locale === 'pt') {
      return `POLÍTICA DE COOKIES

Última atualização: ${formData.lastUpdated}

Esta Política de Cookies explica como ${formData.companyName} ("nós", "nosso" ou "nossa empresa") usa cookies e tecnologias similares quando você visita ${formData.websiteUrl} (o "Website").

1. O QUE SÃO COOKIES?

Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um website. Eles ajudam os websites a lembrar suas preferências e melhorar sua experiência de navegação.

2. COMO USAMOS COOKIES?

Usamos cookies para:
- Essenciais: Necessários para o funcionamento básico do Website
- Desempenho: Coletam informações sobre como você usa o Website
- Funcionalidade: Lembram suas preferências e escolhas
- Publicidade: Fornecem anúncios relevantes para você

3. TIPOS DE COOKIES QUE USAMOS

a) Cookies Estritamente Necessários
Estes cookies são essenciais para o funcionamento do Website. Sem estes cookies, alguns serviços não podem ser fornecidos.

b) Cookies de Desempenho
Estes cookies nos ajudam a entender como os visitantes interagem com o Website, coletando e relatando informações anonimamente.

c) Cookies de Funcionalidade
Estes cookies permitem que o Website lembre suas escolhas (como idioma ou região) e forneça recursos aprimorados e personalizados.

d) Cookies de Publicidade/Direcionamento
Estes cookies são usados para entregar anúncios mais relevantes para você e seus interesses. Também são usados para limitar o número de vezes que você vê um anúncio.

4. COOKIES DE TERCEIROS

Além de nossos próprios cookies, também podemos usar vários cookies de terceiros para relatar estatísticas de uso do Website e fornecer anúncios através do Website.

5. COMO CONTROLAR COOKIES?

Você pode controlar e/ou excluir cookies como desejar. Você pode deletar todos os cookies já presentes no seu computador e configurar a maioria dos navegadores para impedir que sejam colocados.

Opções de controle de cookies:
- Configurações do navegador: Todos os navegadores modernos permitem que você gerencie cookies
- Ferramentas de terceiros: Existem ferramentas online que ajudam a gerenciar cookies

6. SINAIS DE NÃO RASTREAR

Alguns navegadores incluem um recurso de "Não Rastrear" (DNT). Atualmente, nosso Website não responde a sinais DNT.

7. ATUALIZAÇÕES DESTA POLÍTICA

Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças na tecnologia ou legislação. Quaisquer atualizações serão publicadas nesta página.

8. ENTRE EM CONTATO

Se você tiver dúvidas sobre nosso uso de cookies, entre em contato conosco:
Email: ${formData.contactEmail}
Website: ${formData.websiteUrl}
País: ${formData.country}

---
AVISO LEGAL: Este é um modelo e não constitui aconselhamento jurídico. Consulte um advogado qualificado para garantir conformidade com as leis aplicáveis (LGPD, GDPR, CCPA, etc.).
`;
    }

    return `COOKIE POLICY

Last updated: ${formData.lastUpdated}

This Cookie Policy explains how ${formData.companyName} ("we", "us", or "our") uses cookies and similar technologies when you visit ${formData.websiteUrl} (the "Website").

1. WHAT ARE COOKIES?

Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

2. HOW WE USE COOKIES

We use cookies for the following purposes:

ESSENTIAL COOKIES
These cookies are necessary for the Website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or logging in.

ANALYTICS COOKIES
These cookies help us understand how visitors interact with our Website by collecting and reporting information anonymously. This helps us improve the Website's functionality.

FUNCTIONALITY COOKIES
These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.

ADVERTISING COOKIES
These cookies may be set through our Website by our advertising partners to build a profile of your interests and show you relevant ads on other websites.

3. TYPES OF COOKIES WE USE

First-Party Cookies: Set by us directly
Third-Party Cookies: Set by third-party services we use, such as:
- Google Analytics (analytics)
- Social media platforms (sharing functionality)
- Advertising networks (targeted advertising)

4. YOUR CHOICES

You have the right to decide whether to accept or reject cookies.

BROWSER CONTROLS
Most web browsers allow you to control cookies through their settings. You can:
- Block all cookies
- Block third-party cookies
- Delete cookies when you close your browser
- Browse in private/incognito mode

Please note that blocking cookies may impact your experience on our Website.

COOKIE CONSENT TOOL
When you first visit our Website, we will ask for your consent to use cookies. You can change your preferences at any time by clicking the cookie settings link.

5. SPECIFIC COOKIE INFORMATION

Essential Cookies:
- Session cookies (expire when you close your browser)
- Authentication cookies (remember your login)
- Security cookies (detect authentication abuse)

Analytics Cookies:
- Google Analytics: _ga, _gid, _gat (used to distinguish users and throttle request rate)
  Duration: 2 years / 24 hours / 1 minute
  Provider: Google LLC
  Purpose: Website analytics

6. DO NOT TRACK SIGNALS

Some browsers include a "Do Not Track" (DNT) feature. Our Website currently does not respond to DNT signals.

7. UPDATES TO THIS POLICY

We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. We will notify you of any material changes by posting the updated policy on this page.

8. MORE INFORMATION

For more information about cookies, including how to see what cookies have been set and how to manage and delete them, visit:
- www.aboutcookies.org
- www.allaboutcookies.org

9. CONTACT US

If you have any questions about our use of cookies, please contact us at:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: This is a template and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws (GDPR, CCPA, etc.).
`;
  };

  const generate = () => {
    if (!formData.companyName || !formData.websiteUrl || !formData.contactEmail) {
      alert(t('alertFillRequired'));
      return;
    }

    let policy = '';
    switch (policyType) {
      case 'privacy':
        policy = generatePrivacyPolicy();
        break;
      case 'terms':
        policy = generateTermsOfService();
        break;
      case 'cookies':
        policy = generateCookiePolicy();
        break;
    }

    setGeneratedPolicy(policy);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy);
    alert(t('alertPolicyCopied'));
  };

  const downloadPolicy = () => {
    const filename = `${policyType}-policy-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    const blob = new Blob([generatedPolicy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
        <p className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
          ⚠️ {t('legalDisclaimer')}
        </p>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          {t('disclaimerText')}
        </p>
      </div>

      {/* Policy Type Selection */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('template')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setPolicyType('privacy')}
            className={`p-4 rounded-lg border-2 transition ${
              policyType === 'privacy'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
          >
            <div className="text-3xl mb-2">🔒</div>
            <p className="font-semibold">{t('privacyPolicy')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('privacyPolicyDesc')}
            </p>
          </button>

          <button
            onClick={() => setPolicyType('terms')}
            className={`p-4 rounded-lg border-2 transition ${
              policyType === 'terms'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
          >
            <div className="text-3xl mb-2">📜</div>
            <p className="font-semibold">{t('termsOfService')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('termsOfServiceDesc')}
            </p>
          </button>

          <button
            onClick={() => setPolicyType('cookies')}
            className={`p-4 rounded-lg border-2 transition ${
              policyType === 'cookies'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
          >
            <div className="text-3xl mb-2">🍪</div>
            <p className="font-semibold">{t('cookiePolicy')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('cookiePolicyDesc')}
            </p>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('companyInfo')}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('companyName')}
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder={t('companyNamePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('website')}
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => updateField('websiteUrl', e.target.value)}
              placeholder={t('websitePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('country')}
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
              placeholder={t('countryPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('lastUpdated')}
            </label>
            <input
              type="date"
              value={formData.lastUpdated}
              onChange={(e) => updateField('lastUpdated', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <Button
            variant="primary"
            onClick={generate}
            className="w-full"
          >
            {t('generate')}
          </Button>
        </div>
      </div>

      {/* Generated Policy */}
      {generatedPolicy && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('generatedDocument')}</h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                size="sm"
              >
                {t('copy')}
              </Button>
              <Button
                variant="secondary"
                onClick={downloadPolicy}
                size="sm"
              >
                {t('download')}
              </Button>
            </div>
          </div>

          <textarea
            value={generatedPolicy}
            onChange={(e) => setGeneratedPolicy(e.target.value)}
            className="w-full h-96 px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
          />

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('edit')}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">ℹ️ {t('whatToDoNext')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
          <li>{t('nextStep1')}</li>
          <li>{t('nextStep2')}</li>
          <li>{t('nextStep3')}</li>
          <li>{t('nextStep4')}</li>
          <li>{t('nextStep5')}</li>
        </ul>
      </div>
    </div>
  );
}
