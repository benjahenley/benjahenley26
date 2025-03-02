import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";
import { PrimaryButton } from "../Buttons";
import { motion, AnimatePresence } from "framer-motion";
import { contents } from "@/data/contents/content";
import { useAtom } from "jotai";
import { signupEmailAtom, signupStepAtom } from "@/atoms/signup";
import InsertCode from "./InsertCode";
import { useModal } from "../../modals/context";
import { Spinner } from "../Spinner";
import {
  sendCodeToEmail,
  verifyCodeInDatabase,
  verifyHandleAndCreateUser,
} from "@/utils/auth";
import { AtSignIcon } from "lucide-react";
import { SectionText, SectionTitle } from "../Texts";
import { useParams } from "next/navigation";
import FormField from "./FormField";
import ErrorMessage from "./ErrorMessage";

type FormData = {
  email: string;
  code?: string;
  password: string;
  confirmPassword: string;
  userFirstName: string;
  userLastName: string;
  twitterTag: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const formRef = React.useRef<HTMLDivElement>(null);

  // Clear error when user starts typing
  React.useEffect(() => {
    if (error) {
      const subscription = watch(() => setError(null));
      return () => subscription.unsubscribe();
    }
  }, [error, watch]);

  const modal = useModal();
  const [step, setStep] = useAtom(signupStepAtom);
  const [email, setEmail] = useAtom(signupEmailAtom);
  const params = useParams();
  const locale = (
    Array.isArray(params.locale) ? params.locale[0] : params.locale
  ) as "en" | "es";
  const content = contents[locale]?.ui?.signup ?? contents["es"].ui.signup;

  const title = Array.isArray(content.title)
    ? content.title[step]
    : content.title;

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Form submission handlers
  const sendVerificationCode = async (formData: FormData) => {
    try {
      setLoading(true);
      await sendCodeToEmail(formData);
      setEmail(formData.email);
      setError(null);
      setStep("code");
    } catch (error: any) {
      const message =
        error.message.length > 50
          ? error.message.substring(0, 50) + "..."
          : error.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    const code = verificationCode;
    try {
      setLoading(true);
      await verifyCodeInDatabase({ code, email });
      setError(null);
      setStep("password");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setPassword = async (formData: any) => {
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    const { handle, password } = formData;
    try {
      setLoading(true);
      await verifyHandleAndCreateUser({ email, handle, password });
      setError(null);
      setSuccessMessage(`Welcome to the community, @${handle}!`);
      setTimeout(() => {
        modal.closeModal();
        setStep("email");
      }, 3000);
    } catch (error: any) {
      console.error("Verification failed: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Form step renderers
  const renderEmailStep = () => (
    <motion.form
      key="email-step"
      className="p-4 pt-0 w-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(sendVerificationCode)}>
      <FormField
        label={content.inputLabels.email}
        type="email"
        register={register}
        name="email"
        rules={{
          required: "Email is required",
          maxLength: { value: 75, message: "Email is too long" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        }}
        error={errors.email}
        placeholder="mail@example.com"
        icon={FaEnvelope}
      />

      <FormField
        label={content.inputLabels.firstName}
        register={register}
        name="userFirstName"
        rules={{
          required: "First name is required",
          maxLength: {
            value: 35,
            message: "First name must be under 35 characters",
          },
        }}
        error={errors.userFirstName}
        placeholder="John"
        icon={FaUser}
      />

      <FormField
        label={content.inputLabels.lastName}
        register={register}
        name="userLastName"
        rules={{
          required: "Last name is required",
          maxLength: {
            value: 35,
            message: "Last name must be under 35 characters",
          },
        }}
        error={errors.userLastName}
        placeholder="Doe"
        icon={FaUser}
      />

      <ErrorMessage error={error} />

      <PrimaryButton
        type="submit"
        className="w-full mt-4 h-11 transition-all duration-300 font-medium"
        disabled={loading}>
        {loading ? (
          <div className="w-full h-full grid place-items-center">
            <Spinner />
          </div>
        ) : (
          content.button
        )}
      </PrimaryButton>
    </motion.form>
  );

  const renderCodeStep = () => (
    <motion.form
      key="code-step"
      className="p-3 pt-0 w-full m-auto"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={(e) => {
        e.preventDefault();
        verifyCode();
      }}>
      <div className="my-6">
        <InsertCode value={verificationCode} onChange={setVerificationCode} />
      </div>

      <ErrorMessage error={error} />

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
        We sent a verification code to <strong>{email}</strong>
      </div>

      <PrimaryButton
        type="submit"
        disabled={verificationCode.length < 6 || loading}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-11 transition-all duration-300 font-medium">
        {loading ? (
          <div className="w-full h-full grid place-items-center">
            <Spinner />
          </div>
        ) : (
          content.title.code
        )}
      </PrimaryButton>
    </motion.form>
  );

  const renderPasswordStep = () => (
    <motion.form
      key="password-step"
      className="p-6 pt-0 w-full m-auto"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(setPassword)}>
      <FormField
        label={content.inputLabels.userTag}
        register={register}
        name="handle"
        rules={{
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
        }}
        error={errors.twitterTag}
        placeholder="yourhandle"
        icon={AtSignIcon}
      />

      <FormField
        label={content.inputLabels.password}
        type="password"
        register={register}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        }}
        error={errors.password}
        placeholder="••••••••"
        icon={FaLock}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />

      <FormField
        label={content.inputLabels.confirmPassword}
        type="password"
        register={register}
        name="confirmPassword"
        rules={{
          required: "Confirm your password",
          validate: (value: string) =>
            value === watch("password") || "Passwords do not match",
        }}
        error={errors.confirmPassword}
        placeholder="••••••••"
        icon={FaLock}
      />

      <ErrorMessage error={error} />

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="my-4 overflow-hidden">
            <motion.div
              className="relative p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-lg shadow-lg text-white overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{
                scale: 1,
                transition: { delay: 0.1, duration: 0.2 },
              }}>
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white opacity-0"
                animate={{
                  opacity: 0.1,
                  scale: 1.05,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${Math.random() * 4 + 1}px`,
                      height: `${Math.random() * 4 + 1}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 1 + Math.random(),
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: Math.random() * 2,
                      delay: Math.random(),
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                initial={{ left: "-100%", opacity: 0 }}
                animate={{ left: "100%", opacity: 0.2 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <motion.div
                  className="relative mb-2 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      delay: 0.2,
                    },
                  }}>
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 scale-150 animate-ping" />
                  <div className="bg-white rounded-full p-2">
                    <FaRocket className="text-indigo-600 text-xl" />
                  </div>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3 },
                  }}>
                  <h3 className="font-bold text-lg tracking-wide mb-1">
                    {successMessage}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Your account has been created successfully
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PrimaryButton
        type="submit"
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-6 h-11 transition-all duration-300 font-medium">
        {loading ? (
          <div className="w-full h-full grid place-items-center">
            <Spinner />
          </div>
        ) : (
          content.createAccount
        )}
      </PrimaryButton>
    </motion.form>
  );

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <motion.div
      ref={formRef}
      className="sm:min-w-[380px] w-full max-w-[400px] m-auto bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-300 dark:border-slate-700 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="relative flex flex-col space-y-1.5 p-6 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <SectionTitle className="font-semibold tracking-tight text-2xl text-center mb-1">
          {content.title[step]}
        </SectionTitle>
        <SectionText className="text-sm text-gray-600 text-center dark:text-gray-300">
          {content.description[step]}
        </SectionText>
      </div>

      <AnimatePresence mode="wait">
        {step === "email" && renderEmailStep()}
        {step === "code" && renderCodeStep()}
        {step === "password" && renderPasswordStep()}
      </AnimatePresence>

      <div className="text-center text-sm mb-6 mt-2 px-4">
        <span className="text-gray-600 dark:text-gray-400">
          {content.haveAccount}&nbsp;
        </span>
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-all"
          href="#">
          {content.login}
        </a>
      </div>
    </motion.div>
  );
};

export default SignUp;
