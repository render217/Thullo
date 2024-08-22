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
export enum TVisibility {
  PUBLIC,
  PRIVATE,
}

export enum TInviteStatus {
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
  visibility: TVisibility;
  admin: TAdmin;
  boardMember: TBoardMember[];
  createdAt: string;
  updatedAt: string;
};

export type TBoardDetail = {
  boardId: string;
  boardName: string;
  boardImage: string;
  description: string;
  visibility: TVisibility;
  admin: TAdmin;
  boardMember: TBoardMember[];
  boardInvites: TBoardInvite[];
  tasks: TBoardTask[];
  // boardInvites: Omit<TBoardInvite, "board">[];
  // tasks: Omit<TBoardTask, "board">[];
  createdAt: string;
  updatedAt: string;
};

export type TBoardInvite = {
  inviteId: string;
  board: TBoard;
  status: TInviteStatus;
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
  board: Pick<TBoard, "boardId">;
  title: string;
  description: string | null;
  coverImage: string | null;
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
  name: string;
  color: string;
  cardId: string;
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
