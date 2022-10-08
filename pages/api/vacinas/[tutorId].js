import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
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
  if (req.method === "DELETE") {
    const data = req.body;
    const { id } = data;
    // console.log(data);
    const vacina = await prisma.vacina.delete({
      where: {
        id: data.id,
      },
    });
    res.status(200).json({ mensagem: "Deletado com sucesso!" });
  }
}
