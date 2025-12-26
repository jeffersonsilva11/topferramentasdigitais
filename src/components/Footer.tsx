export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">🛠️ Ferramentas Digitais</h3>
            <p className="text-gray-400 text-sm">
              Utilitários online gratuitos para facilitar seu dia a dia.
              Todas as ferramentas funcionam 100% no navegador.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Conversores de Arquivos</li>
              <li>Geradores Online</li>
              <li>Calculadoras</li>
              <li>Ferramentas de Texto</li>
              <li>Ferramentas de Imagem</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sobre</h4>
            <p className="text-sm text-gray-400">
              Ferramentas 100% gratuitas, sem cadastro, sem limites de uso.
              Sua privacidade é garantida - tudo funciona localmente no seu navegador.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} Ferramentas Digitais. Todos os direitos reservados.</p>
          <p className="mt-2">Ferramentas online gratuitas para uso pessoal e comercial.</p>
        </div>
      </div>
    </footer>
  );
}
