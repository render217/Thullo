import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import boardsServices from "../services/boards.services";
import { useRouter } from "next/navigation";
import {
  addBoardMember,
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  removeMemberFromBoard,
  updateBoard,
} from "../actions/board.actions";
import {
  AddBoardMemberParams,
  CreateAttachmentParams,
  CreateBoardParams,
  CreateBoardTaskCardParams,
  CreateBoardTaskParams,
  CreateCommentParams,
  CreateLabelParams,
  DeleteAttachmentParams,
  DeleteBoardParams,
  DeleteCommentParams,
  DeleteLabelParams,
  EditBoardTaskParams,
  GetUsersInBoardNotInCardParams,
  GetUsersNotInBoardParams,
  UnAssignMemberParams,
  UpdateBoardParams,
  UpdateBoardTaskCardOrderParams,
  UpdateBoardTaskCardParams,
  UpdateBoardTaskOrderParams,
  UpdateCommentParams,
} from "../actions/shared.types";
import {
  createBoardTask,
  deleteBoardTask,
  editBoardTask,
  updateBoardTaskOrder,
} from "../actions/boardTask.actions";
import {
  assignMembersToTaskCard,
  createBoardTaskCard,
  deleteBoardTaskCard,
  getBoardTaskCard,
  unAssignMemberToTaskCard,
  updateBoardTaskCard,
  updateBoardTaskCardOrder,
} from "../actions/boardTaskCard.actions";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../actions/comment.actions";
import { createLabel, deleteLabel, getLabels } from "../actions/label.actions";
import {
  createAttachment,
  deleteAttachment,
  getAttachments,
} from "../actions/attachment.actions";
import {
  getUsers,
  getUsersInBoardNotInCard,
  getUsersNotInBoard,
} from "../actions/user.actions";

/********
 *
 *  BOARDS
 *
 *******/
export function useGetBoards(userId: string) {
  return useQuery({
    queryKey: ["boards"],
    // queryFn: () => boardsServices.getBoards(),
    queryFn: async () => await getBoards({ userId }),
    enabled: !!userId,
  });
}

export function useGetBoardById(id: string) {
  return useQuery({
    queryKey: ["boards", { id }],
    // queryFn: () => boardsServices.getBoard(id),
    queryFn: async () => await getBoard(id),
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      userId: string;
      payload: CreateBoardParams;
    }) => {
      const { userId, payload } = params;
      return await createBoard(userId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateBoardParams) => {
      const boardId = payload.boardId;
      return await updateBoard(boardId, payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: DeleteBoardParams) => {
      return await deleteBoard(payload);
    },
    onSuccess: (data) => {
      if (data.success) {
        const boardId = data.data.boardId;
        queryClient.invalidateQueries({ queryKey: ["boards"] });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });

        router.replace("/boards");
      }
    },
  });
}

export function useAddBoardMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AddBoardMemberParams) => {
      return await addBoardMember(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["users", { boardId: boardId, userName: "" }],
        });
      }
    },
  });
}

export function useRemoveMemberFromBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { boardId: string; userId: string }) => {
      return await removeMemberFromBoard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["users", { boardId: boardId, userName: "" }],
        });
      }
    },
  });
}

/********
 *
 *  BOARD_TASKS
 *
 *******/
export function useCreateBoardTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBoardTaskParams) => {
      return await createBoardTask(payload);
    },
    onSuccess: (response) => {
      if (response.success) {
        const boardId = response.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useDeleteBoardTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { taskId: string }) => {
      return await deleteBoardTask(payload);
    },
    onSuccess: (response) => {
      if (response.success) {
        const boardId = response.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useEditBoardTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EditBoardTaskParams) => {
      return await editBoardTask(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useUpdateBoardTaskOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateBoardTaskOrderParams) => {
      return await updateBoardTaskOrder(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

/********
 *
 *  BOARD_TASK_CARDS
 *
 *******/
export function useCreateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBoardTaskCardParams) => {
      return await createBoardTaskCard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useGetBoardTaskCardById(cardId: string) {
  return useQuery({
    queryKey: ["cards", { cardId }],
    queryFn: async () => await getBoardTaskCard(cardId),
    enabled: !!cardId,
    // gcTime: 1000 * 60 * 60,
  });
}

export function useUpdateBoardTaskCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateBoardTaskCardParams) => {
      return await updateBoardTaskCard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useUpdateBoardTaskCardOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateBoardTaskCardOrderParams) => {
      return await updateBoardTaskCardOrder(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useDeleteBoardTaskCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { cardId: string }) => {
      return await deleteBoardTaskCard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const boardId = res.data.board.boardId;
        const cardId = res.data.cardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
      }
    },
  });
}

export function useAssignMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { cardId: string; userIds: string[] }) => {
      return await assignMembersToTaskCard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
        queryClient.invalidateQueries({
          queryKey: [
            "users",
            {
              boardId: boardId,
              cardId: cardId,
              userName: "",
            },
          ],
        });
      }
    },
  });
}

export function useUnassignMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UnAssignMemberParams) => {
      return await unAssignMemberToTaskCard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
        queryClient.invalidateQueries({
          queryKey: [
            "users",
            {
              boardId: boardId,
              cardId: cardId,
              userName: "",
            },
          ],
        });
      }
    },
  });
}

// comments

export function useGetCardComments(cardId: string) {
  return useQuery({
    queryKey: ["comments", { cardId }],
    queryFn: async () => await getComments({ cardId }),
    enabled: !!cardId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCommentParams) => {
      return await createComment(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["comments", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateCommentParams) => {
      return await updateComment(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        queryClient.invalidateQueries({
          queryKey: ["comments", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
      }
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DeleteCommentParams) => {
      return await deleteComment(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["comments", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

// labels...

export function useGetLabels(cardId: string) {
  return useQuery({
    queryKey: ["labels", { cardId }],
    queryFn: async () => await getLabels({ cardId }),
    enabled: !!cardId,
  });
}

export function useCreateLabel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateLabelParams) => {
      return await createLabel(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["labels", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useDeleteLabel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DeleteLabelParams) => {
      return await deleteLabel(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["labels", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

// attachments...

export function useGetAttachments(cardId: string) {
  return useQuery({
    queryKey: ["attachments", { cardId }],
    queryFn: async () => await getAttachments(cardId),
    enabled: !!cardId,
  });
}

export function useCreateAttachments() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateAttachmentParams) => {
      return await createAttachment(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["attachments", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useDeleteAttachment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DeleteAttachmentParams) => {
      return await deleteAttachment(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        const cardId = res.data.cardId;
        const boardId = res.data.boardId;
        queryClient.invalidateQueries({
          queryKey: ["attachments", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cards", { cardId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

// users search...
export function useUsersSearch(userName: string) {
  return useQuery({
    queryKey: ["users", { userName }],
    queryFn: async () => await getUsers(userName),
    // enabled: !!userName,
  });
}

export function useGetUsersNotInBoard(payload: GetUsersNotInBoardParams) {
  return useQuery({
    queryKey: [
      "users",
      { boardId: payload.boardId, userName: payload.userName },
    ],
    queryFn: async () => await getUsersNotInBoard(payload),
  });
}

export function useGetUsersInBoardNotInCard(
  payload: GetUsersInBoardNotInCardParams,
) {
  return useQuery({
    queryKey: [
      "users",
      {
        boardId: payload.boardId,
        cardId: payload.cardId,
        userName: payload.userName,
      },
    ],
    queryFn: async () => await getUsersInBoardNotInCard(payload),
  });
}
