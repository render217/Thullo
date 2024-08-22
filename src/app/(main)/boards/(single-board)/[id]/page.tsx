"use client";

import { IBoard } from "@/types";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import { useParams } from "next/navigation";
import KanbanBoard from "../_components/kanban-board";
import BoardDetailSkeleton from "@/components/shared/skeletons/boards/board-detail-skeleton";
import BoardDetailError from "@/components/shared/errors/board-detail-error";

export default function page() {
  const params = useParams();
  const boardId = params.id as string;
  const { data, status } = useGetBoardById(boardId);

  if (status === "pending") return <BoardDetailSkeleton />;

  if (data?.success) {
    return <KanbanBoard board={data.data} />;
  } else if (!data?.success) {
    return <BoardDetailError message={data?.data || ""} />;
  }
}
