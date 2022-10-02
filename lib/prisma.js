import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function buscarUser(email) {
  const user =
    (await prisma.tutor.findUnique({
      where: { email: email },
    })) ||
    (await prisma.petshop.findUnique({
      where: { email: email },
    })) ||
    (await prisma.veterinario.findUnique({
      where: { email: email },
    }));

  return user;
}

export async function buscarPetVet(id) {
  const user =
    (await prisma.petshop.findFirst({
      where: { id: id },
    })) ||
    (await prisma.veterinario.findFirst({
      where: { id: id },
    }));

  return user;
}

export async function buscarEndereco(id) {
  const endereco = await prisma.endereco.findFirst({
    where: {
      id: id,
    },
  });

  return endereco;
}

export async function buscarServicos(id) {
  const servicos = await prisma.servico.findMany({
    where: {
      petshopId: id,
    },
    include: {
      nmServ: true,
    },
  });

  return servicos;
}
