export const formatCommitActivity = (data) => {
  return data.map((week) => ({
    week: new Date(week.week * 1000).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
    commits: week.total,
  }));
};