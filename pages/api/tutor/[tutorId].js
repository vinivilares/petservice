import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  // Adicionar
  if (req.method === "POST") {
    const { nome, especie, raca, data } = req.body;
    const pet = await prisma.pet.create({
      data: {
        tutorId: req.query.tutorId,
        nome: nome,
        especie: especie,
        raca: raca,
        idade: new Date(data),
      },
    });
    return res.status(200).json({ message: `${pet.nome} Adicionado!` });
  }

  // Listar
  const user = await prisma.tutor.findFirst({
    where: {
      id: req.query.tutorId,
    },
    include: {
      endereco: true,
      pet: true,
    },
  });
  return res.status(200).json(user);
}
