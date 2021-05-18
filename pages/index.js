import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [numParagraphs, setNumParagraphs] = useState(3);
  const [withDeadAndCo, setWithDeadAndCo] = useState(false);
  const [jerryMode, setJerryMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTextFromApi();
  }, [numParagraphs, withDeadAndCo, jerryMode]);

  const fetchTextFromApi = () => {
    setIsLoading(true);
    axios
      .get("/api/dead", {
        params: {
          numParagraphs: numParagraphs,
          withDeadAndCo: withDeadAndCo,
          jerryMode: jerryMode,
        },
      })
      .then((response) => {
        setResults(response.data.stuff);
        setIsLoading(false);
      });
  };

  const toggleDarkMode = (e) => {
    e.preventDefault();

    if (darkMode) {
      document.body.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  };

  return (
    <div id="app__Homepage" className="dark:bg-gray-600">
      <Head>
        <title>Grateful Ipsum</title>
        <meta
          name="description"
          content="A Lorem Ipsum placeholder text generator using terms from the greatest band in the land, the Grateful Dead."
        />
        <meta
          name="keywords"
          content="jambands, grateful, dead, jerry, phish, trey, phil"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-14GWEHQM0J`}/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-14GWEHQM0J');
          `,
          }}
        />
      </Head>
      <NavBar />
      {/* HEADER */}
      <header>
        <div className="lg:text-center m-10">
          <p className="dark:text-white transition-colors duration-200 mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to Dev...with the Dead!
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-200 lg:mx-auto">
            In the publishing and graphic design worlds, it's common to need
            "placeholder" text in order to demonstrate how copy will appear
            visually, without relying on{" "}
            <span className="italic">the actual</span> text being available.
            <br />
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-200 lg:mx-auto">
            Enter <span className="font-bold">Grateful Ipsum</span>
            ...placeholder text for{" "}
            <span className="font-mono">{`Dead</head>s`}</span>
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto max-w-3xl">
        <div className="shadow flex justify-between items-end p-2 bg-gray-100 rounded sticky top-0 sm:relative dark:bg-gray-800">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              fetchTextFromApi();
            }}
          >
            <div className="flex">
              <div className="container">
                <label className="dark:text-gray-200 leading-7 text-sm text-gray-600">
                  # of Paragraphs &nbsp;
                </label>
                <input
                  type="text"
                  className="dark:text-white w-20 bg-gray-50 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="# of paragraphs"
                  value={numParagraphs}
                  onChange={(event) => {
                    setNumParagraphs(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex w-2/4">
              <div className="container">
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setWithDeadAndCo(event.target.checked);
                  }}
                />
                <label className="dark:text-gray-200 leading-7 text-sm text-gray-600">
                  &nbsp; Include D&C
                </label>
              </div>
              <div className="container">
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setJerryMode(event.target.checked);
                  }}
                />
                <label className="dark:text-gray-200 leading-7 text-sm text-gray-600">
                  &nbsp; JerryMode
                </label>
              </div>
            </div>
          </form>
          <button
            className="transition-colors duration-200 inline-flex text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            onClick={fetchTextFromApi}
          >
            Generate
          </button>
        </div>

        <div className="mx-3 shadow mb-5 dark:bg-gray-700 px-5 pb-4 pt-4">
          {results.map((result, index) => (
            <p
              key={`paragraph-${index}`}
              className="mb-4 dark:text-gray-200 transition-colors duration-200"
            >
              {result}
            </p>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <Footer toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
