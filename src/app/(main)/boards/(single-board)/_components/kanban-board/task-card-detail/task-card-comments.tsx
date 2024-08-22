import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ICard } from "@/types";
import { TBoardTaskCard } from "@/types/t";

export default function TaskCardComments({ card }: { card: TBoardTaskCard }) {
  return (
    <div>
      {/* <div className="py-2 text-xs font-bold">Comments</div> */}
      <div className="px-0.5">
        <div className="relative">
          <div className="absolute left-2 top-2 h-7 w-7 overflow-hidden rounded-md">
            {/* <img
              className="size-full object-cover"
              src={card.}
              alt=""
            /> */}
          </div>
          <Textarea
            className="pl-[42px] pt-[10px] text-xs focus-visible:ring-0"
            placeholder="Write a comment "
          />
        </div>

        <div className="flex justify-end py-2">
          <Button size={"sm"} className="h-fit py-1 text-[10px]">
            add comment
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 py-6">
        {card.comments.map((comment) => {
          return (
            <div
              key={comment.commentId}
              className="mb-4 space-y-2 border-b border-b-slate-300 pb-1"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 overflow-hidden rounded-md">
                  <img
                    className="size-full object-cover"
                    src={comment.author.profileImage}
                    alt={comment.author.username}
                  />
                </div>
                <div>
                  <p className="text-[10px]">{comment.author.username}</p>
                  <p className="text-[8px]">{comment.createdAt}</p>
                </div>
              </div>
              <div className="">
                <p className="text-[10px]">{comment.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
