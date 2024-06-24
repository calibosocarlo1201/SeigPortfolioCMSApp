import React from 'react'
import Skeleton from 'react-loading-skeleton';

const DetailsLoading = () => {
  return (
    <div className="animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>

      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 rounded mb-6"></div>

      {/* Description Skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Additional Info Skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  )
}

export default DetailsLoading