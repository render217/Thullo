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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export default function Part4Ex({ board }: { board: IBoard }) {
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
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
                <SortableTaskItem
                  key={item.id}
                  item={item}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ))}
            </ul>
          </div>
        </SortableContext>
        <DragOverlay className="flex size-full">
          {activeTask ? <SortableTaskItemOverlay item={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

function SortableTaskItem({
  item,
  tasks,
  setTasks,
}: {
  item: ITask;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleCardDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveCard(item.cards.find((card) => card.id === active.id) as ICard);
  }

  function handleCardDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log({ active, over });
    if (active && over) {
      setTasks((prev) => {
        const activeTaskIndex = prev.findIndex((task) =>
          task.cards.some((card) => card.id === active.id),
        );
        const overTaskIndex = prev.findIndex((task) =>
          task.cards.some((card) => card.id === over.id),
        );

        if (activeTaskIndex === overTaskIndex) {
          // Moving within the same task
          const activeIndex = prev[activeTaskIndex].cards.findIndex(
            (card) => card.id === active.id,
          );
          const overIndex = prev[activeTaskIndex].cards.findIndex(
            (card) => card.id === over.id,
          );
          return prev.map((task, index) => {
            if (index === activeTaskIndex) {
              return {
                ...task,
                cards: arrayMove(task.cards, activeIndex, overIndex),
              };
            }
            return task;
          });
        } else {
          // Moving to a different task
          const activeCard = prev[activeTaskIndex].cards.find(
            (card) => card.id === active.id,
          ) as ICard;

          return prev.map((task, index) => {
            if (index === activeTaskIndex) {
              return {
                ...task,
                cards: task.cards.filter((card) => card.id !== active.id),
              };
            }
            if (index === overTaskIndex) {
              const overIndex = prev[overTaskIndex].cards.findIndex(
                (card) => card.id === over.id,
              );
              return {
                ...task,
                cards: [
                  ...task.cards.slice(0, overIndex + 1),
                  activeCard,
                  ...task.cards.slice(overIndex + 1),
                ],
              };
            }
            return task;
          });
        }
      });
    }
    setActiveCard(null);
  }

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

      {/* Nested Sortable Context for Cards */}
      <DndContext
        sensors={sensors}
        onDragStart={handleCardDragStart}
        onDragEnd={handleCardDragEnd}
      >
        <SortableContext
          items={item.cards}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex size-full flex-1 flex-col gap-2 overflow-y-auto">
            {item.cards.map((card) => (
              <SortableCard key={card.id} card={card} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeCard ? <SortableCardOverlay card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>
      <div className="border py-1">
        <p>Add Card</p>
      </div>
    </li>
  );
}

function SortableCard({ card }: { card: ICard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
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
        className="max-h-[200px] min-h-[200px] rounded-md border-2 border-dashed border-blue-500 bg-blue-100 px-2 text-sm hover:cursor-pointer hover:border-gray-600 hover:shadow-lg"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "max-h-[200px] min-h-[200px] rounded-md border-2 border-gray-200 bg-white px-2 text-sm hover:cursor-pointer hover:border-gray-600",
      )}
    >
      {card.title}
    </div>
  );
}

function SortableTaskItemOverlay({ item }: { item: ITask }) {
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
    </li>
  );
}

function SortableCardOverlay({ card }: { card: ICard }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="max-h-[200px] min-h-[200px] rotate-3 rounded-md border-2 border-gray-200 bg-white px-2 text-sm hover:cursor-pointer hover:border-gray-600"
    >
      {card.title}
    </div>
  );
}
