import { IBoard } from "@/types";
import BoardCard from "./board-card";
import { TBoard } from "@/types/t";
import { SquareKanban } from "lucide-react";

export default function BoardList({ boards }: { boards: TBoard[] }) {
  if (boards.length === 0) {
    return (
      <>
        <div className="grid min-h-[300px] place-content-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <SquareKanban className="size-32 text-gray-300" />
            <h1 className="text-2xl text-gray-500">No Boards avaliable yet.</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-wrap gap-8">
        {boards.map((board) => {
          return (
            <div key={board.boardId}>
              <BoardCard board={board} />
            </div>
          );
        })}
      </div>
    </>
  );
}
