import React from "react";
import { motion } from "framer-motion";

type ErrorMessageProps = {
  error: string | null;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 my-3 mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
      <p className="text-sm text-red-600 dark:text-red-400 text-center">
        {error}
      </p>
    </motion.div>
  );
};

export default ErrorMessage;
