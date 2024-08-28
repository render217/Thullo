"use client";
import { ICard } from "@/types";
import { ImageIcon, Tag, Users } from "lucide-react";
import CardCoverImageForm from "./card-cover-image-form";
import CardLabelForm from "./card-label-form";
import CardMembersForm from "./card-members-form";
import { useGetUnsplashImage } from "@/utils/hooks/useUnsplash";
import React, { useReducer, useState } from "react";
import { TBoardTaskCard } from "@/types/t";

const intialData = {
  labelSelected: false,
  memberSelected: false,
  coverSelected: false,
  showMember: false,
};
type IActionType = "selectLabel" | "selectCover" | "showMember";
type ISelectorContext = {
  labelSelected: boolean;
  memberSelected: boolean;
  coverSelected: boolean;
  showMember: boolean;
  openAction: (type: IActionType) => void;
};

const SelecterContext = React.createContext<ISelectorContext | null>(null);

function SelectorProvider({ children }: { children: React.ReactNode }) {
  const [actionSelector, setActionSelector] = useState(intialData);

  const openAction = (type: IActionType) => {
    switch (type) {
      case "selectLabel":
        setActionSelector({
          coverSelected: false,
          labelSelected: true,
          memberSelected: false,
          showMember: false,
        });
        break;

      case "selectCover":
        setActionSelector({
          coverSelected: true,
          labelSelected: false,
          memberSelected: false,
          showMember: false,
        });
        break;
      case "showMember":
        setActionSelector({
          coverSelected: false,
          labelSelected: false,
          memberSelected: true,
          showMember: true,
        });
        break;
      default:
        setActionSelector({
          coverSelected: false,
          labelSelected: false,
          memberSelected: false,
          showMember: false,
        });
    }
  };

  const value = { ...actionSelector, openAction };

  return (
    <SelecterContext.Provider value={value}>
      {children}
    </SelecterContext.Provider>
  );
}

export const useActionSelector = () => {
  const context = React.useContext(SelecterContext);
  if (!context) {
    throw new Error("useActionSelector must be used within a SelectorProvider");
  }
  return context;
};

export default function TaskCardActions({ card }: { card: TBoardTaskCard }) {
  const _ = useGetUnsplashImage("random");

  return (
    <div>
      <div className="px-4 text-[10px] font-medium text-gray-500">
        <p>Actions</p>
      </div>
      <SelectorProvider>
        <div className="mt-2 flex flex-col gap-3 px-4">
          <CardCoverImageForm card={card} />
          <CardLabelForm card={card} />
          <CardMembersForm card={card} />
        </div>
      </SelectorProvider>
    </div>
  );
}
