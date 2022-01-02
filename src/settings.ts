import { NoteTypes } from "@prisma/client";

// CHANGE: Set the defaults for default NoteType, inital Collections, and default Collection here

// Note Types
export const defaultNoteType = NoteTypes.NOTE;

// Collecitons
export const initalCollections = ["FutureLog", "MonthlyLog", "DailyLog"];
export const defaultCollection = initalCollections[2];
