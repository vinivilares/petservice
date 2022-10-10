import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const Nmservico = await prisma.NmServ.findMany();

    res.status(200).json(Nmservico);
    return;
  }
  res.status(401).json({message:"Não autorizada"})
}
