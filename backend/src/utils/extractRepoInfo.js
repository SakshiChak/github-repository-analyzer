export const extractRepoInfo = (repoUrl) => {
  const regex = /github\.com\/([^/]+)\/([^/]+)/;

  const match = repoUrl.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub URL");
  }

  return {
    owner: match[1],
    repo: match[2].replace(".git", ""),
  };
};