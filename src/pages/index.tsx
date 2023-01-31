import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import { api } from "../utils/api";
import { getInitialIds, getRandomId } from "../utils/getInitialIds";
import Trpc from "./api/trpc/[trpc]";

const Home: NextPage = () => {
  const [ids, setIds] = useState(getInitialIds());

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
              <div className="grid grid-cols-3 gap-1">
                {ids && ids.map((id) => (
                  <CaptchaImage key={id} id={id}/>
                ))
                }
              </div>
            </div>
          </div>
          <div className="p-2 border border-gray-300">
            <div className="flex flex-1">
              <button onClick={() => setIds(getInitialIds())} className="group hover:bg-gray-200 active:bg-gray-300">
                <svg className="h-8 w-8 m-2 fill-current text-gray-500 group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"/>
                </svg>
              </button>
              <button className="group hover:bg-gray-200 active:bg-gray-300">
                <svg className="h-8 w-8 m-2 fill-current text-gray-500 group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M9 21H5q-.825 0-1.413-.587Q3 19.825 3 19v-7q0-1.875.712-3.513q.713-1.637 1.926-2.85q1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925q1.212 1.213 1.925 2.85Q21 10.125 21 12v7q0 .825-.587 1.413Q19.825 21 19 21h-4v-8h4v-1q0-2.925-2.038-4.963Q14.925 5 12 5T7.038 7.037Q5 9.075 5 12v1h4Z"/>
                </svg>
              </button>
              <button className="group hover:bg-gray-200 active:bg-gray-300">
                <svg className="h-8 w-8 m-2 fill-current text-gray-500 group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
                </svg>
              </button>
              <button className="bg-blue-400 px-8 text-white rounded-sm ml-auto hover:bg-blue-500 active:bg-blue-600">Verify</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const CaptchaImage = (props: {id: number}) => {

  // type returnType = ReturnType<typeof api.example.getImageByID.useQuery>

  const [id, setId] = useState(props.id);
  const {data: image, refetch, isLoading} = api.example.getImageByID.useQuery({id: id}, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  
  function handleClick() {
    setId(getRandomId([]));
  }

  return (
    <div className={`flex flex-col items-center duration-1000 transition-opacity ${isLoading == true ? 'opacity-0' : ''}`}>
      <button onClick={handleClick} disabled={isLoading} className="backdrop-invert hover:opacity-75">
        {image && <Image src={image.url} width={128} height={128} priority={true} className="col-span-1 object-cover w-32 h-32" alt="Captcha Image" />}
      </button>
    </div> 
  )
}

export default Home;
