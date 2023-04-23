import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);


type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
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
          <Link href={`/@${author.username}`}>
            <span>{!!author.username && `@${author.username} `}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{` · ${timeSincePosted}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};