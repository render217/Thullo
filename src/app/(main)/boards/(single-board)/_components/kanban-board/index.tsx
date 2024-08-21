import { IBoard } from "@/types";

import { cn } from "@/lib/utils";

import BoardDndKit from "../experiments/board-dnd-kit";
import BoardBackgroundImage from "@/components/shared/board-background-image";

export default function KanbanBoard({ board }: { board: IBoard }) {
  return (
    <div className={cn("relative size-full overflow-x-auto", "")}>
      <BoardBackgroundImage />
      <BoardDndKit board={board} />
    </div>
  );
}
