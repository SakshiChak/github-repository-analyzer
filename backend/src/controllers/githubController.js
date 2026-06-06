import { extractRepoInfo } from "../utils/extractRepoInfo.js";
import { getRepositoryData } from "../services/githubService.js";
import { calculateHealthScore } from "../utils/calculateHealthScore.js";
import { generateSummary } from "../services/minimaxService.js";

// In-memory cache for summaries (TTL: 24 hours)
const summaryCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const analyzeRepository = async (req, res) => {
	try {
		const { repoUrl } = req.body;

		const { owner, repo } = extractRepoInfo(repoUrl);

		const data = await getRepositoryData(owner, repo);

		if (!data.repository) {
			return res.status(404).json({
				success: false,
				message: "Repository not found or private",
			});
		}

		const contributorCount = Array.isArray(data.contributors) ? data.contributors.length : 0;

		const healthScore = calculateHealthScore(data.repository, contributorCount, data.commitActivity);
		

		const cacheKey = `${owner}/${repo}`;
		let summary = null;

		// Check if summary is cached
		if (summaryCache.has(cacheKey)) {
			const cached = summaryCache.get(cacheKey);
			if (Date.now() - cached.timestamp < CACHE_TTL) {
				summary = cached.data;
			} else {
				summaryCache.delete(cacheKey);
			}
		}

		// Return fast response immediately
		res.json({
			repository: data.repository,
			contributors: contributorCount,
			languages: data.languages,
			healthScore,
			summary, // null initially, will be fetched later
			commitActivity: data.commitActivity,
			repoKey: cacheKey, // For polling
			summaryReady: !!summary,
		});

		// Generate summary in background (non-blocking)
		if (!summary) {
			generateSummary({
				name: data.repository.name,
				description: data.repository.description,
				stars: data.repository.stargazers_count,
				forks: data.repository.forks_count,
				issues: data.repository.open_issues_count,
				languages: data.languages,
				contributors: contributorCount,
				healthScore,
				readme: data.readme,
			})
				.then((generatedSummary) => {
					// Cache the summary
					summaryCache.set(cacheKey, {
						data: generatedSummary,
						timestamp: Date.now(),
					});
					console.log(`✅ Summary cached for ${cacheKey}`);
				})
				.catch((error) => {
					console.error(
						`❌ Failed to generate summary for ${cacheKey}:`,
						error,
					);
				});
		}
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// New endpoint to fetch cached summary
export const getSummary = async (req, res) => {
	try {
		const { repoKey } = req.params;

		if (!summaryCache.has(repoKey)) {
			return res.json({
				success: false,
				summary: null,
				message: "Summary not ready yet",
			});
		}

		const cached = summaryCache.get(repoKey);

		// Check if cache expired
		if (Date.now() - cached.timestamp > CACHE_TTL) {
			summaryCache.delete(repoKey);
			return res.json({
				success: false,
				summary: null,
				message: "Cache expired",
			});
		}

		res.json({
			success: true,
			summary: cached.data,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
