const SitesSkelton = ({ count = 6 }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 min-h-[60vh]">
      <h1 className="text-xl font-bold text-gray-300 bg-gray-200 w-48 h-6 mb-4 animate-pulse rounded"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="w-full h-full rounded-xl shadow-md p-4 bg-gray-100 animate-pulse"
          >
            <div className="flex items-center justify-between w-full">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="flex space-x-2">
                <div className="w-5 h-5 bg-gray-300 rounded-sm" />
                <div className="w-5 h-5 bg-gray-300 rounded-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitesSkelton;
