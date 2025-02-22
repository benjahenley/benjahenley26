"use client";

import { modalAtom } from "@/atoms/modals";
import { MODAL_VIEW } from "@/infraestructure/interfaces/modal";
import { atom, useSetAtom, useAtomValue } from "jotai";

export function useModal() {
  let modal = useAtomValue(modalAtom);
  let setModal = useSetAtom(modalAtom);

  function openModal(view: MODAL_VIEW) {
    setModal({
      ...modal,
      view,
      open: true,
    });
  }

  function closeModal() {
    setModal({
      ...modal,
      open: false,
    });
  }

  return {
    ...modal,
    openModal,
    closeModal,
  };
}
