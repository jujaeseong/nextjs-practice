"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`text-xs ${pending ? "bg-neutral-300" : "bg-neutral-100"} 
      ${pending ? "text-neutral-400" : "text-black"} h-10 rounded-3xl ${
        pending ? "cursor-not-allowed" : "cursor-pointer"
      } font-bold transition hover:bg-neutral-300 focus:scale-95`}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
