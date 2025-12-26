import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Ops! A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-lg"
        >
          🏠 Voltar para Home
        </Link>

        <div className="mt-12 text-left bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold mb-4">Sugestões:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Verifique se o endereço foi digitado corretamente</li>
            <li>• Navegue de volta para a página inicial</li>
            <li>• Explore nossas 20 ferramentas gratuitas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
