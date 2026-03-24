import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

export const fetchTweets = async (language: string, category: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tweets`, {
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
