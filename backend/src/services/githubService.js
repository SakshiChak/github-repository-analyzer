import "dotenv/config";
import axios from "axios";
import { formatCommitActivity } from "../utils/formatCommitActivity.js";
import { createGithubClient } from "../config/github.js";

const github = createGithubClient();

export const getRepositoryData = async (owner, repo) => {
	try {
		const [repoInfo, contributors, languages, readmeRes, commitActivity] =
			await Promise.all([
				github.get(`/repos/${owner}/${repo}`),
				github.get(`/repos/${owner}/${repo}/contributors`),
				github.get(`/repos/${owner}/${repo}/languages`),
				github.get(`/repos/${owner}/${repo}/readme`, {
					headers: {
						Accept: "application/vnd.github.raw",
					},
				}),
				github.get(`/repos/${owner}/${repo}/stats/commit_activity`),
			]);

		return {
			repository: repoInfo.data,
			contributors: contributors.data,
			languages: languages.data,
			readme: readmeRes.data || null,
			commitActivity: Array.isArray(commitActivity.data)
				? formatCommitActivity(commitActivity.data)
				: [],
		};
	} catch (error) {
		console.error(
			"GitHub API Error:",
			error.response?.data || error.message,
		);
		throw new Error("Failed to fetch repository data from GitHub");
	}
};
