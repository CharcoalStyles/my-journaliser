import type { NextApiRequest, NextApiResponse } from "next";
import { NoteType, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<NoteType>>
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const types = await prisma.noteType.findMany();
      res.status(200).json(types);
      break;
  }
}
