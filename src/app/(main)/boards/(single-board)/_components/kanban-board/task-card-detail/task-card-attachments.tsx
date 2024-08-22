import { Avatar } from "@/components/ui/avatar";
import { ICard } from "@/types";
import { TBoardTaskCard } from "@/types/t";

export default function TaskCardAttachments({
  card,
}: {
  card: TBoardTaskCard;
}) {
  return (
    <div className="py-4">
      <p className="py-2 text-xs font-bold">Attachments</p>
      <div>
        {card.attachments.map((attachment) => {
          return (
            <div
              key={attachment.attachmentId}
              className="flex w-fit items-start gap-2 p-2"
            >
              <div className="flex flex-col items-start justify-center">
                <Avatar className="size-5">
                  <img src={attachment.author.profileImage} alt="" />
                </Avatar>
              </div>
              <div>
                <a
                  href="#"
                  className="block text-[10px] text-purple-500 underline hover:cursor-pointer hover:text-purple-900"
                >
                  download url
                </a>
                <div className="text-[8px] italic">{attachment.url}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
