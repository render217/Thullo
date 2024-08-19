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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useActionSelector } from ".";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type ILabel = {
  tag: string;
  color: string;
};
const labelsDefaultData: ILabel[] = [
  {
    tag: "technology",
    color: "bg-red-400",
  },
  {
    tag: "design",
    color: "bg-blue-400",
  },
  {
    tag: "development",
    color: "bg-purple-400",
  },
  // {
  //   tag: "coding",
  //   color: "bg-orange-400",
  // },
  // {
  //   tag: "AI technology",
  //   color: "bg-black",
  // },
  // {
  //   tag: "bootstrap",
  //   color: "bg-lime-800",
  // },
  // {
  //   tag: "testing",
  //   color: "bg-blue-800",
  // },
];
export default function CardLabelForm() {
  const { openAction } = useActionSelector();
  const [labels, setLabels] = useState<ILabel[]>(labelsDefaultData);
  const [labelData, setLabelData] = useState({
    label: "",
    color: {
      id: "",
      color: "",
      tailwindColor: "",
    },
  });

  const { label, color: selectedColor } = labelData;
  const handleSelectColor = (color: string) => {
    const targetColor = colors.find((c) => c.id === color);
    if (!targetColor) return;
    setLabelData({ ...labelData, color: targetColor });
  };

  const addToLabels = () => {};
  const remomveFromLabels = () => {};
  const handleAddLabel = () => {};

  const colors = [
    {
      id: "red",
      color: "red",
      tailwindColor: "bg-red-400",
    },
    {
      id: "yellow",
      color: "yellow",
      tailwindColor: "bg-yellow-400",
    },
    {
      id: "purple",
      color: "purple",
      tailwindColor: "bg-purple-400",
    },
    {
      id: "green",
      color: "green",
      tailwindColor: "bg-green-400",
    },
    {
      id: "teal",
      color: "teal",
      tailwindColor: "bg-teal-400",
    },
    {
      id: "orange",
      color: "orange",
      tailwindColor: "bg-orange-400",
    },
    {
      id: "slate",
      color: "slate",
      tailwindColor: "bg-slate-700",
    },

    {
      id: "gray",
      color: "gray",
      tailwindColor: "bg-gray-400",
    },
    {
      id: "blue",
      color: "blue",
      tailwindColor: "bg-blue-600",
    },
    {
      id: "black",
      color: "black",
      tailwindColor: "bg-black",
    },
    {
      id: "sky",
      color: "sky",
      tailwindColor: "bg-sky-400",
    },
    {
      id: "rose",
      color: "rose",
      tailwindColor: "bg-rose-600",
    },
  ];
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
              placeholder="Label..."
              value={label}
              onChange={(e) =>
                setLabelData({ ...labelData, label: e.target.value })
              }
            />
          </div>
          {/* break to other component */}
          <div className="fit grid grid-cols-4 gap-1 pb-2 pt-1">
            {colors.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <div
                  onClick={() => handleSelectColor(color.id)}
                  key={color.id}
                  className={cn(
                    "h-8 w-full cursor-pointer rounded-md border-2 border-transparent hover:scale-95 hover:border-slate-900 hover:p-2",
                    isSelected && "scale-95 border-slate-900 p-2",
                  )}
                >
                  <div
                    className={cn(
                      color.tailwindColor,
                      "h-8 w-full rounded-md",
                      isSelected && "",
                    )}
                  ></div>
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
                {labelsDefaultData.map((label, idx) => {
                  return (
                    <div
                      // key={label.tag}
                      key={idx}
                      className={cn(
                        "relative grid w-fit place-content-center rounded-md border px-2",
                        label.color,
                        "text-background",
                      )}
                    >
                      <span className="block text-[10px] font-light">
                        {label.tag}
                      </span>
                      <span className="absolute -right-2 -top-1 cursor-pointer rounded-full bg-red-500 hover:scale-x-110">
                        <CircleX className="size-3" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-2">
            <Button size={"sm"} className="mx-auto block h-6 text-[10px]">
              Add Label
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
