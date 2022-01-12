import type { NextApiRequest, NextApiResponse } from "next";
import { Note, NoteModifiers, NoteTypes, PrismaClient } from "@prisma/client";
import { defaultCollection, defaultNoteType } from "../../src/settings";

type PostNote = {
  body: string;
  noteType: NoteTypes;
  collectionId: string;
  modifiers: Array<NoteModifiers>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Note> | string>
) {
    console.log(req.method);
    console.log('body', req.body);
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
      
      const { body, noteType, collectionId, modifiers }: PostNote = JSON.parse(req.body);
      let confirmedCollection;
      if (!body) {
        res.status(400).json("Body is required for POST");
        return;
      }
      if (noteType) {
        if (!Object.values(NoteTypes).includes(noteType)) {
          res.status(400).json("Invalid noteType");
          return;
        }
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
              name: defaultCollection,
            },
          })
        )?.id;
      }
      const d = {
        body,
        noteType: noteType || defaultNoteType,
        collectionId: confirmedCollection,
        modifiers: modifiers,
      };
      console.log(d);

      await prisma.note.create({
        data: d,
      });
      res.status(200).json("Note created");
      break;
  }
  return;
}
