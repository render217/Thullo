"use client";
import { Bell, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import InvitationItem from "./invitation-item";
import { TBoard, TVisibility } from "@/types";

export default function Invitation() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative cursor-pointer rounded-md bg-gray-200 p-2 duration-300 hover:bg-gray-300/80">
            <Bell className="size-4" />
            <span className="absolute -right-2 top-0 flex h-4 w-4 cursor-pointer place-content-center rounded-full bg-red-500 text-[10px] text-white hover:scale-x-110">
              2
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-[220px] border p-3 shadow-none">
          <div className="absolute inset-0 z-20 grid place-content-center bg-black/80">
            <p className="rounded-md border p-4 text-xs text-white">
              to be implemented
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Your Invites</h3>
            <p className="text-[10px]">Recevied Invites from other boards </p>
          </div>
          <div className="mt-2 h-[140px] overflow-hidden border border-slate-300">
            <ScrollArea className="h-[140px]">
              <div className="flex flex-col gap-2 p-1 pr-3">
                {boards.map((board) => (
                  <InvitationItem key={board.boardId} board={board} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const boards: TBoard[] = [
  {
    boardId: "7f607bd8-b39c-4593-85f6-895d7ab3d3ab",
    boardName: "Optimized eco-centric challenge",
    description: "multi-tasking",
    boardImage: "https://picsum.photos/seed/hCCFglYCZm/640/480",
    visibility: "PUBLIC" as TVisibility,
    createdAt: "2024-08-15T10:49:32.967Z",
    boardMember: [],
    admin: {
      id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
      username: "Urban.Braun",
      email: "Jerrell.Turcotte@yahoo.com",
      profileImage: "https://avatars.githubusercontent.com/u/24087111",
      createdAt: "2024-08-15T10:49:32.967Z",
    },
    updatedAt: "2024-08-15T10:49:32.967Z",
  },
  {
    boardId: "7f607bd8-b39c-4593-85f6-895d7ab3d3ab",
    boardName: "Fullstack challenge",
    description: "multi-tasking",
    boardImage: "https://picsum.photos/seed/hCCFglYCZm/640/480",
    visibility: "PUBLIC" as TVisibility,
    createdAt: "2024-08-15T10:49:32.967Z",
    boardMember: [],
    admin: {
      id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
      username: "Urban.Braun",
      email: "Jerrell.Turcotte@yahoo.com",
      profileImage: "https://avatars.githubusercontent.com/u/24087111",
      createdAt: "2024-08-15T10:49:32.967Z",
    },
    updatedAt: "2024-08-15T10:49:32.967Z",
  },
  {
    boardId: "7f607bd8-b39c-4593-85f6-895d7ab3d3ab",
    boardName: "Frontend Challange",
    description: "multi-tasking",
    boardImage: "https://picsum.photos/seed/hCCFglYCZm/640/480",
    visibility: "PUBLIC" as TVisibility,
    createdAt: "2024-08-15T10:49:32.967Z",
    boardMember: [],
    admin: {
      id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
      username: "Urban.Braun",
      email: "Jerrell.Turcotte@yahoo.com",
      profileImage: "https://avatars.githubusercontent.com/u/24087111",
      createdAt: "2024-08-15T10:49:32.967Z",
    },
    updatedAt: "2024-08-15T10:49:32.967Z",
  },
];
