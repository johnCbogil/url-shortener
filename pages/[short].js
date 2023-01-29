import clientPromise from "../lib/mongodb";
import { useEffect } from "react";

export default function Post({longURL}) {
  useEffect(() => {
    console.log(longURL)
      setTimeout(() => {
        window.location.href = longURL;
      }, 1000);
  }, []);

  }

  export async function getServerSideProps({ query }) {
    const client = await clientPromise;
    const db = client.db("urls");
    const collection = db.collection("urls")
    let shortinput = query["short"]
    console.log("short " + shortinput)
    const long = await collection.findOne({short: parseInt(shortinput)}, {projection: { long: 1 }})
    const longURL = long["long"]
    console.log("long " + longURL)
    return { props: { longURL: longURL } };
  }
  