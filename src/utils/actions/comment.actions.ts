"use server";

import db from "@/db/db";
import {
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentsParams,
  UpdateCommentParams,
} from "./shared.types";
import { TComment } from "@/types";
import { Response } from "@/types/axios.types";
import { commentDto } from "./mappers";

export async function getComments(
  params: GetCommentsParams,
): Promise<Response<TComment[]>> {
  const { cardId } = params;

  if (cardId.trim() === "") {
    return {
      success: false,
      data: "Card ID is required",
    };
  }
  try {
    const targetCard = await db.card.findUnique({
      where: {
        cardId: cardId,
      },
    });

    if (!targetCard) {
      return {
        success: false,
        data: "Card not found",
      };
    }

    const comments = await db.comment.findMany({
      where: {
        cardId: cardId,
      },
      include: {
        author: true,
      },
    });

    const mappedComments = comments.map((c) => commentDto(c));
    return {
      success: true,
      data: mappedComments,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error fetching comments",
    };
  }
}

export async function createComment(
  payload: CreateCommentParams,
): Promise<Response<TComment>> {
  const { cardId, authorId, content } = payload;
  if (cardId.trim() === "" || authorId.trim() === "" || content.trim() === "") {
    return {
      success: false,
      data: "Missing field",
    };
  }

  const targetUser = await db.user.findUnique({
    where: {
      clerkId: authorId,
    },
  });

  if (!targetUser) {
    return {
      success: false,
      data: "User not found",
    };
  }

  const targetCard = await db.card.findUnique({
    where: {
      cardId: cardId,
    },
  });

  if (!targetCard) {
    return {
      success: false,
      data: "Card not found",
    };
  }

  try {
    const newComment = await db.comment.create({
      data: {
        content: content,
        authorId: authorId,
        cardId: cardId,
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
    const mappedComment = commentDto(newComment);
    return {
      success: true,
      data: mappedComment,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: "Error creating comment",
    };
  }
}

export async function updateComment(
  payload: UpdateCommentParams,
): Promise<Response<TComment>> {
  try {
    if (!payload.commentId) {
      return {
        success: false,
        data: "Comment ID is required",
      };
    }

    const author = await db.user.findUnique({
      where: {
        clerkId: payload.authorId,
      },
    });

    if (!author) {
      return {
        success: false,
        data: "Author not found",
      };
    }

    const targetComment = await db.comment.findUnique({
      where: {
        commentId: payload.commentId,
      },
    });

    if (!targetComment) {
      return {
        success: false,
        data: "Comment not found",
      };
    }

    const isAuthor = targetComment.authorId === payload.authorId;

    if (!isAuthor) {
      return {
        success: false,
        data: "You are allowed to update this comment",
      };
    }

    const updatedComment = await db.comment.update({
      where: {
        commentId: targetComment.commentId,
      },
      data: {
        content: payload.content || targetComment.content,
      },
      include: {
        card: true,
      },
    });
    const mappedComment = commentDto(updatedComment);
    return {
      success: true,
      data: mappedComment,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error updating comment",
    };
  }
}

export async function deleteComment(
  payload: DeleteCommentParams,
): Promise<Response<TComment>> {
  try {
    if (!payload.commentId) {
      return {
        success: false,
        data: "Comment ID is required",
      };
    }

    const targetComment = await db.comment.findUnique({
      where: {
        commentId: payload.commentId,
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

    if (!targetComment) {
      return {
        success: false,
        data: "Comment not found",
      };
    }

    const deletedComment = await db.comment.delete({
      where: {
        commentId: targetComment.commentId,
      },
    });

    const mappedComment = commentDto(targetComment);
    return {
      success: true,
      data: mappedComment,
    };
  } catch (error) {
    return {
      success: false,
      data: "Error deleting comment",
    };
  }
}
