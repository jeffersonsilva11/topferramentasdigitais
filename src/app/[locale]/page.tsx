import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ToolCard from '@/components/ToolCard';
import AdSlot from '@/components/AdSlot';
import { tools } from '@/lib/tools';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'en' ? 'en_US' : locale === 'pt' ? 'pt_BR' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HomePage locale={locale} />
  );
}

async function HomePage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'site' });
  const tFeatures = await getTranslations({ locale, namespace: 'features' });
  const tCategories = await getTranslations({ locale, namespace: 'categories' });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🛠️ {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {t('hero.features')}
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="mb-12">
        <AdSlot position="top" />
      </div>

      {/* Tools Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t('chooseTool')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Ad Slot - Middle */}
      <div className="mb-12">
        <AdSlot position="middle" />
      </div>

      {/* Features Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t('whyUse')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🆓</div>
            <h3 className="font-bold mb-2">{tFeatures('free.title')}</h3>
            <p className="text-sm text-gray-600">
              {tFeatures('free.desc')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold mb-2">{tFeatures('privacy.title')}</h3>
            <p className="text-sm text-gray-600">
              {tFeatures('privacy.desc')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold mb-2">{tFeatures('fast.title')}</h3>
            <p className="text-sm text-gray-600">
              {tFeatures('fast.desc')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold mb-2">{tFeatures('responsive.title')}</h3>
            <p className="text-sm text-gray-600">
              {tFeatures('responsive.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t('categories')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-2">🔄 {tCategories('converters.title')}</h3>
            <p className="text-sm text-blue-700">{tCategories('converters.desc')}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-900 mb-2">⚙️ {tCategories('generators.title')}</h3>
            <p className="text-sm text-green-700">{tCategories('generators.desc')}</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-900 mb-2">🔢 {tCategories('calculators.title')}</h3>
            <p className="text-sm text-purple-700">{tCategories('calculators.desc')}</p>
          </div>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-orange-900 mb-2">📝 {tCategories('text.title')}</h3>
            <p className="text-sm text-orange-700">{tCategories('text.desc')}</p>
          </div>
          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
            <h3 className="font-bold text-pink-900 mb-2">🖼️ {tCategories('images.title')}</h3>
            <p className="text-sm text-pink-700">{tCategories('images.desc')}</p>
          </div>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <h3 className="font-bold text-indigo-900 mb-2">🔐 {tCategories('security.title')}</h3>
            <p className="text-sm text-indigo-700">{tCategories('security.desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
