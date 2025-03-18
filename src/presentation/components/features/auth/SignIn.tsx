import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@/hooks";
import { useModal } from "@/presentation/components/shared/modals/context";
import { PrimaryButton } from "../../shared/ui/buttons/Buttons";
import { signIn } from "@/utils/auth";
import { accessTokenAtom } from "@/atoms/auth";
import { useAtom, useSetAtom } from "jotai";
import { userSession } from "@/atoms/session";
import FormField from "./FormField";

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
  const setAccessToken = useSetAtom(accessTokenAtom);
  const [userData, setUserData] = useAtom(userSession);
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

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const SignInResponse = await signIn(email, password);

      setSuccessMessage(SignInResponse.message);

      const { userFirstName, userLastName, handle, profileImg, userId } =
        SignInResponse.userData;

      setUserData({
        userId,
        userFirstName,
        userLastName,
        handle,
        profileImg,
        isLoggedIn: true,
      });

      setAccessToken(SignInResponse.accessToken);

      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error: any) {
      setError(error.message);
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
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-emerald-500 dark:to-teal-600 p-6">
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

      <div className="p-6 pt-2">
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
              className="mt-1 p-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-lg shadow-xl text-center relative overflow-hidden">
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

        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <FormField
            label={content.inputs.email}
            type="email"
            register={register}
            name="email"
            rules={{ required: "Email is required" }}
            error={errors.email}
            icon={FaEnvelope}
          />

          {/* Password Field */}
          <FormField
            label={content.inputs.password}
            type={showPassword ? "text" : "password"}
            register={register}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            error={errors.password}
            placeholder="••••••••"
            icon={FaLock}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
            forgotPasswordButton={
              <motion.a
                className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                href="#">
                {content.forgotPass}
              </motion.a>
            }
          />

          {/* ERROR MESSAGE */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: "auto" }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 mt-1 text-center bg-red-100 border border-red-300 text-red-700 rounded-md text-sm line-clamp-1">
              {error}!
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-2">
            <PrimaryButton loading={loading} content={content.button} />
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
