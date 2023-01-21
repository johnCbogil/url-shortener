// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb";

type Data = {
  response: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rand = generateSmolURL()
  const long = req.body['key']['longURL']
  // write to db wiht input

  try {
    const client = await clientPromise;
    const db = client.db("urls");
    const obj = {short: rand, long: long};
    const result = await db.collection('urls').insertOne(obj)   
    // console.log(result)
    res.status(200).json({ response: result })
  } catch(error) {
    console.log(error)
  }
}

export function generateSmolURL() {
  const min = 1;
  const max = 999999;
  const rand = min + Math.floor(Math.random() * (max - min));
  return rand
}
