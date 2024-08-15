import { UUID } from "crypto";

export type IUser = {
  id: UUID | string;
  username: string;
  email: string;
  profileImage: string;
};

export type TVisibility = "public" | "private";

export type ILabel = {
  id: UUID | string;
  tag: string;
  color: string;
};
export type IComment = {
  id: UUID | string;
  content: string;
  author: IUser;
  createdAt: string;
};

export type IAttachment = {
  id: UUID | string;
  content: string;
  downloadUrl: string;
  author: IUser;
  createdAt: string;
};
export type ICard = {
  id: UUID | string;
  taskId: string;
  title: string;
  description: string;
  coverPhoto: string;
  order: number;
  labels: ILabel[];
  comments: IComment[];
  attachments: IAttachment[];
  createdAt: string;
};

export type ITask = {
  id: UUID | string;
  title: string;
  cards: ICard[];
  createdAt: string;
};
export type IBoard = {
  id: UUID | string;
  title: string;
  description: string;
  coverPhoto: string;
  visibility: TVisibility;
  members: IUser[];
  admin: IUser;
  taskLists: ITask[];
  createdAt: string;
};
