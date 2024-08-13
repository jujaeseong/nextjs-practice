import { FireIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="flex flex-col items-center gap-5">
        <span>
          <FireIcon className="text-red-400 size-12" />
        </span>
        <div className="flex flex-col items-center w-full border border-black animate-pulse">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="*:rounded-md [&:not(:last-child)]:border-b border-black px-12 py-4 w-full"
            >
              <div className="flex flex-col gap-2 *:rounded-md">
                <div className="flex gap-2 *:rounded-md items-end">
                  <div className="w-24 h-6 bg-neutral-700" />
                  <div className="h-5 w-14 bg-neutral-700" />
                </div>
                <div className="w-full h-5 bg-neutral-700" />
                <div className="w-1/2 h-5 bg-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
