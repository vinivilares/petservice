import { prisma } from "../../lib/prisma"

export default async function handler(req, res) {
    const petshops = await prisma.petshop.findMany()

    res.status(200).json(petshops)
}