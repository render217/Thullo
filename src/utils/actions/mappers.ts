import { TBoard } from "@/types/t";

export function boardDto(board: any): TBoard {
  return {
    boardId: board.boardId,
    boardName: board.boardName,
    boardImage: board.boardImage,
    description: board.description,
    visibility: board.visibility,
    admin: {
      id: board.admin.clerkId,
      username: board.admin.username,
      email: board.admin.email,
      profileImage: board.admin.profileImage,
      createdAt: board.admin.createdAt,
    },
    boardMember: board.boardMember.map((bm: any) => ({
      id: bm.user.clerkId,
      username: bm.user.username,
      email: bm.user.email,
      profileImage: bm.user.profileImage,
      createdAt: bm.user.createdAt,
    })),
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  };
}
