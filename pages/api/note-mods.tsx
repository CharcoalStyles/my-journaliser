import type { NextApiRequest, NextApiResponse } from "next";
import { NoteModifiers } from "@prisma/client";

type ReturnData = {
  mods: Array<string>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  switch (req.method) {
    case "GET":
      const mods = Object.keys(NoteModifiers);
      res.status(200).json({ mods });
      break;
  }
}
