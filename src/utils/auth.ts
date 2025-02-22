import axios from "axios";

type sendCodeToEmailProps = {
  email: string;
  userFirstName: string;
  userLastName: string;
  twitterTag: string;
};

export const sendCodeToEmail = async ({
  email,
  userFirstName,
  userLastName,
  twitterTag,
}: sendCodeToEmailProps) => {
  try {
    console.log({ email, twitterTag, userFirstName, userLastName });

    const response = await axios.post(
      "http://localhost:10002/api/auth/send-code",
      {
        body: JSON.stringify({
          email,
          userFirstName,
          userLastName,
          twitterTag,
        }),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};
