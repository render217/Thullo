import { TBoardTaskCard } from "@/types";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
type CardType = {
  card: TBoardTaskCard;
  setCard: (board: TBoardTaskCard) => void;
};

export const useCardStore = create<CardType>((set) => ({
  card: {
    cardId: "",
    task: {
      taskId: "",
      title: "",
    },
    board: {
      boardId: "",
    },
    title: "",
    description: null,
    coverImage: null,
    order: 0,
    labels: [],
    cardMembers: [],
    comments: [],
    attachments: [],
    createdAt: "",
    updatedAt: "",
  },
  setCard: (card: TBoardTaskCard) =>
    set((state) => ({
      card: shallowEqual(state.card, card) ? state.card : card,
    })),
}));
function shallowEqual(obj1: TBoardTaskCard, obj2: TBoardTaskCard) {
  return shallow(obj1, obj2);
}
