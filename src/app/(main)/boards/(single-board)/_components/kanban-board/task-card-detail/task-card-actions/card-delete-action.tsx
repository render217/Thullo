"use client";

import { useCardStore } from "@/lib/store/useCardStore";
import { cn } from "@/lib/utils";
import { useDeleteBoardTaskCard } from "@/utils/hooks/useBoards";
import { LoaderCircle } from "lucide-react";

export default function TaskCardDeleteAction({
  isVisitor,
}: {
  isVisitor: boolean;
}) {
  if (isVisitor) return null;

  const { card } = useCardStore();
  const { mutateAsync: deleteCardAsync, isPending } = useDeleteBoardTaskCard();
  const handleDeleteCard = async () => {
    const payload = {
      cardId: card.cardId,
    };
    const res = await deleteCardAsync(payload);
    if (res.success) {
      alert("deleted");
    }
  };
  return (
    <div className="w-full px-4">
      <div
        onClick={handleDeleteCard}
        className={cn(
          "grid w-full cursor-pointer place-content-center gap-2 rounded-md bg-red-500 p-2 text-xs text-white shadow-sm hover:bg-red-700",
          isPending && "pointer-events-none cursor-not-allowed opacity-50",
        )}
      >
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <p className="w-full text-center">Delete Card</p>
        )}
      </div>
    </div>
  );
}
