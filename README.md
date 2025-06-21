# 🔍 Explorador Pokémon

Uma aplicação web moderna e responsiva para explorar o universo Pokémon usando a PokéAPI. Construída com React, TypeScript e Tailwind CSS.

![Pokémon Explorer](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 📸 Prévia
![Demonstração do Pokémon Explorer](./demo.gif)

## 🌟 Demonstração

🔗 **[👉 Ver Demo Online](https://pokemon-explorer-project.netlify.app)**

### 🏠 Página Principal
- Grade interativa com todos os Pokémon (10.277+)
- Sistema de busca em tempo real
- **Filtros avançados** por tipos, gerações e estatísticas
- Sistema de favoritos persistente
- Paginação inteligente

### 🔍 Detalhes do Pokémon
- Informações completas e estatísticas
- Habilidades com descrições traduzidas
- Sprites normais, shiny e dream world
- **Descrições em português** para 700+ Pokémon
- Design responsivo e elegante

### 🎛️ Sistema de Filtros
- **18 tipos de Pokémon** com cores temáticas
- **10 gerações** incluindo formas especiais
- **Filtros por estatísticas** (HP, Ataque, Defesa, Velocidade)
- Interface modal responsiva
- **Persistência de estado** ao navegar

## 🚀 Funcionalidades

### 🎯 Principais
- **Grade Interativa de Pokémon**: Navegue por todos os 10.277+ Pokémon com layouts de cartões bonitos
- **Informações Detalhadas**: Visualize estatísticas abrangentes, habilidades e descrições para cada Pokémon
- **Busca Inteligente**: Encontre Pokémon por nome ou ID com funcionalidade de busca em tempo real
- **Sistema de Favoritos**: Salve seus Pokémon favoritos com armazenamento local persistente
- **Suporte Multilíngue**: Interface completa em Português e Inglês com **700+ traduções manuais**
- **Design Responsivo**: Otimizado para todos os dispositivos com abordagem mobile-first

### 🎨 Interface
- **Temas Baseados em Tipos**: Cores dinâmicas baseadas nos tipos de Pokémon
- **Filtros Avançados**: Sistema completo de filtros por tipos, gerações e estatísticas
- **Paginação Avançada**: Navegue pela Pokédex completa de forma eficiente
- **Animações Suaves**: Micro-interações e transições elegantes
- **Loading States**: Skeletons e spinners para melhor UX
- **Tratamento de Erros**: Mensagens amigáveis para erros de rede
- **Bandeiras de Idioma**: Ícones elegantes para alternância PT/EN

### 📊 Dados Detalhados
- **Estatísticas Base**: Visualização completa de HP, Ataque, Defesa, etc.
- **Informações Físicas**: Altura, peso e experiência base
- **Habilidades**: Descrições detalhadas em português e inglês
- **Sprites**: Imagens normais, shiny e dream world
- **Descrições**: Textos descritivos traduzidos da Pokédex
- **Tipos**: Badges coloridos com tradução para português
- **Categorias**: Gêneros traduzidos (ex: "Seed Pokémon" → "Pokémon Semente")

### 🔧 Funcionalidades Avançadas
- **Carregamento Progressivo**: Sistema inteligente para carregar 10.277+ Pokémon
- **Cache Otimizado**: Cache de dados para melhor performance
- **Persistência de Estado**: Filtros e navegação mantidos ao voltar de páginas
- **Fallbacks Inteligentes**: Sistema de fallback PT → EN → primeira disponível
- **Formas Especiais**: Suporte completo para Mega Evoluções, formas Alola, etc.

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
- **Context API**: Gerenciamento de estado global para favoritos, idioma e navegação
- **Custom Hooks**: Lógica reutilizável para busca de dados e filtros
- **Componentes Funcionais**: Arquitetura baseada em hooks
- **Separation of Concerns**: Separação clara entre lógica e apresentação

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── AdvancedFilter.tsx    # Sistema de filtros avançados
│   ├── LanguageToggle.tsx    # Alternador de idioma com bandeiras
│   ├── LoadingSpinner.tsx    # Componentes de carregamento
│   ├── Pagination.tsx        # Paginação inteligente
│   ├── PokemonCard.tsx       # Cartão de Pokémon
│   ├── SearchBar.tsx         # Barra de busca
│   └── StatBar.tsx          # Barras de estatísticas
├── context/            # Contextos React
│   ├── FavoritesContext.tsx  # Gerenciamento de favoritos
│   ├── LanguageContext.tsx   # Multilíngue com traduções
│   └── NavigationContext.tsx # Persistência de navegação
├── hooks/              # Custom hooks
│   ├── useAllPokemon.ts      # Carregamento de todos os Pokémon
│   ├── useFilteredPokemon.ts # Sistema de filtros
│   └── usePokemon.ts         # Busca de dados individuais
├── pages/              # Páginas da aplicação
│   ├── PokemonDetail.tsx     # Página de detalhes
│   └── PokemonList.tsx       # Lista principal com filtros
├── services/           # Serviços de API
│   └── PokemonService.ts     # Serviço com cache inteligente
├── types/              # Definições TypeScript
│   └── pokemon.ts            # Tipos e interfaces
└── utils/              # Funções utilitárias
    └── helpers.ts            # Helpers com traduções
```

### Funcionalidades Técnicas
- **Cache Inteligente**: Cache de dados de espécies, habilidades e Pokémon para melhor performance
- **Tratamento de Erros**: Fallbacks graceful para dados indisponíveis
- **Performance**: Lazy loading de imagens, paginação eficiente e carregamento em lotes
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado
- **SEO**: Meta tags e estrutura semântica
- **PWA Ready**: Configurado para funcionar como Progressive Web App
- **Persistência**: Estado de filtros e navegação mantido entre páginas

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

O projeto estará disponível em `http://localhost:5173`

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

## 🎯 Funcionalidades Implementadas

### ✅ Concluídas
- [x] **Sistema de Filtros Avançados**: Filtrar por tipos, gerações e estatísticas
- [x] **Traduções Completas**: 700+ descrições e categorias em português
- [x] **Carregamento Otimizado**: Sistema para 10.277+ Pokémon
- [x] **Persistência de Estado**: Filtros mantidos ao navegar
- [x] **Interface Premium**: Design com animações e micro-interações
- [x] **Bandeiras de Idioma**: Ícones elegantes PT/BR e EN/US
- [x] **Cache Inteligente**: Performance otimizada
- [x] **Responsividade**: Funciona perfeitamente em todos os dispositivos

### 🔄 Roadmap Futuro
- [ ] **Comparação de Pokémon**: Compare estatísticas lado a lado
- [ ] **Evolução**: Visualizar cadeias evolutivas completas
- [ ] **Movimentos**: Lista completa de movimentos por Pokémon
- [ ] **Localização**: Onde encontrar cada Pokémon nos jogos
- [ ] **Times**: Criar e salvar times de Pokémon
- [ ] **Batalha**: Simulador de batalhas simples
- [ ] **Estatísticas**: Gráficos avançados de comparação
- [ ] **Modo Offline**: Cache para uso sem internet

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
- 🌍 Traduções para outros idiomas (ES, FR, DE, JP)
- 🎨 Melhorias no design e UX
- 🚀 Otimizações de performance
- 🧪 Testes automatizados
- 📱 Melhorias na responsividade
- 🔍 Mais traduções de descrições

## 📊 Estatísticas do Projeto

- **Linhas de Código**: ~4.500+
- **Componentes React**: 20+
- **Pokémon Suportados**: 10.277+
- **Idiomas**: 2 (PT/EN)
- **Tipos de Pokémon**: 18
- **Traduções Manuais**: 700+
- **Performance Score**: 95+ (Lighthouse)
- **Gerações Cobertas**: 1-9 + Formas Especiais

## 📈 Histórico de Versões

### v2.0.0 - Sistema de Filtros Avançados
- ✨ Sistema completo de filtros por tipos, gerações e estatísticas
- 🌍 700+ traduções manuais em português
- 🎨 Bandeiras elegantes para alternância de idioma
- 🔄 Persistência de estado de navegação
- ⚡ Carregamento otimizado de 10.277+ Pokémon
- 🎯 Interface premium com animações

### v1.0.0 - Versão Inicial
- 🏠 Lista de Pokémon com paginação
- 🔍 Sistema de busca
- ❤️ Sistema de favoritos
- 📱 Design responsivo
- 🌐 Suporte multilíngue básico

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **[PokéAPI](https://pokeapi.co/)** - API incrível e gratuita para dados Pokémon
- **[Lucide](https://lucide.dev/)** - Ícones bonitos e consistentes
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS que acelera o desenvolvimento
- **[Netlify](https://netlify.com/)** - Hospedagem gratuita e confiável
- **Comunidade Pokémon** - Por manter viva a paixão pelos Pokémon há décadas
- **Comunidade React** - Pelas ferramentas e bibliotecas incríveis
- **Contribuidores** - Todos que ajudaram a melhorar este projeto

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
- 💬 Deixe feedback sobre as funcionalidades

---

<div align="center">

**Feito com ❤️ e ☕ por [Luiz Carlos](https://github.com/timtou15)**

*"Gotta catch 'em all!"* 🎮

</div>
