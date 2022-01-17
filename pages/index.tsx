import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Header } from "../src/components/Header";
import { NoteList } from "../src/components/NoteList";
import styles from "../styles/Home.module.scss";
import defaultStyles from "../styles/default.module.scss";
import { PrismaClient } from "@prisma/client";
import { DisplayNote, noteToDisplayNote } from "../src/db/access";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { getNotesForDate } from "../src/db/note";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

type HomeProps = {
  notes: Array<DisplayNote>;
};

const Home: NextPage<HomeProps> = ({ notes }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentNotes, setCurrentNotes] = useState(notes);
  const [isLoading, setIsLoading] = useState(false);
  console.log(currentNotes);

  useEffect(() => {
    setIsLoading(true);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();
    axios.get(`api/note/${year}/${month}/${day}`).then((res) => {
      setCurrentNotes(res.data);
      setIsLoading(false);
    });
  }, [startDate]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Journaliser</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          <h2 className={defaultStyles.title}>Daily Log</h2>
          <DatePicker
            showPopperArrow={false}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            customInput={
              <p className={styles.date}>
                {format(startDate, "eee do LLL yyyy")}
              </p>
            }
          />
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <NoteList notes={currentNotes} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const prisma = new PrismaClient();

  const notes = await getNotesForDate(prisma, new Date());

  return {
    props: {
      notes: notes.map((note) => noteToDisplayNote(note)),
    }, // will be passed to the page component as props
  };
};
