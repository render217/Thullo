import { ICard } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GripVertical, MessageSquareText, Paperclip } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useState } from "react";
import TaskCardDetail from "../task-card-detail";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TBoardTaskCard } from "@/types/t";
export default function TaskCard({
  card,
  listeners,
}: {
  card: TBoardTaskCard;
  listeners?: SyntheticListenerMap | undefined;
}) {
  const [openDragItem, setOpenDragItem] = useState(false);

  return (
    <Dialog>
      <div
        className="relative size-full"
        onMouseEnter={() => {
          setOpenDragItem(true);
        }}
        onMouseLeave={() => {
          setOpenDragItem(false);
        }}
      >
        {openDragItem && (
          <div className="absolute right-2 top-2">
            <div
              {...(listeners ? listeners : {})}
              className="flex cursor-grab items-center self-start rounded bg-blue-600 p-1 text-white shadow-lg"
            >
              <GripVertical className="h-4 w-4" />
            </div>
          </div>
        )}
        {card.coverImage && (
          <div className="max-h-[100px] w-full overflow-hidden rounded-lg bg-white shadow-lg">
            <DialogTrigger>
              <Image
                className="h-full w-full rounded-md object-cover"
                src={card?.coverImage}
                layout="responsive"
                width={100}
                height={100}
                alt="cardimage"
              />
            </DialogTrigger>
          </div>
        )}
        <div className="w-full py-1.5">
          <DialogTrigger className="w-full text-left">
            <h3 className="w-full text-[14px] font-semibold">{card.title}</h3>
          </DialogTrigger>
        </div>
        {card.labels.length > 0 && (
          <DialogTrigger>
            <div className="flex flex-wrap items-center gap-2 py-1.5">
              {card.labels.map((label) => (
                <span
                  key={label.labelId}
                  className="grid h-[14px] place-content-center rounded-md border border-slate-400 px-2 py-0 text-[10px]"
                >
                  {label.name}
                </span>
              ))}
            </div>
          </DialogTrigger>
        )}
        <div className="flex justify-end gap-2 py-2">
          {card.comments.length > 0 && (
            <DialogTrigger>
              <div className="flex items-center gap-1 text-slate-500">
                <MessageSquareText className="size-4" />
                <span className="block text-xs font-medium">
                  {card.comments.length}
                </span>
              </div>
            </DialogTrigger>
          )}
          {card.attachments.length > 0 && (
            <DialogTrigger>
              <div className="flex items-center gap-1 text-slate-500">
                <Paperclip className="size-4" />
                <span className="block text-xs font-medium">
                  {card.attachments.length}
                </span>
              </div>
            </DialogTrigger>
          )}
        </div>
      </div>
      <TaskCardDetail card={card} />
    </Dialog>
  );
}
