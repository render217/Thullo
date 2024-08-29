"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

import { TBoardTaskCard } from "@/types/t";
import TaskCard from "../task-card";
import { useAuth } from "@clerk/nextjs";
import { useBoardStore } from "@/lib/store/useBoardStore";

export default function SortableCard({ card }: { card: TBoardTaskCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,

    isDragging,
  } = useSortable({
    id: card.cardId,
    data: {
      type: "card",
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-md border-2 border-dashed border-blue-500 bg-blue-100 px-2 text-sm hover:border-gray-600 hover:shadow-lg"
      >
        <TaskCard card={card} />
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "h-auto rounded-md border border-slate-100 bg-white px-2 py-2 text-sm shadow-md hover:border-blue-500",
      )}
    >
      <TaskCard card={card} listeners={listeners} />
    </div>
  );
}
