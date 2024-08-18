import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICard } from "@/types";
import Image from "next/image";
import TaskCardComments from "./task-card-comments";
import TaskCardAttachments from "./task-card-attachments";
import TaskCardDescription from "./task-card-description";
import TaskCardMeta from "./task-card-meta";
import TaskCardCoverImage from "./task-card-coverImage";
import TaskCardActions from "./task-card-actions";

export default function TaskCardDetail({ card }: { card: ICard }) {
  return (
    <DialogContent
      aria-describedby={"card detail"}
      className="h-full max-w-2xl rounded-md pb-10"
    >
      <DialogTitle className="hidden">{card.title}</DialogTitle>
      <div className="h-full">
        <div className="h-[150px] w-full overflow-hidden">
          <TaskCardCoverImage card={card} />
        </div>
        <div className="mt-4 flex h-full max-h-[calc(100vh-200px)] gap-2">
          <ScrollArea className="flex flex-1 pr-5">
            <TaskCardMeta card={card} />
            <TaskCardDescription card={card} />
            <TaskCardAttachments card={card} />
            <TaskCardComments card={card} />
          </ScrollArea>
          <div className="w-[200px]">
            <TaskCardActions card={card} />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
