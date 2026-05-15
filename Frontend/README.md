<<<<<<< HEAD
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

=======
# TesteAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


>>>>>>> 88f9859c97846e642ff41479f47e656cc6528e45
