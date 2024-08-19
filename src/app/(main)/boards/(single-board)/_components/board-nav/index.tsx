"use client";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import BoardSideBar from "../board-sidebar";
import BoardMemebers from "./board-members";
import ChangeVisibility from "./change-visibility";
import InviteUser from "./invite-user";
import { useParams } from "next/navigation";
import InviteUser2 from "./invite-user-2";
import PreviewInvites from "./preview-invites";

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
        {/* <InviteUser /> */}
        <InviteUser2 />
        <PreviewInvites />
        <div className="ml-auto">
          <BoardSideBar />
        </div>
      </div>
    </div>
  );
}
