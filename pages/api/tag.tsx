import type { NextApiRequest, NextApiResponse } from "next";
import { Tag, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Tag>>
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const tags = await prisma.tag.findMany();
      res.status(200).json(tags);
      break;
  }
}
