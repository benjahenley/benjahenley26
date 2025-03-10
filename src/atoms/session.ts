import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userSession = atomWithStorage("userSession", {
  userId: "",
  userFirstName: "",
  userLastName: "",
  handle: "",
  profileImg: "",
  isLoggedIn: false,
});
