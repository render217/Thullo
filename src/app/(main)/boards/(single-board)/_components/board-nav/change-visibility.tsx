"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { LockOpen, Lock, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TBoard, TVisibility } from "@/types";
import { useUpdateBoard } from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";

export default function ChangeVisibility({ board }: { board: TBoard }) {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(board?.visibility);

  useEffect(() => {
    setVisibility(board.visibility);
  }, [board?.visibility]);

  const isPrivate = visibility === "PRIVATE";
  const isAdmin = userId === board?.admin?.id;

  const { mutateAsync: updateBoardAsync, isPending: isUpdating } =
    useUpdateBoard();

  const handleVisibilityChange = async (val: TVisibility) => {
    const payload = {
      boardId: board.boardId,
      visibility: val,
    };
    const res = await updateBoardAsync(payload);
    if (res.success) {
      setOpen(false);
    }
  };

  return (
    <div>
      {!isAdmin ? (
        <>
          <div className="pointer-events-none grid h-8 w-20 place-content-center rounded-[5px] bg-gray-200 px-3 duration-300">
            <div className="flex min-w-[16px] items-center gap-2 text-[10px] font-light text-gray-700">
              {isPrivate ? (
                <Lock className="size-3 text-gray-500" />
              ) : (
                <LockOpen className="size-3 text-gray-500" />
              )}
              <p className="font-light">
                {visibility === TVisibility.PRIVATE ? "Private" : "Public"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <DropdownMenu
            open={open}
            onOpenChange={(val) => {
              if (isUpdating) return;
              setOpen(val);
            }}
          >
            <DropdownMenuTrigger>
              <div className="grid h-8 w-20 cursor-pointer place-content-center rounded-[5px] bg-gray-200 px-3 duration-300 hover:bg-gray-300/80">
                <div className="flex min-w-[16px] items-center gap-2 text-[10px] font-light text-gray-700">
                  {isPrivate ? (
                    <Lock className="size-3 text-gray-500" />
                  ) : (
                    <LockOpen className="size-3 text-gray-500" />
                  )}
                  <p className="font-light">
                    {visibility === TVisibility.PRIVATE ? "Private" : "Public"}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[210px] px-3 py-2">
              <div className="">
                <h3 className="text-sm font-semibold">Visibility</h3>
                <p className="text-[10px]">
                  {" "}
                  Choose who can see to this board{" "}
                </p>
              </div>
              <div className="relative mt-2 flex flex-col gap-2">
                {isUpdating && (
                  <div className="absolute inset-0 z-20 grid w-full place-content-center bg-black/10">
                    <LoaderCircle className="animate-spin" />
                  </div>
                )}
                <div
                  onClick={() => handleVisibilityChange(TVisibility.PUBLIC)}
                  className={cn(
                    "cursor-pointer space-y-1 rounded-md border border-slate-200 p-2 hover:bg-slate-200",
                    !isPrivate && "bg-slate-200",
                  )}
                >
                  <div className="flex items-center gap-1 text-gray-500">
                    <LockOpen className="size-3 text-gray-500" />
                    <p className="text-[10px]">Public</p>
                  </div>
                  <p className="text-[10px] leading-[15px]">
                    Anyone on the internet can see this
                  </p>
                </div>

                <div
                  onClick={() => handleVisibilityChange(TVisibility.PRIVATE)}
                  className={cn(
                    "cursor-pointer space-y-1 rounded-md border border-slate-200 p-2 hover:bg-slate-200",
                    isPrivate && "bg-slate-200",
                  )}
                >
                  <div className="flex items-center gap-1 text-gray-500">
                    <Lock className="size-3 text-gray-500" />
                    <p className="text-[12px]">Private</p>
                  </div>
                  <p className="text-[10px]">Only board members can see this</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
