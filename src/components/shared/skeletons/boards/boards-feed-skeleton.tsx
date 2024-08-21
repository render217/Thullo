"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoardsFeedSkeleton() {
  return (
    <div>
      <div className="flex flex-wrap gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
          return (
            <div key={idx}>
              <SingleBoard />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SingleBoard() {
  return (
    <Card className="w-[16rem] max-w-[16rem] border transition-all duration-300 ease-in-out hover:shadow-md">
      <CardHeader className="p-4">
        <div className="grid h-[150px] w-full animate-pulse rounded-md bg-gray-200 p-4">
          {/* <Skeleton className="size-full h-[150px] w-full rounded-md bg-gray-200" /> */}
        </div>
      </CardHeader>

      <CardContent className="border-b px-3 py-1.5">
        <CardTitle className="h-12">
          <Skeleton className="size-full h-10 bg-gray-200" />
        </CardTitle>
      </CardContent>

      <CardFooter className="h-12 px-3 py-2 pb-3">
        <div className="flex w-full items-center gap-3">
          {[1, 2].map((member) => {
            return (
              <div key={member} className="flex items-center gap-2">
                <Skeleton className="h-7 w-8 rounded-md bg-gray-200" />
              </div>
            );
          })}
          <div className="ml-auto block">
            <Skeleton className="ml-auto h-7 w-16 rounded-md border bg-gray-200 text-xs" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
