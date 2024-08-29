"use client";

import BoardsFeedSkeleton from "@/components/shared/skeletons/boards/boards-feed-skeleton";
import BoardList from "./board-list";
import { useGetBoards } from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";

export default function BoardFeed() {
  const { userId } = useAuth();
  const { data, status, isError } = useGetBoards(userId!);
  if (status === "pending") return <BoardsFeedSkeleton />;
  if (data?.success) {
    return <BoardList boards={data.data} />;
  } else if (!data?.success) {
    return <div>{JSON.stringify(data)}</div>;
  }
}
