import type { NextApiRequest, NextApiResponse } from "next";
import { Collection, PrismaClient } from "@prisma/client";

type ReturnData =
  | {
      collections: Array<Collection>;
    }
  | string;

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

      const { collectionName }: { collectionName: string } = JSON.parse(
        req.body
      );
      if (!collectionName) {
        res.status(400).json("collectionName is required for POST");
        return;
      }
      if (
        currentCollections.filter(
          (currentCollections) =>
            currentCollections.name.toLowerCase() ===
            collectionName.toLowerCase()
        ).length > 0
      ) {
        res.status(400).json("Note type already exists");
      } else {
        const newCollection = await prisma.collection.create({
          data: {
            name: collectionName,
          },
        });
        res
          .status(201)
          .json({ collections: [...currentCollections, newCollection] });
      }
      break;
  }
}
