import type { NextApiRequest, NextApiResponse } from "next";
import { Note, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Note>>
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const notes = await prisma.note.findMany();
      res.status(200).json(notes);
      break;
  }
}
