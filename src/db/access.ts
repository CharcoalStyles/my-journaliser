import { Note, NoteType } from "@prisma/client";

export type DisplayNote = Omit<Note, "createdAt"> & {
  createdAt: string;
  noteType: NoteType;
};

export const noteToDisplayNote = (
  note: Note & {
    noteType: NoteType;
  }
): DisplayNote => ({
  ...note,
  createdAt: note.createdAt.toISOString(),
});
