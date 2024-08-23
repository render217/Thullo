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
};
