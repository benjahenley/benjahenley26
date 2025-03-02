type sendCodeToEmailProps = {
  email: string;
  userFirstName: string;
  userLastName: string;
  twitterTag: string;
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
}: verifyHandleAndSetPasswordProps) => {
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
      console.log("1");
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      console.log("2");
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    console.log("3");

    console.error("Request Failed:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};
