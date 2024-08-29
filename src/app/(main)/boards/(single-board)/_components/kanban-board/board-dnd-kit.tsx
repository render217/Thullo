"use client";

import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";

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
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { TBoardDetail, TBoardTask, TBoardTaskCard } from "@/types/t";

import AddTaskItem from "./add-task-item";
import SortableCardOverlay from "./sortable-card/sortable-card-overlay";
import SortableTaskItemOverlay from "./sortable-task-item/sortable-task-item-overlay";
import SortableTaskItem from "./sortable-task-item";
import { useBoardStore } from "@/lib/store/useBoardStore";

export default function BoardDndKit() {
  const { board } = useBoardStore();

  const [tasks, setTasks] = useState(board.tasks);

  const [activeTask, setActiveTask] = useState<TBoardTask | null>(null);
  const [activeCard, setActiveCard] = useState<TBoardTaskCard | null>(null);

  // when ever the board is updated update the tasks
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
                {tasks
                  // .slice()
                  // .sort((a, b) => a.order - b.order)
                  .map((task) => (
                    <SortableTaskItem
                      key={task.taskId}
                      task={task}
                      allowGrab={tasks.length > 1}
                    />
                  ))}
                <AddTaskItem />
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
                      <AddTaskItem />
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
