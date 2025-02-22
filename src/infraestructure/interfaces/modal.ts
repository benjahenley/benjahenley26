export type MODAL_VIEW = "SIGN_IN" | "SIGN_UP" | "OPTIONS" | "ADD_COMMENT";

export type ModalAtom = {
  open: boolean;
  view: MODAL_VIEW | null;
};
