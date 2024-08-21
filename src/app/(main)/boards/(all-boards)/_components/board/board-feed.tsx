"use client";

import BoardList from "./board-list";
import { useGetBoards } from "@/utils/hooks/useBoards";

export default function BoardFeed() {
  const { data, status, isError } = useGetBoards();
  if (status === "pending") return <p>Loading....</p>;

  if (isError) return <p>Error</p>;

  return <div>default</div>;
  // if (data?.success) {
  //   // return <BoardList boards={data.data} />
  //   return <div>{JSON.stringify(data)}</div>;
  // } else if (!data?.success) {
  //   // return <div>Error: {data?.data}</div>;
  //   return <div>{JSON.stringify(data)}</div>;
  // }
}
