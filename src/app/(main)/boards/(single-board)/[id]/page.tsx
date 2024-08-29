"use client";

import { IBoard } from "@/types";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import { useParams } from "next/navigation";
import KanbanBoard from "../_components/kanban-board";
import BoardDetailSkeleton from "@/components/shared/skeletons/boards/board-detail-skeleton";
import BoardDetailError from "@/components/shared/errors/board-detail-error";
import { useBoardStore } from "@/lib/store/useBoardStore";
import { useEffect, useState } from "react";

export default function page() {
  const params = useParams();
  const boardId = params.id as string;
  const { data, status } = useGetBoardById(boardId);

  const [isLoading, setIsLoading] = useState(true);

  const { setBoard } = useBoardStore();

  useEffect(() => {
    if (data?.success) {
      setIsLoading(false);
      setBoard(data.data);
    } else {
      setIsLoading(false);
    }
  }, [data, setBoard]);

  if (status === "pending" || isLoading) return <BoardDetailSkeleton />;

  if (data?.success) {
    return <KanbanBoard />;
  } else if (!data?.success) {
    return <BoardDetailError message={data?.data || ""} />;
  }
}
