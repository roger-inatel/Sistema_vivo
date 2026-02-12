# 🚀 User Management API (Node.js + Prisma + MongoDB)

Este projeto é uma API de gerenciamento de usuários completa (CRUD), desenvolvida para consolidar conhecimentos em Node.js, bancos de dados não relacionais e validação de dados.

## 🛠 Tecnologias
- **Runtime:** Node.js v24
- **Framework:** Express.js
- **Banco de Dados:** MongoDB (Atlas)
- **ORM:** Prisma v6
- **Validação:** Zod
- **Estilo de Módulo:** ES Modules (`import/export`)

## 📌 Funcionalidades
- [x] Cadastro de usuários com Nome, E-mail (único) e Telefone (opcional).
- [x] Listagem de todos os usuários ou busca por filtro de e-mail.
- [x] Edição de dados existentes por ID.
- [x] Exclusão de registros do banco de dados.
- [x] Validação de inputs com mensagens de erro customizadas.
- [x] Configuração de CORS habilitada para integração com Frontend.

## 🚀 Como rodar o projeto
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Configure seu arquivo `.env` com a variável `DATABASE_URL`.
4. Sincronize o banco: `npx prisma db push`.
5. Rode o servidor: `node --watch index.js`.