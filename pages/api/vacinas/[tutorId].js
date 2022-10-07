import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const vacinas = await prisma.pet.findMany({
    where: {
      tutorId: req.query.tutorId,
      AND: {
        Vacina: {
          some: { id: undefined },
        },
      },
    },
    include: {
      Vacina: true,
    },
  });

  res.status(200).json(vacinas);
}
