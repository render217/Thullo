"use client";
import { IBoard, ITask, ICard } from "@/types";
import { GripVertical } from "lucide-react";
import { act, useState } from "react";

import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export default function Part5Ex({ board }: { board: IBoard }) {
  const [tasks, setTasks] = useState(board.taskLists);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const foundTask = tasks.find((task) => task.id === active.id);
    const foundCard = tasks
      .flatMap((task) => task.cards)
      .find((card) => card.id === active.id);

    if (foundCard) setActiveCard(foundCard);
    if (foundTask) setActiveTask(foundTask);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    // Handle Card Sorting Within the Same Task or Between Different Tasks
    if (activeData?.type === "card" && overData?.type === "card") {
      const activeTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.id === activeData?.card?.id),
      );
      const overTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.id === overData?.card?.id),
      );

      if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
        const activeCardIndex = tasks[activeTaskIndex].cards.findIndex(
          (card) => card.id === active.id,
        );
        const overCardIndex = tasks[overTaskIndex].cards.findIndex(
          (card) => card.id === over.id,
        );

        if (activeTaskIndex === overTaskIndex) {
          // Reorder cards within the same task
          const updatedCards = arrayMove(
            tasks[activeTaskIndex].cards,
            activeCardIndex,
            overCardIndex,
          );
          const updatedTasks = tasks.map((task, index) =>
            index === activeTaskIndex ? { ...task, cards: updatedCards } : task,
          );
          setTasks(updatedTasks);
        } else {
          // Move card to a different task
          const [removedCard] = tasks[activeTaskIndex].cards.splice(
            activeCardIndex,
            1,
          );
          tasks[overTaskIndex].cards.splice(overCardIndex, 0, removedCard);

          const updatedTasks = [...tasks];
          updatedTasks[activeTaskIndex] = tasks[activeTaskIndex];
          updatedTasks[overTaskIndex] = tasks[overTaskIndex];

          setTasks(updatedTasks);
        }
      }
    }

    // Handle Dragging a Card Into a Different Task
    if (activeData?.type === "card" && overData?.type === "task") {
      const activeTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.id === active.id),
      );
      const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

      if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
        const activeCardIndex = tasks[activeTaskIndex].cards.findIndex(
          (card) => card.id === active.id,
        );

        // Remove the card from the active task and add it to the over task
        const [removedCard] = tasks[activeTaskIndex].cards.splice(
          activeCardIndex,
          1,
        );
        tasks[overTaskIndex].cards.push(removedCard);

        const updatedTasks = [...tasks];
        updatedTasks[activeTaskIndex] = tasks[activeTaskIndex];
        updatedTasks[overTaskIndex] = tasks[overTaskIndex];

        setTasks(updatedTasks);
      }
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    // Determine if the drag is from a card or a task
    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    if (activeData.type === "card" && overData.type === "card") {
      // Card-to-card drag within the same task
      console.log("1.card-to-card");
      const sourceTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.id === active.id),
      );
      const targetTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.id === over.id),
      );
      //   console.log("2.source-task-index", sourceTaskIndex);
      //   console.log("2.target-task-index", targetTaskIndex);

      if (sourceTaskIndex === targetTaskIndex) {
        console.log("3.within same task");
        const sourceCardIndex = tasks[sourceTaskIndex].cards.findIndex(
          (card) => card.id === active.id,
        );
        const targetCardIndex = tasks[sourceTaskIndex].cards.findIndex(
          (card) => card.id === over.id,
        );
        // console.log("4.source-card-index", sourceCardIndex);
        // console.log("4.target-card-index", targetCardIndex);

        if (sourceCardIndex !== -1 && targetCardIndex !== -1) {
          const updatedCards = arrayMove(
            tasks[sourceTaskIndex].cards,
            sourceCardIndex,
            targetCardIndex,
          );

          const updatedTasks = tasks.map((task, index) =>
            index === sourceTaskIndex ? { ...task, cards: updatedCards } : task,
          );
          //   console.log("5.updated-tasks", updatedTasks[sourceTaskIndex]);

          setTasks(updatedTasks);
        } else {
          //   console.log("5.source or target card index not found");
        }
      } else {
        console.log("3. with in different task");
        // Moving card to a different task
        const sourceTask = tasks[sourceTaskIndex];
        const targetTask = tasks[targetTaskIndex];
        const [movedCard] = sourceTask.cards.splice(
          sourceTask.cards.findIndex((card) => card.id === active.id),
          1,
        );
        targetTask.cards.splice(
          targetTask.cards.findIndex((card) => card.id === over.id) + 1,
          0,
          movedCard,
        );

        const updatedTasks = [...tasks];
        updatedTasks[sourceTaskIndex] = sourceTask;
        updatedTasks[targetTaskIndex] = targetTask;

        setTasks(updatedTasks);
      }
    } else if (activeData.type === "task" && overData.type === "task") {
      // Task-to-task drag
      console.log("1. task-to-task");
      const sourceIndex = tasks.findIndex((task) => task.id === active.id);
      const targetIndex = tasks.findIndex((task) => task.id === over.id);
      if (sourceIndex !== -1 && targetIndex !== -1) {
        const updatedTasks = arrayMove(tasks, sourceIndex, targetIndex);
        setTasks(updatedTasks);
      }
    }

    setActiveTask(null);
    setActiveCard(null);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
      >
        <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
          <div className="size-full">
            <ul className="flex size-full gap-2">
              {tasks.map((task) => (
                <SortableTaskItem key={task.id} task={task} />
              ))}
            </ul>
          </div>
        </SortableContext>
        <DragOverlay className="flex" adjustScale={false}>
          {activeCard ? <SortableCardOverlay card={activeCard} /> : null}
          {activeTask ? <SortableTaskItemOverlay item={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

function SortableTaskItem({ task }: { task: ITask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "task", task },
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
        className="flex min-w-[300px] flex-col gap-2 rounded-md border-2 border-dashed border-blue-500 bg-blue-100 p-4 hover:shadow-lg"
      ></div>
    );
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex min-w-[300px] max-w-[300px] flex-col gap-2 rounded-md bg-white p-4 hover:shadow-lg",
      )}
    >
      <div className="flex h-fit gap-4 rounded-md border border-slate-400 p-2">
        <div className="h-fit w-full rounded-md border border-slate-800 p-1">
          <h1 className="text-sm font-semibold">{task.title}</h1>
        </div>
        <div
          {...listeners}
          className="flex cursor-grab items-center self-start rounded p-1 hover:bg-gray-100"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      <SortableContext
        items={task.cards}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex size-full flex-1 flex-col gap-2 overflow-y-auto">
          {task.cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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
          className="flex cursor-grab items-center self-start rounded p-1 hover:bg-gray-100"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      <div className="scrollbar-width-[2px] scrollbar-track-transparent scrollbar-thumb-slate-500 flex size-full flex-1 flex-col gap-2 overflow-y-auto">
        {item.cards.map((card) => (
          <div
            className="min-h-[200px] rounded-md border-2 border-gray-200 px-2 text-sm hover:cursor-pointer hover:border-gray-600"
            key={card.id}
          >
            {card.title}
          </div>
        ))}
      </div>
      <div className="border py-1">
        <p>Add Card</p>
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
      className={cn(
        "h-[200px] w-[300px] rotate-3 rounded-md border-2 border-gray-200 bg-white px-2 text-sm hover:cursor-pointer hover:border-gray-600",
      )}
    >
      {card.title}
    </div>
  );
}
