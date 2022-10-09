import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id, nome, data, especie, raca } = req.body;

  if (req.method === "DELETE") {
    const pet = await prisma.pet.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: "Deletado com sucesso!" });
  }

  if (req.method === "PUT") {
    const pet = await prisma.pet.update({
      where: {
        id: id,
      },
      data: {
        nome,
        idade: new Date(data),
        especie,
        raca,
      },
    });
    return res.status(200).json({ message: "Editado com sucesso!" });
  }

  const pet = await prisma.pet.findFirst({
    where: {
      id: req.query.petId,
    },
    include: {
      Vacina: true,
    },
  });

  res.status(200).json(pet);
}
