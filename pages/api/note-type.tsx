import type { NextApiRequest, NextApiResponse } from "next";
import { NoteType, PrismaClient } from "@prisma/client";

type ReturnData =
  | {
      types: Array<NoteType>;
    }
  | string;

type PostData = {
  noteName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  const prisma = new PrismaClient();
  const currentTypes = await prisma.noteType.findMany();

  switch (req.method) {
    case "GET":
      res.status(200).json({ types: currentTypes });
      break;
    case "POST":
      if (!req.body) {
        res.status(400).json("Content is required for POST");
        return;
      }
      const { noteName }: PostData = JSON.parse(req.body);

      if (
        currentTypes.filter(
          (currentType) =>
            currentType.name.toLowerCase() === noteName.toLowerCase()
        ).length > 0
      ) {
        res.status(400).json("Note type already exists");
      } else {
        const newType = await prisma.noteType.create({
          data: {
            name: noteName,
          },
        });
        res.status(201).json({ types: [...currentTypes, newType] });
      }
      break;
  }
}
