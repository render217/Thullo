"use client";

import { useBoardStore } from "@/lib/store/useBoardStore";
import { useCardStore } from "@/lib/store/useCardStore";
import { cn } from "@/lib/utils";
import { useDeleteBoardTaskCard } from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";
import { LoaderCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TaskCardDeleteAction({
  isVisitor,
}: {
  isVisitor: boolean;
}) {
  const { userId } = useAuth();
  const { card } = useCardStore();
  const { board } = useBoardStore();
  const { mutateAsync: deleteCardAsync, isPending } = useDeleteBoardTaskCard();
  const handleDeleteCard = async () => {
    const payload = {
      cardId: card.cardId,
    };
    const res = await deleteCardAsync(payload);
    if (res.success) {
      toast.success("Card Deleted");
    }
  };

  const isCardMember = card?.cardMembers?.some((m) => m.id === userId);
  const isAdmin = userId! === board?.admin?.id;

  const isAllowed = isAdmin || isCardMember;

  if (isVisitor) return null;
  if (!isAllowed) return null;

  return (
    <div className="flex justify-end">
      <div
        onClick={handleDeleteCard}
        className={cn(
          "grid w-fit cursor-pointer place-content-center gap-2 rounded-md bg-red-400 p-2 text-xs text-white shadow-sm hover:bg-red-500",
          isPending && "pointer-events-none cursor-not-allowed opacity-50",
        )}
      >
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </div>
    </div>
  );
}
