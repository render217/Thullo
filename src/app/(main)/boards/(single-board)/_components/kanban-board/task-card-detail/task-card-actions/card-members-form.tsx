"use client";
import { Plus, Search, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActionSelector } from ".";
export default function CardMembersForm() {
  const { memberSelected, openAction, showMember } = useActionSelector();
  const [memberName, setMemberName] = useState("");
  const handleAssignMember = () => {};
  return (
    <div>
      {!memberSelected && (
        <div
          onClick={() => openAction("showMember")}
          className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300"
        >
          <Users className="size-4" />
          <p>Members</p>
        </div>
      )}
      {showMember && (
        <div className="flex items-center gap-2 text-gray-500">
          <Users className="size-3" />
          <p className="text-[10px]">Members</p>
        </div>
      )}
      {showMember && (
        <>
          <ScrollArea className="h-[200px] rounded-md border p-1">
            <div className="flex flex-col gap-2 py-2">
              {members.map((member: any) => {
                return (
                  <div key={member.id} className="flex gap-2">
                    <div className="h-8 min-w-8 max-w-8 overflow-hidden rounded-sm">
                      <img
                        className="size-full object-cover"
                        src={member.profileImage}
                        alt=""
                      />
                    </div>
                    <div className="relative w-full">
                      <h2 className="max-w-[140px] overflow-hidden truncate text-[10px]">
                        {member.username}
                      </h2>
                      <span className="absolute bottom-0 block cursor-pointer rounded-sm border border-red-500 px-1 text-[8px] text-red-500 hover:bg-red-200">
                        remove
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-5 w-full">
              <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md bg-blue-200 p-2 text-xs text-blue-500 shadow-sm hover:bg-blue-300">
                <p>Assign a member</p>
                <Plus className="size-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[220px] p-3">
              <div>
                <h3 className="text-sm font-semibold">Members</h3>
                <p className="text-[10px]">Assign members to this card</p>
              </div>
              {/* break to other component */}
              <div className="relative py-2">
                <Input
                  className="h-6 py-0.5 pr-[28px] text-[10px] shadow-sm focus-visible:ring-0"
                  placeholder="search for member..."
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
                <Button
                  onClick={handleAssignMember}
                  className="absolute right-1 top-2.5 h-5 w-fit p-1"
                >
                  <Search className="size-3" />
                </Button>
              </div>
              {/* break to other component */}
              <div className="grid h-[140px] place-content-center">
                <p className="text-center text-[10px]"></p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
const members = [
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
