"use server";
import { Response } from "@/types/axios.types";
import { CreateBoardTaskParams, DeleteBoardTaskParams } from "./shared.types";
import { TBoardTask } from "@/types/t";
import db from "@/db/db";
import { boardTaskDto } from "./mappers";

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
        board: true,
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
        board: true,
        cards: true,
      },
    });
    if (!targetTask) {
      return {
        success: false,
        data: "Task not found",
      };
    }
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
