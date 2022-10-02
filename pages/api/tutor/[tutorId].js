import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const pets = await prisma.pet.findMany({
    where: {
      tutorId: req.query.id,
    },
    select: {
      nome: true,
      Vacina: true,
    },
  });

  res.status(200).json(pets);
}