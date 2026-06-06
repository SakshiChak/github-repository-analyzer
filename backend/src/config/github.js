import "dotenv/config";
import axios from "axios";

const baseURL = process.env.GITHUB_BASE_URL || "https://api.github.com";
const token = process.env.GITHUB_TOKEN || null;

export const githubConfig = {
  baseURL,
  token,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
    Accept: "application/vnd.github+json",
  },
};

export const createGithubClient = () =>
  axios.create({
    baseURL: githubConfig.baseURL,
    headers: githubConfig.headers,
  });

export default githubConfig;
