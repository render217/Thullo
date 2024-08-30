"use client";

import BoardCard from "./board-card";
import { TBoard } from "@/types";
import { SquareKanban } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

import { FILTER_OPTIONS, FilterOptions } from "@/lib/constants";
import { useBoardsFilter } from "@/lib/store/useBoardsFilter";

export default function BoardList({ boards }: { boards: TBoard[] }) {
  const { userId } = useAuth();
  const { filter } = useBoardsFilter();

  const { adminBoards, privateBoards, publicBoards } = classifyBoards(
    boards,
    userId!,
    filter,
  );

  return (
    <>
      <div className="space-y-5">
        {filter === "Your Boards" || filter === "All Boards" ? (
          <div className="rounded-md border border-gray-300 p-5">
            <h2 className="mb-2 text-lg font-light">Your Boards</h2>
            {adminBoards.length > 0 ? (
              <div className="flex flex-wrap gap-8">
                {adminBoards.map((board) => (
                  <div key={board.boardId}>
                    <BoardCard board={board} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid min-h-[150px] place-content-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <SquareKanban className="size-20 text-gray-300" />
                  <h1 className="text-xl text-gray-500">
                    You don't have any Boards.
                  </h1>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {filter === "Private Boards" || filter === "All Boards" ? (
          <div className="rounded-md border border-gray-300 p-5">
            <h2 className="mb-2 py-2 text-lg font-light">Private Boards</h2>
            {privateBoards.length > 0 ? (
              <div className="flex flex-wrap gap-8">
                {privateBoards.map((board) => (
                  <div key={board.boardId}>
                    <BoardCard board={board} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid min-h-[150px] place-content-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <SquareKanban className="size-20 text-gray-300" />
                  <h1 className="text-xl text-gray-500">
                    You are not in any private boards.
                  </h1>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {filter === "Public Boards" || filter === "All Boards" ? (
          <div className="rounded-md border border-gray-300 p-5">
            <h2 className="mb-2 py-2 text-lg font-light">Public Boards</h2>
            {publicBoards.length > 0 ? (
              <div className="mb-2 flex flex-wrap gap-8">
                {publicBoards.map((board) => (
                  <div key={board.boardId}>
                    <BoardCard board={board} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid min-h-[150px] place-content-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <SquareKanban className="size-20 text-gray-300" />
                  <h1 className="text-xl text-gray-500">
                    No Public boards available.
                  </h1>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
export function classifyBoards(
  boards: TBoard[],
  userId: string,
  filter: FilterOptions,
) {
  const adminBoards = boards.filter((board) => board.admin.id === userId);
  const privateBoards = boards.filter(
    (board) =>
      board.visibility === "PRIVATE" &&
      board.boardMember.some((member) => member.id === userId),
  );
  const publicBoards = boards.filter(
    (board) => board.visibility === "PUBLIC" && board.admin.id !== userId,
  );

  switch (filter) {
    case FILTER_OPTIONS.YOURS:
      return { adminBoards, privateBoards: [], publicBoards: [] };
    case FILTER_OPTIONS.PRIVATE:
      return { adminBoards: [], privateBoards, publicBoards: [] };
    case FILTER_OPTIONS.PUBLIC:
      return { adminBoards: [], privateBoards: [], publicBoards };
    default:
      return { adminBoards, privateBoards, publicBoards };
  }
}
