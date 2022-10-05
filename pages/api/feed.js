import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const petshops = await prisma.petshop.findMany({
    select: {
      id: true,
      tipo: true,
      nome: true,

      endereco: true,
    },
  });
  const veterinarios = await prisma.veterinario.findMany({
    select: {
      id: true,
      tipo: true,
      nome: true,

      endereco: true,
    },
  });

  const feed = petshops.concat(veterinarios);

  if (req.method !== "GET") {
    res.status(401).json({ message: "Não autorizado" });
    return;
  }

  res.status(200).json(feed);
}
