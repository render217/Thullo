import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import boardsServices from "../services/boards.services";
import { createBoard, getBoard, getBoards } from "../actions/board.actions";
import {
  CreateBoardParams,
  CreateBoardTaskCardParams,
  CreateBoardTaskParams,
} from "../actions/shared.types";
import { createBoardTask, deleteBoardTask } from "../actions/boardTask.actions";
import { createBoardTaskCard } from "../actions/boardTaskCard.actions";

export function useGetBoards() {
  return useQuery({
    queryKey: ["boards"],
    // queryFn: () => boardsServices.getBoards(),
    queryFn: async () => await getBoards(),
  });
}

export function useGetBoardById(id: string) {
  return useQuery({
    queryKey: ["boards", { id }],
    // queryFn: () => boardsServices.getBoard(id),
    queryFn: async () => await getBoard(id),
    enabled: !!id,
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

export function useCreateBoardTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBoardTaskParams) => {
      return await createBoardTask(payload);
    },
    onSuccess: (response) => {
      if (response.success) {
        console.log("success useCreateBoardTask()", response.data);
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
        console.log("success useDeleteBoardTask()", response.data);
        const boardId = response.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}

export function useCreateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBoardTaskCardParams) => {
      return await createBoardTaskCard(payload);
    },
    onSuccess: (res) => {
      if (res.success) {
        console.log("success useCreateCard()", res.data);
        const boardId = res.data.board.boardId;
        queryClient.invalidateQueries({
          queryKey: ["boards", { id: boardId }],
        });
      }
    },
  });
}
