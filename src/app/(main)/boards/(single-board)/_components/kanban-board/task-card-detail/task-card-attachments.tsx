import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ICard } from "@/types";
import { TAttachment, TBoardTaskCard } from "@/types/t";

export default function TaskCardAttachments({
  card,
}: {
  card: TBoardTaskCard;
}) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3">
        <p className="py-2 text-xs font-bold">Attachments</p>
        <Button
          className="h-5 px-3 text-xs font-medium"
          size={"sm"}
          variant={"outline"}
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {attachmentss.length === 0 && (
          <div className="">
            <p className="text-xs">No attachments avaliable</p>
          </div>
        )}
        {attachmentss.map((attachment) => {
          return (
            <div
              key={attachment.attachmentId}
              className="flex w-fit items-start gap-2 p-2"
            >
              <div className="flex flex-col items-start justify-center">
                <div className="h-14 w-14 overflow-hidden rounded-md">
                  <img
                    className="size-full object-cover"
                    src={attachment.url}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">Added July 5,2024</p>
                <p className="mb-2 mt-1 text-xs font-semibold">
                  Gastsby-config.js
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    className="h-4 w-[60px] cursor-pointer border border-gray-400 p-0 px-3 text-[10px] font-medium text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    size={"sm"}
                    variant={"outline"}
                  >
                    Download
                  </Button>
                  <Button
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
const attachmentss: TAttachment[] = [];
const attachments: TAttachment[] = [
  {
    attachmentId: "22",
    cardId: "",
    contentType: "image/png",
    createdAt: "2021-09-01T00:00:00",
    updatedAt: "2021-09-01T00:00:00",
    size: "1000",

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
    contentType: "image/png",
    createdAt: "2021-09-01T00:00:00",
    updatedAt: "2021-09-01T00:00:00",
    size: "1000",

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
