"use client";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCardComments from "./task-card-comments";
import TaskCardAttachments from "./task-card-attachments";
import TaskCardDescription from "./task-card-description";
import TaskCardMeta from "./task-card-meta";
import TaskCardCoverImage from "./task-card-coverImage";
import TaskCardActions from "./task-card-actions";
import { TBoardTaskCard } from "@/types";
import { useGetBoardTaskCardById } from "@/utils/hooks/useBoards";
import { useEffect, useState } from "react";
import { useCardStore } from "@/lib/store/useCardStore";
import { Loader, LoaderCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useBoardStore } from "@/lib/store/useBoardStore";
import TaskCardDeleteAction from "./task-card-actions/card-delete-action";

export default function TaskCardDetail({ cardId }: { cardId: string }) {
  const { userId } = useAuth();
  const { board } = useBoardStore();
  const isAdmin = userId === board?.admin?.id;
  const isMember = board?.boardMember?.some((m) => m.id === userId);

  const notVisitor = isAdmin || isMember;
  const isVisitor = !notVisitor;

  const {
    isLoading: isLoadingData,
    data: response,
    isFetching,
    isError,
    error,
  } = useGetBoardTaskCardById(cardId);

  const [isLoading, setIsLoading] = useState(true);
  const { card, setCard } = useCardStore();

  useEffect(() => {
    if (response?.success) {
      setCard(response.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [response]);
  if (isLoadingData || isLoading) return <TaskCardDetailLoading />;
  if (response?.success) {
    return (
      <div>
        <DialogTitle className="invisible absolute size-0 p-0"></DialogTitle>
        <div className="h-full">
          <div className="h-[150px] w-full overflow-hidden">
            <TaskCardCoverImage />
          </div>
          <div className="mt-4 flex h-full max-h-[calc(100vh-200px)] gap-2">
            <ScrollArea className="flex flex-1 pr-5">
              <TaskCardMeta isVisitor={isVisitor} />
              <TaskCardDescription isVisitor={isVisitor} />
              <TaskCardAttachments isVisitor={isVisitor} />
              <TaskCardComments isVisitor={isVisitor} />
            </ScrollArea>
            <div className="flex w-[200px] flex-col justify-between">
              <TaskCardActions isVisitor={isVisitor} />
              <TaskCardDeleteAction isVisitor={isVisitor} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!response?.success) {
    return (
      <div className="grid size-full">
        <DialogTitle className="invisible absolute size-0 p-0"></DialogTitle>
        <p className="mt-20">Something went wrong please retry again.</p>
        {JSON.stringify(response?.data)}
      </div>
    );
  }
}

function TaskCardDetailLoading() {
  return (
    <>
      <div className="grid size-full place-content-center">
        <DialogTitle className="invisible absolute size-0 p-0"></DialogTitle>
        <LoaderCircle className="size-10 animate-spin text-blue-500" />
      </div>
    </>
  );
}
