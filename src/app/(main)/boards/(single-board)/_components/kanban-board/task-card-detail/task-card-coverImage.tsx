import { ICard } from "@/types";
import { TBoardTaskCard } from "@/types/t";
import Image from "next/image";

export default function TaskCardCoverImage({ card }: { card: TBoardTaskCard }) {
  return (
    <>
      {card.coverImage && (
        <Image
          className="size-full rounded-lg object-cover"
          src={card.coverImage}
          height={200}
          width={1000}
          alt=""
        />
      )}
    </>
  );
}
