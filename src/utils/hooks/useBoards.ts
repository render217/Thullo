import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import boardsServices from "../services/boards.services";
import { getBoards } from "../actions/board.actions";

export function useGetBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: () => boardsServices.getBoards(),
    // queryFn: async () => await getBoards(),
  });
}

export function useGetBoardById(id: string) {
  return useQuery({
    queryKey: ["board", { id }],
    queryFn: () => boardsServices.getBoard(id),
    enabled: !!id,
  });
}
