import { atomWithStorage } from "jotai/utils";

export const optionsAtom = atomWithStorage<boolean>("options", false);
