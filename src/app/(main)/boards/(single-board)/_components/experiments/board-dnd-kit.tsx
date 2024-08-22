"use client";
import { IBoard, ITask, ICard } from "@/types";
import {
  ChevronDown,
  GripVertical,
  NotebookPen,
  Plus,
  PlusCircle,
} from "lucide-react";
import { act, useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import TaskCard from "../kanban-board/task-card";
import { TBoard, TBoardDetail, TBoardTask, TBoardTaskCard } from "@/types/t";
import { useForm } from "react-hook-form";
import AddTaskItem from "./add-task-item";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDeleteBoardTask } from "@/utils/hooks/useBoards";
import { Textarea } from "@/components/ui/textarea";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";

export default function BoardDndKit({ board }: { board: TBoardDetail }) {
  const [tasks, setTasks] = useState(board.tasks);
  const [activeTask, setActiveTask] = useState<TBoardTask | null>(null);
  const [activeCard, setActiveCard] = useState<TBoardTaskCard | null>(null);
  const handleAddTaskCallback = () => {
    setTasks(board.tasks);
  };

  useEffect(() => {
    setTasks(board.tasks);
  }, [board]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const foundTask = tasks.find((task) => task.taskId === active.id);
    const foundCard = tasks
      .flatMap((task) => task.cards)
      .find((card) => card.cardId === active.id);

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
        task.cards.some((card) => card.cardId === activeData?.card?.cardId),
      );
      const overTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.cardId === overData?.card?.cardId),
      );

      if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
        const activeCardIndex = tasks[activeTaskIndex].cards.findIndex(
          (card) => card.cardId === active.id,
        );
        const overCardIndex = tasks[overTaskIndex].cards.findIndex(
          (card) => card.cardId === over.id,
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
        task.cards.some((card) => card.cardId === active.id),
      );
      const overTaskIndex = tasks.findIndex((task) => task.taskId === over.id);

      if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
        const activeCardIndex = tasks[activeTaskIndex].cards.findIndex(
          (card) => card.cardId === active.id,
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
      // console.log("1.card-to-card");
      const sourceTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.cardId === active.id),
      );
      const targetTaskIndex = tasks.findIndex((task) =>
        task.cards.some((card) => card.cardId === over.id),
      );
      //   console.log("2.source-task-index", sourceTaskIndex);
      //   console.log("2.target-task-index", targetTaskIndex);

      if (sourceTaskIndex === targetTaskIndex) {
        // console.log("3.within same task");
        const sourceCardIndex = tasks[sourceTaskIndex].cards.findIndex(
          (card) => card.cardId === active.id,
        );
        const targetCardIndex = tasks[sourceTaskIndex].cards.findIndex(
          (card) => card.cardId === over.id,
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
        // console.log("3. with in different task");
        // Moving card to a different task
        const sourceTask = tasks[sourceTaskIndex];
        const targetTask = tasks[targetTaskIndex];
        const [movedCard] = sourceTask.cards.splice(
          sourceTask.cards.findIndex((card) => card.cardId === active.id),
          1,
        );
        targetTask.cards.splice(
          targetTask.cards.findIndex((card) => card.cardId === over.id) + 1,
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
      // console.log("1. task-to-task");
      const sourceIndex = tasks.findIndex((task) => task.taskId === active.id);
      const targetIndex = tasks.findIndex((task) => task.taskId === over.id);
      if (sourceIndex !== -1 && targetIndex !== -1) {
        const updatedTasks = arrayMove(tasks, sourceIndex, targetIndex);
        setTasks(updatedTasks);
      }
    }

    setActiveTask(null);
    setActiveCard(null);
  }
  console.log({ board });
  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
      >
        <SortableContext
          items={tasks.map((t) => ({ ...t, id: t.taskId }))}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="absolute inset-0 -top-[2px] mb-[8px] flex size-full select-none gap-2 overflow-x-auto overflow-y-hidden px-[10px] pb-[8px] pt-[8px] scrollbar-width-auto scrollbar-track-transparent scrollbar-thumb-white">
            {tasks.length > 0 ? (
              <>
                {tasks.map((task) => (
                  <SortableTaskItem
                    key={task.taskId}
                    task={task}
                    allowGrab={tasks.length > 1}
                  />
                ))}
                <AddTaskItem
                  boardId={board.boardId}
                  onAddCallback={handleAddTaskCallback}
                />
              </>
            ) : (
              <>
                <div className="size-full">
                  <div className="mx-auto mt-20 min-h-[400px] w-[400px] space-y-4">
                    <div className="space-y-2">
                      <NotebookPen className="mx-auto size-32 text-white" />
                      <h1 className="text-center text-2xl text-white">
                        No Tasks Avaliable yet
                      </h1>
                    </div>
                    <div className="grid place-content-center">
                      <AddTaskItem
                        boardId={board.boardId}
                        onAddCallback={handleAddTaskCallback}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
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

function SortableTaskItem({
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
  const [rename, setRename] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [openOption, setOpenOption] = useState(false);
  const textAreaRef = useRef<AutosizeTextAreaRef | null>(null);
  useEffect(() => {
    console.log({ rename, textRef: textAreaRef?.current });
    if (rename && textAreaRef?.current) {
      const textAreaElement = textAreaRef.current.textArea;
      textAreaElement.focus();
      // Move the cursor to the end of the text
      textAreaElement.setSelectionRange(
        textAreaElement.value.length,
        textAreaElement.value.length,
      );
    }
  }, [rename]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action of the Enter key
      setRename(false);
    }
  };
  const handleBlur = () => {
    setRename(false); // Set rename to false when losing focus
  };
  const { mutateAsync: deleteBoardTaskAsync, isPending } = useDeleteBoardTask();

  const handleDeleteBoardTask = async () => {
    const payload = { taskId: task.taskId };
    const res = await deleteBoardTaskAsync(payload);
    if (res.success) {
      alert("Task Deleted Successfully");
      console.log(res.data);
    } else {
      alert("Task Deletion Failed");
      console.log(res.data);
    }
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

          <div className="relative flex grow-0 items-center justify-between gap-2 rounded-md border-b border-slate-300 bg-slate-50 py-[8px] pl-[8px] pr-[0]">
            <div className="relative min-h-[20px] flex-shrink flex-grow">
              <h2 className="m-0 cursor-pointer bg-transparent px-[6px] text-[14px] font-medium">
                {task.title}
              </h2>
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

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("block h-full shrink-0 cursor-default self-start px-[6px]")}
    >
      <div className="relative box-border flex max-h-full w-[272px] flex-col justify-between rounded-md bg-slate-50 pb-[8px] align-top">
        <div className="relative flex items-center justify-between gap-2 rounded-md border-b border-slate-300 bg-slate-50 py-[8px] pl-[8px] pr-[8px]">
          <div className="h-fit w-[200px]">
            {!rename ? (
              <div
                onClick={() => {
                  setOpenOption(false);
                  setRename(true);
                }}
                className="w-full"
              >
                <h2 className="m-0 w-full cursor-pointer break-words bg-transparent px-[6px] py-1 text-[14px] font-medium">
                  {taskTitle}
                </h2>
              </div>
            ) : (
              <div className="h-fit w-full">
                <AutosizeTextarea
                  rows={1}
                  ref={textAreaRef}
                  onChange={(e) => handleTitleChange(e)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  value={taskTitle}
                  className="m-0 resize-none rounded-sm border border-slate-300 px-[6px] py-[3px] text-[14px] font-medium outline-0 outline-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            )}
          </div>
          <div className="flex min-w-[56px] gap-1 self-start">
            <div className="self-start">
              <DropdownMenu
                open={openOption}
                onOpenChange={(val) => setOpenOption(val)}
              >
                <DropdownMenuTrigger asChild>
                  <div className="grid cursor-pointer place-content-center rounded-md p-1 hover:bg-gray-200">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="shadow-xs w-[100px] space-y-1 border p-1 shadow-slate-200">
                  <span
                    onClick={() => {
                      setOpenOption(false);
                      setRename(true);
                    }}
                    className="block cursor-pointer items-center rounded-sm p-2 text-[10px] hover:bg-slate-200"
                  >
                    Rename
                  </span>
                  <Separator />
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className="block cursor-pointer items-center rounded-sm p-2 text-[10px] text-red-500 hover:bg-slate-200">
                        Delete this list
                      </span>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] gap-2">
                      <DialogTitle className="text-center text-xl">
                        Are you sure to delete ?
                      </DialogTitle>
                      <div>
                        <DialogDescription className="flex justify-center">
                          <div className="cursor-pointer text-xs font-semibold">
                            <p className="w-fit bg-blue-200 p-2 text-blue-500">
                              {task.title}
                            </p>
                          </div>
                        </DialogDescription>
                      </div>
                      <DialogFooter>
                        <div className="mt-3 flex w-full justify-center gap-2">
                          <DialogClose asChild>
                            <Button
                              disabled={isPending}
                              className="block h-7 w-20 border border-slate-300 text-xs hover:border-slate-800"
                              size={"sm"}
                              variant={"outline"}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            disabled={isPending}
                            onClick={handleDeleteBoardTask}
                            className="block h-7 w-20 text-xs"
                            size={"sm"}
                            variant={"destructive"}
                          >
                            {isPending ? "Deleting.." : "Delete"}
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              // {...(allowGrab ? listeners : {})}
              {...listeners}
              className="flex cursor-grab items-center self-start rounded p-1 hover:bg-gray-200"
            >
              <GripVertical className="h-4 w-4" />
            </div>
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

function SortableCard({ card }: { card: TBoardTaskCard }) {
  const [isCardDragging, setIsCardDragging] = useState(false);
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
        className="max-h-[200px] min-h-[200px] rounded-md border-2 border-dashed border-blue-500 bg-blue-100 px-2 text-sm hover:border-gray-600 hover:shadow-lg"
      ></div>
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

function SortableTaskItemOverlay({ task }: { task: TBoardTask }) {
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

function SortableCardOverlay({ card }: { card: TBoardTaskCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.cardId,
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
      // {...listeners}
      className={cn(
        "h-fit w-[272px] rotate-3 cursor-grabbing rounded-md border border-slate-100 bg-white px-2 py-2 text-sm shadow-md hover:border-blue-500",
      )}
    >
      {/* <div className="size-full">
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
      </div> */}
      <TaskCard card={card} listeners={listeners} />
    </div>
  );
}
