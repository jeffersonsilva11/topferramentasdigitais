# Guia de Contribuição

Obrigado por considerar contribuir para o projeto Ferramentas Digitais! 🎉

## Como Contribuir

### Reportar Bugs

1. Verifique se o bug já não foi reportado nas [Issues](../../issues)
2. Crie uma nova issue com:
   - Título claro e descritivo
   - Passos para reproduzir o bug
   - Comportamento esperado vs. atual
   - Screenshots se aplicável
   - Informações do ambiente (navegador, OS, etc.)

### Sugerir Novas Ferramentas

1. Crie uma issue com a tag `feature request`
2. Descreva a ferramenta proposta
3. Explique por que seria útil
4. Forneça exemplos de uso

### Enviar Pull Requests

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaNovaFerramenta`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova ferramenta X'`)
4. Push para a branch (`git push origin feature/MinhaNovaFerramenta`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript
- Siga as convenções do ESLint configurado
- Mantenha os componentes simples e reutilizáveis
- Adicione comentários quando necessário
- Escreva testes para novas funcionalidades

### Estrutura de uma Nova Ferramenta

```typescript
// src/components/tools/MinhaFerramenta.tsx
'use client';

import { useState } from 'react';

export default function MinhaFerramenta() {
  // Seu código aqui

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Interface da ferramenta */}
    </div>
  );
}
```

Depois adicione em `src/lib/tools.ts`:

```typescript
{
  id: '21',
  name: 'Minha Ferramenta',
  description: 'Descrição curta',
  icon: '🔧',
  slug: 'minha-ferramenta',
  category: 'Categoria',
  keywords: ['keyword1', 'keyword2'],
  metaDescription: 'Descrição para SEO',
}
```

## Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

## Dúvidas?

Sinta-se à vontade para abrir uma issue com suas dúvidas!
