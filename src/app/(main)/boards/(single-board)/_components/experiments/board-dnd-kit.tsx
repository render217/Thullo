"use client";
import { IBoard, ITask, ICard } from "@/types";
import {
  Badge,
  GripVertical,
  MessageSquareText,
  Paperclip,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import BoardCard from "../../../(all-boards)/_components/board/board-card";
import TaskCard from "../kanban-board/task-card";
import Image from "next/image";

export default function BoardDndKit({ board }: { board: IBoard }) {
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
          <ul className="scrollbar-width-auto scrollbar-thumb-white scrollbar-track-transparent absolute inset-0 -top-[2px] mb-[8px] flex size-full select-none gap-2 overflow-x-auto overflow-y-hidden px-[10px] pb-[8px] pt-[8px]">
            {tasks.map((task) => (
              <SortableTaskItem key={task.id} task={task} />
            ))}
          </ul>
        </SortableContext>
        <DragOverlay className="flex" adjustScale={false}>
          {activeCard ? <SortableCardOverlay card={activeCard} /> : null}
          {activeTask ? <SortableTaskItemOverlay task={activeTask} /> : null}
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
      <li
        ref={setNodeRef}
        style={style}
        className="w-[272px] border-2 border-dashed border-blue-500 bg-blue-100"
      ></li>
    );
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("block h-full shrink-0 self-start px-[6px]")}
    >
      <div className="relative box-border flex max-h-full w-[272px] flex-col justify-between rounded-md bg-slate-50 pb-[8px] align-top">
        <div className="relative flex grow-0 items-start justify-between gap-2 rounded-md bg-slate-50 py-[8px] pl-[8px] pr-[0]">
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
        <div className="-mb-[2px] h-[8px] flex-shrink-0 border-b border-slate-400"></div>
        <div className="scrollbar-stable scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent my-1 flex flex-shrink flex-grow basis-auto flex-col gap-2 overflow-y-auto overflow-x-hidden py-1 pl-[8px] pr-[4px]">
          <SortableContext
            items={task.cards}
            strategy={verticalListSortingStrategy}
          >
            {task.cards.map((card) => (
              <SortableCard key={card.id} card={card} />
            ))}
          </SortableContext>
        </div>

        <div className="ml-[8px] mr-[12px] rounded-md bg-white px-[8px]">
          <button className="w-full rounded-md border border-dashed border-slate-800 py-[8px] text-xs hover:border-solid hover:border-slate-500 hover:bg-slate-200">
            Add Card
          </button>
        </div>
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
        "h-auto min-h-[200px] rounded-md border border-slate-400 bg-white px-2 py-2 text-sm shadow-md hover:cursor-pointer hover:border-gray-600",
      )}
    >
      <TaskCard card={card} />
    </div>
  );
}

function SortableTaskItemOverlay({ task }: { task: ITask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
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
        <div className="scrollbar-stable scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent my-1 flex flex-shrink flex-grow basis-auto flex-col gap-2 overflow-y-auto overflow-x-hidden py-1 pl-[8px] pr-[4px]">
          <SortableContext
            items={task.cards}
            strategy={verticalListSortingStrategy}
          >
            {task.cards.map((card) => (
              <SortableCard key={card.id} card={card} />
            ))}
          </SortableContext>
        </div>

        <div className="px-[8px] py-[8px]">
          <button className="w-full">Add Card</button>
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
      className={cn(
        "min-h-[200px] rotate-3 rounded-md bg-white px-2 py-2 text-sm shadow-md hover:cursor-pointer hover:border-gray-600",
      )}
    >
      <div className="size-full">
        <div className="max-h-[100px] w-full overflow-hidden rounded-lg bg-white shadow-lg">
          <Image
            className="h-full w-full rounded-md object-cover"
            src={card?.coverPhoto}
            layout="responsive"
            width={100}
            height={100}
            alt="cardimage"
          />
        </div>
        <div className="px-3 py-1.5">
          <h3 className="text-[14px] font-semibold">{card.title}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 px-3 py-1.5">
          {card.labels.map((label) => (
            <span
              key={label.id}
              className="grid h-[14px] place-content-center rounded-md border border-slate-400 px-2 py-0 text-[10px]"
            >
              {label.tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-2 py-2">
          {card.comments.length > 0 && (
            <div className="flex items-center gap-1 text-slate-500">
              <MessageSquareText className="size-4" />
              <span className="block text-xs font-medium">
                {card.comments.length}
              </span>
            </div>
          )}
          {card.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-slate-500">
              <Paperclip className="size-4" />
              <span className="block text-xs font-medium">
                {card.attachments.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
