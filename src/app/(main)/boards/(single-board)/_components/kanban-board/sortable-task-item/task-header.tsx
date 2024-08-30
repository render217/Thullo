"use client";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { TBoardTask } from "@/types";
import { useEffect, useRef, useState } from "react";
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
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteBoardTask, useEditBoardTask } from "@/utils/hooks/useBoards";
import toast from "react-hot-toast";

export default function TaskHeader({
  task,
  isVisitor,
}: {
  task: TBoardTask;
  isVisitor?: boolean;
}) {
  const [taskTitle, setTaskTitle] = useState(task.title);

  const [isEditing, setIsEditing] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  const textAreaRef = useRef<AutosizeTextAreaRef | null>(null);

  const { mutateAsync: editBoardTaskAsync, isPending: isEditPending } =
    useEditBoardTask();

  const { mutateAsync: deleteBoardTaskAsync, isPending } = useDeleteBoardTask();

  const saveEditChanges = async () => {
    const payload = {
      taskId: task.taskId,
      title: taskTitle,
    };
    const res = await editBoardTaskAsync(payload);
    if (res.success) {
      // console.log("Task Updated Successfully", res.data);
    } else {
      // console.log("Task Update Failed", res.data);
    }
  };
  useEffect(() => {
    setTaskTitle(task.title);
  }, [task.title]);

  useEffect(() => {
    // console.log({ isEditing, textRef: textAreaRef?.current });
    if (isEditing && textAreaRef?.current) {
      const textAreaElement = textAreaRef.current.textArea;
      textAreaElement.focus();
      // Move the cursor to the end of the text
      textAreaElement.setSelectionRange(
        textAreaElement.value.length,
        textAreaElement.value.length,
      );
    }
  }, [isEditing]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action of the Enter key
      saveEditChanges();
      setIsEditing(false);
    }
  };
  const handleBlur = () => {
    saveEditChanges();
    setIsEditing(false); // Set rename to false when losing focus
  };

  const handleDeleteBoardTask = async () => {
    const payload = { taskId: task.taskId };
    const res = await deleteBoardTaskAsync(payload);
    if (res.success) {
      toast.success("Task Deleted Successfully");
    } else {
      toast.error("Error Deleting Task");
    }
  };

  if (isVisitor) {
    return (
      <div className="flex gap-1">
        <div className="h-fit w-[200px]">
          <h2 className="m-0 w-full break-words bg-transparent px-[6px] py-1 text-[14px] font-medium">
            {taskTitle}
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-1">
      <div className="h-fit w-[200px]">
        {!isEditing ? (
          <div
            onClick={() => {
              if (isEditPending) return;
              setOpenOption(false);
              setIsEditing(true);
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
              disabled={isEditPending}
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
      <div className="flex min-w-[23px] self-start">
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
                  setIsEditing(true);
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
                <DialogContent
                  className="max-w-[400px] gap-2"
                  aria-describedby={undefined}
                >
                  <DialogTitle className="text-center text-xl">
                    Are you sure to delete ?
                  </DialogTitle>

                  <div className="flex justify-center">
                    <div className="cursor-pointer text-xs font-semibold">
                      <div className="w-fit cursor-pointer bg-blue-200 p-2 text-xs font-semibold text-blue-500">
                        {task.title}
                      </div>
                    </div>
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
      </div>
    </div>
  );
}
