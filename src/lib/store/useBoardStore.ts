import { TBoardDetail, TVisibility } from "@/types/t";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

type BoardType = {
  board: TBoardDetail;
  setBoard: (board: TBoardDetail) => void;
};

export const useBoardStore = create<BoardType>((set) => ({
  board: {
    boardId: "",
    boardName: "",
    boardImage: "",
    description: "",
    visibility: TVisibility.PRIVATE,
    admin: {
      id: "",
      username: "",
      email: "",
      profileImage: "",
      createdAt: "",
    },
    boardMember: [],
    boardInvites: [],
    tasks: [],
    createdAt: "",
    updatedAt: "",
  },
  setBoard: (board: TBoardDetail) =>
    set((state) => ({
      board: shallowEqual(state.board, board) ? state.board : board,
    })),
}));

function shallowEqual(obj1: TBoardDetail, obj2: TBoardDetail) {
  return shallow(obj1, obj2);
}
