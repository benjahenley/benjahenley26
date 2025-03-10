export type MODAL_VIEW =
  | "SIGN_IN"
  | "SIGN_UP"
  | "OPTIONS"
  | "ADD_COMMENT"
  | "LOG_OUT";

export type ModalAtom = {
  open: boolean;
  view: MODAL_VIEW | null;
};
