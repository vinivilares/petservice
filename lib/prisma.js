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


