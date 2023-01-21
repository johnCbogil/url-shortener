// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb";

type Data = {
  response: any
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const rand = generateSmolURL()
//   const inputURL = req.body['key']['longURL']
//   res.status(200).json({ response: rand })
// }

export function generateSmolURL() {
  const min = 1;
  const max = 999999;
  const rand = min + Math.floor(Math.random() * (max - min));
  return rand
}

export default async (req: any, res: any) => {
  try {
      const client = await clientPromise;
      const db = client.db("urls");

      const movies = await db
          .collection("urls")
          .find({})
          .toArray();

      res.json(movies);
  } catch (e) {
      console.error(e);
  }
};