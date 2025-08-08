import React from "react";

const SkeletonCard = () => (
  <div className="bg-base-100 rounded-sm shadow-sm shadow-gray-300 flex flex-col h-full animate-pulse">
    <div className="w-full rounded-t-sm h-56 bg-gray-300"></div>
    <div className="flex flex-col justify-between p-5 flex-grow">
      <div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
        <div className="h-8 bg-gray-300 rounded-sm"></div>
        <div className="h-8 bg-gray-300 rounded-sm"></div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
