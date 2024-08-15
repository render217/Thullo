"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBoardSchema } from "@/lib/schemas";
import { truncateString } from "@/lib/utils";
import { Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export default function BoardImageUpload({
  previewImageUrl,
  setPreviewImageUrl,
}: {
  previewImageUrl: string;
  setPreviewImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
  const form = useFormContext<z.infer<typeof createBoardSchema>>();
  const imageRef = useRef<HTMLInputElement>(null);

  const imageName = form.watch("image")?.name;

  return (
    <div>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormControl>
              <>
                <Button
                  type="button"
                  onClick={() => {
                    imageRef.current?.click();
                  }}
                  className="w-full flex-1 bg-gray-200 hover:bg-gray-200"
                  variant={"outline"}
                >
                  <div className="flex items-center gap-1">
                    <Image
                      className=""
                      src="/icons/photo.svg"
                      height={14}
                      width={14}
                      alt="logo-mobile"
                    />
                    {imageName ? (
                      <p className="truncate text-xs">
                        {truncateString(imageName, 20)}
                      </p>
                    ) : (
                      <p className="text-xs">Upload Cover image</p>
                    )}
                  </div>
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  // {...imageRef}
                  ref={imageRef}
                  // {...field}
                  //   onChange={field.onChange}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files === null) return;
                    const file = e.target.files[0];
                    const errMsg = validateImage(file);
                    if (!errMsg) {
                      form.setValue("image", file);
                      form.clearErrors("image");
                      setPreviewImageUrl(URL.createObjectURL(file));
                    } else {
                      setPreviewImageUrl("");
                      form.resetField("image");
                      form.setError("image", {
                        message: errMsg,
                      });
                    }
                  }}
                />
              </>
            </FormControl>
            <div className="h-4 py-1">
              {imageName && (
                <div
                  onClick={() => {
                    form.resetField("image");
                    setPreviewImageUrl("");
                  }}
                  className="mx-auto flex w-fit cursor-pointer items-center gap-2 rounded-md bg-red-400 px-4 py-1 text-white hover:bg-red-500"
                >
                  <Trash2 className="size-3" />
                  <p className="text-xs">delete image</p>
                </div>
              )}
              <FormMessage className="text-xs font-light" />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

function validateImage(file: File): string {
  let errMsg = "";
  if (!file) {
    errMsg = "No file is selected";
  } else if (file.size > 5 * 1024 * 1024) {
    errMsg = "File size should be < 5MB";
  } else if (!["image/jpeg", "image/png"].includes(file.type)) {
    errMsg = "Invalid file type";
  }
  return errMsg;
}
