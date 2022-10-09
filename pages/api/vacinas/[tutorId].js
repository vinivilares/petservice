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
}


// async function adicionarVacina( {
//   const response = await fetch(`/api/vacinas/${user}`, {
//     method: "CREATE",
//     body: JSON.stringify(vacina),
//     data:{
//       petVetor[?] : petVetor[?]
//       vacina : vacina
//       dataVacina : dataVacina
//       doses : doses

//     }
//   });
//   const data = await response.json();
//   router.reload();
// }