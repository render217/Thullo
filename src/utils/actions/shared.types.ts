// USERS
export type CreateUserParams = {
  clerkId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
};

// BOARDS
export type CreateBoardParams = {
  title: string;
  visibility: string;
  image: string | undefined;
};

export type UpdateBoardParams = {
  boardId: string;
  boardName?: string;
  description?: string;
  visibility?: string;
};

export type AddBoardMemberParams = {
  boardId: string;
  userIds: string[];
};

export type RemoveMemberFromBoardParams = {
  boardId: string;
  userId: string;
};

export type GetUsersNotInBoardParams = {
  boardId: string;
  userName: string;
};

// BOARD TASKS

export type CreateBoardTaskParams = {
  boardId: string;
  title: string;
};

export type DeleteBoardTaskParams = {
  taskId: string;
};
export type EditBoardTaskParams = {
  taskId: string;
  title: string;
};

// BOARD TASK CARDS

export type CreateBoardTaskCardParams = {
  taskId: string;
  title: string;
};

export type GetBoardTaskParams = {
  cardId: string;
};

export type UpdateBoardTaskCardParams = {
  cardId: string;
  title?: string;
  description?: string;
  coverImage?: string;
};

export type GetUsersInBoardNotInCardParams = {
  cardId: string;
  boardId: string;
  userName: string;
};

export type AssignMembersParams = {
  cardId: string;
  userIds: string[];
};

export type UnAssignMemberParams = {
  cardId: string;
  userId: string;
};

// comments
export type GetCommentsParams = {
  cardId: string;
};
export type CreateCommentParams = {
  cardId: string;
  content: string;
  authorId: string;
};
export type UpdateCommentParams = {
  commentId: string;
  content?: string;
  authorId: string;
};
export type DeleteCommentParams = {
  commentId: string;
  authorId: string;
};

// labels;
export type GetLabelsParams = {
  cardId: string;
};
export type CreateLabelParams = {
  cardId: string;
  name: string;
  color: string;
};
export type DeleteLabelParams = {
  labelId: string;
};
// attachments

export type CreateAttachmentParams = {
  authorId: string;
  cardId: string;
  contentType: string;
  size: number;
  url: string;
  name: string;
};

export type DeleteAttachmentParams = {
  attachmentId: string;
};
