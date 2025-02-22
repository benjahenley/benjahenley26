import axios from "axios";

export const getProjects = async () => {
  try {
    const response = await axios.get("http://localhost:10002/api/project");

    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};

export const getProjectsById = async (id: string) => {
  try {
    const response = await axios.get("http://localhost:10002/project/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};
