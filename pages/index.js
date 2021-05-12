import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../components/navbar';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [numParagraphs, setNumParagraphs] = useState(3);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/hello', {
      params: {
        numParagraphs: numParagraphs,
      }
    })
    .then(response => {
      setResults(response.data.stuff);
      setIsLoading(false);
    })
  }, [numParagraphs]);
  
  return (
    <div>
      <NavBar />
      <Head>
        <title>Grateful Ipsum</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <h1 className="text-blue-600">
          Grateful Ipsum
        </h1>

        <div>
          <form>
            <input type="textbox" placeholder="# of paragraphs" value={numParagraphs} onChange={(event)=>{setNumParagraphs(event.target.value)}} />
          </form>
        </div>

        <div>
          {results.map(result => (
            <p className="mb-4">{result}</p>
          ))}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            💀
          </span>
        </a>
      </footer>
    </div>
  )
}
