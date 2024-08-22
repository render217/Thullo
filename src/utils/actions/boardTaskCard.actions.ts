"use server";
import db from "@/db/db";
import { CreateBoardTaskCardParams } from "./shared.types";
import { Response } from "@/types/axios.types";
import { TBoardTaskCard } from "@/types/t";
import { cardDto } from "./mappers";

export async function createBoardTaskCard(
  payload: CreateBoardTaskCardParams,
): Promise<Response<TBoardTaskCard>> {
  try {
    if (payload.title.trim() === "") {
      return {
        success: false,
        data: "All Fields are required",
      };
    }

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

    const taskCardLength = await db.card.count({
      where: {
        taskId: payload.taskId,
      },
    });

    const newBoardTaskCard = await db.card.create({
      data: {
        title: payload.title,
        task: { connect: { taskId: payload.taskId } },
        order: taskCardLength + 1,
      },
      include: {
        task: {
          include: {
            board: true,
          },
        },
        labels: true,
        cardMembers: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
        attachments: {
          include: {
            author: true,
          },
        },
      },
    });

    const mappedNewBoardTaskCard = cardDto(newBoardTaskCard);

    return {
      success: true,
      data: mappedNewBoardTaskCard,
    };
  } catch (error: any) {
    console.log("createBoardTaskCardError:", error);
    return {
      success: false,
      data: typeof error === "string" ? error : JSON.stringify(error),
    };
  }
}
