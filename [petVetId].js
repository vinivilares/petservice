import {
  buscarEndereco,
  buscarPetVet,
  buscarServicos,
  prisma,
} from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const petVet = await buscarPetVet(req.query.petVetId);
    const endereco = await buscarEndereco(petVet.enderecoId);
    const servicos = await buscarServicos(petVet.id);

    const dados = {
      dados: petVet,
      endereco: endereco,
      servicos: servicos,
    };

    res.status(200).json(dados);
    return;
  }

  if (req.method === "POST") {
    const data = req.body;
    const { nome, descricao, valor } = data;

    const nmServ = await prisma.nmServ.findFirst({
      where: {
        NomeServico: nome,
      },
    });

    const petVet = await buscarPetVet(req.query.petVetId);

    if (petVet.tipo === "veterinario") {
      const servico = await prisma.servico.create({
        data: {
          nmServId: nmServ.id,
          descricao: descricao,
          preco: valor,
          veterinarioId: petVet.id,
        },
      });
      return;
    }
    const servico = await prisma.servico.create({
      data: {
        nmServId: nmServ.id,
        descricao: descricao,
        preco: valor,
        petshopId: petVet.id,
      },
    });

    res.status(201).json({ message: "Serviço Criado" });
    return;
  }
  //DELETE
  if (req.method === "DELETE") {
    const data = req.body;
    const { id } = data;

    const servicoDeletado = await prisma.servico.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Deletado com sucesso" });
    return;
  }
  //UPDATE
  if (req.method === "PUT") {
    const data = req.body;
    const { id, nome, descricao, valor } = data;

    const nmServ = await prisma.nmServ.findFirst({
      where: {
        NomeServico: nome,
      },
    });

    const servico = await prisma.servico.update({
      where: {
        id: id,
      },
      data: {
        nmServId: nmServ.id,
        descricao: descricao,
        preco: valor,
      },
    });

    res.status(201).json({ message: "Serviço Atualizado" });
    return;
  }
}
