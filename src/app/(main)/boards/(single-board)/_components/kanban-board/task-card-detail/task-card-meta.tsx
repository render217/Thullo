import { ICard } from "@/types";
import { TBoardTaskCard } from "@/types/t";

export default function TaskCardMeta({ card }: { card: TBoardTaskCard }) {
  return (
    <div>
      {/* <h3 className="mb-1">✋🏿 Move anything that is actually started here</h3>
      <p className="text-xs">
        in list{"  "}
        <span className="font-bold">In Progress</span>
      </p> */}
      <h3 className="mb-1">{card.title}</h3>
      <p className="text-xs">
        In list <span className="font-bold">{card.task.title}</span>
      </p>
    </div>
  );
}
