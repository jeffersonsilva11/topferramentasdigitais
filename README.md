# 🛠️ Ferramentas Digitais - Site de Utilitários Gratuitos

Um site completo com 20 ferramentas online gratuitas, desenvolvido com **Next.js 14**, **TypeScript** e **Tailwind CSS**. Todas as ferramentas funcionam 100% no navegador, garantindo privacidade total aos usuários.

## 🌟 Características

- ✅ **20 Ferramentas Funcionais Completas**
- 🎨 **Design Moderno** com Tailwind CSS
- 🚀 **Performance Otimizada** com Next.js 14 e SSG
- 📱 **100% Responsivo** - Funciona em todos os dispositivos
- 🔒 **Privacidade Total** - Tudo funciona localmente no navegador
- 📊 **SEO Otimizado** - Meta tags, Open Graph, URLs amigáveis
- 💰 **Pronto para Ads** - Espaços estratégicos para Google AdSense
- ♿ **Acessível** - Boas práticas de acessibilidade
- 🧪 **Testes Incluídos** - Jest e Testing Library

## 🛠️ Ferramentas Disponíveis

### 🌐 Rede e Informações
1. **Qual é meu IP** - Descubra seu endereço IP público
2. **Meu User Agent** - Informações sobre seu navegador e sistema
3. **Testar se Site está Online** - Verifique disponibilidade de websites

### 🔄 Conversores de Arquivos
4. **Converter PDF → JPG** - Converta páginas de PDF em imagens
5. **Converter JPG → PDF** - Transforme imagens em documentos PDF
6. **Converter PNG → JPG** - Converta PNG para JPG
7. **Converter WebP → JPG** - Converta WebP para JPG

### 🖼️ Ferramentas de Imagem
8. **Comprimir Imagem** - Reduza o tamanho mantendo qualidade
9. **Redimensionar Imagem** - Altere dimensões de imagens

### 🔢 Calculadoras
10. **Calculadora de Porcentagem** - Calcule porcentagens facilmente
11. **Regra de Três Online** - Resolva proporções
12. **Conversor MB ↔ KB ↔ GB** - Converta unidades de armazenamento

### 📝 Ferramentas de Texto
13. **Contador de Palavras** - Conte palavras, caracteres e mais
14. **Contador de Caracteres** - Conte caracteres com estatísticas
15. **JSON Formatter** - Formate, valide e minifique JSON

### ⚙️ Geradores
16. **Gerador de QR Code** - Crie QR codes personalizados
17. **Gerador de Senha Segura** - Gere senhas fortes
18. **Gerador Lorem Ipsum** - Texto placeholder para projetos
19. **Gerador de Hash** - MD5, SHA-1, SHA-256, SHA-512
20. **Gerador de UUID** - Identificadores únicos universais

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passo a Passo

1. **Clone ou navegue até o diretório do projeto**
```bash
cd topferramentasdigitais
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Executar em produção
npm start
```

## 📁 Estrutura do Projeto

```
topferramentasdigitais/
├── public/                 # Arquivos estáticos
├── src/
│   ├── app/               # Páginas Next.js (App Router)
│   │   ├── [slug]/        # Páginas dinâmicas das ferramentas
│   │   ├── layout.tsx     # Layout principal
│   │   ├── page.tsx       # Página inicial
│   │   └── globals.css    # Estilos globais
│   ├── components/        # Componentes React
│   │   ├── tools/         # Componentes das 20 ferramentas
│   │   ├── Header.tsx     # Cabeçalho
│   │   ├── Footer.tsx     # Rodapé
│   │   ├── ToolCard.tsx   # Card de ferramenta
│   │   └── AdSlot.tsx     # Slot para anúncios
│   ├── lib/               # Funções utilitárias
│   │   └── tools.ts       # Dados e metadados das ferramentas
│   └── types/             # Definições TypeScript
│       └── index.ts
├── __tests__/             # Testes automatizados
├── package.json           # Dependências do projeto
├── next.config.js         # Configuração do Next.js
├── tailwind.config.js     # Configuração do Tailwind
├── tsconfig.json          # Configuração do TypeScript
└── README.md             # Este arquivo
```

## 💰 Como Adicionar Anúncios (Google AdSense)

O projeto já possui slots estratégicos para anúncios. Para adicionar seus anúncios:

### 1. No Layout Principal (`src/app/layout.tsx`)

Descomente e adicione seu código do AdSense no `<head>`:

```tsx
<head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
    crossOrigin="anonymous"
  ></script>
</head>
```

### 2. No Componente AdSlot (`src/components/AdSlot.tsx`)

Substitua o comentário `{/* AD_SCRIPT_HERE */}` pelo código do anúncio:

```tsx
<ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true">
</ins>
```

E adicione o script de inicialização:

```tsx
useEffect(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    console.error(err);
  }
}, []);
```

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch
```

## 🎨 Personalização

### Cores e Tema

Edite `tailwind.config.js` para personalizar cores:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores aqui
      },
    },
  },
}
```

### Adicionar Nova Ferramenta

1. Crie o componente em `src/components/tools/MinhaFerramenta.tsx`
2. Adicione os dados em `src/lib/tools.ts`
3. Importe no `src/app/[slug]/page.tsx`

## 📊 SEO e Metadados

Cada ferramenta possui:
- ✅ Title tag otimizado
- ✅ Meta description única
- ✅ Keywords relevantes
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ URL amigável (slug)
- ✅ Canonical URL

### Configurar domínio

Edite a constante `baseUrl` em `src/lib/tools.ts`:

```typescript
const baseUrl = 'https://seudominio.com.br';
```

## 🔧 Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes:** React 18
- **Testes:** Jest + Testing Library
- **Geração QR Code:** qrcode
- **Hashes:** crypto-js
- **UUID:** uuid
- **PDF:** jsPDF
- **Compressão de Imagem:** browser-image-compression

## 📝 Scripts Disponíveis

```bash
npm run dev          # Modo desenvolvimento
npm run build        # Build para produção
npm start            # Executar build de produção
npm run lint         # Verificar código
npm test             # Executar testes
npm run test:watch   # Testes em modo watch
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe no Vercel
3. Deploy automático!

### Outros Provedores

O projeto é compatível com:
- Netlify
- AWS Amplify
- Google Cloud Run
- Qualquer host Node.js

## 📄 Licença

MIT License - Sinta-se livre para usar em projetos pessoais e comerciais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas ferramentas
- Melhorar ferramentas existentes
- Melhorar documentação

## 📧 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

## 🎯 Roadmap

Possíveis melhorias futuras:
- [ ] Mais ferramentas de conversão
- [ ] Modo escuro (dark mode)
- [ ] Histórico de uso local
- [ ] PWA (Progressive Web App)
- [ ] Mais idiomas (i18n)
- [ ] Blog com dicas e tutoriais
- [ ] API para algumas ferramentas

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**

Visite: [Ferramentas Digitais](https://ferramentasdigitais.com.br)
