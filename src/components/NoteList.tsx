import { Note } from "@prisma/client";
import styles from "../../styles/noteList.module.scss";

type NoteListProps = {
  notes: Array<Note>;
};

const getListClass = (note: Note): string => {
  return styles.note + " " + (note.completed ? styles.completed : "");
};

export const NoteList = ({ notes }: NoteListProps) => {
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className={getListClass(note)}>
          <span className={styles.bullet}>{note.noteType}</span>{note.body}
        </div>
      ))}
    </>
  );
};
