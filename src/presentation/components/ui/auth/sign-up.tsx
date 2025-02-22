import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PrimaryButton } from "../Buttons";
import { motion } from "framer-motion";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";
import { useAtom } from "jotai";
import { signupEmailAtom, signupStepAtom } from "@/atoms/signup";
import InsertCode from "./InsertCode";
import { useModal } from "../../modals/context";
import { Spinner } from "../Spinner";
import { sendCodeToEmail } from "@/utils/auth";
import { AtSignIcon } from "lucide-react";
import { SectionText, SectionTitle } from "../Texts";

type FormData = {
  email: string;
  code?: string;
  password?: string;
  confirmPassword?: string;
  userFirstName: string;
  userLastName: string;
  twitterTag: string;
};

const SignUp = ({ locale }: { locale: Locales }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const modal = useModal();
  const [step, setStep] = useAtom(signupStepAtom);
  const [email, setEmail] = useAtom(signupEmailAtom);

  const content = contents[locale]?.ui?.signup || contents["es"].ui.signup;
  const title = Array.isArray(content.title)
    ? content.title[step]
    : content.title;

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const sendVerificationCode = async (formData: FormData) => {
    try {
      setEmail(formData.email);
      setLoading(true);
      await sendCodeToEmail(formData);
      setStep("code");
    } catch (error) {
      console.error("Error sending verification code:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setStep("password");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const createAccount = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      alert("Account created successfully!");
      modal.closeModal();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <motion.div
      className="w-full max-w-sm m-auto bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-300 dark:border-slate-700 shadow overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="flex flex-col space-y-1.5 p-6">
        <SectionTitle className="font-semibold tracking-tight text-2xl text-center mb-2">
          {content.title.email}
        </SectionTitle>
        <SectionText className="text-md text-gray-700 text-center dark:text-gray-200">
          {content.description[step]}
        </SectionText>
      </div>

      {loading ? (
        <div className="w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <motion.div
          className="flex"
          transition={{ type: "spring", stiffness: 100, damping: 15 }}>
          {step === "email" && (
            <form
              className="p-6 pt-0 w-full"
              onSubmit={handleSubmit(sendVerificationCode)}>
              {renderEmailStep({ register, errors, content })}
              <PrimaryButton type="submit" className="w-full mt-6">
                {content.button}
              </PrimaryButton>
            </form>
          )}

          {step === "code" && (
            <form
              className="p-6 pt-0 w-full m-auto"
              onSubmit={handleSubmit(verifyCode)}>
              <InsertCode value={otp} onChange={setOtp} />
              <PrimaryButton
                type="submit"
                disabled={otp.length < 6}
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-4">
                {content.title.code}
              </PrimaryButton>
            </form>
          )}

          {step === "password" && (
            <form
              className="p-6 pt-0 w-full"
              onSubmit={handleSubmit(createAccount)}>
              {renderPasswordStep({
                register,
                errors,
                content,
                showPassword,
                togglePasswordVisibility,
              })}
              <PrimaryButton type="submit" className="w-full mt-4">
                Create Account
              </PrimaryButton>
            </form>
          )}
        </motion.div>
      )}

      <div className="mt-4 text-center text-sm mb-2">
        {content.haveAccount}&nbsp;
        <a className="underline" href="#">
          {content.login}
        </a>
      </div>
    </motion.div>
  );
};

const renderEmailStep = ({ register, errors, content }: any) => (
  <>
    {/* Email Input */}
    <div className="grid gap-2">
      <label className="text-sm font-medium">{content.inputLabels.email}</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          maxLength: { value: 75, message: "Email is too long" },
        })}
        className={`flex h-9 w-full rounded-md border ${
          errors.email
            ? "border-red-500"
            : "border-gray-300 dark:border-slate-600"
        } bg-transparent px-3 py-1`}
        placeholder="mail@example.com"
      />
      {errors.email && (
        <span className="text-xs text-red-500">{errors.email.message}</span>
      )}
    </div>

    {/* First Name Input */}
    <div className="grid gap-2 mt-4">
      <label className="text-sm font-medium">
        {content.inputLabels.firstName}
      </label>
      <input
        type="text"
        {...register("userFirstName", {
          required: "First name is required",
          maxLength: {
            value: 35,
            message: "First name must be under 35 characters",
          },
        })}
        className={`flex h-9 w-full rounded-md border ${
          errors.userFirstName
            ? "border-red-500"
            : "border-gray-300 dark:border-slate-600"
        } bg-transparent px-3 py-1`}
        placeholder="John"
      />
      {errors.userFirstName && (
        <span className="text-xs text-red-500">
          {errors.userFirstName.message}
        </span>
      )}
    </div>

    {/* Last Name Input */}
    <div className="grid gap-2 mt-4">
      <label className="text-sm font-medium">
        {content.inputLabels.lastName}
      </label>
      <input
        type="text"
        {...register("userLastName", {
          required: "Last name is required",
          maxLength: {
            value: 35,
            message: "Last name must be under 35 characters",
          },
        })}
        className={`flex h-9 w-full rounded-md border ${
          errors.userLastName
            ? "border-red-500"
            : "border-gray-300 dark:border-slate-600"
        } bg-transparent px-3 py-1`}
        placeholder="Doe"
      />
      {errors.userLastName && (
        <span className="text-xs text-red-500">
          {errors.userLastName.message}
        </span>
      )}
    </div>

    {/* Twitter Tag Input */}
    <div className="grid gap-2 mt-4">
      <label className="text-sm font-medium">
        {content.inputLabels.userTag}
      </label>
      <div className="relative">
        <input
          type="text"
          {...register("twitterTag", {
            required: "Twitter Tag is required",
            maxLength: {
              value: 15,
              message: "Twitter Tag must be under 15 characters",
            },
            pattern: {
              value: /^(\w){1,15}$/,
              message:
                "Twitter Tag must contain only letters, numbers, or underscores",
            },
          })}
          className={`flex h-9 w-full rounded-md border ps-9 ${
            errors.twitterTag
              ? "border-red-500"
              : "border-gray-300 dark:border-slate-600"
          } bg-transparent px-3 py-1`}
          placeholder="yourhandle"
        />
        <div className="text-slate-500/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
          <AtSignIcon size={16} aria-hidden="true" />
        </div>
      </div>
      {errors.twitterTag && (
        <span className="text-xs text-red-500">
          {errors.twitterTag.message}
        </span>
      )}
    </div>
  </>
);

const renderPasswordStep = ({
  register,
  errors,
  content,
  showPassword,
  togglePasswordVisibility,
}: any) => (
  <>
    <div className="grid gap-2">
      <label className="text-sm font-medium">
        {content.inputLabels.password}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          className="flex h-9 w-full rounded-md border border-gray-300 dark:border-slate-600 bg-transparent px-3 py-1"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && (
        <span className="text-xs text-red-500">{errors.password.message}</span>
      )}
    </div>

    <div className="grid gap-2 mt-2">
      <label className="text-sm font-medium">
        {content.inputLabels.confirmPassword}
      </label>
      <input
        type="password"
        {...register("confirmPassword", { required: "Confirm your password" })}
        className="flex h-9 w-full rounded-md border border-gray-300 dark:border-slate-600 bg-transparent px-3 py-1"
      />
      {errors.confirmPassword && (
        <span className="text-xs text-red-500">
          {errors.confirmPassword.message}
        </span>
      )}
    </div>
  </>
);

export default SignUp;
