"use server";

import db from "@/db/db";
import { handleError } from "@/lib/utils";
import { boardDetailDto, boardDto } from "./mappers";
import { Response } from "@/types/axios.types";
import { TBoard, TBoardDetail, TVisibility } from "@/types/t";
import {
  AddBoardMemberParams,
  CreateBoardParams,
  RemoveMemberFromBoardParams,
  UpdateBoardParams,
} from "./shared.types";
import { getUserById } from "./user.actions";
import { string } from "zod";

export async function getBoards(): Promise<Response<TBoard[]>> {
  try {
    const boards = await db.board.findMany({
      include: {
        admin: true,
        boardMember: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const mappedBoards = boards.map((b) => boardDto(b));
    return {
      success: true,
      data: mappedBoards,
    };
  } catch (error) {
    console.log("getBoardsError", error);
    return {
      success: false,
      data: "Error fetching boards",
    };
  }
}
export async function getBoard(
  boardId: string,
): Promise<Response<TBoardDetail>> {
  if (boardId === "" || typeof boardId !== "string") {
    return {
      success: false,
      data: "Board ID is required",
    };
  }
  try {
    const board = await db.board.findUnique({
      where: {
        boardId,
      },
      include: {
        admin: true,
        boardMember: {
          include: {
            user: true,
          },
        },
        tasks: {
          include: {
            board: true,
            cards: {
              include: {
                labels: true,
                comments: true,
                attachments: true,
              },
            },
          },
        },
      },
    });
    if (!board) {
      return {
        success: false,
        data: "Board not found",
      };
    }
    const mappedBoard = boardDetailDto(board);
    return {
      success: true,
      data: mappedBoard,
    };
  } catch (error) {
    console.log("getBoardError", error);
    return {
      success: false,
      data: "Error fetching board",
    };
  }
}

export async function createBoard(
  clerkId: string,
  payload: CreateBoardParams,
): Promise<Response<TBoard>> {
  const user = await getUserById(clerkId);
  if (!user) {
    return {
      success: false,
      data: "User not found",
    };
  }
  const { image, title, visibility } = payload;
  console.log("createBoardPayload", payload);
  try {
    const newBoard = await db.board.create({
      data: {
        boardName: title,
        adminId: user.clerkId,
        description: "",
        visibility: visibility === "public" ? "PUBLIC" : "PRIVATE",
        boardImage: image || "",
      },
      include: {
        admin: true,
        boardMember: {
          include: {
            user: true,
          },
        },
      },
    });
    const mappedNewBoard = boardDto(newBoard);
    return {
      success: true,
      data: mappedNewBoard,
    };
  } catch (error) {
    console.log("Error creating board", error);
    return {
      success: false,
      data: "Error creating board",
    };
  }
}

export async function updateBoard(
  boardId: string,
  payload: UpdateBoardParams,
): Promise<Response<TBoard>> {
  if (boardId === "" || typeof boardId !== "string") {
    return {
      success: false,
      data: "Board ID is required",
    };
  }

  try {
    const targetBoard = await db.board.findUnique({
      where: {
        boardId: boardId,
      },
    });

    if (!targetBoard) {
      return {
        success: false,
        data: "Board not found",
      };
    }

    const updatedBoard = await db.board.update({
      where: {
        boardId,
      },
      data: {
        boardName: payload?.boardName || targetBoard.boardName,
        description: payload?.description || targetBoard.description,
        visibility: payload?.visibility === "public" ? "PUBLIC" : "PRIVATE",
      },
      include: {
        admin: true,
        boardMember: {
          include: {
            user: true,
          },
        },
      },
    });
    const mappedUpdatedBoard = boardDto(updatedBoard);
    return {
      success: true,
      data: mappedUpdatedBoard,
    };
  } catch (error) {
    console.log("editBoardError", error);
    return {
      success: false,
      data: "Error updating board",
    };
  }
}

export async function addBoardMember(
  payload: AddBoardMemberParams,
): Promise<Response<TBoardDetail>> {
  try {
    if (payload.boardId.trim() === "") {
      return {
        success: false,
        data: "Board ID is required",
      };
    }

    if (payload.userIds.length === 0) {
      return {
        success: false,
        data: "User IDs are required",
      };
    }

    // Check if the board exists
    const targetBoard = await db.board.findUnique({
      where: {
        boardId: payload.boardId,
      },
      include: {
        admin: true,
        boardMember: {
          include: {
            user: true,
          },
        },
        tasks: {
          include: {
            board: true,
            cards: {
              include: {
                labels: true,
                comments: true,
                attachments: true,
              },
            },
          },
        },
      },
    });

    if (!targetBoard) {
      return {
        success: false,
        data: "Board not found",
      };
    }

    // Check if each user exists and filter out non-existent users
    const userIds = payload.userIds;
    const existingUsers = await db.user.findMany({
      where: {
        clerkId: { in: userIds },
      },
    });

    const existingUserIds = new Set(existingUsers.map((user) => user.clerkId));
    const nonExistentUserIds = userIds.filter((id) => !existingUserIds.has(id));

    // Add available users to the board
    const usersToAdd = userIds.filter((id) => existingUserIds.has(id));
    const newMembers = await Promise.all(
      usersToAdd.map((userId) =>
        db.boardMember.create({
          data: {
            boardId: payload.boardId,
            userId,
          },
        }),
      ),
    );

    const mappedBoard = boardDetailDto(targetBoard);

    // Return appropriate response
    if (nonExistentUserIds.length > 0) {
      console.log(`Some users not found: ${nonExistentUserIds.join(", ")}`);
      return {
        success: true,
        data: mappedBoard,
      };
    }

    return {
      success: true,
      data: mappedBoard,
    };
  } catch (error) {
    console.log("addBoardMemberError", error);
    return {
      success: false,
      data: "Error adding members to board",
    };
  }
}

export async function removeMemberFromBoard(
  payload: RemoveMemberFromBoardParams,
): Promise<Response<TBoardDetail>> {
  try {
    if (payload.boardId.trim() === "") {
      return {
        success: false,
        data: "Board ID is required",
      };
    }

    const targetBoard = await db.board.findUnique({
      where: {
        boardId: payload.boardId,
      },
      include: {
        admin: true,
        boardMember: {
          include: {
            user: true,
          },
        },
        tasks: {
          include: {
            board: true,
            cards: {
              include: {
                labels: true,
                comments: true,
                attachments: true,
              },
            },
          },
        },
      },
    });

    if (!targetBoard) {
      return {
        success: false,
        data: "Board not found",
      };
    }

    const member = await db.boardMember.findFirst({
      where: {
        boardId: payload.boardId,
        userId: payload.userId,
      },
    });

    if (!member) {
      return {
        success: false,
        data: "Member not found",
      };
    }

    await db.boardMember.delete({
      where: {
        boardId_userId: {
          boardId: payload.boardId,
          userId: member.userId,
        },
      },
    });

    const mappedBoard = boardDetailDto(targetBoard);
    return {
      success: true,
      data: mappedBoard,
    };
  } catch (error) {
    console.log("removeMemberFromBoardError", error);
    return {
      success: false,
      data: "Error removing member from board",
    };
  }
}
export async function deleteBoard() {}
