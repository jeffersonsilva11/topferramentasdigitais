# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.1.0] - 2025-12-26

### 🔒 Segurança
- **IMPORTANTE:** Atualização de segurança - todas as dependências atualizadas para versões mais recentes
- Corrigidas vulnerabilidades conhecidas em versões anteriores

### ⬆️ Atualizações de Dependências

#### Principais
- **React:** 18.3.0 → **19.0.0** (última versão estável)
- **React DOM:** 18.3.0 → **19.0.0**
- **Next.js:** 14.2.0 → **15.1.3** (melhorias de performance e segurança)
- **TypeScript:** 5.3.0 → **5.7.2** (últimas features e correções)

#### Ferramentas de Desenvolvimento
- **ESLint:** 8.56.0 → **9.17.0** (migrado para flat config)
- **Tailwind CSS:** 3.4.0 → **3.4.17**
- **PostCSS:** 8.4.0 → **8.4.49**
- **Autoprefixer:** 10.4.0 → **10.4.20**
- **@testing-library/react:** 14.2.0 → **16.1.0**
- **@testing-library/jest-dom:** 6.4.0 → **6.6.3**

#### Bibliotecas
- **UUID:** 9.0.1 → **11.0.3** (melhorias de performance)
- **QRCode:** 1.5.3 → **1.5.4**
- **jsPDF:** 2.5.1 → **2.5.2**

#### Types
- **@types/node:** 20.11.0 → **22.10.2**
- **@types/react:** 18.3.0 → **19.0.2**
- **@types/react-dom:** 18.3.0 → **19.0.2**
- **@types/uuid:** 9.0.8 → **10.0.0**

### 🔧 Mudanças Técnicas
- Migração do ESLint para formato flat config (eslint.config.mjs)
- Compatibilidade total com React 19
- Melhorias de performance com Next.js 15

### 📝 Notas de Migração
Para atualizar seu projeto existente:
```bash
# Remover node_modules e lock files
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Verificar se tudo funciona
npm run build
```

## [1.0.0] - 2025-12-26

### ✨ Lançamento Inicial
- 20 ferramentas online gratuitas totalmente funcionais
- Design moderno e responsivo com Tailwind CSS
- SEO otimizado para todas as páginas
- Suporte para anúncios (Google AdSense)
- Testes automatizados básicos
- Documentação completa
