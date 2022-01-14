import { Note } from "@prisma/client";
import styles from "../../styles/noteList.module.scss";
import { DisplayNote } from "../db/access";

type NoteListProps = {
  notes: Array<DisplayNote>;
};

const getListClass = (note: DisplayNote): string => {
  return styles.note + " " + (note.completed ? styles.completed : "");
};

export const NoteList = ({ notes }: NoteListProps) => {
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className={getListClass(note)}>
          <span className={styles.bullet}>{note.noteType.name}</span>
          {note.body}
        </div>
      ))}
    </>
  );
};
