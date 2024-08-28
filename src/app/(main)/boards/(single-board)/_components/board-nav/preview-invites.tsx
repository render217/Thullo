import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
export default function PreviewInvites() {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <div className="flex w-full cursor-pointer flex-row items-center gap-1 rounded-md p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300">
            <Eye className="size-4" />
            <p className="text-[10px]">preview invites</p>
          </div> */}
          <Button
            variant={"outline"}
            size={"sm"}
            className="h-7 border-2 text-xs"
          >
            <div className="flex items-center gap-2 text-slate-500">
              <Eye className="size-4" />
              <span className="text-[10px]">Preview Invites</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-[220px] border p-3">
          <div className="absolute inset-0 z-20 grid place-content-center bg-black/80">
            <p className="rounded-md border p-4 text-xs text-white">
              to be implemented
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Preview Invites</h3>
            <p className="text-[10px]"> Users invited to this board </p>
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
              <div className="flex flex-col gap-1 p-1">
                {users.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="relative flex cursor-pointer items-center gap-2 rounded-md border p-1 hover:bg-slate-100"
                    >
                      <Avatar className="h-4 w-4">
                        <img
                          className="size-full object-cover"
                          src={user.profileImage}
                          alt={user.username}
                        />
                      </Avatar>

                      <div className="relative">
                        <h2 className="w-[105px] truncate text-[10px]">
                          {user.username}
                        </h2>
                      </div>
                      <span className="absolute right-1 top-1 block rounded-md border bg-red-500 p-0.5 px-1 text-[8px] text-white">
                        cancel
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
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
