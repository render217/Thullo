"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function ChangeVisibility2() {
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none" asChild>
          <Button
            size={"sm"}
            className="focus-visible:focusring-offset-0 w-24 flex-1 rounded-[8px] bg-gray-200 text-xs hover:bg-gray-200 focus-visible:ring-0"
            variant={"outline"}
          >
            <div className="flex items-center gap-1">
              <Image
                className=""
                src={`${
                  visibility === "public"
                    ? "/icons/lock-closed.svg"
                    : "/icons/lock-closed.svg"
                }`}
                height={14}
                width={14}
                alt="logo-mobile"
              />
              <p>{visibility === "public" ? "Public" : "Private"}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 w-[272px]">
          <DropdownMenuLabel className="pb-1">Visibility</DropdownMenuLabel>
          <DropdownMenuLabel className="pb-1.5 pt-0 text-xs">
            Choose who can see to this board
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border" />
          <DropdownMenuRadioGroup
            value={visibility}
            onValueChange={(value) =>
              setVisibility(value as "private" | "public")
            }
          >
            <DropdownMenuRadioItem value="public">
              <div className="cursor-pointer">
                <div className="mb-1 flex items-center gap-1">
                  <Image
                    className=""
                    src={"/icons/global-alt.svg"}
                    height={14}
                    width={14}
                    alt="public"
                  />
                  <p className="text-sm">Public</p>
                </div>
                <p className="text-xs">Anyone on the internet can see this</p>
              </div>
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="private">
              <div className="cursor-pointer">
                <div className="mb-1 flex items-center gap-1">
                  <Image
                    className=""
                    src={"/icons/lock-closed.svg"}
                    height={14}
                    width={14}
                    alt="public"
                  />
                  <p className="text-sm">Private</p>
                </div>
                <p className="text-xs">Only board members can see this</p>
              </div>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
