import { useState, useEffect } from "react";
import RepoForm from "../components/RepoForm";
import RepoDetails from "../components/RepoDetails";
import MetricsCard from "../components/MetricsCard";
import LanguageChart from "../components/LanguageChart";
import SummaryCard from "../components/SummaryCard";
import CommitChart from "../components/CommitChart";
import { Star, GitFork, Users, HeartPulse } from "lucide-react";
import { analyzeRepository, getSummary } from "../services/api";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [repoData, setRepoData] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Poll for summary updates
  useEffect(() => {
    if (!repoData || repoData.summaryReady || !repoData.repoKey) return;

    setSummaryLoading(true);
    const pollInterval = setInterval(async () => {
      try {
        const summaryData = await getSummary(repoData.repoKey);
        if (summaryData.success && summaryData.summary) {
          setRepoData((prev) => ({
            ...prev,
            summary: summaryData.summary,
            summaryReady: true,
          }));
          setSummaryLoading(false);
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error("Error polling summary:", error);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(pollInterval);
  }, [repoData]);

  const handleAnalyze = async (repoUrl) => {
    try {
      setLoading(true);
      setRepoData(null);
      const data = await analyzeRepository(repoUrl);
      setRepoData(data);
      setSummaryLoading(!data.summaryReady);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <header className="pb-2">
          <h1 className="text-2xl font-extrabold tracking-tight bg-linear-to-r mt-2 from-slate-900 via-indigo-950 to-indigo-600 bg-clip-text text-transparent sm:text-3xl md:text-4xl py-1">
            GitHub Repository Analyzer
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Paste any public GitHub repository link to fetch instantaneous insights, performance metrics, and an AI-generated summary.
          </p>
        </header>
        
        <div className="w-full">
          <RepoForm onAnalyze={handleAnalyze} loading={loading} />
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/3"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              <div className="h-40 bg-slate-200 rounded"></div>
            </div>
          </div>
        )}
        
        {repoData && (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Info */}
            <div className="w-full">
              <RepoDetails repo={repoData.repository} />
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricsCard
                title="Stars"
                value={repoData.repository.stargazers_count.toLocaleString()}
                icon={<Star className="w-5 h-5 text-amber-500" />}
              />
              <MetricsCard
                title="Forks"
                value={repoData.repository.forks_count.toLocaleString()}
                icon={<GitFork className="w-5 h-5 text-blue-500" />}
              />
              <MetricsCard
                title="Contributors"
                value={repoData.contributors || "N/A"}
                icon={<Users className="w-5 h-5 text-emerald-500" />}
              />
              <MetricsCard
                title="Health Score"
                value={`${repoData.healthScore}/100`}
                icon={<HeartPulse className="w-5 h-5 text-rose-500" />}
              />
            </div>

            {/* Visuals & Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 ">
                <LanguageChart languages={repoData.languages} />
              </div>
              <div className="lg:col-span-7 ">
                <SummaryCard summary={repoData.summary} loading={summaryLoading} />
              </div>
            </div>
            
            {/* Timeline Graphs */}
            <div className="w-full overflow-hidden">
              <CommitChart data={repoData.commitActivity} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;