type sendCodeToEmailProps = {
  email: string;
  userFirstName: string;
  userLastName: string;
  // The handle is collected later (in the create-account step), so it's
  // optional here — the send-code step only needs email + name.
  twitterTag?: string;
};

type verifyCodeInDatabaseProps = {
  code: string;
  email: string;
};

type verifyHandleAndSetPasswordProps = {
  email: string;
  password: string;
  handle: string;
};

type loginProps = {
  email: string;
  password: string;
};

export const sendCodeToEmail = async ({
  email,
  userFirstName,
  userLastName,
  twitterTag,
}: sendCodeToEmailProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userFirstName,
          userLastName,
          twitterTag,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    console.error("Request Failed:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const verifyCodeInDatabase = async ({
  code,
  email,
}: verifyCodeInDatabaseProps) => {
  console.log(code, email);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const verifyHandleAndCreateUser = async ({
  email,
  handle,
  password,
}: {
  email: string;
  handle: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          handle,
          password,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    console.error("Request Failed:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    console.log(data);

    return data;
  } catch (error: any) {
    console.error("Request Failed:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const logOut = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    console.error("Request Failed:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};

/**
 * Restores the session on page load. Sends the httpOnly refresh cookie
 * (credentials: "include") to the backend, which returns a fresh short-lived
 * access token plus the user's public data. Throws if there is no valid
 * session so callers can present the logged-out state.
 */
export const refreshSession = async (): Promise<{
  accessToken: string;
  userData: {
    userId: number;
    userFirstName: string;
    userLastName: string;
    handle: string;
    profileImg: string | null;
    role: string;
  };
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`No active session (status ${response.status})`);
  }

  return response.json();
};
