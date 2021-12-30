import type { NextApiRequest, NextApiResponse } from "next";
import { Collection, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Collection>>
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const collections = await prisma.collection.findMany();
      res.status(200).json(collections);
      break;
  }
}
