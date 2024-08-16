import { IBoard } from "@/types";

export default function KanbanBoard({ board }: { board: IBoard }) {
  return (
    <div className="size-full select-none overflow-x-scroll bg-gray-100 p-[24px]">
      <div>
        <h1>Kanband board</h1>
      </div>
    </div>
  );
}
