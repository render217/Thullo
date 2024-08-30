"use client";
import { cn } from "@/lib/utils";
import BoardBackgroundImage from "@/components/shared/board-background-image";
import BoardDndKit from "./board-dnd-kit";

export default function KanbanBoard() {
  return (
    <div className={cn("relative size-full overflow-x-auto", "")}>
      <BoardBackgroundImage />
      <BoardDndKit />
    </div>
  );
}
