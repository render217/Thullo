"use server";

import { TLabel } from "@/types/t";
import {
  CreateLabelParams,
  DeleteLabelParams,
  GetLabelsParams,
} from "./shared.types";

import { Response } from "@/types/axios.types";
import db from "@/db/db";
import { labelDto } from "./mappers";
export async function getLabels(
  param: GetLabelsParams,
): Promise<Response<TLabel[]>> {
  try {
    if (param.cardId.trim() === "") {
      return {
        success: false,
        data: "Card ID is required",
      };
    }

    const targetCard = await db.card.findUnique({
      where: {
        cardId: param.cardId,
      },
    });
    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
      };
    }

    const labels = await db.label.findMany({
      where: {
        cardId: param.cardId,
      },
    });

    const mappedLabels = labels.map((label) => labelDto(label));

    return {
      success: true,
      data: mappedLabels,
    };
  } catch (error) {
    return {
      success: false,
      data: "DB:Error fetching labels",
    };
  }
}
export async function createLabel(
  payload: CreateLabelParams,
): Promise<Response<TLabel>> {
  try {
    const { cardId, color, name } = payload;
    if (cardId.trim() === "") {
      return {
        success: false,
        data: "Card ID is required",
      };
    }
    if (color.trim() === "" || name.trim() === "") {
      return {
        success: false,
        data: "Color and Name are required",
      };
    }

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

    const newLabel = await db.label.create({
      data: {
        cardId,
        color,
        name,
      },

      include: {
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

    const mappedLabel = labelDto(newLabel);
    return {
      success: true,
      data: mappedLabel,
    };
  } catch (error) {
    return {
      success: false,
      data: "DB:Error creating label",
    };
  }
}

export async function deleteLabel(
  payload: DeleteLabelParams,
): Promise<Response<TLabel>> {
  try {
    const { labelId } = payload;
    if (labelId.trim() === "") {
      return {
        success: false,
        data: "Label ID is required",
      };
    }

    const targetLabel = await db.label.findUnique({
      where: {
        labelId,
      },
      include: {
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

    if (!targetLabel) {
      return {
        success: false,
        data: "Label not found",
      };
    }

    await db.label.delete({
      where: {
        labelId,
      },
    });

    const mappedLabel = labelDto(targetLabel);

    return {
      success: true,
      data: mappedLabel,
    };
  } catch (error) {
    return {
      success: false,
      data: "DB:Error deleting label",
    };
  }
}
