export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-4 w-32 bg-gray-200 rounded mb-5"></div>

      {/* Header Skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between mt-2">
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-3"></div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white rounded-xl p-10 mt-10 shadow-sm min-h-[300px]">
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
