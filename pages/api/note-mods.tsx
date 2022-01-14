import type { NextApiRequest, NextApiResponse } from "next";
import { NoteModifier, PrismaClient } from "@prisma/client";

type ReturnData = {
  mods: Array<NoteModifier>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  const prisma = new PrismaClient();
  const currentMods = await prisma.noteModifier.findMany();

  switch (req.method) {
    case "GET":
      res.status(200).json({ mods: currentMods });
      break;
  }
}
