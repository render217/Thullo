"use client";
import { IBoard } from "@/types";
import { cn } from "@/lib/utils";

// import BoardDndKit from "../experiments/board-dnd-kit";
import BoardBackgroundImage from "@/components/shared/board-background-image";
import { TBoard, TBoardDetail } from "@/types/t";
import BoardDndKit from "./board-dnd-kit";
import { useBoardStore } from "@/lib/store/useBoardStore";

export default function KanbanBoard() {
  return (
    <div className={cn("relative size-full overflow-x-auto", "")}>
      <BoardBackgroundImage />
      <BoardDndKit />
    </div>
  );
}
