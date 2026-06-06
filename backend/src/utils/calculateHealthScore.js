// export function calculateHealthScore(repo) {
//   let score = 0;

//   score += Math.min(repo.stargazers_count / 1000, 30);

//   score += Math.min(repo.forks_count / 500, 20);

//   score += Math.min(repo.open_issues_count, 20);

//   return Math.min(Math.round(score), 100);
// }

export const calculateHealthScore = (repo) => {
  let score = 0;

  score += Math.min(repo.stargazers_count / 1000, 30);

  score += Math.min(repo.forks_count / 500, 20);

  score += 25;

  score += 25;

  return Math.min(Math.round(score), 100);
};