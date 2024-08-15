import { IBoard } from "@/types";
import BoardCard from "./board-card";
import BoardList from "./board-list";

async function getBoards() {
  const response = await fetch("http:/localhost:3000/api/boards");
  const boards = await response.json();
  return boards;
}

export default async function BoardFeed() {
  const boards = (await getBoards()) as IBoard[];

  return (
    <div>
      <BoardList boards={boards} />
    </div>
  );
}
