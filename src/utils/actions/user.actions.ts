"use server";

import db from "@/db/db";
import { handleError } from "@/lib/utils";
import {
  CreateUserParams,
  GetUsersNotInBoardParams,
  UpdateUserParams,
} from "./shared.types";
import { TBoardMember, TUser } from "@/types/t";
import { Response } from "@/types/axios.types";
import { userDto } from "./mappers";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await db.user.create({
      data: user,
    });
    console.log("user create success", newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (!existingUser) throw new Error("User not found");

    const updatedUser = await db.user.update({
      where: {
        clerkId: existingUser.clerkId,
      },
      data: user,
    });
    console.log("update user success", updateUser);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (!existingUser) throw new Error("User not found");

    await db.user.delete({
      where: {
        clerkId: existingUser.clerkId,
      },
    });
    console.log("delete user success", clerkId);
    return JSON.parse(JSON.stringify(existingUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(clerkId: string) {
  console.log("user-id payload: ", clerkId);
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    console.log("user: ", user);
    if (!user) return null;
    return user;
  } catch (error) {
    // handleError(error);
    console.log("getUserByIdError", error);
    return null;
  }
}

export async function getUsers(
  username: string,
): Promise<Response<TBoardMember[]>> {
  try {
    const users = await db.user.findMany({
      where: {
        username: {
          mode: "insensitive",
          contains: username ?? "",
        },
      },
    });

    const mappedUser = users.map((user) => userDto(user));

    return {
      success: true,
      data: mappedUser,
    };
  } catch (error) {
    console.log("getUsersError", error);
    return {
      success: false,
      data: "Error fetching users",
    };
  }
}

export async function getUsersNotInBoard(
  payload: GetUsersNotInBoardParams,
): Promise<Response<TBoardMember[]>> {
  try {
    const users = await db.user.findMany({
      where: {
        username: {
          mode: "insensitive",
          contains: payload.userName ?? "",
        },
        boardMember: {
          none: {
            boardId: payload.boardId,
          },
        },
      },
    });

    const mappedUsers = users.map((user) => userDto(user));

    return {
      success: true,
      data: mappedUsers,
    };
  } catch (error) {
    console.log("getUsersNotInBoardError", error);
    return {
      success: false,
      data: "Error fetching users",
    };
  }
}
