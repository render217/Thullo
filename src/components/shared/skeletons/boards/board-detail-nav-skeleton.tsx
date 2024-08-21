"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoardDetailNavSkeleton() {
  return (
    <div className="px-[2%]">
      <div className="flex items-center gap-4">
        {/* Change visibility Skeleton */}
        <Skeleton className="h-8 w-20 bg-gray-200" />
        {/* Board Members Skeleton */}
        <div className="flex items-center gap-4">
          {[1, 2].map((member) => {
            return (
              <Skeleton
                key={member}
                className="h-7 w-8 rounded-md bg-gray-200"
              />
            );
          })}
          <Skeleton className="ml-auto h-7 w-16 rounded-md bg-gray-200 px-2 py-2" />
        </div>
        {/* Invite user skeleton */}
        <Skeleton className="h-7 w-9 rounded-md bg-gray-200" />

        {/* Preview invites skeleton */}
        <Skeleton className="h-6 w-[90px] rounded-md bg-gray-200" />

        <div className="ml-auto">
          {/* board sidebar skeleton */}
          <Skeleton className="h-6 w-[80px] rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
