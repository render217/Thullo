import { cn } from "@/lib/utils";
import { TBoardTask } from "@/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus } from "lucide-react";
import SortableCard from "../sortable-card";

export default function SortableTaskItemOverlay({
  task,
}: {
  task: TBoardTask;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.taskId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("block h-full shrink-0 self-start px-[6px]")}
    >
      <div className="relative box-border flex max-h-full w-[272px] rotate-3 flex-col justify-between rounded-md bg-white pb-[8px] align-top">
        <div className="relative flex grow-0 items-start justify-between gap-2 py-[8px] pl-[8px] pr-[0]">
          <div className="relative min-h-[20px] flex-shrink flex-grow">
            <h2 className="m-0 cursor-pointer bg-transparent px-[6px] text-[14px] font-medium">
              {task.title}
            </h2>
            {/* <Textarea className="opacity-0d resize- -z-d10 absolute inset-0 m-0 min-h-[20px] overflow-hidden" /> */}
            {/* <Textarea className="inset-0 m-0 min-h-[10px] w-full resize-none overflow-hidden" /> */}
          </div>

          <div
            {...listeners}
            className="flex cursor-grab items-center self-start rounded p-1 hover:bg-gray-100"
          >
            <GripVertical className="h-4 w-4" />
          </div>
        </div>
        <div className="-mb-[2px] h-[8px] flex-shrink-0"></div>
        <div className="my-1 flex flex-shrink flex-grow basis-auto flex-col gap-2 overflow-y-auto overflow-x-hidden py-1 pl-[8px] pr-[4px] scrollbar-stable scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-900">
          <SortableContext
            items={task.cards.map((c) => ({ ...c, id: c.cardId }))}
            strategy={verticalListSortingStrategy}
          >
            {task.cards.map((card) => (
              <SortableCard key={card.cardId} card={card} />
            ))}
          </SortableContext>
        </div>

        <div className="rounded-md bg-white px-[8px]">
          <button className="flex w-full items-center gap-2 rounded-md border border-dashed border-slate-200 px-2 py-[8px] hover:border-solid hover:border-slate-200 hover:bg-slate-200">
            <Plus className="size-4" />
            <span className="block text-sm">Add Card</span>
          </button>
        </div>
      </div>
    </li>
  );
}
