"use client";

import { IUser } from "@/types";
import { TBoardMember } from "@/types/t";
import Image from "next/image";

export default function BoardMemebers({
  members,
}: {
  members: TBoardMember[];
}) {
  const totalMembers = members.length;
  const remainingMembers = totalMembers > 3 ? totalMembers - 3 : 0;
  const displayMembers = members.slice(0, 3);
  return (
    <div>
      <div className="flex items-center gap-4">
        {displayMembers.map((member) => {
          return (
            <div key={member.id} className="h-9 w-9 overflow-hidden rounded-md">
              <img
                src={member.profileImage}
                loading="lazy"
                alt="avatar"
                className="size-full object-cover"
              />
            </div>
          );
        })}
        {remainingMembers > 0 && (
          <span className="ml-auto block cursor-pointer rounded-md border px-2 py-2 text-xs">
            + {remainingMembers} More
          </span>
        )}
      </div>
    </div>
  );
}
