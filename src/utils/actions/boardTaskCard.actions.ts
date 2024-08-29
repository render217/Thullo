"use server";
import db from "@/db/db";
import {
  AssignMembersParams,
  CreateBoardTaskCardParams,
  DeleteCardParams,
  GetBoardTaskParams,
  UnAssignMemberParams,
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

export async function deleteBoardTaskCard(
  payload: DeleteCardParams,
): Promise<Response<TBoardTaskCard>> {
  try {
    if (!payload.cardId) {
      return {
        success: false,
        data: "Card ID is required",
      };
    }

    // Find the target card and include related entities
    const targetCard = await db.card.findUnique({
      where: {
        cardId: payload.cardId,
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

    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
      };
    }

    // Delete all labels related to the card
    await db.label.deleteMany({
      where: {
        cardId: payload.cardId,
      },
    });

    // Delete all comments related to the card
    await db.comment.deleteMany({
      where: {
        cardId: payload.cardId,
      },
    });

    // Delete all attachments related to the card
    await db.attachment.deleteMany({
      where: {
        cardId: payload.cardId,
      },
    });

    // Delete all card members related to the card
    await db.cardMember.deleteMany({
      where: {
        cardId: payload.cardId,
      },
    });

    // Delete the card itself
    await db.card.delete({
      where: {
        cardId: payload.cardId,
      },
    });

    const mappedTaskCard = cardDto(targetCard);

    return {
      success: true,
      data: mappedTaskCard,
    };
  } catch (error) {
    console.log("deleteCardError:", error);
    return {
      success: false,
      data: "Error deleting card",
    };
  }
}

export async function assignMembersToTaskCard(
  payload: AssignMembersParams,
): Promise<Response<TBoardTaskCard>> {
  try {
    if (!payload.cardId) {
      return {
        success: false,
        data: "Card ID is required",
      };
    }

    if (payload.userIds.length === 0) {
      return {
        success: false,
        data: "User IDs are required",
      };
    }

    const targetCard = await db.card.findUnique({
      where: {
        cardId: payload.cardId,
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

    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
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
    const assignedMembers = await Promise.all(
      usersToAdd.map((userId) =>
        db.cardMember.create({
          data: {
            cardId: payload.cardId,
            userId: userId,
          },
        }),
      ),
    );

    const mappedTaskCard = cardDto(targetCard);

    console.log({ mappedTaskCard: targetCard.cardMembers });

    if (nonExistentUserIds.length > 0) {
      console.log(`Some users not found: ${nonExistentUserIds.join(", ")}`);
      return {
        success: true,
        data: mappedTaskCard,
      };
    }
    return {
      success: true,
      data: mappedTaskCard,
    };
  } catch (error) {
    console.log("assignMembersToTaskCardError:", error);
    return {
      success: false,
      data: "Error assigning members to card",
    };
  }
}

export async function unAssignMemberToTaskCard(
  payload: UnAssignMemberParams,
): Promise<Response<TBoardTaskCard>> {
  try {
    if (!payload.cardId) {
      return {
        success: false,
        data: "Card ID is required",
      };
    }

    if (!payload.userId) {
      return {
        success: false,
        data: "User ID is required",
      };
    }

    const targetCard = await db.card.findUnique({
      where: {
        cardId: payload.cardId,
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

    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
      };
    }

    const targetMember = await db.cardMember.findUnique({
      where: {
        cardId_userId: {
          cardId: payload.cardId,
          userId: payload.userId,
        },
      },
    });

    if (!targetMember) {
      return {
        success: false,
        data: "Member not found",
      };
    }

    await db.cardMember.delete({
      where: {
        cardId_userId: {
          cardId: targetCard.cardId,
          userId: targetMember.userId,
        },
      },
    });

    const mappedTaskCard = cardDto(targetCard);

    return {
      success: true,
      data: mappedTaskCard,
    };
  } catch (error) {
    console.log("unAssignMemberToTaskCardError:", error);
    return {
      success: false,
      data: "Error unassigning members to card",
    };
  }
}
