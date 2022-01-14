import {
  Collection,
  NoteType,
  PrismaClient,
  NoteModifier,
} from "@prisma/client";
import { ObjectId } from "bson";
import {
  initialCollections,
  initialNoteTypes,
  initialNoteMods,
} from "../settings";

const prisma = new PrismaClient();

const fillDb = async () => {
  console.log("Creating default note types");
  await prisma.noteType.createMany({
    data: initialNoteTypes.map(
      (noteType): NoteType => ({
        id: new ObjectId().toString(),
        name: noteType,
      })
    ),
  });

  console.log("Creating default collections...");
  await prisma.collection.createMany({
    data: initialCollections.map(
      (collection): Collection => ({
        id: new ObjectId().toString(),
        name: collection.name,
        otherDateRequired: collection.otherDateRequired,
      })
    ),
  });

  console.log("Creating default note mods...");
  await prisma.noteModifier.createMany({
    data: initialNoteMods.map(
      (noteMod): NoteModifier => ({
        id: new ObjectId().toString(),
        name: noteMod.name,
        char: noteMod.char,
      })
    ),
  });
};

fillDb();
