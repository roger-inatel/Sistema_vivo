#  Sistema de Gerenciamento de Usuários (Fullstack)

Este projeto consiste em uma aplicação de gerenciamento de usuários completa (CRUD), desenvolvida para consolidar conhecimentos em integração de sistemas, bancos de dados não relacionais e desenvolvimento de interfaces modernas.

O projeto demonstra a integração entre um backend robusto em **Node.js** e um frontend moderno e responsivo em **React**.

---

##  Estrutura do Projeto

O repositório está organizado em duas pastas principais:
- **/backend (Backend):** Servidor REST em Node.js utilizando Prisma e MongoDB.
- **/frontend (Frontend):** Interface SPA construída com React e Vite.

---

##  Tecnologias

### **Backend**
- **Runtime:** Node.js v24
- **Framework:** Express.js
- **Banco de Dados:** MongoDB (Atlas)
- **ORM:** Prisma v6
- **Validação:** Zod (Schema Validation)
- **Segurança:** CORS habilitado

### **Frontend**
- **Framework:** React 18
- **Build Tool:** Vite
- **Comunicação:** Axios (Consumo de API)
- **Estilização:** CSS Moderno (Glassmorphism & Responsivo)

---

##  Funcionalidades Principais

- [x] **CRUD Completo:** Criação, listagem, edição e exclusão de usuários.
- [x] **Validação em Tempo Real:** Erros de validação (Zod) do backend são tratados e exibidos diretamente no frontend.
- [x] **Design Moderno:** Interface elegante com efeitos de transparência (*glassmorphism*) e animações suaves.
- [x] **Busca Inteligente:** Filtro de usuários por e-mail diretamente integrado à API via Query Params.
- [x] **Responsividade:** Layout totalmente adaptável para Desktop, Tablet e Mobile.

---

##  Como Rodar o Projeto

### **1. Preparação**
Certifique-se de ter o Node.js v18+ instalado. Primeiro, clone o repositório:

```bash
git clone https://github.com/roger-inatel/Sistema_vivo.git
cd Sistema_vivo
```

### **2. Backend**
Instale as dependências e prepare o Prisma:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
```

Para iniciar o servidor:

```bash
node index.js
```

### **3. Frontend**
Instale as dependências e rode o app:

```bash
cd ../frontend
npm install
npm run dev
```

### **4. Variáveis de Ambiente (opcional no front)**
Se o frontend consome uma URL da API, considere criar um arquivo `.env` em `frontend/` com a variável (exemplo `VITE_API_URL`).
