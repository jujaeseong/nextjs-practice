import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface TweetSummaryProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: { username: string };
}

export default function TweetSummary({
  id,
  tweet,
  created_at,
  user: { username },
}: TweetSummaryProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="[&:not(:last-child)]:border-b border-black px-12 py-4 w-full"
    >
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-lg font-bold">{username}</span>
          <span className="ml-2 text-sm">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
        <p className="whitespace=pre-line">{tweet}</p>
      </div>
    </Link>
  );
}
