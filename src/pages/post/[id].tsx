import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";




const SinglePostPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Chirp</title>
        <meta
          name="description"
          content="Post emojis, built with the T3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>Post view</div>
      </main>
    </>
  );
};

export default SinglePostPage;