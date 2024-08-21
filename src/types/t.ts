export type TUser = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
};

export type TCommonUser = Pick<
  TUser,
  "id" | "username" | "email" | "profileImage" | "createdAt"
>;
export enum Visibility {
  PUBLIC,
  PRIVATE,
}

export enum InviteStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export type TBoardMember = TCommonUser;
export type TRecipient = TCommonUser;
export type TAdmin = TCommonUser;
export type TCardMember = TCommonUser;
export type TCommentAuthor = TCommonUser;
export type TAttachmentAuthor = TCommonUser;

export type TBoard = {
  boardId: string;
  boardName: string;
  boardImage: string;
  description: string;
  visibility: Visibility;
  admin: TAdmin;
  boardMember: TBoardMember[];
  createdAt: string;
  updatedAt: string;
};

export type TBoardInvite = {
  inviteId: string;
  board: TBoard;
  status: InviteStatus;
  recipient: TRecipient;
  createdAt: string;
  updatedAt: string;
};

export type TBoardTask = {
  taskId: string;
  title: string;
  order: number;
  board: TBoard;
  cards: TBoardTaskCard[];
  createdAt: string;
  updatedAt: string;
};

export type TBoardTaskCard = {
  cardId: string;
  task: Pick<TBoardTask, "taskId" | "title">;
  title: string;
  description: string;
  coverImage: string;
  order: number;
  labels: TLabel[];
  cardMembers: TCardMember[];
  comments: TComment[];
  attachments: TAttachment[];
  createdAt: string;
  updatedAt: string;
};

export type TLabel = {
  labelId: string;
  tag: string;
  cardId: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type TComment = {
  commentId: string;
  content: string;
  cardId: string;
  author: TCommentAuthor;
  createdAt: string;
  updatedAt: string;
};

export type TAttachment = {
  attachmentId: string;
  contentType: string;
  size: string;
  url: string;
  cardId: string;
  author: TAttachmentAuthor;
  createdAt: string;
  updatedAt: string;
};
