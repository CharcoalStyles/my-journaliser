// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Note, NoteType, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNotesForDate } from "../../../../../src/db/note";

type Data = Array<
  Note & {
    noteType: NoteType;
  }
>;

type Slugs = {
  year: number;
  month: number;
  day: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  //@ts-ignore
  const { day, month, year }: Slugs = req.query;
  const date = new Date(year, month - 1, day);
  const notes = await getNotesForDate(prisma, date);
  res.status(200).json(notes);
}
