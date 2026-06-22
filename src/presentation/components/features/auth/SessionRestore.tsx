"use client";

import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { userSession } from "@/atoms/session";
import { refreshSession } from "@/utils/auth";

const LOGGED_OUT = {
  userId: "",
  userFirstName: "",
  userLastName: "",
  handle: "",
  profileImg: "",
  role: "",
  isLoggedIn: false,
};

/**
 * Restores auth state on every page load. The access token lives only in
 * memory (lost on reload), so we ask the backend for a new one using the
 * httpOnly refresh cookie. On success we repopulate the token + user; on
 * failure we reset to the logged-out state. Renders nothing.
 */
export default function SessionRestore() {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUserData = useSetAtom(userSession);
  const ran = useRef(false);

  useEffect(() => {
    // Guard against React 18 StrictMode double-invoke in dev.
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        const { accessToken, userData } = await refreshSession();
        setAccessToken(accessToken);
        if (userData) {
          setUserData({
            userId: String(userData.userId),
            userFirstName: userData.userFirstName,
            userLastName: userData.userLastName,
            handle: userData.handle,
            profileImg: userData.profileImg ?? "",
            role: (userData as any).role ?? "",
            isLoggedIn: true,
          });
        }
      } catch {
        // No valid refresh cookie -> present the logged-out state.
        setAccessToken(null);
        setUserData(LOGGED_OUT);
      }
    })();
  }, [setAccessToken, setUserData]);

  return null;
}
