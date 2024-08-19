"use client";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import BoardSideBar from "../board-sidebar";
import BoardMemebers from "./board-members";

import { useParams } from "next/navigation";
import InviteUser from "./invite-user";
import PreviewInvites from "./preview-invites";
import ChangeVisibility from "./change-visibility";

export default function BoardNav() {
  const params = useParams();
  const { data, isPending } = useGetBoardById(params?.id as string);
  if (!data?.success) return null;
  const board = data.data;

  return (
    <div className="px-[2%]">
      <div className="flex items-center gap-4">
        <ChangeVisibility />
        <BoardMemebers members={board.members} />
        <InviteUser />
        <PreviewInvites />
        <div className="ml-auto">
          <BoardSideBar />
        </div>
      </div>
    </div>
  );
}
