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
      const db = client.db("sample_mflix");

      const movies = await db
          .collection("movies")
          .find({})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();

      res.json(movies);
  } catch (e) {
      console.error(e);
  }
};