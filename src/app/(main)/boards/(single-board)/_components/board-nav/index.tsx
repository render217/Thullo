"use client";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import BoardSideBar from "../board-sidebar";
import BoardMemebers from "./board-members";

import { useParams } from "next/navigation";
// import InviteUser from "./invite-user";
import PreviewInvites from "./preview-invites";
import ChangeVisibility from "./change-visibility";
import BoardDetailNavSkeleton from "@/components/shared/skeletons/boards/board-detail-nav-skeleton";
import AddUser from "./add-user";

export default function BoardNav() {
  const params = useParams();
  const { data, status } = useGetBoardById(params?.id as string);
  if (status === "pending") return <BoardDetailNavSkeleton />;
  if (!data?.success) return null;
  const board = data.data;

  return (
    <div className="px-[2%]">
      <div className="flex items-center gap-4">
        <ChangeVisibility board={board} />
        <BoardMemebers members={board.boardMember} />
        <AddUser board={board} />
        {/* <InviteUser /> */}
        <div className="ml-6">
          <PreviewInvites />
        </div>
        <div className="ml-auto">
          <BoardSideBar />
        </div>
      </div>
    </div>
  );
}
