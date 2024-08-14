"use server";

import { TWEET_REQUIRED_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod";

export async function getTweets(page: number) {
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
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

const tweetSchema = z.object({
  tweet: z.string().min(1, TWEET_REQUIRED_ERROR),
});

export async function uploadTweet(prevState: any, formdata: FormData) {
  const data = {
    tweet: formdata.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
