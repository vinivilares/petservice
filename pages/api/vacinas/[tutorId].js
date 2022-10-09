import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  // Trazendo todas as vacinas
  if (req.method === "GET") {
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
    return;
  }

  // Deletando uma vacina
  if (req.method === "DELETE") {
    const data = req.body;
    const { id } = data;
    const vacinaDeletada = await prisma.vacina.delete({
      where: {
        id: id,
      },
    });
    // console.log(vacina.id);
    res.status(200).json({ mensagem: "Deletado com sucesso!" });
    return;
  }

  if (req.method === "POST") {
    const { nome, data, doses, petNome } = req.body;
    const pet = await prisma.pet.findFirst({
      where: {
        nome: petNome,
      },
    });
    const vacina = await prisma.vacina.create({
      data: {
        nome: nome,
        data: new Date(data),
        doses: parseInt(doses),
        petId: pet.id,
      },
    });
    res.status(201).json({ mensagem: "Criado com sucesso" });
    return;
  }

  if (req.method === "PUT") {
    const { id, nome, data, doses, petNome } = req.body;
    const pet = await prisma.pet.findFirst({
      where: {
        nome: petNome,
      },
    });
    const vacina = await prisma.vacina.update({
      data: {
        nome: nome,
        data: new Date(data),
        doses: parseInt(doses),
        petId: pet.id,
      },
      where: {
        id: id,
      }
    });
    res.status(201).json({ mensagem: "Criado com sucesso" });
    return;
  }
}
