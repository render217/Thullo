"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function NavSearchForm() {
  return (
    <>
      <div className="bg-white">
        <div className="relative">
          <Input
            className="relative h-8 border border-slate-300 py-1 pr-9 text-xs focus-visible:ring-0"
            placeholder="Search..."
          />
          <span className="absolute right-1 top-1 grid h-6 w-6 cursor-pointer place-content-center rounded-md border bg-blue-500 text-white">
            <Search className="block size-3" />
          </span>
        </div>
      </div>
    </>
  );
}
