// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

type Data = {
  response: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rand = generateSmolURL()
  const inputURL = req.body['key']['longURL']
  storeInDB(rand, inputURL)
  res.status(200).json({ response: rand })
}

// generate random number
export function generateSmolURL() {
  const min = 1;
  const max = 999999;
  const rand = min + Math.floor(Math.random() * (max - min));
  return rand
}

export function storeInDB(smolURL: Number, realURL: String) {
  
  var params = {
    TableName: 'smolURL',
    Item: {
      'smolURL' : {N: smolURL.toString()},
      'realURL' : {S: realURL}
    }
  };
  ddb.putItem(params, function(err: any, data: any) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

}

// (async () => {
//   const client = new DynamoDBClient({ region: "us-east-1" });
//   const command = new ListTablesCommand({});
//   try {
//     console.log("hello");
//     const results = await client.send(command);
//     console.log(results.TableNames.join("\n"));
//     console.log(results);
//   } catch (err) {
//     console.log("hello2");
//     console.error(err);
//   }
// })();

// write to db: key == randNum and value == long URL
