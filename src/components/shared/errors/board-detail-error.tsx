"use client";

import { cn } from "@/lib/utils";
import BoardBackgroundImage from "../board-background-image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BoardDetailError({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className={cn("relative size-full overflow-x-auto", "")}>
      <BoardBackgroundImage />
      <div className="absolute inset-0 -top-[2px] mb-[8px] size-full select-none gap-2 overflow-x-auto overflow-y-hidden px-[10px] pb-[8px] pt-[8px] scrollbar-width-auto scrollbar-track-transparent scrollbar-thumb-white">
        <div className="mx-auto grid min-h-[300px] max-w-xl place-content-center">
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold text-white">{message}</h1>
            <Button
              className="mx-auto block"
              variant={"outline"}
              size={"sm"}
              onClick={() => router.push("/boards")}
            >
              Go to Boards
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
