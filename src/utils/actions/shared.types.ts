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

export type CreateBoardParams = {
  title: string;
  visibility: string;
  image: string | undefined;
};

export type CreateBoardTaskParams = {
  boardId: string;
  title: string;
};

export type DeleteBoardTaskParams = {
  taskId: string;
};

export type CreateBoardTaskCardParams = {
  taskId: string;
  title: string;
};
