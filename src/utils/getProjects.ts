import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/project`);

    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};

export const getProjectsById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/project/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};
