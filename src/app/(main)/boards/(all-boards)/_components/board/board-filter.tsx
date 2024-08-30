"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FILTER_OPTIONS } from "@/lib/constants";
import { useBoardsFilter } from "@/lib/store/useBoardsFilter";
import { Filter } from "lucide-react";

export default function BoardFilter() {
  const { filter, setFilter } = useBoardsFilter();
  return (
    <div className="flex items-center gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex h-6 items-center gap-2 border-gray-300 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            size={"sm"}
            variant={"outline"}
          >
            <Filter className="size-3" />
            <p className="text-[12px]">Filter</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFilter(FILTER_OPTIONS.ALL)}>
            All Boards
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter(FILTER_OPTIONS.YOURS)}>
            Your Boards
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter(FILTER_OPTIONS.PRIVATE)}>
            Private Boards
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter(FILTER_OPTIONS.PUBLIC)}>
            Public Boards
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h1 className="font-semibold">{filter}</h1>
    </div>
  );
}
