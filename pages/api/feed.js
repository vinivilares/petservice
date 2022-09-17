import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const petshops = await prisma.petshop.findMany();
  const veterinarios = await prisma.veterinario.findMany();

  const feed = petshops.concat(veterinarios);

  if (req.method !== "GET") {
    res.status(401).json({ message: "Não autorizado" });
    return;
  }

  res.status(200).json(feed);
}
