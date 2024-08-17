"use client";
import { cn } from "@/lib/utils";
import { IBoard, ITask } from "@/types";
import { useGetBoardById } from "@/utils/hooks/useBoards";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { forwardRef, useState } from "react";
export default function ExperimentsDndKit({ board }: { board: IBoard }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [tasks, setTasks] = useState(board.taskLists);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (active.id === activeId) return;

    setActiveId(active.id as string);
    setActiveTask(tasks.find((task) => task.id === active.id) as ITask);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
    setActiveTask(null);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
          <div className="flex size-full w-full gap-4">
            {tasks.map((task) => (
              <SortableItem key={task.id} id={task.id}>
                <Task task={task} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId && activeTask ? <TaskOverlay task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

function SortableItem({
  id,
  children,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      className="min-w-[300px] rounded-md border-2 border-slate-400 bg-slate-200 p-3"
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </Item>
  );
}

function Task({ task }: { task: ITask }) {
  return (
    <div>
      <div className="flex">
        <h3 className="flex-1 text-sm font-semibold">{task.title}</h3>
      </div>
      <div></div>
    </div>
  );
}

const Item = forwardRef<
  HTMLDivElement,
  {
    id?: string;
    children: React.ReactNode;
    style: React.CSSProperties;
    className: string;
  }
>(({ id, children, className, style, ...props }, ref) => {
  return (
    <div {...props} className={className} style={style} ref={ref}>
      {children}
    </div>
  );
});

function TaskOverlay({ task }: { task: ITask }) {
  return (
    <div className="size-full min-w-[300px] rotate-6 rounded-md border-2 border-slate-400 bg-slate-200 p-3">
      <div className="flex">
        <h3 className="flex-1 text-sm font-semibold">{task.title}</h3>
      </div>
      <div></div>
    </div>
  );
}
