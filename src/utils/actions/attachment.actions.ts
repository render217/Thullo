"use server";

import { TAttachment } from "@/types/t";
import { CreateAttachmentParams, DeleteAttachmentParams } from "./shared.types";
import { Response } from "@/types/axios.types";
import db from "@/db/db";
import { attachmentDto } from "./mappers";

export async function getAttachments(
  cardId: string,
): Promise<Response<TAttachment[]>> {
  if (!cardId) {
    return {
      success: false,
      data: "Card ID is required",
    };
  }
  try {
    const targetCard = await db.card.findUnique({
      where: {
        cardId,
      },
    });

    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
      };
    }

    const attachments = await db.attachment.findMany({
      where: {
        cardId: targetCard.cardId,
      },
      include: {
        author: true,
        card: {
          include: {
            task: {
              include: {
                board: {
                  select: {
                    boardId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const mappedAttachments = attachments.map((attachment) =>
      attachmentDto(attachment),
    );

    return {
      success: true,
      data: mappedAttachments,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error fetching attachments",
    };
  }
}

export async function deleteAttachment(
  payload: DeleteAttachmentParams,
): Promise<Response<TAttachment>> {
  if (!payload.attachmentId) {
    return {
      success: false,
      data: "Attachment ID is required",
    };
  }
  try {
    const targetAttachment = await db.attachment.findUnique({
      where: {
        attachmentId: payload.attachmentId,
      },
      include: {
        author: true,
        card: {
          include: {
            task: {
              include: {
                board: {
                  select: {
                    boardId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!targetAttachment) {
      return {
        success: false,
        data: "Attachment not found",
      };
    }

    const mappedAttachment = attachmentDto(targetAttachment);

    await db.attachment.delete({
      where: {
        attachmentId: payload.attachmentId,
      },
    });

    return {
      success: true,
      data: mappedAttachment,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error deleting attachment",
    };
  }
}

export async function createAttachment(
  payload: CreateAttachmentParams,
): Promise<Response<TAttachment>> {
  try {
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
    const newAttachment = await db.attachment.create({
      data: {
        cardId: targetCard.cardId,
        authorId: payload.authorId,
        name: payload.name,
        url: payload.url,
        size: payload.size,
        contentType: payload.contentType,
      },
      include: {
        author: true,
        card: {
          include: {
            task: {
              include: {
                board: {
                  select: {
                    boardId: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const mappedAttachment = attachmentDto(newAttachment);
    return {
      success: true,
      data: mappedAttachment,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error creating attachment",
    };
  }
}
