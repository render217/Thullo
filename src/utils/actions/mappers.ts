import { TBoard, TBoardDetail } from "@/types/t";

export function boardDto(board: any): TBoard {
  return {
    boardId: board.boardId,
    boardName: board.boardName,
    boardImage: board.boardImage,
    description: board.description,
    visibility: board.visibility,
    admin: userDto(board.admin),
    boardMember:
      board.boardMember?.length > 0
        ? board.boardMember.map((bm: any) => userDto(bm.user))
        : [],
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  };
}
export function boardDetailDto(board: any): TBoardDetail {
  return {
    boardId: board.boardId,
    boardName: board.boardName,
    boardImage: board.boardImage,
    description: board.description,
    visibility: board.visibility,
    admin: userDto(board.admin),
    boardMember:
      board.boardMember?.length > 0
        ? board.boardMember.map((bm: any) => userDto(bm.user))
        : [],
    boardInvites: board.boardInvites?.length > 0 ? [] : [],
    tasks:
      board.tasks?.length > 0
        ? board.tasks.map((task: any) => boardTaskDto(task))
        : [],
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  };
}

export function userDto(user: any) {
  return {
    id: user?.clerkId,
    username: user?.username,
    email: user?.email,
    profileImage: user?.profileImage,
    createdAt: user?.createdAt,
  };
}

export function boardTaskDto(boardTask: any) {
  return {
    taskId: boardTask.taskId,
    title: boardTask.title,
    order: boardTask.order,
    board: boardDto(boardTask.board),
    cards:
      boardTask.cards?.length > 0
        ? boardTask.cards.map((card: any) => cardDto(card))
        : [],
    createdAt: boardTask.createdAt,
    updatedAt: boardTask.updatedAt,
  };
}

export function cardDto(card: any) {
  return {
    cardId: card.cardId,
    title: card.title,
    description: card.description,
    order: card.order,
    coverImage: card.coverImage,
    labels:
      card.labels?.length > 0
        ? card.labels.map((label: any) => labelDto(label))
        : [],
    task: {
      taskId: card.task?.taskId,
      title: card.task?.title,
    },
    board: {
      boardId: card.task?.board?.boardId,
    },
    cardMembers:
      card.cardMembers?.length > 0
        ? card.cardMembers.map((member: any) => userDto(member))
        : [],
    comments:
      card.comments?.length > 0
        ? card.comments.map((comment: any) => commentDto(comment))
        : [],
    attachments:
      card.attachments?.length > 0
        ? card.attachments.map((attachment: any) => attachmentDto(attachment))
        : [],
    members:
      card.members?.length > 0
        ? card.members.map((member: any) => userDto(member))
        : [],
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
  };
}

export function labelDto(label: any) {
  return {
    labelId: label.labelId,
    name: label.name,
    color: label.color,
    cardId: label.cardId,
    boardId: label?.card?.task?.board?.boardId || "",
  };
}

export function commentDto(comment: any) {
  return {
    commentId: comment.commentId,
    content: comment.content,
    cardId: comment.cardId,
    boardId: comment?.card?.task?.board?.boardId || "",
    author: userDto(comment.author),
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}

export function attachmentDto(attachment: any) {
  return {
    attachmentId: attachment.attachmentId,
    contentType: attachment.contentType,
    size: attachment.size,
    url: attachment.url,
    name: attachment.name,
    cardId: attachment.cardId,
    boardId: attachment.card?.task?.board?.boardId || "",
    author: userDto(attachment.author),
    createdAt: attachment.createdAt,
    updatedAt: attachment.updatedAt,
  };
}
