import ToolCard from '@/components/ToolCard';
import AdSlot from '@/components/AdSlot';
import { tools } from '@/lib/tools';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🛠️ Ferramentas Digitais Gratuitas
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
          Utilitários online gratuitos para facilitar seu dia a dia.
          Conversores, geradores, calculadoras e muito mais!
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          ✓ 100% Gratuito ✓ Sem Cadastro ✓ Sem Limites ✓ Privacidade Garantida
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="mb-12">
        <AdSlot position="top" />
      </div>

      {/* Tools Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Escolha uma ferramenta
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
          Por que usar nossas ferramentas?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🆓</div>
            <h3 className="font-bold mb-2">100% Gratuito</h3>
            <p className="text-sm text-gray-600">
              Todas as ferramentas são completamente gratuitas, sem taxas ocultas
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold mb-2">Privacidade Total</h3>
            <p className="text-sm text-gray-600">
              Tudo funciona no seu navegador. Seus dados não saem do seu computador
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold mb-2">Rápido e Fácil</h3>
            <p className="text-sm text-gray-600">
              Sem cadastro, sem instalação. Use instantaneamente qualquer ferramenta
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold mb-2">100% Responsivo</h3>
            <p className="text-sm text-gray-600">
              Funciona perfeitamente em desktop, tablet e celular
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Ferramentas por Categoria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-2">🔄 Conversores</h3>
            <p className="text-sm text-blue-700">PDF, JPG, PNG, WebP e muito mais</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-900 mb-2">⚙️ Geradores</h3>
            <p className="text-sm text-green-700">QR Code, Senhas, UUID, Lorem Ipsum</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-900 mb-2">🔢 Calculadoras</h3>
            <p className="text-sm text-purple-700">Porcentagem, Regra de Três e mais</p>
          </div>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-orange-900 mb-2">📝 Texto</h3>
            <p className="text-sm text-orange-700">Contadores, Formatadores</p>
          </div>
          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
            <h3 className="font-bold text-pink-900 mb-2">🖼️ Imagens</h3>
            <p className="text-sm text-pink-700">Comprimir, Redimensionar, Converter</p>
          </div>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <h3 className="font-bold text-indigo-900 mb-2">🔐 Segurança</h3>
            <p className="text-sm text-indigo-700">Hash, Senhas Seguras</p>
          </div>
        </div>
      </section>
    </div>
  );
}
