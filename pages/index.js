import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

// CONSTANTS
const MAX_PARAGRAPHS = 25; // MAXIMUM LIMIT OF PARAGRAPHS TO FETCH

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [numParagraphs, setNumParagraphs] = useState(3);
  const [withDeadAndCo, setWithDeadAndCo] = useState(false);
  const [jerryMode, setJerryMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const paragraphCounterRef = useRef(null);

  useEffect(() => {
    fetchTextFromApi(numParagraphs);
  }, []);

  /**
   * Calls the API to fetch the text
   * @param {number} numParagraphs - number of paragraphs to fetch
   * @param {object} optionsObj  - options to pass to the API
   * @param {boolean} optionsObj.withDeadAndCo - whether to include Dead & Co. terms
   * @param {boolean} optionsObj.jerryMode - whether to include Jerry Garcia terms
   * @return {void} - response is stored in state
   */
  const fetchTextFromApi = (numParagraphs, optionsObj = {}) => {
    setIsLoading(true);
    axios
      .get("/api/dead", {
        params: {
          numParagraphs: numParagraphs,
          ...optionsObj
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

  const copyGeneratedParagraphs = (e) => {
    e.preventDefault();
    
    let paragraphHolder = document.getElementById('paragraphHolder');
    let paragraphText = paragraphHolder.innerText;
    let dummyTextArea  = document.createElement('textarea');
    dummyTextArea.display = "none";
    dummyTextArea.value = paragraphText;
    document.body.append(dummyTextArea);
    dummyTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(dummyTextArea);

    // Update button text temporarily to notify user
    e.target.innerText = 'Copied!';
    setTimeout(() => {
      e.target.innerText = 'Copy';
    }, 2000)
  }

  const incrementParagraphs = (e) => {
    e.preventDefault();
    if(numParagraphs >= MAX_PARAGRAPHS) {
      console.log(paragraphCounterRef.current.classList);
      paragraphCounterRef.current.classList.add('border', 'border-red-500');
      setTimeout(() => {
        paragraphCounterRef.current.classList.remove('border', 'border-red-500');
      }, 1000);
      return;
    }
    setNumParagraphs(numParagraphs + 1);
  }

  const decrementParagraphs = (e) => {
    e.preventDefault();
    if(numParagraphs <= 1) {
      console.log(paragraphCounterRef.current.classList);
      paragraphCounterRef.current.classList.add('border', 'border-red-500');
      setTimeout(() => {
        paragraphCounterRef.current.classList.remove('border', 'border-red-500');
      }, 1000);
      return;
    }
    setNumParagraphs(numParagraphs - 1);
  }

  return (
    <div id="app__Homepage" className="dark:bg-gray-600">
      <Head>
        <title>
          Grateful Ipsum | Generate placeholder text with inspiration from the
          Grateful Dead
        </title>
        <meta
          name="description"
          content="A Lorem Ipsum placeholder text generator using terms from the greatest band in the land, the Grateful Dead."
        />
        <meta
          name="keywords"
          content="grateful dead, grateful, dead, bobby, bob weir, phil lesh, phil, jerry garcia, jerry, phish, trey, phil, lorem ipsum, placeholder, deadheads, shakedown, shakedown street"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-14GWEHQM0J`}
        />
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
        <div className="text-center m-10">
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
            <span className="font-mono">{`Dead<head>s`}</span>
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto max-w-3xl">
        <div className="shadow flex flex-col justify-between items-end py-4 px-6 bg-gray-100 rounded sticky top-0 sm:relative dark:bg-gray-800 md:flex-row">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              fetchTextFromApi(
                numParagraphs <= MAX_PARAGRAPHS
                  ? numParagraphs
                  : MAX_PARAGRAPHS,
                { withDeadAndCo, jerryMode }
              );
            }}
          >
            <div className="input__container flex flex-col gap-x-8 md:flex-row">
              <div className="flex-none">
                <label className="dark:text-gray-200 leading-7 text-sm text-gray-600">
                  # of Paragraphs &nbsp;
                </label>
                <div class="custom-number-input h-10 w-32">
                  <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      data-action="decrement"
                      class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                      onClick={decrementParagraphs}
                    >
                      <span class="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      ref={paragraphCounterRef}
                      class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value={numParagraphs}
                    ></input>
                    <button
                      data-action="increment"
                      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                      onClick={incrementParagraphs}
                    >
                      <span class="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="button__container w-full flex justify-between align-center mt-4 md:mt-auto">
                <button
                  type="submit"
                  className="transition-colors duration-200 inline-flex items-center justify-center text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mr-1 w-full md:w-auto"
                  onClick={() => {
                    fetchTextFromApi(
                      numParagraphs <= MAX_PARAGRAPHS
                        ? numParagraphs
                        : MAX_PARAGRAPHS,
                      { withDeadAndCo, jerryMode }
                    );
                  }}
                >
                  Generate
                </button>
                <button
                  className="transition-colors duration-200 bg-blue-700 hover:bg-red-600 text-white py-2 px-6 rounded inline-flex items-center justify-center w-full md:w-auto"
                  onClick={copyGeneratedParagraphs}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="clipboard-svg-icon"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  <span>&nbsp;Copy</span>
                </button>
              </div>
            </div>

            <hr className="my-4" />
            <label className="block mb-2 w-full">Options:</label>
            <div className="options__container flex flex w-3/4 md:w-2/4">
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
        </div>

        <div
          id="paragraphHolder"
          className="mx-3 shadow mb-5 dark:bg-gray-700 px-5 pb-4 pt-4"
        >
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
