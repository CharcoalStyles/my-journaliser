import { Collection, NoteType, PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";

const prisma = new PrismaClient();

const defaultCollections = ["FutureLog", "MonthlyLog", "DailyLog"];
const defaultTypes = ["Task", "Note", "Event"];

const fillDb = async () => {
  console.log("Creating default collections...");
  await prisma.collection.createMany({
    data: defaultCollections.map(
      (collection): Collection => ({
        id: new ObjectId().toString(),
        name: collection,
      })
    ),
  });

  console.log("Creating default types...");
  await prisma.noteType.createMany({
    data: defaultTypes.map(
      (type): NoteType => ({
        id: new ObjectId().toString(),
        name: type,
      })
    ),
  });
};

fillDb();