"use client";

import { cn } from "@/lib/utils";
import BoardBackgroundImage from "../../board-background-image";

export default function BoardDetailSkeleton() {
  return (
    <div className={cn("relative size-full overflow-x-auto", "")}>
      <BoardBackgroundImage />
      {/* <BoardDndKit board={board} /> */}
    </div>
  );
}
