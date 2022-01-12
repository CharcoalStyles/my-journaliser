// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { defaultCollection, defaultNoteType } from "../../src/settings";

type Data = {
  defaultCollection: string;
  defaultNoteType: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ defaultCollection, defaultNoteType });
}
