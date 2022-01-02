import type { NextApiRequest, NextApiResponse } from "next";
import { NoteTypes } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<string>>
) {
  switch (req.method) {
    case "GET":
      const types = Object.keys(NoteTypes);
      res.status(200).json(types);
      break;
  }
}
