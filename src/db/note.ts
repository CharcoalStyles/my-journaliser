import { PrismaClient } from "@prisma/client";
import { set } from "date-fns";

export const getNotesForDate = async (prisma: PrismaClient, date: Date) => {
  return await prisma.note.findMany({
    include: {
      noteType: true,
    },
    where: {
      AND: [
        {
          createdAt: {
            gt: set(date, {
              hours: 0,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            }),
          },
        },
        {
          createdAt: {
            lt: set(date, {
              hours: 23,
              minutes: 59,
              seconds: 59,
              milliseconds: 999,
            }),
          },
        },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
};
