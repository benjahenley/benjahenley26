// atoms.js
import { atomWithStorage } from "jotai/utils";

export const isFollowingAtom = atomWithStorage("isFollowing", false);
export const followersCountAtom = atomWithStorage("followersCount", 322);
export const followingCountAtom = atomWithStorage("followingCount", 395);
