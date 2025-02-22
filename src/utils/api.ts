import axios from "axios";

export const fetchTweets = async (language: string, category: string) => {
  try {
    const response = await axios.get("http://localhost:10002/tweets", {
      params: {
        language,
        category,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};
