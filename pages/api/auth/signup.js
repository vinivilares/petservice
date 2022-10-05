// TODO FAZER VALIDAÇÃO SE O EMAIL EXISTE NAS 3 TABELAS

import { hashPassword } from "../../../lib/auth";
import { buscarUser, prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password, tipo, nome, endereco } = data;
    const { cep, logradouro, complemento, bairro, localidade, uf } = endereco;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Dados inválidos - Senha deve possuir no minimo 7 caracteres",
      });
      return;
    }

    // Verificação se a conta existe
    const existingUser = await buscarUser(email);

    if (existingUser) {
      res.status(422).json({ message: "Usuário já existe!" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const userEndereco = await prisma.endereco.create({
      data: {
        cep: cep,
        logradouro: logradouro,
        complemento: complemento,
        bairro: bairro,
        localidade: localidade,
        uf: uf
      },
    });

    // Criação da conta do tutor
    if (tipo === "tutor") {
      const user = await prisma.tutor.create({
        data: {
          email: email,
          password: hashedPassword,
          tipo: tipo,
          nome: nome,
          enderecoId: userEndereco.id,
        },
      });
    }

    // // Criação da conta do pethop
    if (tipo === "petshop") {
      const user = await prisma.petshop.create({
        data: {
          email: email,
          password: hashedPassword,
          tipo: tipo,
          nome: nome,
          enderecoId: userEndereco.id,
        },
      });
    }

    // Criação da conta do veterinário
    if (tipo === "veterinario") {
      const user = await prisma.veterinario.create({
        data: {
          email: email,
          nome: nome,
          password: hashedPassword,
          tipo: tipo,
          enderecoId: userEndereco.id,
        },
      });
    }

    res.status(201).json({ message: "Usuário Criado!" });
  }
}
