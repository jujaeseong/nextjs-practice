import React, { ReactNode } from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  icon: ReactNode;
  errors?: string[];
}

export default function FormInput({
  type,
  name,
  placeholder,
  required,
  icon,
  errors = [],
}: FormInputProps) {
  return (
    <div className="flex flex-col">
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
          className={`w-full border-2 rounded-3xl pl-9 pr-3 h-10 text-sm placeholder:text-neutral-400 ${
            errors.length > 0
              ? "border-red-400 focus:ring focus:ring-red-600 focus:outline-red-400 focus:outline-1"
              : "border-neutral-200 focus:ring focus:ring-neutral-300 focus:outline-neutral-200 focus:outline-1"
          }`}
        />
        <span className="absolute left-3">{icon}</span>
      </div>
      {errors.length > 0 && (
        <div className="flex flex-col">
          {errors.map((error, index) => (
            <span key={index} className="text-sm text-red-500 first:mt-2">
              {error}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
