"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

export default function InviteUser() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex w-fit place-content-center rounded-md px-2">
            <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-10 w-fit">
          <CardContent className="w-[20rem] p-3">
            <CardHeader className="px-3 py-2">
              <CardTitle className="text-lg leading-5">
                Invite to Board
              </CardTitle>
              <CardDescription className="text-xs">
                Search users you want to invite to{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 py-0">
              <div className="py-2">
                <div className="flex rounded-md border border-black/25 p-1">
                  <Input className="h-8 border-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
                  <Button
                    className="h-8 border-2 border-slate-200"
                    variant={"outline"}
                    size={"sm"}
                  >
                    <Image
                      className="h-6 w-6 rounded-md"
                      src={"/icons/magnifying-glass.svg"}
                      height={100}
                      width={150}
                      alt="cover-image"
                    />
                  </Button>
                </div>
              </div>
              <ScrollArea className="mb-2 mt-1 h-36 w-full rounded-md border-2 pr-3">
                <Person />
                <Person />
                <Person />
                <Person />
                <Person />
                <Person />
              </ScrollArea>
            </CardContent>
            <CardFooter className="px-3 py-1">
              <Button className="mx-auto h-8 w-[100px] text-sm" size={"sm"}>
                Invite
              </Button>
            </CardFooter>
          </CardContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function Person() {
  return (
    <div className="my-1 flex cursor-pointer items-center gap-5 px-2 py-1 hover:bg-slate-200">
      <Image
        className="h-9 w-9 rounded-md"
        src={"/images/background-1.jpg"}
        height={100}
        width={150}
        alt="cover-image"
      />
      <p className="text-sm font-medium">Marris Craft</p>
    </div>
  );
}
