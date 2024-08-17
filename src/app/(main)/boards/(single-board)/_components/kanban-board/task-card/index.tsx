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
import { MessageSquareText, Paperclip } from "lucide-react";

export default function TaskCard({ card }: { card: ICard }) {
  return (
    <div className="size-full">
      <div className="max-h-[100px] w-full overflow-hidden rounded-lg bg-white shadow-lg">
        <Image
          className="h-full w-full rounded-md object-cover"
          src={card?.coverPhoto}
          layout="responsive"
          width={100}
          height={100}
          alt="cardimage"
        />
      </div>
      <div className="py-1.5">
        <h3 className="text-[14px] font-semibold">{card.title}</h3>
      </div>
      <div className="flex flex-wrap items-center gap-2 py-1.5">
        {card.labels.map((label) => (
          <span
            key={label.id}
            className="grid h-[14px] place-content-center rounded-md border border-slate-400 px-2 py-0 text-[10px]"
          >
            {label.tag}
          </span>
        ))}
      </div>
      <div className="flex justify-end gap-2 py-2">
        {card.comments.length > 0 && (
          <div className="flex items-center gap-1 text-slate-500">
            <MessageSquareText className="size-4" />
            <span className="block text-xs font-medium">
              {card.comments.length}
            </span>
          </div>
        )}
        {card.attachments.length > 0 && (
          <div className="flex items-center gap-1 text-slate-500">
            <Paperclip className="size-4" />
            <span className="block text-xs font-medium">
              {card.attachments.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
