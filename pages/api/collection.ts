import type { NextApiRequest, NextApiResponse } from "next";
import { Collection, PrismaClient } from "@prisma/client";

type ReturnData = {
  collections: Array<Collection>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const collections = await prisma.collection.findMany();
      res.status(200).json({ collections });
      break;
  }
}
