import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { z } from 'zod';
import cors from 'cors';

dotenv.config();

const app = express(); // 1º: Criamos o app (Movi da linha 10 para cá)
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://sistema-vivo-5l4z.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})); // 2º: Agora sim podemos usar o cors no app
app.use(express.json()); // 3º: E o parser de JSON

app.get('/', (req, res) => {
  res.send('API online');
});

// Esquema de validação
const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Formato de e-mail inválido"),
  phone: z.string().optional()
});

// --- Suas Rotas ---

app.post('/users', async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = await prisma.user.create({
      data: validatedData,
    });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: "Erro interno" });
  }
});

app.get('/users', async (req, res) => {
  const { email } = req.query;
  const users = await prisma.user.findMany({
    where: email ? { email: email } : {},
  });
  res.json(users);
});

app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(200).send('Usuário deletado com sucesso');
  } catch (error) {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "Erro ao atualizar: Usuário não encontrado ou e-mail já existe." });
  }
});

app.listen(PORT, () => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  console.log(`🚀 Servidor rodando em ${baseUrl}`);
});