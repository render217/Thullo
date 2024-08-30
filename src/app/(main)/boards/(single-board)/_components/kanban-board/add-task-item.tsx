"use client";
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createBoardTaskSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateBoardTask } from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";
import { TBoardDetail } from "@/types";
import { useBoardStore } from "@/lib/store/useBoardStore";
import { useOnClickOutside } from "usehooks-ts";
export default function AddTaskItem() {
  const { board } = useBoardStore();
  const { userId } = useAuth();
  const isAdmin = useAuth().userId === board?.admin?.id;
  const isMember = board?.boardMember?.some((m) => m.id === userId);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createBoardTaskSchema>>({
    resolver: zodResolver(createBoardTaskSchema),
    defaultValues: {
      title: "",
    },
  });

  const taskTitleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open && taskTitleRef.current) {
      taskTitleRef.current.focus();
    }
  }, [open]);

  const dialogRef = useRef(null);
  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(dialogRef, handleClickOutside);

  const { mutateAsync: createBoardTaskAsync, isPending: isSubmitting } =
    useCreateBoardTask();

  async function onSubmit(values: z.infer<typeof createBoardTaskSchema>) {
    console.log(values);

    const payload = {
      title: values.title,
      boardId: board.boardId,
    };
    const res = await createBoardTaskAsync(payload);
    if (res.success) {
      // console.log("Task created successfully", res.data);

      setOpen(false);
      form.reset();
    } else {
      // console.log("Error creating task:", res.data);
    }
  }
  if (!isAdmin && !isMember) return null;
  return (
    <li className="block h-full shrink-0 cursor-default self-start px-[6px]">
      <div className="relative box-border flex max-h-full w-[272px] flex-col justify-between rounded-md bg-transparent pb-[8px] align-top">
        <div
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-slate-400 bg-transparent/30 py-2 text-white shadow-sm hover:bg-transparent/50"
        >
          <PlusCircle className="size-5" />
          <h2 className="m-0 cursor-pointer bg-transparent px-[6px] text-center text-[14px] font-medium">
            Add New Task
          </h2>
        </div>

        {open && (
          <div
            ref={dialogRef}
            className="pointer-events-auto mt-3 rounded-md bg-white p-3"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name={"title"}
                  render={({ field }) => {
                    const { ref, ...rest } = field;
                    return (
                      <FormItem>
                        <FormLabel className="block text-xs text-black/80">
                          Task Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            ref={taskTitleRef}
                            className="h-8 border border-gray-300 text-xs focus-visible:outline-gray-300 focus-visible:ring-0"
                            placeholder="Enter Task Name"
                            {...rest}
                          />
                        </FormControl>
                        <div className="min-h-4">
                          <FormMessage className="text-xs font-light" />
                        </div>
                      </FormItem>
                    );
                  }}
                />
                <div className="mt-2 w-full">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    size={"sm"}
                    variant={"outline"}
                    className="h-10 w-full bg-gray-300 text-xs hover:bg-gray-300/80"
                  >
                    {isSubmitting ? "Creating Task..." : "Create Task"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </li>
  );
}
