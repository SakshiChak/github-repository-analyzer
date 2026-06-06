const MetricsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between space-x-2">
        <span className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide">
          {title}
        </span>
        {icon && <div className="p-1.5 sm:p-2 bg-slate-50 rounded-lg text-slate-600 shrink-0">{icon}</div>}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default MetricsCard;