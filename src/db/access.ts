import { Note, NoteModifiers, NoteTypes, PrismaClient } from "@prisma/client";

export type DisplayNote = Omit<Note, "createdAt"> & {
  createdAt: string;
};

export const noteToDisplayNote = (note: Note): DisplayNote => ({
  ...note,
  createdAt: note.createdAt.toISOString(),
});