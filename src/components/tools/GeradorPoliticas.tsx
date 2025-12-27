'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
      alert('Please fill in all required fields (Company Name, Website URL, Contact Email)');
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
    alert('Policy copied to clipboard!');
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
              How you handle user data
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
              Rules for using your service
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
              Cookie usage disclosure
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
              Last Updated Date
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
        <p className="font-semibold mb-2">ℹ️ What to do next:</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
          <li>Review and customize the generated policy to match your specific practices</li>
          <li>Have the policy reviewed by a qualified attorney</li>
          <li>Add the policy to your website (usually in the footer)</li>
          <li>Keep the policy updated as your practices or laws change</li>
          <li>Ensure users can easily access and understand your policies</li>
        </ul>
      </div>
    </div>
  );
}
