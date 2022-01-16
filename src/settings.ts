// CHANGE: Set the defaults for initial Note types, default NoteType, initial Collections, and default Collection here

import { NoteModifier, Collection } from ".prisma/client";

// Note Types
export const initialNoteTypes = ["Note", "Event", "Idea"];
export const defaultNoteType = initialNoteTypes[0];

// Collections
export const initialCollections: Array<Omit<Collection, "id">> = [
  {
    name: "Daily Log",
    otherDateRequired: false,
  },
  {
    name: "Monthly Log",
    otherDateRequired: true,
  },
  {
    name: "Future Log",
    otherDateRequired: true,
  },
];
export const defaultCollection = initialCollections[0];

export const initialNoteMods: Array<Omit<NoteModifier, "id">> = [
  {
    name: "Priority",
    char: "*",
  },
  {
    name: "Inspiration",
    char: "!",
  },
];
