import { atom } from "jotai";

export const signupStepAtom = atom<"email" | "code" | "password">("email");

export const signupEmailAtom = atom<string>("");
