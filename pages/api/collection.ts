import type { NextApiRequest, NextApiResponse } from "next";
import { Collection, PrismaClient } from "@prisma/client";

type ReturnData =
  | {
      collections: Array<Collection>;
    }
  | string;

type PostData = {
  name: string;
  otherDateRequired: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  const prisma = new PrismaClient();

  const currentCollections = await prisma.collection.findMany();

  switch (req.method) {
    case "GET":
      res.status(200).json({ collections: currentCollections });
      break;
    case "POST":
      if (!req.body) {
        res.status(400).json("Content is required for POST");
        return;
      }

      const { name, otherDateRequired }: PostData = JSON.parse(req.body);
      if (!name) {
        res.status(400).json("name is required for POST");
        return;
      }
      if (
        currentCollections.filter(
          (currentCollections) =>
            currentCollections.name.toLowerCase() === name.toLowerCase()
        ).length > 0
      ) {
        res.status(400).json("Note type already exists");
      } else {
        const newCollection = await prisma.collection.create({
          data: {
            name: name,
            otherDateRequired,
          },
        });
        res
          .status(201)
          .json({ collections: [...currentCollections, newCollection] });
      }
      break;
  }
}
