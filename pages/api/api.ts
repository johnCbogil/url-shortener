// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  response: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rand = generateSmolURL()
  const inputURL = req.body['key']['longURL']
  res.status(200).json({ response: inputURL })
}

export function generateSmolURL() {
  const min = 1;
  const max = 999999;
  const rand = min + Math.floor(Math.random() * (max - min));
  return rand
}

