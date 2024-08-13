import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { FireIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function Tweet({
  params: { id },
}: {
  params: { id: string };
}) {
  if (isNaN(+id)) {
    return notFound();
  }
  const tweet = await getTweet(+id);
  if (!tweet) {
    return notFound();
  }

  const isOwner = await getIsOwner(tweet.userId);

  return (
    <div className="py-20">
      <div className="flex flex-col items-center max-w-md gap-5 mx-auto">
        <span>
          <FireIcon className="text-red-400 size-12" />
        </span>
        <div className="flex flex-col w-full gap-2">
          <div>
            <span className="text-lg font-bold">{tweet.user.username}</span>
            <span className="ml-2 text-sm">
              {formatToTimeAgo(tweet.created_at.toString())}
            </span>
          </div>
          <p className="whitespace=pre-line">{tweet.tweet}</p>
          {isOwner && (
            <button className="p-2 ml-auto transition bg-red-400 rounded-md hover:bg-red-300 hover:scale-95">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
