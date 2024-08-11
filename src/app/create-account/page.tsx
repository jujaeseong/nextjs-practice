"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./action";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, null);

  return (
    <div className="py-20">
      <div className="flex flex-col items-center max-w-md mx-auto">
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
            errors={state?.fieldErrors.email ?? []}
          />
          <FormInput
            type="username"
            name="username"
            placeholder="Username"
            required
            icon={<UserIcon className="text-gray-500 size-4" />}
            errors={state?.fieldErrors.username ?? []}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            required
            icon={<KeyIcon className="text-gray-500 size-4" />}
            errors={state?.fieldErrors.password ?? []}
          />
          <FormInput
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            required
            icon={<LockClosedIcon className="text-gray-500 size-4" />}
            errors={state?.fieldErrors.confirm_password ?? []}
          />
          <FormButton text="Create Account" />
        </form>
      </div>
    </div>
  );
}
