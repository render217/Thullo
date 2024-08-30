import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { useCardStore } from "@/lib/store/useCardStore";
import { TBoardTask, TBoardTaskCard } from "@/types";
import { useUpdateBoardTaskCard } from "@/utils/hooks/useBoards";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TaskCardDescription({
  isVisitor,
}: {
  isVisitor: boolean;
}) {
  const { card } = useCardStore();
  const [decription, setDescription] = useState<string | null>(
    card.description || "",
  );
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setDescription(card.description);
  }, [card.description]);

  const openEditMode = () => setIsEdit(true);
  const closeEditMode = () => setIsEdit(false);

  const descriptionRef = useRef<AutosizeTextAreaRef>(null);

  useEffect(() => {
    if (isEdit && descriptionRef.current) {
      const textAreaElement = descriptionRef.current.textArea;
      textAreaElement.focus();
      // Move the cursor to the end of the text
      textAreaElement.setSelectionRange(
        textAreaElement.value.length,
        textAreaElement.value.length,
      );
    }
  }, [isEdit]);

  const { mutateAsync: updateCardAsync, isPending: isUpdating } =
    useUpdateBoardTaskCard();

  const saveAndCloseEditMode = async () => {
    setIsEdit(false);
    const payload = {
      cardId: card.cardId,
      description: decription || "",
    };

    const res = await updateCardAsync(payload);
    if (res.success) {
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 py-2">
        <p className="text-xs font-bold">Description</p>

        {!isVisitor &&
          (!isEdit ? (
            <Button
              onClick={openEditMode}
              className="h-5 px-3 text-xs font-medium"
              size={"sm"}
              variant={"outline"}
            >
              Edit
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                onClick={closeEditMode}
                className="h-5 w-[50px] border-red-500 px-2 text-[10px] font-medium text-red-500 hover:bg-red-100 hover:text-red-500"
                size={"sm"}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={saveAndCloseEditMode}
                className="t h-5 w-[50px] border-blue-500 px-2 text-[10px] font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-500"
                size={"sm"}
                variant={"outline"}
              >
                Save
              </Button>
            </div>
          ))}
      </div>
      <div className="">
        {!isEdit ? (
          <p className="min-h-[102px] text-xs">
            {decription || "No description added."}
          </p>
        ) : (
          <AutosizeTextarea
            value={decription || ""}
            minHeight={100}
            ref={descriptionRef}
            onChange={(e) => setDescription(e.target.value)}
            className="m-0 min-h-[102px] resize-none rounded-sm border border-slate-300 px-[6px] py-[3px] text-[14px] text-xs font-medium outline-0 outline-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Add a more detailed description..."
          />
        )}
      </div>
    </div>
  );
}
