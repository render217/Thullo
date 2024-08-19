"use client";
import { Bell, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IBoard } from "@/types";
import InvitationItem from "./invitation-item";
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
        <DropdownMenuContent className="w-[220px] border p-3 shadow-sm shadow-blue-200">
          <div>
            <h3 className="text-sm font-semibold">Your Invites</h3>
            <p className="text-[10px]">Recevied Invites from other boards </p>
          </div>
          <div className="mt-2 h-[140px] overflow-hidden border border-slate-300">
            <ScrollArea className="h-[140px]">
              <div className="flex flex-col gap-2 p-1 pr-3">
                {boards.map((board) => (
                  <InvitationItem key={board.id} board={board} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const boards: IBoard[] = [
  {
    id: "7f607bd8-b39c-4593-85f6-895d7ab3d3ab",
    title: "Optimized eco-centric challenge",
    description: "multi-tasking",
    coverPhoto: "https://picsum.photos/seed/hCCFglYCZm/640/480",
    visibility: "private",
    createdAt: "2024-08-15T10:49:32.967Z",
    members: [
      {
        id: "e89e7a06-cb0c-4b71-ad50-fb69fd0280f1",
        username: "Ona.Nitzsche98",
        email: "Francisca_Kuhlman90@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/83412688",
      },
      {
        id: "034b5131-5396-4dce-b31e-e80e876f7527",
        username: "Brook.VonRueden72",
        email: "Nicklaus_Williamson32@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/40334244",
      },
      {
        id: "ddeaee7c-d911-4a05-83ea-951c625aeea2",
        username: "Koby.Nienow",
        email: "Marty_OConnell91@hotmail.com",
        profileImage: "https://avatars.githubusercontent.com/u/63974396",
      },
      {
        id: "e89e7a06-cb0c-4b71-ad50-fb69fd0280f1",
        username: "Ona.Nitzsche98",
        email: "Francisca_Kuhlman90@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/83412688",
      },
      {
        id: "ba1a53c8-3dfa-44d1-82bf-c62817772c40",
        username: "Pascale85",
        email: "Tyrese_Kuhic23@gmail.com",
        profileImage:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/441.jpg",
      },
      {
        id: "034b5131-5396-4dce-b31e-e80e876f7527",
        username: "Brook.VonRueden72",
        email: "Nicklaus_Williamson32@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/40334244",
      },
      {
        id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
        username: "Urban.Braun",
        email: "Jerrell.Turcotte@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/24087111",
      },
    ],
    admin: {
      id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
      username: "Urban.Braun",
      email: "Jerrell.Turcotte@yahoo.com",
      profileImage: "https://avatars.githubusercontent.com/u/24087111",
    },
    taskLists: [],
  },
  {
    id: "329b0f37-085a-40ed-a807-54d0e4da4ee4",
    title: "Cross-platform next generation alliance",
    description: "incremental",
    coverPhoto: "https://picsum.photos/seed/JibomB33V/640/480",
    visibility: "private",
    createdAt: "2024-08-15T00:28:23.890Z",
    members: [],
    admin: {
      id: "c771ea62-3524-4c8f-89c3-2c36a04df965",
      username: "Alphonso.Wisozk",
      email: "Doug_Bechtelar@hotmail.com",
      profileImage:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1005.jpg",
    },
    taskLists: [],
  },
  {
    id: "df5a1636-4c71-481e-afea-852b125d5b79",
    title: "Advanced heuristic toolset",
    description: "didactic",
    coverPhoto: "https://picsum.photos/seed/k2LVLZ5a/640/480",
    visibility: "public",
    createdAt: "2024-08-15T08:32:31.881Z",
    members: [],
    admin: {
      id: "3775cb9b-2852-4aab-9125-473bcada5703",
      username: "Lempi.Casper21",
      email: "Carmen_Casper61@gmail.com",
      profileImage: "https://avatars.githubusercontent.com/u/44307080",
    },
    taskLists: [],
  },
];
