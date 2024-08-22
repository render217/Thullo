"use client";

import {
  ChevronDown,
  GripVertical,
  MessageSquareText,
  Paperclip,
  Plus,
} from "lucide-react";

import {
  verticalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

import { TBoardTask } from "@/types/t";

import SortableCard from "../sortable-card";
import TaskHeader from "./task-header";
import { useState } from "react";
import AddCard from "./add-card";

export default function SortableTaskItem({
  task,
  allowGrab = true,
}: {
  task: TBoardTask;
  allowGrab?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.taskId,
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
        className="relative block h-full shrink-0 self-start px-[6px]"
      >
        <div className="relative box-border flex max-h-full w-[272px] flex-col justify-between rounded-md border-2 border-dashed border-blue-500 bg-slate-300 pb-[8px] align-top opacity-40">
          <div className="absolute inset-0 bg-blue-100 opacity-40"></div>

          <div className="relative flex items-center justify-between gap-2 rounded-md border-b border-slate-300 bg-slate-50 py-[8px] pl-[8px] pr-[8px]">
            <TaskHeader task={task} />
            <div
              {...listeners}
              className="flex w-[23px] cursor-grab items-center self-start rounded p-1 hover:bg-gray-200"
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

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("block h-full shrink-0 cursor-default self-start px-[6px]")}
    >
      <div className="relative box-border flex max-h-full w-[272px] flex-col justify-between rounded-md bg-slate-50 pb-[8px] align-top">
        <div className="relative flex items-center justify-between gap-2 rounded-md border-b border-slate-300 bg-slate-50 py-[8px] pl-[8px] pr-[8px]">
          <TaskHeader task={task} />
          <div
            {...listeners}
            className="flex w-[23px] cursor-grab items-center self-start rounded p-1 hover:bg-gray-200"
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
          {/* <DemoCardList /> */}
          {/* {[1, 2, 4, 5, 6].map((x) => (
            <DemoCard key={x} />
          ))} */}
        </div>
        <div className="rounded-md bg-white px-[8px]">
          <AddCard task={task} />
        </div>
      </div>
    </li>
  );
}

function DemoCardList() {
  return (
    <>
      <div className="flex flex-col gap-2">
        {[1, 2, 4, 5, 6].map((x) => (
          <DemoCard key={x} />
        ))}
      </div>
    </>
  );
}

function DemoCard() {
  return (
    <div className="h-auto rounded-md border border-slate-100 bg-white px-2 py-2 text-sm shadow-md hover:border-blue-500">
      {/* image */}
      <div className="h-[100px] animate-pulse rounded-md bg-gray-200 p-2"></div>
      {/* title */}
      <div className="py-1.5">
        <h3 className="text-[14px]">Beamlak Samson </h3>
      </div>
      {/* label */}
      <div className="flex flex-wrap items-center gap-2 py-1.5">
        <span className="grid h-[14px] place-content-center rounded-md border border-slate-400 px-2 py-0 text-[10px]">
          Bug
        </span>
        <span className="grid h-[14px] place-content-center rounded-md border border-slate-400 px-2 py-0 text-[10px]">
          Coding
        </span>
      </div>

      {/* comments */}
      <div className="flex justify-end gap-2 py-2">
        <div className="flex items-center gap-1 text-slate-500">
          <MessageSquareText className="size-4" />
          <span className="block text-xs font-medium">2</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <Paperclip className="size-4" />
          <span className="block text-xs font-medium">3</span>
        </div>
      </div>
    </div>
  );
}
