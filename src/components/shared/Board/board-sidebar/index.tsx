"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import BoardSideBarContent from "./board-sidebar-content";
import BoardSideBarForm from "./board-sidebar-form";
import { IBoard } from "@/types";
import { useParams } from "next/navigation";

export default function BoardSideBar() {
  const [isEdit, setIsEdit] = useState(false);
  const [boardData, setBoardData] = useState<IBoard | undefined>();
  const params = useParams();
  const boardId = params.id as string;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className="h-7 border-2 text-xs"
          >
            <div className="flex items-baseline gap-2">
              <span>...</span>
              <span>Show menu</span>
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent>
          {isEdit ? <BoardSideBarForm /> : <BoardSideBarContent />}
        </SheetContent>
      </Sheet>
    </>
  );
}
