import { ICard } from "@/types";
import { ImageIcon, Tag, Users } from "lucide-react";

export default function TaskCardActions({ card }: { card: ICard }) {
  return (
    <div>
      <div className="px-4 text-[10px] font-medium text-gray-500">
        <p>Actions</p>
      </div>
      <div className="mt-2 flex flex-col gap-3 px-4">
        <CoverComp />
        <LabelComp />
        <MemberComp />
      </div>
    </div>
  );
}

export function CoverComp() {
  return (
    <div>
      <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300">
        <ImageIcon className="size-4" />
        <p>Cover</p>
      </div>
    </div>
  );
}

export function LabelComp() {
  return (
    <div>
      <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300">
        <Tag className="size-4" />
        <p>Label</p>
      </div>
    </div>
  );
}
export function MemberComp() {
  return (
    <div>
      <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300">
        <Users className="size-4" />
        <p>Member</p>
      </div>
    </div>
  );
}
