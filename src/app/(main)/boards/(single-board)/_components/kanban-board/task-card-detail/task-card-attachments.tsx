"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ICard } from "@/types";
import { TAttachment, TBoardTaskCard } from "@/types/t";
import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import {
  useCreateAttachments,
  useDeleteAttachment,
} from "@/utils/hooks/useBoards";
import { useCardStore } from "@/lib/store/useCardStore";
export default function TaskCardAttachments({
  isVisitor,
}: {
  isVisitor: boolean;
}) {
  const { card } = useCardStore();
  const { userId } = useAuth();
  if (!userId) return null;

  const [attachments, setAttachments] = useState(card.attachments);

  const { isUploading, startUpload, routeConfig } =
    useUploadThing("assetUploader");
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string | null>(null);
  const assetFileRef = useRef<HTMLInputElement>(null);

  const {
    mutateAsync: createAttachmentAsync,
    isPending: isCreatingAttachment,
  } = useCreateAttachments();
  const {
    mutateAsync: deleteAttachmentAsync,
    isPending: isDeletingAttachment,
  } = useDeleteAttachment();

  useEffect(() => {
    setAttachments(card.attachments);
  }, [card.attachments]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        setFile(selectedFile);
      }
    },
    [setFile],
  );

  const handleCancelUpload = () => {
    if (isUploading) return;
    setFile(undefined);
  };
  const handleAddAsset = () => {
    assetFileRef.current?.click();
  };

  const handleUploadFile = async () => {
    if (!file || isUploading || isCreatingAttachment || isDeletingAttachment)
      return;
    const uploadedFile = await startUpload([file]);
    if (!uploadedFile) return;

    const uploadedAsset = uploadedFile[0];

    const payload = {
      authorId: userId,
      cardId: card.cardId,
      contentType: uploadedAsset.type,
      size: uploadedAsset.size,
      url: uploadedAsset.url,
      name: uploadedAsset.name,
    };

    const res = await createAttachmentAsync(payload);
    if (res.success) {
      setFile(undefined);
    }
  };

  const handleDownloadAttachment = (assetUrl: string, assetName: string) => {
    // download attachment and save with the name
    fetch(assetUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = assetName || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    if (isDeletingAttachment) return;
    const payload = {
      attachmentId,
    };

    const res = await deleteAttachmentAsync(payload);
    if (res.success) {
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-3">
        <p className="py-2 text-xs font-bold">Attachments</p>
        <input
          ref={assetFileRef}
          onChange={handleFileChange}
          id="assetFile"
          type="file"
          className="hidden"
        />
        {!isVisitor && !file && (
          <Button
            onClick={handleAddAsset}
            className="h-5 px-3 text-xs font-medium"
            size={"sm"}
            variant={"outline"}
          >
            Add
          </Button>
        )}
      </div>
      {file && (
        <>
          <div className="mb-2 flex items-center gap-5">
            <div className="w-fit border px-2 py-2 shadow-md">
              <p className="text-[10px]">file name : {file?.name}</p>
            </div>
            <div className="flex gap-2 py-2">
              <p
                onClick={handleUploadFile}
                className={cn(
                  "cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline",
                  isUploading && "cursor-not-allowed hover:no-underline",
                )}
              >
                Upload
              </p>
              <p
                onClick={handleCancelUpload}
                className={cn(
                  "cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline",
                  isUploading && "cursor-not-allowed hover:no-underline",
                )}
              >
                Cancel
              </p>
            </div>
          </div>
          {isUploading && (
            <p className="py-1 text-[10px] text-black">uploading....</p>
          )}
        </>
      )}
      <div className="flex flex-col gap-1">
        {!file && attachments.length === 0 && (
          <div className="">
            <p className="text-xs">No attachments avaliable</p>
          </div>
        )}
        {attachments.map((attachment) => {
          const isImage = attachment.contentType.includes("image");
          const firstLetter = attachment.name[0].toUpperCase();
          return (
            <div
              key={attachment.attachmentId}
              className="flex w-fit items-start gap-2 p-2"
            >
              <div className="flex flex-col items-start justify-center">
                <div className="h-14 w-14 overflow-hidden rounded-md">
                  {isImage ? (
                    <img
                      className="size-full object-cover"
                      src={attachment.url}
                      alt=""
                    />
                  ) : (
                    <p className="grid size-full place-content-center bg-gray-200">
                      {firstLetter}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">
                  Added on {formatDate(attachment.createdAt)}
                </p>
                <p className="mb-2 mt-1 text-xs font-semibold">
                  {attachment.name}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      handleDownloadAttachment(attachment.url, attachment.name)
                    }
                    className="h-4 w-[60px] cursor-pointer border border-gray-400 p-0 px-3 text-[10px] font-medium text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    size={"sm"}
                    variant={"outline"}
                  >
                    Download
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteAttachment(attachment.attachmentId)
                    }
                    className="h-4 w-[60px] cursor-pointer border border-gray-400 p-0 text-[10px] font-medium text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    size={"sm"}
                    variant={"outline"}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const attachments: TAttachment[] = [
  {
    attachmentId: "22",
    cardId: "",
    name: "",
    contentType: "image/png",
    createdAt: "2021-09-01T00:00:00",
    updatedAt: "2021-09-01T00:00:00",
    size: 1000,
    boardId: "d",
    url: "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
    author: {
      id: "",
      profileImage: "",
      email: "",
      username: "",
      createdAt: "2021-09-01T00:00:00",
    },
  },
  {
    attachmentId: "23",
    cardId: "",
    name: "",
    contentType: "image/png",
    createdAt: "2021-09-01T00:00:00",
    updatedAt: "2021-09-01T00:00:00",
    size: 1000,
    boardId: "d",
    url: "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
    author: {
      id: "",
      profileImage: "",
      email: "",
      username: "",
      createdAt: "2021-09-01T00:00:00",
    },
  },
];
