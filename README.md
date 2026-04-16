# 🚀 Real-Time Blog Platform - Production Grade

Uma plataforma de blog moderna, escalável e segura construída com a MEVN Stack (MongoDB, Express, Vue.js 3, Node.js).

Este projeto foi reestruturado para seguir as melhores práticas de engenharia de software, incluindo arquitetura MVC, segurança reforçada, gerenciamento de estado via composables e testes automatizados.

## ✨ Diferenciais desta versão (Refatorada)

- **Arquitetura MVC no Backend**: Separação clara entre rotas, controladores e modelos.
- **Segurança de Produção**: Implementação de `helmet`, `cors` configurado e `express-rate-limit`.
- **Frontend Moderno**: Uso de Vue 3 `Composition API` com `<script setup>` e `Composables`.
- **DX (Developer Experience)**: Padronização com `ESLint` e `Prettier`.
- **Confiabilidade**: Testes unitários com `Jest` (Backend) e `Vitest` (Frontend).
- **UI Premium**: Design com glassmorphism, notificações toast e transições suaves.

## 🛠️ Tecnologias

### Backend
- **Node.js & Express**: API RESTful robusta.
- **MongoDB & Mongoose**: Modelagem de dados e performance.
- **Security**: `helmet`, `express-rate-limit`, `cors`.
- **Validation**: `express-validator`.

### Frontend
- **Vue.js 3**: Framework reativo de alta performance.
- **Vite**: Build system ultra-rápido.
- **Toastification**: Feedback visual premium.
- **Axios**: Cliente HTTP com interceptores globais.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- MongoDB 6+

### 1. Servidor (Backend)
```bash
cd backend
npm install
cp .env.example .env # Configure sua URI do MongoDB
npm run dev
```

### 2. Cliente (Frontend)
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testes e Qualidade

### Backend
- `npm test`: Executa suíte de testes com Jest.
- `npm run lint`: Verifica padrões de código.
- `npm run format`: Corrige formatação automaticamente.

### Frontend
- `npm run test`: Executa testes com Vitest.

## 📁 Estrutura do Projeto

```text
├── backend/
│   ├── config/         # Configurações de DB
│   ├── controllers/    # Lógica de negócio
│   ├── middlewares/    # Segurança e erro
│   ├── models/         # Esquemas do Mongoose
│   ├── routes/         # Definição de endpoints
│   └── tests/          # Testes Jest
└── frontend/
    ├── src/
    │   ├── components/ # Componentes reutilizáveis
    │   ├── composables/# Lógica compartilhada
    │   ├── services/   # Abstração de API
    │   └── assets/     # Estilos e imagens
```

---
Desenvolvido com foco em **Qualidade Máxima** e **Performance**.
