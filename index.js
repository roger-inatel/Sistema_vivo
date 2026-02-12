import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { z } from 'zod';
import cors from 'cors';

dotenv.config();
app.use(cors()); //para permitir o site acessar a api, sem isso, o navegador bloqueia a requisição por questões de segurança (CORS)

const app = express();
const prisma = new PrismaClient(); // Na V6, isso volta a funcionar perfeitamente!
// Criado o "contrato" de como um usuário deve ser
const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Formato de e-mail inválido"),
  phone: z.string().optional()
});


app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    // Tenta validar os dados que chegaram
    const validatedData = userSchema.parse(req.body);

    const user = await prisma.user.create({
      data: validatedData,
    });
    res.status(201).json(user);
  } catch (error) {
    // Se a validação falhar, ele cai aqui
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: "Erro interno" });
  }
});

app.get('/users', async (req, res) => {
  const { email } = req.query; // Pega o email da URL (?email=...)

  const users = await prisma.user.findMany({
    where: email ? { email: email } : {}, // Se tiver email, filtra; se não, traz tudo
  });
  
  res.json(users);
});

// Rota para Deletar Usuário pelo ID
app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send('Usuário deletado com sucesso');
  } catch (error) {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

// Rota para Editar Usuário
app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id, // O ID que vem na URL
      },
      data: {
        name: req.body.name,   // Novos dados que vêm no corpo da requisição
        email: req.body.email,
        phone: req.body.phone,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "Erro ao atualizar: Usuário não encontrado ou e-mail já existe." });
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});