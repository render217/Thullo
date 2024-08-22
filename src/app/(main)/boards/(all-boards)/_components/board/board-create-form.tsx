"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createBoardSchema } from "@/lib/schemas";
import { useEffect, useRef, useState } from "react";
import BoardImageUpload from "./board-image-upload";
import BlockScreen from "@/components/shared/loaders/block-screen";
import Spinner from "@/components/shared/loaders/spinner";
import { createBoard } from "@/utils/actions/board.actions";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function BoardCreateForm() {
  const { userId } = useAuth();

  const [isBlocked, setIsBlocked] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

  const form = useForm<z.infer<typeof createBoardSchema>>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",

      // image: undefined,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (isBlocked) {
        setIsBlocked(false);
      }
    }, 4000);
  }, [isBlocked]);

  async function onSubmit(values: z.infer<typeof createBoardSchema>) {
    console.log(values);
    setIsBlocked(true);
    const payload = {
      title: values.title,
      visibility: values.visibility,
      image: "",
    };

    const res = await createBoard(userId!, payload);
    if (res.success) {
      console.log("Board created successfully", res.data);
    } else {
      console.log("Error creating board:", res.data);
    }
  }

  return (
    <>
      {isBlocked && (
        <BlockScreen>
          <Spinner size={50} />
        </BlockScreen>
      )}
      <div className={isBlocked ? "pointer-events-none" : ""}>
        <Dialog
          onOpenChange={(open) => {
            form.reset();
            setPreviewImageUrl("");
          }}
        >
          <DialogTrigger asChild>
            <Button className="" size={"sm"}>
              + create
            </Button>
          </DialogTrigger>

          <DialogContent
            aria-describedby="modal-description"
            className="rounded-md sm:max-w-[425px]"
          >
            <DialogHeader>
              <DialogTitle>Create New Board</DialogTitle>
            </DialogHeader>
            <div className="rounded-md border border-dotted border-gray-500 p-2">
              <PreviewImage imgUrl={previewImageUrl} />
            </div>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="border border-gray-400"
                          placeholder="Enter Board Name"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-4">
                        <FormMessage className="text-xs font-light" />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="mt-4 grid grid-cols-2 items-center gap-2">
                  <BoardImageUpload
                    previewImageUrl={previewImageUrl}
                    setPreviewImageUrl={setPreviewImageUrl}
                  />
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="bg-gray-200 hover:bg-gray-200">
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-1 text-xs">
                                <Image
                                  src="/icons/global-alt.svg"
                                  height={14}
                                  width={14}
                                  alt="public"
                                />
                                <p>Public</p>
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-1 text-xs">
                                <Image
                                  src="/icons/lock-closed.svg"
                                  height={14}
                                  width={14}
                                  alt="private"
                                />
                                <p>Private</p>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="h-4 py-1">
                          <FormMessage className="text-xs font-light" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        form.reset();
                        setPreviewImageUrl("");
                      }}
                      type="button"
                      variant={"secondary"}
                    >
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

function PreviewImage({ imgUrl = "" }: { imgUrl: string }) {
  return (
    <div className="max-h-32 overflow-hidden rounded-md">
      {!imgUrl && (
        <Image
          className="mx-auto"
          src={`/images/defaultImage.avif`}
          height={100}
          width={100}
          alt="cover-image"
        />
      )}
      {imgUrl && (
        <Image
          className="w-full"
          src={imgUrl}
          height={400}
          width={400}
          alt="cover-image"
        />
      )}
    </div>
  );
}
