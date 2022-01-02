import { Collection, PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { initalCollections } from "../settings";

const prisma = new PrismaClient();

const fillDb = async () => {
  console.log("Creating default collections...");
  await prisma.collection.createMany({
    data: initalCollections.map(
      (collection): Collection => ({
        id: new ObjectId().toString(),
        name: collection,
      })
    ),
  });
};

fillDb();
