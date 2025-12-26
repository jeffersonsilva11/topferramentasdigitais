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
      <section className="text-center mb-12 animate-fade-in" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          <span role="img" aria-label={locale === 'en' ? 'Tools icon' : locale === 'pt' ? 'Ícone de ferramentas' : 'Ícono de herramientas'}>🛠️</span> {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t('hero.features')}
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="mb-12">
        <AdSlot position="top" />
      </div>

      {/* Tools Grid */}
      <section className="mb-12" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          {t('chooseTool')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
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
      <section className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-8 mb-12 transition-colors" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          {t('whyUse')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3" role="img" aria-label={locale === 'en' ? 'Free' : locale === 'pt' ? 'Gratuito' : 'Gratis'}>🆓</div>
            <h3 className="font-bold mb-2 dark:text-gray-100">{tFeatures('free.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tFeatures('free.desc')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3" role="img" aria-label={locale === 'en' ? 'Privacy' : locale === 'pt' ? 'Privacidade' : 'Privacidad'}>🔒</div>
            <h3 className="font-bold mb-2 dark:text-gray-100">{tFeatures('privacy.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tFeatures('privacy.desc')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3" role="img" aria-label={locale === 'en' ? 'Fast' : locale === 'pt' ? 'Rápido' : 'Rápido'}>⚡</div>
            <h3 className="font-bold mb-2 dark:text-gray-100">{tFeatures('fast.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tFeatures('fast.desc')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3" role="img" aria-label={locale === 'en' ? 'Responsive' : locale === 'pt' ? 'Responsivo' : 'Adaptable'}>📱</div>
            <h3 className="font-bold mb-2 dark:text-gray-100">{tFeatures('responsive.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tFeatures('responsive.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          {t('categories')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors" role="listitem">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
              <span role="img" aria-label={locale === 'en' ? 'Converters' : locale === 'pt' ? 'Conversores' : 'Convertidores'}>🔄</span> {tCategories('converters.title')}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">{tCategories('converters.desc')}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 rounded-lg p-4 transition-colors" role="listitem">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">
              <span role="img" aria-label={locale === 'en' ? 'Generators' : locale === 'pt' ? 'Geradores' : 'Generadores'}>⚙️</span> {tCategories('generators.title')}
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400">{tCategories('generators.desc')}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4 transition-colors" role="listitem">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
              <span role="img" aria-label={locale === 'en' ? 'Calculators' : locale === 'pt' ? 'Calculadoras' : 'Calculadoras'}>🔢</span> {tCategories('calculators.title')}
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-400">{tCategories('calculators.desc')}</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-4 transition-colors" role="listitem">
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">
              <span role="img" aria-label={locale === 'en' ? 'Text tools' : locale === 'pt' ? 'Ferramentas de texto' : 'Herramientas de texto'}>📝</span> {tCategories('text.title')}
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-400">{tCategories('text.desc')}</p>
          </div>
          <div className="bg-pink-50 dark:bg-pink-950 border-2 border-pink-200 dark:border-pink-800 rounded-lg p-4 transition-colors" role="listitem">
            <h3 className="font-bold text-pink-900 dark:text-pink-300 mb-2">
              <span role="img" aria-label={locale === 'en' ? 'Image tools' : locale === 'pt' ? 'Ferramentas de imagem' : 'Herramientas de imagen'}>🖼️</span> {tCategories('images.title')}
            </h3>
            <p className="text-sm text-pink-700 dark:text-pink-400">{tCategories('images.desc')}</p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg p-4 transition-colors" role="listitem">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">
              <span role="img" aria-label={locale === 'en' ? 'Security' : locale === 'pt' ? 'Segurança' : 'Seguridad'}>🔐</span> {tCategories('security.title')}
            </h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-400">{tCategories('security.desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
