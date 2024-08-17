"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function NavSearchForm() {
  return (
    <>
      <div className="bg-white">
        <div className="flex rounded-[8px] border border-slate-300 p-1">
          <Input
            placeholder="Search"
            className="h-8 rounded-s-[8px] border-none px-2 py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            variant={"outline"}
            size={"sm"}
            className="h-8 w-[50px] border px-1 text-sm font-medium"
          >
            <Search className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
