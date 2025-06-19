# 🔍 Explorador Pokémon

Uma aplicação web moderna e responsiva para explorar o universo Pokémon usando a PokéAPI. Construída com React, TypeScript e Tailwind CSS.

![Pokémon Explorer](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎥 Demonstração

![Demonstração da aplicação](./assets/demo.gif)

### 🏠 Página Principal
- Grade interativa com todos os Pokémon
- Sistema de busca em tempo real
- Paginação inteligente
- Botão de favoritos

### 🔍 Detalhes do Pokémon
- Informações completas e estatísticas
- Habilidades com descrições traduzidas
- Sprites normais, shiny e dream world
- Design responsivo e elegante

## 🚀 Funcionalidades

### 🎯 Principais
- **Grade Interativa de Pokémon**: Navegue por todos os Pokémon com layouts de cartões bonitos
- **Informações Detalhadas**: Visualize estatísticas abrangentes, habilidades e descrições para cada Pokémon
- **Busca Inteligente**: Encontre Pokémon por nome ou ID com funcionalidade de busca em tempo real
- **Sistema de Favoritos**: Salve seus Pokémon favoritos com armazenamento local persistente
- **Suporte Multilíngue**: Interface completa em Português e Inglês
- **Design Responsivo**: Otimizado para todos os dispositivos com abordagem mobile-first

### 🎨 Interface
- **Temas Baseados em Tipos**: Cores dinâmicas baseadas nos tipos de Pokémon
- **Paginação Avançada**: Navegue pela Pokédex completa de forma eficiente
- **Animações Suaves**: Micro-interações e transições elegantes
- **Loading States**: Skeletons e spinners para melhor UX
- **Tratamento de Erros**: Mensagens amigáveis para erros de rede

### 📊 Dados Detalhados
- **Estatísticas Base**: Visualização completa de HP, Ataque, Defesa, etc.
- **Informações Físicas**: Altura, peso e experiência base
- **Habilidades**: Descrições detalhadas em português e inglês
- **Sprites**: Imagens normais, shiny e dream world
- **Descrições**: Textos descritivos traduzidos da Pokédex
- **Tipos**: Badges coloridos com tradução para português

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para interfaces de usuário
- **TypeScript 5.5.3** - Superset tipado do JavaScript
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **React Router DOM 6.26.1** - Roteamento para React
- **Lucide React 0.344.0** - Ícones modernos

### Ferramentas de Desenvolvimento
- **Vite 5.4.2** - Build tool e dev server ultrarrápido
- **ESLint** - Linter para JavaScript/TypeScript
- **PostCSS** - Processador CSS
- **Autoprefixer** - Plugin PostCSS para prefixos CSS

### API e Deploy
- **PokéAPI** - API RESTful para dados Pokémon
- **Netlify** - Hospedagem e deploy contínuo

## 🏗️ Arquitetura

### Padrões de Design
- **Injeção de Dependência**: ServiceContainer para gerenciamento de serviços
- **Context API**: Gerenciamento de estado global para favoritos e idioma
- **Custom Hooks**: Lógica reutilizável para busca de dados
- **Componentes Funcionais**: Arquitetura baseada em hooks
- **Separation of Concerns**: Separação clara entre lógica e apresentação

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── LanguageToggle.tsx
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   ├── PokemonCard.tsx
│   ├── SearchBar.tsx
│   └── StatBar.tsx
├── context/            # Contextos React
│   ├── FavoritesContext.tsx
│   └── LanguageContext.tsx
├── hooks/              # Custom hooks
│   └── usePokemon.ts
├── pages/              # Páginas da aplicação
│   ├── PokemonDetail.tsx
│   └── PokemonList.tsx
├── services/           # Serviços de API
│   └── PokemonService.ts
├── types/              # Definições TypeScript
│   └── pokemon.ts
└── utils/              # Funções utilitárias
    └── helpers.ts
```

### Funcionalidades Técnicas
- **Cache Inteligente**: Cache de dados de espécies e habilidades para melhor performance
- **Tratamento de Erros**: Fallbacks graceful para dados indisponíveis
- **Performance**: Lazy loading de imagens e paginação eficiente
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado
- **SEO**: Meta tags e estrutura semântica
- **PWA Ready**: Configurado para funcionar como Progressive Web App

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/timtou15/pokemon-explorer.git

# Entre no diretório
cd pokemon-explorer

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Executar linter
```

## 🌐 Deploy

### Netlify (Configurado)
O projeto já está configurado para deploy automático no Netlify:

```bash
# Build local
npm run build

# Os arquivos de configuração já estão incluídos:
# - netlify.toml
# - public/_redirects
```

### Outras Plataformas
```bash
# Vercel
npm run build && npx vercel --prod

# GitHub Pages
npm run build && npx gh-pages -d dist
```

## 🎯 Funcionalidades Futuras

### 🔄 Em Desenvolvimento
- [ ] **Comparação de Pokémon**: Compare estatísticas lado a lado
- [ ] **Filtros Avançados**: Filtrar por tipo, geração, estatísticas
- [ ] **Modo Offline**: Cache para uso sem internet

### 🚀 Roadmap
- [ ] **Evolução**: Visualizar cadeias evolutivas completas
- [ ] **Movimentos**: Lista completa de movimentos por Pokémon
- [ ] **Localização**: Onde encontrar cada Pokémon nos jogos
- [ ] **Times**: Criar e salvar times de Pokémon
- [ ] **Batalha**: Simulador de batalhas simples
- [ ] **Estatísticas**: Gráficos avançados de comparação

## 🐛 Problemas Conhecidos

- Algumas descrições de Pokémon mais recentes podem não ter tradução para português
- Cache de imagens pode demorar no primeiro carregamento
- Alguns Pokémon especiais podem não ter todos os sprites disponíveis

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja como você pode ajudar:

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- Siga os padrões de código existentes (ESLint)
- Adicione testes para novas funcionalidades
- Mantenha a documentação atualizada
- Use commits semânticos (feat, fix, docs, etc.)
- Teste em diferentes dispositivos e navegadores

### Áreas que Precisam de Ajuda
- 🌍 Traduções para outros idiomas
- 🎨 Melhorias no design e UX
- 🚀 Otimizações de performance
- 🧪 Testes automatizados
- 📱 Melhorias na responsividade

## 📊 Estatísticas do Projeto

- **Linhas de Código**: ~2.500+
- **Componentes React**: 15+
- **Pokémon Suportados**: 1000+
- **Idiomas**: 2 (PT/EN)
- **Tipos de Pokémon**: 18
- **Performance Score**: 95+ (Lighthouse)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **[PokéAPI](https://pokeapi.co/)** - API incrível e gratuita para dados Pokémon
- **[Lucide](https://lucide.dev/)** - Ícones bonitos e consistentes
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS que acelera o desenvolvimento
- **[Netlify](https://netlify.com/)** - Hospedagem gratuita e confiável
- **Comunidade Pokémon** - Por manter viva a paixão pelos Pokémon há décadas
- **Comunidade React** - Pelas ferramentas e bibliotecas incríveis

## 📞 Contato

- **GitHub**: [@timtou15](https://github.com/timtou15)
- **Email**: luizcg.cabral@proton.me
- **LinkedIn**: [Luiz Carlos](https://www.linkedin.com/in/luiz-carlos-g-431472240/)

## 🌟 Mostre seu Apoio

Se este projeto te ajudou ou você achou interessante:

- ⭐ Dê uma estrela no repositório
- 🍴 Faça um fork para suas próprias modificações
- 🐛 Reporte bugs ou sugira melhorias
- 📢 Compartilhe com outros desenvolvedores

---

<div align="center">

**Feito com ❤️ e ☕ por [Luiz Carlos](https://github.com/timtou15)**

*"Gotta catch 'em all!"* 🎮

</div>
