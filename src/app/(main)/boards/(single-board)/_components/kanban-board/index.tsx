import { IBoard } from "@/types";
import ExperimentsDndKit from "../experiments";
import Part2Ex from "../experiments/part2Ex";
import Part3Ex from "../experiments/part3Ex";
import Part4Ex from "../experiments/part4Ex";
import Part5Ex from "../experiments/part5Ex";

export default function KanbanBoard({ board }: { board: IBoard }) {
  return (
    <div className="size-full select-none overflow-x-auto bg-gray-200 p-[10px] px-[20px]">
      {/* <ExperimentsDndKit board={board} /> */}
      {/* <Part2Ex board={board} /> */}
      {/* <Part3Ex board={board} /> */}
      {/* <Part4Ex board={board} /> */}
      <Part5Ex board={board} />
    </div>
  );
}
