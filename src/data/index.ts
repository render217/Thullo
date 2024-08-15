import { UUID } from "crypto";

type IUser = {
  id: UUID | string;
  username: string;
  email: string;
  profileImage: string;
};

type TVisibility = "public" | "private";

type ILabel = {
  id: UUID | string;
  tag: string;
  color: string;
};
type IComment = {
  id: UUID | string;
  content: string;
  author: IUser;
  createdAt: string;
};

type IAttachment = {
  id: UUID | string;
  content: string;
  downloadUrl: string;
  author: IUser;
  createdAt: string;
};
type ICard = {
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

type ITask = {
  id: UUID | string;
  title: string;
  cards: ICard[];
  createdAt: string;
};
type IBoard = {
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

const boardsData: IBoard[] = [
  {
    id: " ",
    title: "My Board",
    description: "",
    coverPhoto: "",
    visibility: "public",
    createdAt: "",
    members: [
      {
        id: "",
        username: "",
        email: "",
        profileImage: "",
      },
    ],
    admin: {
      id: "",
      username: "",
      email: "",
      profileImage: "",
    },
    taskLists: [
      {
        id: "",
        title: "",
        createdAt: "",
        cards: [
          {
            id: "",
            taskId: "",
            title: "",
            description: "",
            coverPhoto: "",
            order: 2,
            createdAt: "",

            labels: [
              {
                id: "",
                tag: "",
                color: "",
              },
            ],
            comments: [
              {
                id: "",
                content: "",
                author: {
                  id: "",
                  username: "",
                  email: "",
                  profileImage: "",
                },
                createdAt: "",
              },
            ],
            attachments: [
              {
                id: "",
                content: "",
                downloadUrl: "",
                author: {
                  id: "",
                  username: "",
                  email: "",
                  profileImage: "",
                },
                createdAt: "",
              },
            ],
          },
        ],
      },
    ],
  },
];
