import { ModalAtom } from "@/infraestructure/interfaces/modal";
import { atomWithStorage } from "jotai/utils";

const loginAtom = atomWithStorage<boolean>("login", false);

export const modalAtom = atomWithStorage<ModalAtom>("modal", {
  open: false,
  view: null,
});
