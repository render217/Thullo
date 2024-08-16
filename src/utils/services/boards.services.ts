import { api } from "@/lib/axios";
import { IBoard } from "@/types";
import { Response } from "@/types/axios.types";

class BoardsService {
  async getBoards(): Promise<Response<IBoard[]>> {
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
  async getBoard(id: string): Promise<Response<IBoard>> {
    try {
      const res = await api.get(`/boards/${id}`);
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
}

export default new BoardsService();
