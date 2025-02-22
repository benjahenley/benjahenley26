import { atomWithStorage } from "jotai/utils";

export const userSession = atomWithStorage("userData", {
  userName: "",
  userId: 1,
  userLastName: "",
  userPassword: "",
  twitterTag: "",
});
