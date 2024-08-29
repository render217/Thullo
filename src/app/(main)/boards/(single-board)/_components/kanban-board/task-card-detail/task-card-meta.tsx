import { Input } from "@/components/ui/input";
import { useCardStore } from "@/lib/store/useCardStore";
import { ICard } from "@/types";
import { TBoardTaskCard } from "@/types/t";
import { useUpdateBoardTaskCard } from "@/utils/hooks/useBoards";

import { useEffect, useRef, useState } from "react";

export default function TaskCardMeta({ isVisitor }: { isVisitor: boolean }) {
  const { card } = useCardStore();
  const [title, setTitle] = useState(card.title);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setTitle(card.title);
  }, [card.title]);

  const { mutateAsync: updateCardAsync, isPending: isUpdating } =
    useUpdateBoardTaskCard();

  const saveChanges = async () => {
    const payload = {
      cardId: card.cardId,
      title: title,
    };

    const res = await updateCardAsync(payload);
    if (res.success) {
      // console.log("Card title updated successfully", res.data);
    }
  };

  useEffect(() => {
    if (isTitleEditing && titleRef?.current) {
      const titleInputElement = titleRef.current;
      titleInputElement.focus();
      // Move the cursor to the end of the text
      titleInputElement.setSelectionRange(
        titleInputElement.value.length,
        titleInputElement.value.length,
      );
    }
  }, [isTitleEditing]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveChanges();
      setIsTitleEditing(false);
    }
  };

  const handleBlur = () => {
    saveChanges();
    setIsTitleEditing(false);
  };

  if (isVisitor) {
    return (
      <div className="mb-1">
        <div className="align-middle">
          <h1 className="flex min-h-7 max-w-[400px] items-center overflow-hidden py-0 pl-0.5 text-sm font-semibold">
            {title}
          </h1>
        </div>
        <p className="mt-1 text-xs">
          In list <span className="font-bold">{card.task.title}</span>
        </p>
      </div>
    );
  }
  return (
    <div className="mb-1">
      {/* <h3 className="mb-1">✋🏿 Move anything that is actually started here</h3>
      <p className="text-xs">
        in list{"  "}
        <span className="font-bold">In Progress</span>
      </p> */}
      {/* <h3 className="mb-1">{card.title}</h3> */}
      <div className="align-middle">
        {!isTitleEditing ? (
          <h1
            onClick={() => setIsTitleEditing(true)}
            className="flex min-h-7 max-w-[400px] cursor-pointer items-center overflow-hidden py-0 pl-0.5 text-sm font-semibold"
          >
            {title}
          </h1>
        ) : (
          <Input
            ref={titleRef}
            value={title}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onChange={(e) => setTitle(e.target.value)}
            className="h-7 max-w-[400px] rounded-none p-0 pl-1 text-sm font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        )}
      </div>
      <p className="mt-1 text-xs">
        In list <span className="font-bold">{card.task.title}</span>
      </p>
    </div>
  );
}
