import { ICard } from "@/types";
import Image from "next/image";

export default function TaskCardCoverImage({ card }: { card: ICard }) {
  return (
    <>
      {card.coverPhoto && (
        <Image
          className="size-full rounded-lg object-cover"
          src={card.coverPhoto}
          height={200}
          width={1000}
          alt=""
        />
      )}
    </>
  );
}
