"use server";

import db from "@/db/db";
import { handleError } from "@/lib/utils";

export async function getBoards() {
  try {
    const boards = await db.board.findMany();
  } catch (error) {
    handleError(error);
  }
}
