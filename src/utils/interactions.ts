import axios from "axios";

export const toggleLike = async (projectId: number, userId: number) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/${projectId}/like`,
      {
        userId,
      }
    );
    return response.data; // { count: number, liked: true }
  } catch (err) {
    console.error("Error toggling like:", err);
  }
};

export const addComment = async (
  projectId: number,
  userId: number,
  content: string
) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${projectId}/comment`,
      {
        userId,
        content,
      }
    );
  } catch (err) {
    console.error("Error adding comment:", err);
  }
};

export const addRepost = async (projectId: number, userId: number) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${projectId}/repost`, {
      userId,
    });
  } catch (err) {
    console.error("Error adding repost:", err);
  }
};
