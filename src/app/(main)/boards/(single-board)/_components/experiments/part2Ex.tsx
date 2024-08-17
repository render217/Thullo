"use client";
import { IBoard, ITask, ICard } from "@/types";
import { GripVertical } from "lucide-react";
import { useState } from "react";

import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export default function Part2Ex({ board }: { board: IBoard }) {
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [tasks, setTasks] = useState(board.taskLists);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveTask(tasks.find((task) => task.id === active.id) as ITask);
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setTasks((prev) => {
        const activeIndex = prev.findIndex((item) => item.id === active?.id);
        const overIndex = prev.findIndex((item) => item.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
    setActiveTask(null);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
          <div className="size-full">
            <ul className="flex size-full gap-2">
              {tasks.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </SortableContext>
        <DragOverlay className="flex size-full">
          {activeTask ? <SortableItemOverlay item={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

function SortableItem({ item }: { item: ITask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
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
        className="flex w-[300px] flex-col gap-2 rounded-md border-2 border-dashed border-blue-500 bg-blue-100 p-4 hover:shadow-lg"
      ></div>
    );
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex w-[300px] flex-col gap-2 rounded-md bg-white p-4 hover:shadow-lg",
        isDragging ? "bg-black" : "",
      )}
    >
      <div className="flex h-fit gap-4 rounded-md border border-slate-400 p-2">
        <div className="h-fit w-full rounded-md border border-slate-800 p-1">
          <h1 className="text-sm font-semibold">{item.title}</h1>
        </div>
        <div
          {...listeners}
          ref={setActivatorNodeRef}
          className="flex cursor-grab items-center self-start rounded p-1 hover:bg-gray-100"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      <div className="scrollbar-width-[2px] scrollbar-track-transparent scrollbar-thumb-slate-500 flex size-full flex-1 flex-col gap-2 overflow-y-auto">
        {item.cards.map((card) => {
          return (
            <div
              className="min-h-[200px] rounded-md border-2 border-gray-200 px-2 text-sm hover:cursor-pointer hover:border-gray-600"
              key={card.id}
            >
              {card.title}
            </div>
          );
        })}
      </div>
      <div className="border py-1">
        <p>Add Card</p>
      </div>
    </li>
  );
}

function SortableItemOverlay({ item }: { item: ITask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
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
      className="flex w-[300px] rotate-3 flex-col gap-2 rounded-md bg-white p-4 hover:shadow-lg"
    >
      <div className="flex h-fit gap-4 rounded-md border border-slate-400 p-2">
        <div className="h-fit w-full rounded-md border border-slate-800 p-1">
          <h1 className="text-sm font-semibold">{item.title}</h1>
        </div>
        <div
          {...listeners}
          ref={setActivatorNodeRef}
          className="flex cursor-grab items-center self-start rounded p-1 hover:bg-gray-100"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      <div className="scrollbar-width-[2px] scrollbar-track-transparent scrollbar-thumb-slate-500 flex size-full flex-1 flex-col gap-2 overflow-y-auto">
        {item.cards.map((card) => {
          return (
            <div
              className="min-h-[200px] rounded-md border-2 border-gray-200 px-2 text-sm hover:cursor-pointer hover:border-gray-600"
              key={card.id}
            >
              {card.title}
            </div>
          );
        })}
      </div>
      <div className="border py-1">
        <p>Add Card</p>
      </div>
    </li>
  );
}
