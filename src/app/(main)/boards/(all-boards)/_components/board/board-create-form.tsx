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
import { useEffect, useRef, useState, useTransition } from "react";
import BoardImageUpload from "./board-image-upload";
import BlockScreen from "@/components/shared/loaders/block-screen";
import Spinner from "@/components/shared/loaders/spinner";
import { createBoard } from "@/utils/actions/board.actions";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useCreateBoard } from "@/utils/hooks/useBoards";
import { useUploadThing } from "@/lib/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";
import { Lectern } from "lucide-react";

export default function BoardCreateForm() {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

  const { isUploading, startUpload } = useUploadThing("imageUploader");
  const { mutateAsync: createBoardAsync, isPending: isSubmitting } =
    useCreateBoard();

  const form = useForm<z.infer<typeof createBoardSchema>>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createBoardSchema>) {
    if (isUploading || isSubmitting) return;

    let uploadedImgData: ClientUploadedFileData<{
      uploadedBy: string;
    }> = {
      customId: "",
      key: "",
      name: "",
      size: 0,
      type: "",
      url: "",
      serverData: {
        uploadedBy: "",
      },
    };

    const imageFile = values.image;

    if (imageFile) {
      const uploadedImages = await startUpload([imageFile]);
      if (uploadedImages && uploadedImages.length > 0) {
        uploadedImgData = uploadedImages[0];
      }
    }

    const payload = {
      title: values.title,
      visibility: values.visibility,
      image: uploadedImgData.url ? uploadedImgData.url : "",
    };

    const res = await createBoardAsync({ userId: userId!, payload });
    if (res.success) {
      // console.log("Board created successfully", res.data);
    } else {
      // console.log("Error creating board:", res.data);
    }

    if (!isSubmitting && open) {
      setOpen(false);
      form.reset();
      setPreviewImageUrl("");
    }
  }

  return (
    <>
      {(isSubmitting || isUploading) && (
        <BlockScreen>
          <Spinner size={50} />
        </BlockScreen>
      )}
      <div className={isSubmitting || isUploading ? "pointer-events-none" : ""}>
        <Dialog
          open={open}
          onOpenChange={(open) => {
            if (isSubmitting || isUploading) return;
            setOpen(open);
            form.reset();
            setPreviewImageUrl("");
          }}
        >
          <DialogTrigger asChild>
            <Button
              disabled={isSubmitting || isUploading}
              className=""
              size={"sm"}
            >
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
                          disabled={isSubmitting || isUploading}
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
                    isUploading={isUploading || isSubmitting}
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
                          disabled={isSubmitting || isUploading}
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
                      disabled={isSubmitting || isUploading}
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
                  <Button disabled={isSubmitting || isUploading} type="submit">
                    {isSubmitting || isUploading ? "Submitting..." : "Submit"}
                  </Button>
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
    <div className="h-32 overflow-hidden rounded-md">
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
        <img
          className="mx-auto max-h-[100%] max-w-[100%]"
          src={imgUrl}
          alt="cover-image"
        />
      )}
    </div>
  );
}
