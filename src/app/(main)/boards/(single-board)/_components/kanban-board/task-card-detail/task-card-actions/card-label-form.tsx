import { Bookmark, CircleX, Cross, Search, Tag, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useActionSelector } from ".";
import { cn, getTailwindColor } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LABEL_COLORS_OPTION } from "@/lib/constants";
import { TBoardTaskCard, TLabel } from "@/types";
import { useCreateLabel, useDeleteLabel } from "@/utils/hooks/useBoards";
import { useCardStore } from "@/lib/store/useCardStore";

type labelFormData = {
  name: string;
  color: string;
};

const labelsDefaultData: TLabel[] = [
  {
    name: "technology",
    color: "red",
    cardId: "cd",
    labelId: "1",
    boardId: "",
  },
  {
    name: "design",
    color: "blue",
    cardId: "cd",
    labelId: "2",
    boardId: "",
  },
  {
    name: "development",
    color: "purple",
    cardId: "cd",
    labelId: "3",
    boardId: "",
  },
];

export default function CardLabelForm() {
  const { card } = useCardStore();
  const { openAction } = useActionSelector();
  const [labels, setLabels] = useState<TLabel[]>([]);
  const [labelNameError, setLabelNameError] = useState(false);
  const [labelData, setLabelData] = useState<labelFormData>({
    name: "",
    color: "",
  });

  useEffect(() => {
    setLabels(card.labels);
  }, [card]);

  useEffect(() => {
    if (labelData.name.length > 15) {
      setLabelNameError(true);
    } else {
      setLabelNameError(false);
    }
  }, [labelData.name]);

  const handleSelectColor = (color: string) => {
    if (color === "none") {
      setLabelData({ ...labelData, color: "none" });
      return;
    }
    setLabelData({ ...labelData, color });
  };

  const isBtnDisabled =
    labelData.name === "" || labelData.color === "" || labelNameError;

  const { mutateAsync: createLabelAsync, isPending: isCreatingLabel } =
    useCreateLabel();

  const { mutateAsync: deleteLabelAsync, isPending: isDeletingLabel } =
    useDeleteLabel();

  const handleAddLabel = async () => {
    if (isBtnDisabled || isCreatingLabel) return;
    const payload = {
      cardId: card.cardId,
      name: labelData.name,
      color: labelData.color,
    };
    const res = await createLabelAsync(payload);
    if (res.success) {
      setLabelData({ name: "", color: "" });
    }
  };

  const handleDeleteLabel = async (labelId: string) => {
    if (isDeletingLabel) return;
    const payload = {
      labelId,
    };
    const res = await deleteLabelAsync(payload);
    if (res.success) {
    }
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isBtnDisabled) {
      handleAddLabel();
    }
  };

  return (
    <div>
      <DropdownMenu
        onOpenChange={(val) => {
          if (val) openAction("selectLabel");
        }}
      >
        <DropdownMenuTrigger asChild className="w-full">
          <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300">
            <Tag className="size-4" />
            <p>Label</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px] p-3">
          <div>
            <h3 className="text-sm font-semibold">Label</h3>
            <p className="text-[10px]">Select a name and a color</p>
          </div>
          <div className="relative py-2">
            <Input
              className="h-6 py-0.5 pr-[28px] text-[10px] shadow-sm focus-visible:ring-0"
              placeholder="Enter label name"
              value={labelData.name}
              onKeyDown={handleKeyPressed}
              onChange={(e) =>
                setLabelData({ ...labelData, name: e.target.value })
              }
            />
            {labelNameError && (
              <p className="py-1 pl-1 text-[10px] font-light text-red-500">
                name should be less than 15 character
              </p>
            )}
          </div>
          {/* break to other component */}
          <div className="fit grid grid-cols-4 gap-1 pb-2 pt-1">
            {LABEL_COLORS_OPTION.map((color) => {
              const isSelected = labelData.color === color.color;
              const isNone = color.color === "none";
              return (
                <div
                  onClick={() => handleSelectColor(color.color)}
                  key={color.name}
                  className={cn(
                    "relative h-8 w-full cursor-pointer rounded-md border-2 border-transparent hover:z-10 hover:scale-95 hover:border-slate-900 hover:p-2",
                    isSelected && "z-10 scale-95 border-slate-900 p-2",
                    isNone && "scale-100 p-0 hover:scale-100 hover:p-0",
                  )}
                >
                  {isNone && (
                    <p className="top-0 grid h-8 w-full place-content-center text-[8px]">
                      none
                    </p>
                  )}
                  {!isNone && (
                    <div
                      className={cn(
                        color.tailwindColor,
                        "h-8 w-full rounded-md",
                        isSelected && "",
                      )}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="">
            <div className="flex items-center gap-2 text-gray-500">
              <Bookmark className="size-3" />
              <p className="text-[10px]">Available</p>
            </div>
            <ScrollArea className="h-[80px] rounded-md border p-1">
              <div className="flex flex-wrap gap-3 py-2">
                {labels?.length === 0 && (
                  <p className="mx-auto text-[10px]">No Avaliable Labels</p>
                )}
                {labels?.length > 0 &&
                  labels.map((label, idx) => {
                    const twColor = getTailwindColor(label.color);
                    const isNone = label.color === "none";
                    return (
                      <div
                        // key={label.tag}
                        key={idx}
                        className={cn(
                          "relative grid w-fit place-content-center rounded-md border px-2",
                          twColor,
                          "text-background",
                          isNone && "text-black",
                        )}
                      >
                        <span className="block text-[10px] font-light">
                          {label.name}
                        </span>
                        <span
                          onClick={() => handleDeleteLabel(label.labelId)}
                          className="absolute -right-2 -top-1 cursor-pointer rounded-full bg-red-500 text-white hover:scale-x-110"
                        >
                          <CircleX className="size-3" />
                        </span>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-2">
            <Button
              disabled={isBtnDisabled || isCreatingLabel}
              onClick={handleAddLabel}
              size={"sm"}
              className={cn(
                "mx-auto block h-6 text-[10px]",
                isBtnDisabled && "cursor-not-allowed",
              )}
            >
              Add Label
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
