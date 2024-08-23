import { Input } from "@/components/ui/input";
import { TBoardDetail } from "@/types/t";
import { useUpdateBoard } from "@/utils/hooks/useBoards";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { use, useEffect, useState } from "react";

export default function BoardTitle({ board }: { board: TBoardDetail }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.boardName);

  const { mutateAsync: updateBoardTitle, isPending } = useUpdateBoard();

  useEffect(() => {
    setTitle(board.boardName);
  }, [board]);

  const saveChanges = async () => {
    const payload = {
      boardId: board.boardId,
      boardName: title,
    };

    const res = await updateBoardTitle(payload);
    if (res.success) {
      console.log("Board title updated successfully", res.data);
    } else {
      console.log("Error updating board title:", res.data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveChanges();
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    saveChanges();
    setIsEditing(false);
  };

  return (
    <>
      {/* make the ui clear */}
      <div className="">
        {!isEditing ? (
          <h1
            onClick={() => setIsEditing(true)}
            className="cursor-pointer pb-1 text-lg font-semibold"
          >
            {title}
          </h1>
        ) : (
          <Input
            disabled={isPending}
            value={title}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
          />
        )}
        <Separator className="" />
      </div>
    </>
  );
}
