import { IBoard } from "@/types";

import { cn } from "@/lib/utils";

import BoardDndKit from "../experiments/board-dnd-kit";

export default function KanbanBoard({ board }: { board: IBoard }) {
  return (
    <div className={cn("relative size-full overflow-x-auto", "")}>
      <BackgroundImage />
      <BoardDndKit board={board} />
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="size-full">
      <img
        className="absolute inset-0 size-full filter"
        src={"/images/kanban.jpg"}
        alt="background"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
}
