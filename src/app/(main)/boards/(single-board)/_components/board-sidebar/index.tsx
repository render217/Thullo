"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BoardSideBarContent from "./board-sidebar-content";
export default function BoardSideBar() {
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
        <SheetContent className="max-xs:w-full" aria-describedby={undefined}>
          <SheetTitle className="hidden">Menu</SheetTitle>
          <BoardSideBarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
