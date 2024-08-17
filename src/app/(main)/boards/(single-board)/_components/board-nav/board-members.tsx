"use client";

import { IUser } from "@/types";
import Image from "next/image";

export default function BoardMemebers({ members }: { members: IUser[] }) {
  const totalMembers = members.length;
  const remainingMembers = totalMembers > 3 ? totalMembers - 3 : 0;
  const displayMembers = members.slice(0, 3);
  return (
    <div>
      <div className="flex items-center gap-4">
        {displayMembers.map((member) => {
          return (
            <div key={member.id} className="flex items-center gap-2">
              <Image
                src={member.profileImage}
                height={100}
                width={150}
                alt="avatar"
                className="h-7 w-8 rounded-md"
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
