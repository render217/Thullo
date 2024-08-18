import { IBoard } from "@/types";

import { cn } from "@/lib/utils";
import Image from "next/image";
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
      <Image
        className="absolute inset-0 size-full filter"
        priority={true}
        src={"/images/kanban.jpg"}
        alt="background"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
}
