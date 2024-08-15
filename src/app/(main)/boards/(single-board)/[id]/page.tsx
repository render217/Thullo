import KanbanBoard from "@/components/shared/Board/kanban-board";
import { IBoard } from "@/types";

type PageProps = {
  params: {
    id: string;
  };
};

async function getBoard(id: string) {
  const response = await fetch(`http:/localhost:3000/api/boards/${id}`);
  const board = await response.json();
  return board;
}

export default async function page({ params }: PageProps) {
  const id = params.id;

  const board = (await getBoard(id)) as IBoard;

  if (!board) {
    return (
      <div>
        <div>Board Not Found</div>
      </div>
    );
  }

  return (
    <>
      <KanbanBoard />
    </>
  );
}
