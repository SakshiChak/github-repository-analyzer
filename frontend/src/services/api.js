import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeRepository = async (repoUrl) => {
  const { data } = await API.post("/analyze", {
    repoUrl,
  });

  return data;
};

export const getSummary = async (repoKey) => {
  const encodedRepoKey = encodeURIComponent(repoKey);
  const { data } = await API.get(`/summary/${encodedRepoKey}`);
  return data;
};