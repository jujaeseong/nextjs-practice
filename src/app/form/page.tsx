"use client";

import FormButton from "@/components/form-button";
import {
  FireIcon,
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { handleForm } from "./action";
import { useFormState } from "react-dom";
import FormInput from "@/components/form-input";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Form() {
  const [state, formAction] = useFormState(handleForm, null);

  return (
    <div className="py-20">
      <div className="flex flex-col items-center max-w-sm mx-auto">
        <span>
          <FireIcon className="text-red-400 size-12" />
        </span>
        <form
          action={formAction}
          className="flex flex-col w-full gap-3 mb-3 mt-7"
        >
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            required
            icon={<EnvelopeIcon className="text-gray-500 size-4" />}
          />
          <FormInput
            type="username"
            name="username"
            placeholder="Username"
            required
            icon={<UserIcon className="text-gray-500 size-4" />}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            required
            icon={<KeyIcon className="text-gray-500 size-4" />}
            errors={state?.errors ?? []}
          />
          <FormButton text="Log in" />
        </form>
        {state?.isValidate && (
          <div className="flex items-center w-full h-10 gap-2 px-3 bg-emerald-500 rounded-xl animate-popIn">
            <CheckCircleIcon className="size-4" strokeWidth={2} />
            <span className="text-sm">Welcome back!</span>
          </div>
        )}
      </div>
    </div>
  );
}
