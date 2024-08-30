"use server";
import { Response } from "@/types/axios.types";
import {
  CreateBoardTaskParams,
  DeleteBoardTaskParams,
  EditBoardTaskParams,
  UpdateBoardTaskOrderParams,
} from "./shared.types";
import { TBoardDetail, TBoardTask } from "@/types/t";
import db from "@/db/db";
import { boardDetailDto, boardTaskDto } from "./mappers";

export async function createBoardTask(
  payload: CreateBoardTaskParams,
): Promise<Response<TBoardTask>> {
  try {
    const taskLength = await db.task.count({
      where: {
        boardId: payload.boardId,
      },
    });
    const newBoardTaskCard = await db.task.create({
      data: {
        title: payload.title,
        boardId: payload.boardId,
        order: taskLength + 1,
      },
      include: {
        board: {
          include: {
            admin: true,
            boardMember: {
              include: {
                user: true,
              },
            },
          },
        },
        cards: true,
      },
    });
    const mappedBoardTask = boardTaskDto(newBoardTaskCard);
    return {
      success: true,
      data: mappedBoardTask,
    };
  } catch (error: any) {
    console.log("createBoardTaskError:", error);
    return {
      success: false,
      data: typeof error === "string" ? error : JSON.stringify(error),
    };
  }
}

export async function deleteBoardTask(
  payload: DeleteBoardTaskParams,
): Promise<Response<TBoardTask>> {
  try {
    const targetTask = await db.task.findUnique({
      where: {
        taskId: payload.taskId,
      },
      include: {
        board: {
          include: {
            admin: true,
            boardMember: {
              include: {
                user: true,
              },
            },
          },
        },
        cards: {
          include: {
            labels: true,
            comments: true,
            attachments: true,
          },
        },
      },
    });
    if (!targetTask) {
      return {
        success: false,
        data: "Task not found",
      };
    }

    const cardIds = targetTask.cards.map((card) => card.cardId);

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
    // Delete all cards related to the task
    await db.card.deleteMany({
      where: {
        taskId: payload.taskId,
      },
    });

    const mappedTargetTask = boardTaskDto(targetTask);
    await db.task.delete({
      where: {
        taskId: payload.taskId,
      },
    });
    return {
      success: true,
      data: mappedTargetTask,
    };
  } catch (error) {
    console.log("deleteBoardTaskError:", error);
    return {
      success: false,
      data: "Error deleting task",
    };
  }
}

export async function editBoardTask(
  payload: EditBoardTaskParams,
): Promise<Response<TBoardTask>> {
  if (payload.taskId.trim() === "") {
    return {
      success: false,
      data: "Task ID is required",
    };
  }
  try {
    const targetTask = await db.task.findUnique({
      where: {
        taskId: payload.taskId,
      },
      include: {
        board: {
          include: {
            admin: true,
            boardMember: {
              include: {
                user: true,
              },
            },
          },
        },
        cards: true,
      },
    });

    if (!targetTask) {
      return {
        success: false,
        data: "Task not found",
      };
    }
    const updatedTask = await db.task.update({
      where: {
        taskId: payload.taskId,
      },
      data: {
        title: payload.title || targetTask.title,
      },
      include: {
        board: {
          include: {
            admin: true,
            boardMember: {
              include: {
                user: true,
              },
            },
          },
        },
        cards: true,
      },
    });
    const mappedUpdatedTask = boardTaskDto(updatedTask);
    return {
      success: true,
      data: mappedUpdatedTask,
    };
  } catch (error) {
    console.log("editBoardTaskError:", error);
    return {
      success: false,
      data: "Error updating task",
    };
  }
}

export async function updateBoardTaskOrder(
  payload: UpdateBoardTaskOrderParams,
): Promise<Response<TBoardDetail>> {
  try {
    if (payload.boardId.trim() === "") {
      return {
        success: false,
        data: "Board ID is required",
      };
    }

    // Fetch the board and validate existence
    const targetBoard = await db.board.findUnique({
      where: { boardId: payload.boardId },
    });

    if (!targetBoard) {
      return {
        success: false,
        data: "Board not found",
      };
    }

    const tasks = payload.tasks;

    // Prepare batch update
    const updatePromises = tasks.map((task) =>
      db.task.update({
        where: { taskId: task.taskId },
        data: { order: task.order.new },
      }),
    );

    await Promise.all(updatePromises);

    const updatedBoard = await db.board.findUnique({
      where: {
        boardId: targetBoard.boardId,
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

    const mappedBoard = boardDetailDto(updatedBoard);

    return {
      success: true,
      data: mappedBoard,
    };
  } catch (error) {
    console.log("updateBoardTaskOrderError:", error);
    return {
      success: false,
      data: "Error updating task order",
    };
  }
}
