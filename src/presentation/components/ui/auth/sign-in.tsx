import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { PrimaryButton } from "../Buttons";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../Spinner";
import { useClickOutside } from "@/hooks";
import { useModal } from "@/presentation/components/modals/context";

type FormData = {
  email: string;
  password: string;
};

type Props = {
  locale: Locales;
};

export default function SigninForm({ locale }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { closeModal, openModal } = useModal();

  // Clear error when user starts typing
  React.useEffect(() => {
    if (error) {
      const subscription = watch(() => setError(null));
      return () => subscription.unsubscribe();
    }
  }, [error, watch]);

  // Use click outside hook
  useClickOutside(formRef, () => {
    // Only close if not loading
    if (!loading) closeModal();
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Data Submitted:", data);
      // Add your login logic here

      // Show success message before closing modal
      setSuccessMessage(`Welcome back, ${data.email.split("@")[0]}!`);

      // Delay closing modal to show success message
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const content = contents[locale]?.ui.login || contents["es"].ui.login;

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeModal();
    setTimeout(() => {
      openModal("SIGN_UP");
    }, 300);
  };

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-xl border border-gray-300 dark:border-slate-700 shadow-lg mx-auto max-w-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="font-bold tracking-tight text-2xl text-white">
          {content.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-sm text-blue-100 mt-1">
          {content.description}
        </motion.p>
      </div>

      <div className="p-6">
        {/* Success Message with Animation */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                },
              }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="mb-6 p-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-lg shadow-xl text-center relative overflow-hidden">
              {/* Glowing background pulse */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 rounded-lg"
                animate={{
                  opacity: 0.3,
                  scale: 1.05,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Animated success circle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 0.15,
                  scale: 5,
                  transition: { delay: 0.2, duration: 0.8 },
                }}>
                <FaCheckCircle className="text-white" />
              </motion.div>

              <motion.div
                className="relative z-10 flex items-center justify-center gap-3"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 500 }}>
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 15 }}
                  whileInView={{ rotate: 0 }}
                  transition={{
                    scale: { delay: 0.3, type: "spring", stiffness: 400 },
                    rotate: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
                  }}>
                  <FaCheckCircle className="text-white text-2xl" />
                </motion.div>
                <motion.span
                  className="font-bold text-lg tracking-wide"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}>
                  {successMessage}
                </motion.span>
              </motion.div>

              {/* Enhanced animated particles */}
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full ${
                      i % 3 === 0
                        ? "bg-white"
                        : i % 3 === 1
                        ? "bg-green-200"
                        : "bg-teal-200"
                    }`}
                    style={{
                      width: `${Math.random() * 6 + 2}px`,
                      height: `${Math.random() * 6 + 2}px`,
                    }}
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.random() * 80 - 40)}%`,
                      y: `${50 + (Math.random() * 80 - 40)}%`,
                      opacity: 0.9,
                      scale: 1.5,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 2,
                      repeat: 1,
                      repeatType: "reverse",
                      delay: 0.1 * i,
                    }}
                  />
                ))}
              </div>

              {/* Subtle shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                initial={{ left: "-100%", opacity: 0 }}
                animate={{ left: "100%", opacity: 0.3 }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  repeat: 1,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {error}
          </motion.div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <motion.div
            className="grid gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
              htmlFor="email">
              <FaEnvelope className="text-blue-500" />
              Email
            </label>
            <div
              className={`flex h-11 rounded-md border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-slate-600"
              } transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500`}>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="flex-grow bg-transparent h-full px-3 py-2 text-base shadow-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-md"
                id="email"
                placeholder="m@example.com"
              />
            </div>
            {errors.email && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 flex items-center gap-1">
                {errors.email.message}
              </motion.span>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="grid gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}>
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                htmlFor="password">
                <FaLock className="text-blue-500" />
                {content.inputs.password}
              </label>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                href="#">
                {content.forgotPass}
              </motion.a>
            </div>
            <div
              className={`flex h-11 rounded-md border ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-slate-600"
              } transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 relative`}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="flex-grow bg-transparent h-full px-3 py-2 text-base shadow-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-md pr-10"
                id="password"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 flex items-center gap-1">
                {errors.password.message}
              </motion.span>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-2">
            <PrimaryButton
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-600 hover:to-indigo-700 h-11 px-4 py-2 w-full"
              type="submit"
              disabled={loading}>
              {loading ? <Spinner size="sm" /> : null}
              {loading ? "Signing in..." : content.button}
            </PrimaryButton>
          </motion.div>
        </form>

        {/* Signup Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 text-center text-sm">
          {content.noAccount}&nbsp;
          <a
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            href="#"
            onClick={handleSignUpClick}>
            {content.signup}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
