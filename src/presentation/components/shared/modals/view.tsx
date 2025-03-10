"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Button,
  Dialog,
  DialogBackdrop,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useModal } from "./context";
import { Locales } from "@/infraestructure/interfaces";
import { MODAL_VIEW } from "@/infraestructure/interfaces/modal";

type Props = {
  locale: Locales;
};

const SignIn = dynamic(() =>
  import("../../features/auth/SignIn").then((mod) => {
    const Component = (props: any) => <mod.default {...props} />;
    Component.displayName = "SignIn";
    return Component;
  })
);

const SignUp = dynamic(() =>
  import("../../features/auth/SignUp").then((mod) => {
    const Component = (props: any) => <mod.default {...props} />;
    Component.displayName = "SignUp";
    return Component;
  })
);

const Options = dynamic(() =>
  import("../../features/auth/AuthOptions").then((mod) => {
    const Component = (props: any) => <mod.default {...props} />;
    Component.displayName = "Options";
    return Component;
  })
);

const LogOut = dynamic(() =>
  import("../../features/auth/LogOut").then((mod) => {
    const Component = (props: any) => <mod.default {...props} />;
    Component.displayName = "LogOut";
    return Component;
  })
);

// const SignUp = dynamic(() => import("../ui/auth/signin-form"));

function renderModalContent(view: MODAL_VIEW | string, locale: Locales) {
  switch (view) {
    case "SIGN_IN":
      return <SignIn locale={locale} />;
    case "OPTIONS":
      return <Options className={locale} />;
    case "SIGN_UP":
      return <SignUp className={locale} />;
    case "LOG_OUT":
      return <LogOut className={locale} />;
    default:
      return null;
  }
}

export default function ModalContainer({ locale }: Props) {
  const { open, view, closeModal } = useModal();
  const pathName = usePathname();

  useEffect(() => {
    closeModal();
  }, [pathName]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsx(
          "fixed inset-0 z-[9999] flex items-center justify-center h-full w-full overflow-y-auto overflow-x-hidden bg-gray-dark bg-opacity-40 p-4 text-center"
        )}
        onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <DialogBackdrop
            className="fixed inset-0 z-[9999]   cursor-pointer bg-black opacity-50"
            onClick={() => closeModal()}
          />
        </TransitionChild>

        {/* This element is to trick the browser into centering the modal contents. */}
        {/* {view && view !== "SEARCH_MODAL" && (
          <span className="inline-block h-full align-middle" aria-hidden="true">
            &#8203;
          </span>
        )} */}

        {/* This element is need to fix FocusTap headless-ui warning issue */}
        <div className="sr-only">
          <Button onClick={closeModal} className="opacity-50 hover:opacity-80 ">
            <span></span>
          </Button>
        </div>

        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105">
          <div className=" relative z-[9999] m-auto inline-block w-full text-left align-middle sm:w-auto">
            {view && renderModalContent(view, locale)}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
