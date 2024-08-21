"use server";

import db from "@/db/db";
import { handleError } from "@/lib/utils";
import { CreateUserParams, UpdateUserParams } from "./shared.types";

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
