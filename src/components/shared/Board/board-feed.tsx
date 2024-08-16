"use client";

import BoardList from "./board-list";
import { useGetBoards } from "@/utils/hooks/useBoards";

export default function BoardFeed() {
  const { data, status } = useGetBoards();
  if (status === "pending") return <p>Loading....</p>;
  if (data?.success) {
    return <BoardList boards={data.data} />;
  } else if (!data?.success) {
    return <div>Error: {data?.data}</div>;
  }
}
