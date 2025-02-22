import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PrimaryButton } from "../Buttons";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";

type FormData = {
  email: string;
  password: string;
};

type Props = {
  locale: Locales;
};

export default function SigninForm({ locale }: Props) {
  console.log(locale);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
    // Add your login logic here
  };

  const content = contents[locale]?.ui.login || contents["es"].ui.login;

  return (
    <div className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-300 dark:border-slate-700 shadow mx-auto max-w-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold tracking-tight text-2xl">
          {content.title}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {content.description}
        </div>
      </div>
      <div className="p-6 pt-0">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`flex h-9 w-full rounded-md border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-slate-600"
              } bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
              id="email"
              placeholder="m@example.com"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password">
                {content.inputs.password}
              </label>
              <a className="ml-auto inline-block text-sm underline" href="#">
                {content.forgotPass}
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`flex h-9 w-full rounded-md border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-slate-600"
                } bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                id="password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-700">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <PrimaryButton
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
            type="submit">
            {content.button}
          </PrimaryButton>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center text-sm">
          {content.noAccount}&nbsp;
          <a className="underline" href="#">
            {content.signup}
          </a>
        </div>
      </div>
    </div>
  );
}
