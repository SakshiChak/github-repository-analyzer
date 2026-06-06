import { Star, GitFork, Eye, ExternalLink } from "lucide-react";

const RepoDetails = ({ repo }) => {
  if (!repo) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={repo.owner?.avatar_url}
            alt={repo.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-100"
          />
          <div>
  <div className="flex items-center gap-2 flex-wrap">
    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
      {repo.name}
    </h2>

    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        repo.private
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {repo.private ? "Private" : "Public"}
    </span>
  </div>

  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
    {repo.full_name}
  </p>
</div>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm shrink-0"
        >
          View on GitHub
          <ExternalLink size={14} className="sm:size-[16px]" />
        </a>
      </div>

      {repo.description && (
        <p className="text-slate-600 text-xs sm:text-sm mt-4 leading-relaxed max-w-3xl">
          {repo.description}
        </p>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">License</p>
          <p className="font-medium text-slate-800">
            {repo.license?.name || "N/A"}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Default Branch</p>
          <p className="font-medium text-slate-800">
            {repo.default_branch}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Open Issues</p>
          <p className="font-medium text-slate-800">
            {repo.open_issues_count}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Created</p>
          <p className="font-medium text-slate-800">
            {new Date(repo.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Last Updated</p>
          <p className="font-medium text-slate-800">
            {new Date(repo.updated_at).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Repository Size</p>
          <p className="font-medium text-slate-800">
            {(repo.size / 1024).toFixed(1)} MB
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Owner</p>
          <p className="font-medium text-slate-800">
            @{repo.owner?.login}
          </p>
        </div>
      </div>

      {repo.topics?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-sm font-medium text-slate-700 mb-3">
            Topics
          </p>

          <div className="flex flex-wrap gap-2">
            {repo.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
            
    </div>
  );
};

export default RepoDetails;