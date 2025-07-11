# Estrutura do Projeto Ayzis

Este projeto foi configurado seguindo a estrutura do projeto Kepos, adaptado para Next.js 15 com App Router.

## 📁 Estrutura de Pastas

```
src/
├── app/                      # Páginas (App Router do Next.js)
│   ├── layout.js            # Layout principal com AuthContext
│   ├── page.js              # Landing page
│   ├── sign-in/             # Página de login
│   ├── sign-up/             # Página de cadastro
│   └── dashboard/           # Área autenticada
│       ├── layout.js        # Layout do dashboard (proteção de rotas)
│       ├── page.js          # Dashboard principal
│       ├── my-account/      # Conta do usuário
│       └── database/        # Gestão de dados
│           ├── page.js      # Página principal do database
│           ├── produtos/    # Gestão de produtos
│           └── vendas/      # Gestão de vendas
├── components/              # Componentes reutilizáveis
│   ├── Header.js           # Cabeçalho da aplicação
│   ├── Footer.js           # Rodapé
│   ├── Button.js           # Botão customizado
│   └── InputText.js        # Input de texto customizado
├── contexts/               # Contextos React
│   └── AuthContext.js      # Contexto de autenticação
├── libs/                   # Bibliotecas e configurações
│   └── axios.js            # Configuração do Axios
└── utils/                  # Utilitários
    └── AppError.js         # Classe de erro personalizada
```

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação
- Sistema completo de login/cadastro
- Contexto de autenticação global
- Proteção de rotas automática
- Gerenciamento de tokens

### ✅ Layouts
- Layout responsivo com Header/Footer
- Proteção automática de rotas do dashboard
- Redirecionamentos automáticos baseados no estado de autenticação

### ✅ Páginas Principais
- **Landing Page**: Página inicial com opções de login/cadastro
- **Dashboard**: Painel principal com visão geral
- **Database**: Gestão de produtos e vendas
- **Minha Conta**: Gerenciamento do perfil do usuário

### ✅ Componentes Reutilizáveis
- Button com variantes (primary, secondary, danger, outline)
- InputText com validação e estados
- Header adaptável (autenticado/não autenticado)
- Footer responsivo

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **Tailwind CSS** - Framework CSS utilitário
- **React Toastify** - Notificações
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **js-cookie** - Gerenciamento de cookies

## 📋 Como usar

1. **Início**: A aplicação redireciona automaticamente para o dashboard se o usuário estiver logado
2. **Login/Cadastro**: Páginas funcionais com validação
3. **Dashboard**: Área protegida que requer autenticação
4. **Navegação**: Use os links do header para navegar entre seções

## 🔧 Configuração da API

Configure a URL da API no arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 📝 Próximos Passos

Para completar a integração com seu backend:

1. Ajuste os endpoints da API nos arquivos de página
2. Implemente os formulários de criação/edição de produtos e vendas
3. Adicione mais funcionalidades baseadas nas necessidades do projeto
4. Configure variáveis de ambiente para produção

## 🎨 Personalização

O projeto usa Tailwind CSS, permitindo fácil customização:
- Cores podem ser alteradas no `tailwind.config.mjs`
- Componentes são modulares e facilmente customizáveis
- Layouts responsivos já implementados
