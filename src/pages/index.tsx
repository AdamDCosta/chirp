import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { LoadingPage } from "~/components/loading";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.profileImageUrl}
        alt="user profile"
        className="rounded-full"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  const timeSincePosted = dayjs(post.createdAt).fromNow();

  return (
    <div key={post.id} className="flex gap-4 border-b border-slate-400 p-4">
      <Image
        src={author.profilePicture}
        alt={`@${author.username}'s profile picture`}
        className="rounded-full"
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-100">
          <span>{!!author.username && `@${author.username} `}</span>
          <span className="font-thin">{` · ${timeSincePosted}`}</span>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong</div>;

  return (
    <div>
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching asap
  api.posts.getAll.useQuery();

  // return empty div is user isnt't loaded yet
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Chirp</title>
        <meta name="description" content="Post emojis, built with the T3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4 ">
            {!isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {isSignedIn && <CreatePostWizard />}
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
