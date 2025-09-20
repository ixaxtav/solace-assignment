export const SkeletonCard = () => {
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow flex flex-col h-full animate-pulse">
      <div className="flex-1 p-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="flex flex-wrap gap-1 mt-3 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4">
              <div className="h-6 bg-gray-200 rounded-full w-40"></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
