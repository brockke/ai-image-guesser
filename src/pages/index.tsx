import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const getAll = api.example.getAll.useQuery();
  const listItems = getAll.data?.map(example => {
    return <li key={example.id}>{example.id}</li>
  })

  const test = api.example.testMutation.useMutation();
  const buttonClick = () => {
    test.mutate()
  }
  
  const starTest = api.example.starMutation.useMutation();
  const starClick = () => {
    starTest.mutate({
      name: "BIG STAR",
      constellation: "noideadude"
    })
  }

  return (
    <>
      <Head>
        <title>AI Captcha</title>
        <meta name="description" content="Complete a captcha with ai generated images!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          <div className="bg-blue-500">
            <div className="p-6">
              <div>
                <h3 className="text-white">Select all images with</h3>
              </div>
              <div>
                <h3 className="text-white font-bold text-3xl">ai art</h3>
              </div>
              <div>
                <h3 className="text-white">Click verify once there are none left</h3>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <h3 className="text-red-600">Middle Cubesssssssssssssssssssssssssssssssssssssssss</h3>
          </div>
          <div className="bg-white">
            <h3 className="text-red-600">Bottom </h3>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
