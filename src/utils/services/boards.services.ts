import { api } from "@/lib/axios";
import { TBoard } from "@/types";
import { Response } from "@/types/axios.types";
import { isAxiosError } from "axios";

class BoardsService {
  async getBoards(): Promise<Response<TBoard[]>> {
    try {
      const res = await api.get("/boards");
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async getBoard(id: string): Promise<Response<TBoard>> {
    try {
      const res = await api.get(`/boards/${id}`);
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      if (error.response.status === 404) {
        return {
          success: false,
          data: "Board not found",
        };
      }
      return {
        success: false,
        data: error.message || "Something went wrong",
      };
    }
  }
}

export default new BoardsService();
