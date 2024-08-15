"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import BoardSideBarContent from "./board-sidebar-content";
import BoardSideBarForm from "./board-sidebar-form";

export default function BoardSideBar() {
  const [isEdit, setIsEdit] = useState(false);

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
