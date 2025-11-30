export function TableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
      <div className="p-6 border-b border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex-1 h-6 bg-gray-200 rounded"></div>
            <div className="w-24 h-6 bg-gray-200 rounded"></div>
            <div className="w-24 h-6 bg-gray-200 rounded"></div>
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}