import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { FireIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="py-20">
      <div className="flex flex-col items-center gap-5">
        <span>
          <FireIcon className="text-red-400 size-12" />
        </span>
        <AddTweet />
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}
