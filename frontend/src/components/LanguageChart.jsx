import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3178c6", "#563d7c", "#e34c26", "#f1e05a", "#89e051", "#007acc"];

const LanguageChart = ({ languages }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!languages || Object.keys(languages).length === 0) return null;

  const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
  const data = Object.entries(languages)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 md:p-6 flex flex-col justify-between h-full min-h-[420px]">
      <div className="mb-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">Languages Breakdown</h2>
        <p className="text-[11px] sm:text-xs text-slate-400">Distribution of code volume across languages</p>
      </div>

      <div className="flex-1 w-full min-h-[220px] sm:min-h-[250px] relative my-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="48%"
              innerRadius={isMobile ? 50 : 60}
              outerRadius={isMobile ? 70 : 85}
              paddingAngle={3}
              label={isMobile ? false : ({ name, percentage }) => `${name} ${percentage}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={entry.name} 
                  fill={COLORS[index % COLORS.length]} 
                  className="outline-none focus:outline-none transition-opacity duration-200 hover:opacity-90"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                padding: "8px 12px",
                fontSize: "12px"
              }}
              formatter={(value, name) => [typeof value === 'number' ? `${((value / total) * 100).toFixed(1)}%` : value, name]}
            />
            {!isMobile && (
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: "10px", fontSize: "12px", color: "#64748b" }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {isMobile && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth snap-x">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full flex-shrink-0 snap-shrink">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">{item.name}</span>
                <span className="text-[11px] text-slate-400 font-medium">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageChart;