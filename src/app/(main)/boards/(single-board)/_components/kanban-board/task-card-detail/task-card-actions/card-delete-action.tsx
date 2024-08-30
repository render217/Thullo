"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { useBoardStore } from "@/lib/store/useBoardStore";
import { useCardStore } from "@/lib/store/useCardStore";
import { cn } from "@/lib/utils";
import { useDeleteBoardTaskCard } from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskCardDeleteAction({
  isVisitor,
}: {
  isVisitor: boolean;
}) {
  const { userId } = useAuth();
  const { card } = useCardStore();
  const { board } = useBoardStore();
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync: deleteCardAsync, isPending: isDeletingCard } =
    useDeleteBoardTaskCard();
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
      <Dialog
        open={openDialog}
        onOpenChange={(val) => {
          if (isDeletingCard) return;
          setOpenDialog(val);
        }}
      >
        <DialogTrigger asChild>
          <Button
            disabled={isDeletingCard}
            className={cn(
              "ml-auto h-6 w-20 border border-red-500 py-2 text-[10px] text-red-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white disabled:pointer-events-auto disabled:cursor-not-allowed",
              isDeletingCard &&
                "cursor-not-allowed bg-red-500 text-white opacity-40",
            )}
            variant={"outline"}
            size={"sm"}
          >
            {isDeletingCard ? (
              <LoaderCircle className="mx-auto size-4 animate-spin" />
            ) : (
              <p className="text-[10px]">Delete Card</p>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          className={cn("max-w-[400px] gap-2")}
        >
          <DialogTitle className="">
            Are you sure you want to delete ?
          </DialogTitle>
          <div>
            <DialogDescription className="space-y-1">
              <p className="text-xs">
                This will permanently delete{" "}
                <span className="mr-2 cursor-pointer font-semibold underline">
                  {card.title}
                </span>
                {""}
                and all it's content.
              </p>
              <p className="text-xs">This action cannot be undone.</p>
            </DialogDescription>
          </div>

          <DialogFooter>
            <div className="mt-3 flex w-full justify-end gap-2">
              <DialogClose asChild>
                <Button
                  disabled={isDeletingCard}
                  className={
                    "block h-7 w-20 border border-slate-300 text-xs hover:border-slate-800"
                  }
                  size={"sm"}
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isDeletingCard}
                onClick={handleDeleteCard}
                className="block h-7 w-20 text-xs"
                size={"sm"}
              >
                {isDeletingCard ? (
                  <LoaderCircle className="mx-auto size-4 animate-spin" />
                ) : (
                  <p>Proceed</p>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
