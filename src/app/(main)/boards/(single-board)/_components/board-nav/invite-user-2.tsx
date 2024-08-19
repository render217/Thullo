"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function InviteUser2() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex h-9 w-9 place-content-center rounded-md px-2">
            <Plus className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px] border p-3 shadow-sm shadow-blue-200">
          <div>
            <h3 className="text-sm font-semibold">Invite to Board</h3>
            <p className="text-[10px]"> Search users you want to invite to </p>
          </div>
          {/* break to other component */}
          <div className="relative py-2">
            <Input
              className="h-6 py-0.5 pr-[28px] text-[10px] shadow-sm focus-visible:ring-0"
              placeholder="Search for user..."
            />
            <Button className="absolute right-1 top-2.5 h-5 w-fit p-1">
              <Search className="size-3" />
            </Button>
          </div>
          {/* break to other component */}

          <div className="h-[140px] overflow-hidden rounded-md border border-slate-300">
            {/* <div className="flex size-full items-center justify-center">
              <p className="text-[10px]">searching...</p>
            </div> */}
            <ScrollArea className="flex h-[140px] pr-2">
              <div className="flex flex-col gap-2 p-1">
                {users.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md border p-1 shadow-md hover:bg-slate-200"
                    >
                      <div className="h-8 min-w-8 max-w-8 overflow-hidden rounded-sm">
                        <img
                          className="size-full object-cover"
                          src={user.profileImage}
                          alt={user.username}
                        />
                      </div>
                      <div className="relative">
                        <h2 className="text-[10px]">{user.username}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="mt-2">
            <Button size={"sm"} className="mx-auto block h-6 text-[10px]">
              Invite Member
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const users = [
  {
    id: "034b5131-5396-4dce-b31e-e80e876f7537",
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
];
