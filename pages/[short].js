import clientPromise from "../lib/mongodb";

export default function Post({longURL}) {
  console.log(longURL)
    setTimeout(() => {
      window.location.href = longURL;
    }, 1000);

  }

  export async function getServerSideProps({ query }) {
    const client = await clientPromise;
    const db = client.db("urls");
    const collection = db.collection("urls")
    let shortinput = query["short"]
    console.log(shortinput)
    const long = await collection.findOne({short: parseInt(shortinput)}, {projection: { long: 1 }})
    const longURL = long["long"]
    console.log(longURL)
    return { props: { longURL: longURL } };
  }
  