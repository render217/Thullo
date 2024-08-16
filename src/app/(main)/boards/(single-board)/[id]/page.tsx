"use client";
import KanbanBoard from "@/components/shared/Board/kanban-board";
import { IBoard } from "@/types";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  const boardId = params.id as string;
  const { data, status } = useGetBoardById(boardId);

  if (status === "pending") return <p>Loading....</p>;

  if (data?.success) {
    return <KanbanBoard board={data.data as IBoard} />;
  } else if (!data?.success) {
    return <div>Error: {data?.data}</div>;
  }
}
