import { NoteTypes } from "@prisma/client";

// CHANGE: Set the defaults for default NoteType, initial Collections, and default Collection here

// Note Types
export const defaultNoteType = NoteTypes.NOTE;

// Collections
export const initialCollections = ["FutureLog", "MonthlyLog", "DailyLog"];
export const defaultCollection = initialCollections[2];
