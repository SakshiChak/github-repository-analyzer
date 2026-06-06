import { useState } from "react";
import { Loader2, GitBranch} from "lucide-react";

const RepoForm = ({ onAnalyze, loading }) => {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!repoUrl.trim() || loading) return;
    onAnalyze(repoUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 md:p-6">
      
      <label className="block mb-3 text-xs sm:text-sm font-semibold text-slate-900">
        GitHub Repository URL
      </label>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="url"
            required
            disabled={loading}
            placeholder="https://github.com/facebook/react"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:opacity-60 bg-slate-50/30"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !repoUrl.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-150 shrink-0 shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Analyzing Repo...</span>
            </>
          ) : (
            <>
              <GitBranch size={16} />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default RepoForm;