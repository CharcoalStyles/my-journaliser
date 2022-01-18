import type { NextApiRequest, NextApiResponse } from "next";
import { Note, NoteModifier, PrismaClient } from "@prisma/client";
import { defaultCollection, defaultNoteType } from "../../src/settings";

type PostNote = {
  body: string;
  noteTypeId: string;
  collectionId: string;
  modifiers: Array<string>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Note> | string>
) {
  console.log(req.method);
  console.log("body", req.body);
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const notes = await prisma.note.findMany();
      res.status(200).json(notes);
      break;
    case "POST":
      if (!req.body) {
        res.status(400).json("Content is required for POST");
        return;
      }

      const { body, noteTypeId, collectionId, modifiers }: PostNote =
        JSON.parse(req.body);
      let confirmedNoteType: string | undefined;
      let confirmedCollection: string | undefined;
      let confirmedModifiers: Array<NoteModifier> = [];

      if (!body) {
        res.status(400).json("Body is required for POST");
        return;
      }

      if (noteTypeId) {
        const noteType = await prisma.noteType.findFirst({
          where: {
            id: noteTypeId,
          },
        });
        if (!noteType) {
          res.status(400).json("Invalid noteTypeId");
          return;
        } else {
          confirmedNoteType = noteTypeId;
        }
      } else {
        confirmedNoteType = (
          await prisma.noteType.findFirst({
            where: {
              name: defaultNoteType,
            },
          })
        )?.id;
      }

      if (collectionId) {
        const collection = await prisma.collection.findFirst({
          where: {
            id: collectionId,
          },
        });
        if (!collection) {
          res.status(400).json("Invalid collectionId");
          return;
        } else {
          confirmedCollection = collectionId;
        }
      } else {
        confirmedCollection = (
          await prisma.collection.findFirst({
            where: {
              name: defaultCollection.name,
            },
          })
        )?.id;
      }

      if (modifiers.length > 0) {
        const noteMods = await prisma.noteModifier.findMany();
        confirmedModifiers = modifiers
          .map((mod) => {
            const noteMod = noteMods.find((modifier) => modifier.char === mod);
            if (noteMod) {
              return noteMod;
            }
            return undefined;
          })
          .filter((noteMod): noteMod is NoteModifier => noteMod !== undefined);
      }
      if (!confirmedNoteType || !confirmedCollection) {
        res.status(400).json("Something went wrong with defaults");
        return;
      } else {

        const date = new Date();

        await prisma.note.create({
          data: {
            body,
            noteTypeId: confirmedNoteType,
            collectionId: confirmedCollection,
            noteModIds: confirmedModifiers.map((mod) => mod.id),
            targetDay: date.getDay(),
            targetMonth: date.getMonth() + 1,
            targetYear: date.getFullYear(),
          },
        });
        res.status(201).json("Note created");
      }
      break;
  }
  return;
}
