import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { ICard } from "@/types";
import { TBoardTask, TBoardTaskCard } from "@/types/t";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

export default function TaskCardDescription({
  card,
}: {
  card: TBoardTaskCard;
}) {
  const [decription, setDescription] = useState<string | null>(
    card.description || "",
  );
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setDescription(card.description);
  }, [card.description]);

  const openEditMode = () => setIsEdit(true);
  const closeEditMode = () => setIsEdit(false);

  const saveAndCloseEditMode = () => {
    setIsEdit(false);
    const payload = {
      cardId: card.cardId,
      description: decription,
    };
  };

  return (
    <div>
      <div className="flex items-center gap-3 py-2">
        <p className="text-xs font-bold">Description</p>
        {!isEdit ? (
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
        )}
      </div>
      <div className="">
        {!isEdit ? (
          <p className="min-h-[100px] text-xs">
            {decription || "No description added."}
            {/* Ideas are created and share here through a card. Here you can
            describe what you'd like to accomplish. For example you can follow
            three simple questions to create the card related to your idea: *
            Why ? (Why do you wish to do it ?) * What ? (What it is it, what are
            the goals, who is concerned) * How ? (How do you think you can do it
            ? What are the required steps ?) After creation, you can move your
            card to the todo list. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Nam ex sapiente asperiores! Et rem iusto, nihil
            officiis ipsam saepe molestiae! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Quae amet non iure ut repellendus
            sequi quas, blanditiis, ipsa delectus omnis corrupti velit maxime,
            expedita et nostrum vero sint! Veniam magnam consequuntur dicta
            asperiores modi neque itaque dolorem dolores voluptate culpa! */}
          </p>
        ) : (
          <AutosizeTextarea
            value={decription || ""}
            minHeight={200}
            onChange={(e) => setDescription(e.target.value)}
            className="m-0 min-h-[100px] resize-none rounded-sm border border-slate-300 px-[6px] py-[3px] text-[14px] text-xs font-medium outline-0 outline-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Add a more detailed description..."
          />
        )}
      </div>
    </div>
  );
}
