"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle, SheetContent } from "@/components/ui/sheet";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CircleCheck,
  CirclePlus,
  CircleX,
  Pencil,
  ScrollText,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { cn } from "@/lib/utils";
import { TBoardDetail, TBoardMember, TBoardTaskCard } from "@/types";
import { useUpdateBoard } from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";

export default function BoardDescription({ board }: { board: TBoardDetail }) {
  const { userId } = useAuth();
  const [message, setMessage] = useState(board.description);
  const [isEdit, setIsEdit] = useState(false);
  const openEditMode = () => setIsEdit(true);
  const closeEditMode = () => setIsEdit(false);
  const isAdmin = userId === board.admin?.id;
  useEffect(() => {
    setMessage(board.description);
  }, [board]);

  const { mutateAsync: updateBoardAsync, isPending } = useUpdateBoard();

  const saveAndCloseEditMode = async () => {
    setIsEdit(false);
    const payload = {
      boardId: board.boardId,
      description: message,
    };

    const res = await updateBoardAsync(payload);
    if (res.success) {
    }
  };

  return (
    <>
      <div className="flex items-end justify-between">
        <div className="w-fit rounded-lg border border-slate-300 px-2 py-0.5">
          <div className="flex items-center gap-2 text-gray-500">
            <ScrollText className="size-3" />
            <p className="text-[10px]">Description</p>
          </div>
        </div>
        {isAdmin && !isEdit && (
          <>
            <Button
              onClick={openEditMode}
              className="rounded-xs h-[22px] px-4 py-1"
              size={"sm"}
              variant={"outline"}
            >
              <div className="flex items-center gap-2 text-gray-500">
                <Pencil className="size-3" />
                <p className="text-xs font-semibold">Edit</p>
              </div>
            </Button>
          </>
        )}
        {isAdmin && isEdit && (
          <>
            <div className="flex items-center gap-3">
              <Button
                disabled={isPending}
                onClick={closeEditMode}
                className="rounded-xs h-[22px] border-red-500 px-4 py-1 hover:bg-red-100"
                size={"sm"}
                variant={"outline"}
              >
                <div className="flex items-center gap-2 text-red-500">
                  <CircleX className="size-4" />
                  <p className="text-xs font-semibold">Cancel</p>
                </div>
              </Button>
              <Button
                disabled={isPending}
                onClick={saveAndCloseEditMode}
                className="rounded-xs h-[22px] border-blue-500 hover:bg-blue-100"
                size={"sm"}
                variant={"outline"}
              >
                <div className="flex items-center gap-2 text-blue-500">
                  <CircleCheck className="size-4" />
                  <p className="text-xs font-semibold">Save</p>
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
      <div>
        {!isEdit ? (
          <div className="my-2 min-h-[300px]">
            <div className={cn("ql-container ql-snow")}>
              <div
                className="ql-editor preview-content"
                dangerouslySetInnerHTML={{
                  __html: message || "......",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="my-2 min-h-[300px] border border-slate-300">
            <RichTextEditor value={message} onChange={setMessage} />
          </div>
        )}
      </div>
    </>
  );
}
