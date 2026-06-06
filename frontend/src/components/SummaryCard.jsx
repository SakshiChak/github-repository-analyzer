import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SummaryCard = ({ summary, loading = false }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 md:p-6 flex flex-col h-full min-h-[420px]">
      
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>✨</span> AI Summary
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-400">
          {loading ? "Generating from project documentation..." : "Deep-dive summary generated from project documentation"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-0 md:pr-1 max-h-none lg:max-h-[310px] scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            <div className="space-y-2 mt-4">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-4">
              ⏳ This typically takes 3-5 minutes...
            </p>
          </div>
        ) : summary ? (
          <div className="prose-custom max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {summary}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-400">No summary available</p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;