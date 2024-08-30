"use server";

import db from "@/db/db";
import { handleError } from "@/lib/utils";
import { boardDetailDto, boardDto } from "./mappers";
import { Response } from "@/types/axios.types";
import { TBoard, TBoardDetail, TVisibility } from "@/types/t";
import {
  AddBoardMemberParams,
  CreateBoardParams,
  DeleteBoardParams,
  GetBoardsParams,
  RemoveMemberFromBoardParams,
  UpdateBoardParams,
} from "./shared.types";
import { getUserById } from "./user.actions";
import { string } from "zod";

// export async function getBoards(): Promise<Response<TBoard[]>> {
//   try {
//     const boards = await db.board.findMany({
//       include: {
//         admin: true,
//         boardMember: {
//           include: {
//             user: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     const mappedBoards = boards.map((b) => boardDto(b));
//     return {
//       success: true,
//       data: mappedBoards,
//     };
//   } catch (error) {
//     console.log("getBoardsError", error);
//     return {
//       success: false,
//       data: "Error fetching boards",
//     };
//   }
// }

export async function getBoards(
  payload: GetBoardsParams,
): Promise<Response<TBoard[]>> {
  try {
    const { userId } = payload;

    const boards = await db.board.findMany({
      where: {
        OR: [
          { visibility: "PUBLIC" },
          { adminId: userId },
          {
            AND: [
              { visibility: "PRIVATE" },
              {
                boardMember: {
                  some: {
                    userId: userId,
                  },
                },
              },
            ],
          },
        ],
      },
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
        visibility: payload?.visibility === "PUBLIC" ? "PUBLIC" : "PRIVATE",
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

export async function deleteBoard(
  payload: DeleteBoardParams,
): Promise<Response<TBoardDetail>> {
  try {
    // Fetch the target board including related entities
    const targetBoard = await db.board.findUnique({
      where: {
        boardId: payload.boardId,
      },
      include: {
        admin: true,

        tasks: {
          include: {
            cards: {
              include: {
                labels: true,
                comments: true,
                attachments: true,
              },
            },
          },
        },
        boardMember: {
          include: {
            user: true,
          },
        },
        boardInvites: true,
      },
    });

    // If board is not found, return an error
    if (!targetBoard) {
      return {
        success: false,
        data: "Board not found",
      };
    }

    // Check if the requesting admin is the actual board admin
    if (targetBoard.adminId !== payload.adminId) {
      return {
        success: false,
        data: "Unauthorized: You are not the admin of this board",
      };
    }

    // Extract all task IDs and card IDs related to the board
    const taskIds = targetBoard.tasks.map((task) => task.taskId);
    const cardIds = targetBoard.tasks.flatMap((task) =>
      task.cards.map((card) => card.cardId),
    );

    // Delete all labels related to the cards
    await db.label.deleteMany({
      where: {
        cardId: { in: cardIds },
      },
    });

    // Delete all comments related to the cards
    await db.comment.deleteMany({
      where: {
        cardId: { in: cardIds },
      },
    });

    // Delete all attachments related to the cards
    await db.attachment.deleteMany({
      where: {
        cardId: { in: cardIds },
      },
    });

    // Delete all cards related to the tasks
    await db.card.deleteMany({
      where: {
        taskId: { in: taskIds },
      },
    });

    // Delete all tasks related to the board
    await db.task.deleteMany({
      where: {
        boardId: payload.boardId,
      },
    });

    // Delete all board members related to the board
    await db.boardMember.deleteMany({
      where: {
        boardId: payload.boardId,
      },
    });

    // Delete all board invites related to the board
    await db.boardInvites.deleteMany({
      where: {
        boardId: payload.boardId,
      },
    });

    // Map the board details for returning after deletion
    const mappedTargetBoard = boardDetailDto(targetBoard);

    // Delete the board itself
    const result = await db.board.delete({
      where: {
        boardId: targetBoard.boardId,
      },
    });
    console.log(result);

    return {
      success: true,
      data: mappedTargetBoard,
    };
  } catch (error) {
    console.log("deleteBoardError:", error);
    return {
      success: false,
      data: "Error deleting board",
    };
  }
}
