"use client";

import { TBoardTask } from "@/types/t";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { createBoardTaskCardSchema } from "@/lib/schemas";
import { useCreateCard } from "@/utils/hooks/useBoards";

export default function AddCard({ task }: { task: TBoardTask }) {
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<z.infer<typeof createBoardTaskCardSchema>>({
    resolver: zodResolver(createBoardTaskCardSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutateAsync: createCardAsync, isPending: isSubmitting } =
    useCreateCard();

  async function onSubmit(values: z.infer<typeof createBoardTaskCardSchema>) {
    console.log(values);

    const payload = {
      title: values.title,
      taskId: task.taskId,
    };
    const res = await createCardAsync(payload);
    if (res.success) {
      console.log("Task card created successfully", res.data);
      form.reset();
      setIsAdding(false);
    } else {
      console.log("Error creating task:", res.data);
    }
  }
  return (
    <>
      {isAdding ? (
        <div className="flex min-h-[100px] flex-col justify-between">
          <div className="pointer-events-auto mt-3 rounded-md border bg-slate-200 p-3 shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name={"title"}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel className="block text-xs text-black/80">
                        Card Name
                      </FormLabel> */}
                      <FormControl>
                        <Input
                          className="h-8 border border-gray-300 text-xs focus-visible:outline-gray-300 focus-visible:ring-0"
                          placeholder="Enter Card Name"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-4">
                        <FormMessage className="text-[10px] font-light" />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    onClick={() => setIsAdding(false)}
                    type="button"
                    size={"sm"}
                    variant={"destructive"}
                    className="h-7 w-full text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    size={"sm"}
                    className="h-7 w-full text-xs"
                  >
                    {isSubmitting ? "Adding..." : "Add Card"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex w-full items-center gap-2 rounded-md border border-dashed border-slate-200 bg-slate-200 px-2 py-[8px] hover:border-solid hover:border-slate-200 hover:bg-slate-300"
        >
          <Plus className="size-4" />
          <span className="block text-sm">Add Card</span>
        </button>
      )}
    </>
  );
}
