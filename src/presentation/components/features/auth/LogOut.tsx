"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useModal } from "../../shared/modals/context";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { logOut } from "@/utils/auth";

type Props = {
  className?: string;
};

export default function LogOut({ className }: Props) {
  const { closeModal } = useModal();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 ${className}`}>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Log Out?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to log out?
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => closeModal()}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Cancel
          </button>
          <button
            onClick={() => {
              logOut();
              closeModal();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Log Out
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
