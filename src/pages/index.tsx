import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import { api } from "../utils/api";
import { getInitialIds, getRandomId } from "../utils/getInitialIds";

const Home: NextPage = () => {
  const START_OF_AI_IDS = 558;
  const WIN_RATIO = 0.5;

  const [ids, setIds] = useState(getInitialIds());
  const [errorMsg, setErrorMsg] = useState("");
  const [correctGuess, setCorrectGuess] = useState(0);
  const [incorrectGuess, setIncorrectGuess] = useState(0);

  const vote = (selectedId: number) => {
    if (ids[selectedId]! >= START_OF_AI_IDS)
      setCorrectGuess(correctGuess + 1)
    else
      setIncorrectGuess(incorrectGuess + 1)

    const newItems = [...ids];
    newItems[selectedId] = getRandomId(ids);
    setIds(newItems);
  };

  const verifyClick = () => {
    // Have to add up all the incorrect guesses here because setState runs async 
    // and it was causing incorrect values set to incorrectGuess at the end here  
    if ((correctGuess - (incorrectGuess + ids.reduce((total,x) => (x >= START_OF_AI_IDS ? total+1 : total), 0))) >= 0)
      setErrorMsg("SUCCESS") 
    else
      setErrorMsg("Failed Captcha")

    console.log(correctGuess, incorrectGuess)
  }

  return (
    <>
      <Head>
        <title>AI Captcha</title>
        <meta name="description" content="Complete a captcha with ai generated images!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="bg-white drop-shadow-lg">
          <div className="p-2 border-x border-t border-gray-300">
            <div className="bg-blue-500">
              <div className="p-6">
                <h3 className="text-white">Select all images with</h3>
                <h3 className="text-white font-bold text-3xl">ai art</h3>
                <h3 className="text-white">Click verify once there are none left</h3>
              </div>
            </div>
            <div className="pt-2">
              <div className="grid grid-cols-3 gap-1 h-[392px] w-[392px]">
                {ids && ids.map((id, index) => (
                  <CaptchaImage key={index} index={index} ids={ids} error={errorMsg} vote={() => vote(index)}/>
                ))
                }
              </div>
              {errorMsg && (
                <div className="text-center pt-2 font-medium text-red-500">{errorMsg}</div>
              )}
            </div>
          </div>
          <div className="p-2 border border-gray-300">
            <div className="flex flex-1">
              <button onClick={() => {
                setIds(getInitialIds());
                setErrorMsg("");
                setCorrectGuess(0);
                setIncorrectGuess(0);
                }} className="group hover:bg-gray-200 active:bg-gray-300">
                <svg className="h-8 w-8 m-2 fill-current text-gray-500 group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"/>
                </svg>
              </button>
              <a href="https://github.com/brockke/ai-image-guesser" className="group hover:bg-gray-200 active:bg-gray-300">
                <svg className="m-2 fill-current text-gray-500 group-hover:text-gray-700" width="32" height="32" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                </svg>
              </a>
              <button onClick={() => setErrorMsg("")} className="group hover:bg-gray-200 active:bg-gray-300">
                <svg className="h-8 w-8 m-2 fill-current text-gray-500 group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
                </svg>
              </button>
              <button onClick={() => verifyClick()} disabled={errorMsg !== ""} className="bg-blue-400 px-8 text-white rounded-sm ml-auto hover:bg-blue-500 active:bg-blue-600">Verify</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const CaptchaImage = (props: {index: number, ids: number[], error:string, vote: () => void}) => {

  // Check because Typescript is complaining 
  const id = props.ids[props.index]  
  if (id == undefined) return (<div />);
  const {data: image, isLoading} = api.example.getImageByID.useQuery({id: id}, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });  

  return (
    <div className={`flex flex-col items-center duration-1000 transition-opacity ${isLoading == true ? 'opacity-0' : ''}`}>
      <button onClick={() => props.vote()} disabled={isLoading || (props.error !== "")} className="backdrop-invert hover:opacity-75">
        {image && <Image src={image.url} width={128} height={128} priority={true} className="col-span-1 object-cover w-32 h-32" alt="Captcha Image" />}
      </button>
    </div> 
  )
}

export default Home;
