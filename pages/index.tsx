import Head from 'next/head'
import React, { useState } from 'react';
import Link from 'next/link'

export default function Home() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleChange = (event: any) => {
    setLongURL(event.target.value);
  }

  const handleClick = async () => {
    const host = process.env.NEXT_PUBLIC_API_URL
    console.log("Host " + host)
    const response = await fetch(host + 'api/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: {longURL} })
    });
    const json = await response.json();
    console.log("json " + json.response)
    setShortURL(host + json.response);
  }

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>🤏 Smol URL</h1>
        <h3>Enter a long URL to make a SmolURL:</h3>
        <label>
          Long URL:
          <input type="text" name="name" value={longURL} onChange={handleChange} />
        </label>
        <button onClick={handleClick}>Make it smol.</button>

        <h2>Your new smol URL is:       <Link href={`${shortURL}`}>
            {shortURL}
          </Link> </h2>
  
      </main>
    </>
  )
}
