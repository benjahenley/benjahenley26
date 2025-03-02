import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  rules?: any;
  error?: any;
  placeholder?: string;
  icon?: React.ElementType;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
};

const FormField = ({
  label,
  type = "text",
  register,
  name,
  rules,
  error,
  placeholder,
  icon: Icon,
  togglePasswordVisibility,
  showPassword,
}: FormFieldProps) => {
  return (
    <div className="grid gap-2 mt-4">
      <label className="text-sm font-medium tracking-wide">{label}</label>
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...register(name, rules)}
          className={`flex h-11 w-full rounded-lg border ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
          } bg-transparent px-3 py-2 ${
            Icon ? "pl-10" : ""
          } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-200 dark:focus:ring-blue-800`}
          placeholder={placeholder}
        />
        {Icon && (
          <div className=" text-slate-500 dark:text-slate-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
            <Icon size={16} aria-hidden="true" />
          </div>
        )}
        {type === "password" && togglePasswordVisibility && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500">
          {error.message}
        </motion.span>
      )}
    </div>
  );
};

export default FormField;
