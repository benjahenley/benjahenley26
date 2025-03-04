"use client";

import { useState } from "react";
import { atom, useAtom } from "jotai";
import { useForm, SubmitHandler } from "react-hook-form";
import { PrimaryButton } from "../../shared/ui/Buttons";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

type Props = {
  className?: string;
};

const emailCountAtom = atom(0);

export function Form({ className }: Props) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailCount, setEmailCount] = useAtom(emailCountAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (emailCount >= 4) {
      setErrorMessage("You have reached the limit of 4 emails.");
      return;
    }
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setEmailCount(emailCount + 1);
        reset();
      } else {
        setErrorMessage(result.message || "Failed to send message.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <details
      className={`bg-gray-300 dark:bg-[#2d3748] w-full max-w-[528px] mt-5 cursor-pointer ${className}`}>
      <summary className="flex justify-between p-2">
        <h5 className="text-sm font-semibold">CONTACT FORM</h5>
      </summary>
      <form
        className="flex flex-col gap-1 p-2"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="name">
            <h5 className="text-sm font-semibold">Name</h5>
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: 20,
              minLength: 2,
            })}
            aria-invalid={errors.name ? "true" : "false"}
            name="name"
            type="text"
            className="bg-white h-6 border-2 border-transparent rounded px-2 text-black"
          />
          {errors.name?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
          {errors.name?.ref && <p role="alert">Message error</p>}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="email">
            <h5 className="text-sm font-semibold">Email</h5>
          </label>
          <input
            {...register("email", { required: "Email address is required" })}
            aria-invalid={errors.email ? "true" : "false"}
            name="email"
            type="email"
            className="bg-white h-6 border-2 border-transparent rounded px-2 text-black"
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="message">
            <h5 className="text-sm font-semibold">Message</h5>
          </label>
          <textarea
            {...register("message", {
              required: "Message is required",
              minLength: 5,
            })}
            name="message"
            id="message"
            className="bg-white h-20 border-2 border-transparent rounded px-2 text-black"></textarea>
          {errors.message && <p role="alert">{errors.message.message}</p>}
        </div>
        <div className="mt-4">
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <PrimaryButton type="submit">Send</PrimaryButton>
        </div>
      </form>
    </details>
  );
}
