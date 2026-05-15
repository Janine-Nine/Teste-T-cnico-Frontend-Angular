# 🚀 Users Dashboard — Sistema Profissional Angular

Um sistema completo de gerenciamento de usuários construído com **Angular moderno**, focado em **performance, UX premium e arquitetura escalável**, seguindo padrões reais de mercado.

---

# 🧠 Visão do Projeto

Este projeto simula um sistema corporativo real, com:

* Dashboard moderno
* Paginação avançada
* Integração com API
* UX refinada (skeleton, loading, animações)
* Validações robustas
* Arquitetura escalável

👉 Ideal para portfólio e testes técnicos.

---

# ⚙️ Tecnologias Utilizadas

* Angular 17+
* TypeScript
* Angular Material
* RxJS
* Signals (Angular moderno)
* Jest (testes unitários)
* Cypress (E2E)
* Vercel (deploy)
* GitHub Actions (CI/CD)

---

# 🏗️ Arquitetura

```bash
src/app/
 ├── core/
 │   ├── interceptors/
 │   ├── services/
 │   └── guards/
 │
 ├── shared/
 │   ├── ui/
 │   ├── directives/
 │   ├── validators/
 │   └── components/
 │
 ├── features/users/
 │   ├── pages/
 │   ├── components/
 │   ├── data-access/
 │   └── store/
 │
 ├── layout/
 └── app.routes.ts
```

---

# 🔥 Funcionalidades

## 📊 Paginação Inteligente

* Paginação backend-like
* Query params na URL (deep link)
* Reset automático com filtro
* Server-side ready

---

## ♾️ Infinite Scroll (estilo Instagram)

* Carregamento automático ao rolar
* UX fluida
* Integração com paginação

---

## ⚡ Performance Avançada

* Cache de páginas (Map)
* Lazy loading
* Code splitting (chunks)
* Delay inteligente (anti flicker)

---

## 🎨 UX Premium

* Skeleton loading estilo Netflix
* Blur placeholder estilo Instagram
* Transição suave (fade)
* Animações com Angular Animations API
* Stagger animation (efeito Pinterest)

---

## 🔄 Loading Global

* Interceptor com contador
* Progress bar estilo YouTube
* Controle de múltiplas requisições

---

## 🧾 Formulários Profissionais

* Validação de CPF
* Validação de telefone BR
* Validação async (CPF duplicado)
* Máscara dinâmica (CPF, telefone, CEP)
* Auto-detecção (fixo vs celular)
* ControlValueAccessor (valor limpo)

---

## 🔒 Integração com API

* Estrutura pronta para backend real
* Service layer isolado
* Tratamento de erro centralizado

---

## 🎬 Animações

* Entrada em sequência (stagger)
* Fade por item
* Blur → foco
* Skeleton dissolvendo

---

## 🧪 Testes

* Testes unitários (validators)
* Testes de componentes
* Testes E2E (Cypress)
* Cobertura > 80%

---

## 🌍 Deploy

* Deploy com Vercel
* Domínio personalizado
* HTTPS automático
* CDN global

---

## 🤖 CI/CD

Pipeline automatizado com:

* Instalação de dependências
* Execução de testes
* Build de produção

---

## 📊 SEO & Analytics

* Meta tags completas
* Open Graph
* Google Analytics integrado

---

# 🚀 Como rodar o projeto

## 🔧 Instalação

```bash
npm install
```

---

## ▶️ Rodar localmente

```bash
ng serve
```

Acesse:

```
http://localhost:4200
```

---

## 🏗️ Build de produção

```bash
ng build --configuration production
```

---

## 🌍 Deploy (Vercel)

```bash
npm install -g vercel
vercel
```

---

# 🧪 Rodar Testes

## Unitários

```bash
npm run test
```

## E2E

```bash
npx cypress open
```

---

# 📦 Scripts Disponíveis

```json
{
  "start": "ng serve",
  "build": "ng build",
  "test": "jest",
  "e2e": "cypress open"
}
```

---

# 🧠 Boas Práticas Aplicadas

* Separação por feature
* Single Responsibility Principle
* Reactive Programming (RxJS)
* Performance-first mindset
* UX orientada a feedback visual
* Código escalável e reutilizável

---

# 🔥 Diferenciais do Projeto

✔ Estrutura de empresa real
✔ UX refinada nível produto
✔ Performance otimizada
✔ Testes automatizados
✔ Pronto para produção

---

# 🎯 Objetivo

Este projeto foi desenvolvido para:

* Demonstrar domínio em Angular moderno
* Simular ambiente corporativo real
* Servir como portfólio profissional
* Passar em testes técnicos de frontend

---

# 📌 Próximos upgrades (opcional)

* Autenticação JWT
* Backend com Spring Boot
* PWA (offline mode)
* Angular Universal (SSR)
* Design System próprio

---

# 👩‍💻 Autora

Desenvolvido por **Janine Cunha**
Estudante focada em se tornar **Dev Full Stack Developer** 🚀

---

