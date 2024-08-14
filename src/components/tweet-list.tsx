"use client";

import { getTweets } from "@/app/(home)/actions";
import { InitialTweets } from "@/app/(home)/page";
import { useState } from "react";
import TweetSummary from "./tweet-summary";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLoadPreviousPage = async () => {
    setIsLoading(true);
    const newTweets = await getTweets(page - 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev - 1);
      setTweets([...newTweets]);
      setIsLastPage(false);
    }

    setIsLoading(false);
  };

  const onLoadNextPage = async () => {
    setIsLoading(true);
    const newTweets = await getTweets(page + 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      setTweets([...newTweets]);
      if (newTweets.length < 5) {
        setIsLastPage(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center border border-black w-full">
        {tweets.map((tweet) => (
          <TweetSummary key={tweet.id} {...tweet} />
        ))}
      </div>
      <div className="flex w-full">
        {page > 0 && (
          <button onClick={onLoadPreviousPage} disabled={isLoading}>
            <ArrowLeftCircleIcon className="size-10" />
          </button>
        )}
        {!isLastPage && (
          <button
            onClick={onLoadNextPage}
            disabled={isLoading}
            className="ml-auto"
          >
            <ArrowRightCircleIcon className="size-10" />
          </button>
        )}
      </div>
    </>
  );
}
