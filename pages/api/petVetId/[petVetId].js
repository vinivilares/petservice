import {
  buscarEndereco,
  buscarPetVet,
  buscarServicos,
  prisma,
} from "../../../lib/prisma";

export default async function handler(req, res) {
  const petVet = await buscarPetVet(req.query.petVetId);
  const endereco = await buscarEndereco(petVet.enderecoId);
  const servicos = await buscarServicos(petVet.id);

  const dados = {
    dados: {
      ...petVet,
    },
    endereco: {
      ...endereco,
    },
    servicos: {
      ...servicos,
    },
  };

  prisma.$disconnect();
  return res.status(200).json(dados);
}
