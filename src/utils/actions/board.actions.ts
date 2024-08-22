"use server";

import db from "@/db/db";
import { handleError } from "@/lib/utils";
import { boardDto } from "./mappers";
import { Response } from "@/types/axios.types";
import { TBoard, TVisibility } from "@/types/t";
import { CreateBoardParams } from "./shared.types";
import { getUserById } from "./user.actions";

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
