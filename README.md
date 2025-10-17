# 📝 Real-Time Blog Platform - MEVN Stack

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

Plataforma completa de blog com CRUD, busca em tempo real, estatísticas e interface moderna usando MEVN Stack.

## ✨ Funcionalidades

### Backend (Node.js + Express + MongoDB)
- ✅ **API RESTful Completa**: CRUD de posts com validação
- 🔍 **Busca Avançada**: Text search com MongoDB
- 📊 **Estatísticas em Tempo Real**: Views, likes, comentários
- 🏷️ **Sistema de Tags**: Categorização flexível
- ❤️ **Sistema de Likes**: Interações em tempo real
- 💬 **Comentários**: Sistema completo de comentários
- ⭐ **Posts em Destaque**: Highlight de conteúdo importante
- 📈 **Aggregation Pipeline**: MongoDB para analytics

### Frontend (Vue.js 3 + Composition API)
- 🎨 **Interface Moderna**: Design responsivo e gradientes
- ⚡ **Vue 3 Composition API**: Código reativo e performático
- 🔄 **Real-Time Updates**: Atualização automática de dados
- 🔍 **Filtros Dinâmicos**: Por categoria e busca textual
- 📱 **Mobile-First**: Totalmente responsivo
- 🎭 **Modais Interativos**: Formulários elegantes
- ✨ **Animações Suaves**: Transições CSS

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- MongoDB 5+ (local ou MongoDB Atlas)
- npm ou yarn

### Instalação

#### 1. Backend
cd backend
npm install

Criar arquivo .env
echo "MONGODB_URI=mongodb://localhost:27017/blog-platform
PORT=5000" > .env
npm run dev


#### 2. Frontend
cd frontend
npm install
npm run dev


#### 3. Acessar
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📡 API Endpoints

### Posts
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/posts` | Lista posts (com filtros) |
| GET | `/api/posts/featured` | Posts em destaque |
| GET | `/api/posts/stats` | Estatísticas gerais |
| GET | `/api/posts/:id` | Busca post específico |
| POST | `/api/posts` | Cria novo post |
| PUT | `/api/posts/:id` | Atualiza post |
| DELETE | `/api/posts/:id` | Deleta post |
| POST | `/api/posts/:id/like` | Adiciona like |
| POST | `/api/posts/:id/comments` | Adiciona comentário |

### Parâmetros de Query
- `category`: Filtra por categoria
- `search`: Busca textual
- `sort`: Ordenação (ex: `-createdAt`)
- `limit`: Limite de resultados
- `page`: Paginação

## 🛠️ Tecnologias

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **MongoDB**: Banco NoSQL
- **Mongoose**: ODM para MongoDB
- **express-validator**: Validação de dados
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **Vue.js 3**: Framework progressivo
- **Composition API**: Reatividade moderna
- **Vite**: Build tool ultra-rápido
- **Axios**: HTTP client
- **CSS3**: Gradientes e animações


## 🎯 Conceitos Demonstrados

- ✅ **MEVN Stack Completo**: MongoDB + Express + Vue + Node
- ✅ **RESTful API**: Endpoints bem estruturados
- ✅ **MongoDB Aggregation**: Queries complexas
- ✅ **Vue 3 Composition API**: Código moderno e reativo
- ✅ **Component Architecture**: Componentização Vue
- ✅ **State Management**: Gerenciamento de estado
- ✅ **Form Validation**: Backend e frontend
- ✅ **Error Handling**: Tratamento robusto de erros
- ✅ **Responsive Design**: Mobile-first CSS

## 🔮 Melhorias Futuras

- [ ] Autenticação JWT
- [ ] Upload de imagens (Cloudinary)
- [ ] Editor Markdown
- [ ] Paginação infinita
- [ ] WebSocket para real-time
- [ ] PWA (Progressive Web App)
- [ ] Dark mode
- [ ] SEO otimizado
- [ ] Testes unitários

## 📄 Licença

MIT License
---

⭐ Demonstração completa de MEVN Stack para portfólio profissional!

