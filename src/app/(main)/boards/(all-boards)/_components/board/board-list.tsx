import { IBoard } from "@/types";
import BoardCard from "./board-card";

export default function BoardList({ boards }: { boards: IBoard[] }) {
  return (
    <>
      <div className="flex flex-wrap gap-8">
        {boards.map((board) => {
          return (
            <div key={board.id}>
              <BoardCard board={board} />
            </div>
          );
        })}
      </div>
    </>
  );
}
