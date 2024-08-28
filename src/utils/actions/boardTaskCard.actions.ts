"use server";
import db from "@/db/db";
import {
  CreateBoardTaskCardParams,
  GetBoardTaskParams,
  UpdateBoardTaskCardParams,
} from "./shared.types";
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
        description: "",
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

export async function getBoardTaskCard(
  cardId: string,
): Promise<Response<TBoardTaskCard>> {
  if (cardId.trim() === "") {
    return {
      success: false,
      data: "Card ID is required",
    };
  }

  try {
    const card = await db.card.findUnique({
      where: {
        cardId: cardId,
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

    if (!card) {
      return {
        success: false,
        data: "Card not found",
      };
    }

    const mappedCard = cardDto(card);
    return {
      success: true,
      data: mappedCard,
    };
  } catch (error) {
    console.log("getBoardTaskCardError:", error);
    return {
      success: false,
      data: "Error fetching card",
    };
  }
}

export async function updateBoardTaskCard(
  payload: UpdateBoardTaskCardParams,
): Promise<Response<TBoardTaskCard>> {
  try {
    if (!payload.cardId) {
      return {
        success: false,
        data: "Card ID is required",
      };
    }

    const targetCard = await db.card.findUnique({
      where: {
        cardId: payload.cardId,
      },
    });

    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
      };
    }
    const updatedCard = await db.card.update({
      where: {
        cardId: targetCard.cardId,
      },
      data: {
        title: payload.title || targetCard.title,
        description: payload.description || targetCard.description,
        coverImage: payload.coverImage || targetCard.coverImage,
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

    const mappedUpdatedCard = cardDto(updatedCard);
    return {
      success: true,
      data: mappedUpdatedCard,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error updating card",
    };
  }
}
