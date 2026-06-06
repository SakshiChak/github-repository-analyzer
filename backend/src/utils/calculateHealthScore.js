export const calculateHealthScore = (
  repo,
  contributorsCount = 0,
  commitActivity = []
) => {
  let score = 0;

  // Popularity
  score += Math.min(repo.stargazers_count / 1000, 25);

  // Community adoption
  score += Math.min(repo.forks_count / 500, 15);

  // Contributors
  score += Math.min(contributorsCount, 15);

  // Recent activity
  const lastUpdate = new Date(repo.updated_at);
  const daysSinceUpdate =
    (Date.now() - lastUpdate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (daysSinceUpdate <= 30) score += 20;
  else if (daysSinceUpdate <= 90) score += 15;
  else if (daysSinceUpdate <= 180) score += 10;
  else score += 5;

  // Commit activity
  const totalCommits = commitActivity.reduce(
    (sum, week) => sum + week.commits,
    0
  );

  if (totalCommits > 500) score += 25;
  else if (totalCommits > 200) score += 20;
  else if (totalCommits > 50) score += 15;
  else score += 5;

  // Open issues
  if (repo.open_issues_count < 20) score += 10;
  else if (repo.open_issues_count < 100) score += 5;

  return Math.min(Math.round(score), 100);
};