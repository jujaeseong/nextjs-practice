"use client";

import { uploadTweet } from "@/app/(home)/actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, formAction] = useFormState(uploadTweet, null);

  return (
    <div className="flex flex-col w-full gap-2">
      <form
        action={formAction}
        className={`flex border rounded-lg border-neutral-300 flex-col focus-within:outline-emerald-500 focus-within:outline focus-within:outline-1 focus-within:border-emerald-500 overflow-hidden`}
      >
        <textarea
          name="tweet"
          className="h-28 p-3 resize-none mb-2 focus:outline-none"
          placeholder="Add your tweet..."
        />
        <button className="self-end py-2 px-3 bg-emerald-500 rounded-md transition hover:bg-emerald-400 hover:scale-95 text-white mr-3 mb-3">
          Post
        </button>
      </form>
      <span className="text-sm text-red-500">{state?.fieldErrors.tweet}</span>
    </div>
  );
}
