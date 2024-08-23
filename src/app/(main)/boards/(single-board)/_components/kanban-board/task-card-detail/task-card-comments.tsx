import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ICard, IComment } from "@/types";
import { TBoardTaskCard, TComment } from "@/types/t";

const userImage =
  "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4";

export default function TaskCardComments({ card }: { card: TBoardTaskCard }) {
  return (
    <div>
      <div className="py-2 text-xs font-bold">Comments</div>
      <div className="px-0.5">
        <div className="relative">
          <div className="absolute left-2 top-2 h-7 w-7 overflow-hidden rounded-md">
            <img className="size-full object-cover" src={userImage} alt="" />
          </div>
          <AutosizeTextarea
            minHeight={80}
            className="min-h-[80px] resize-none pl-[42px] pt-[10px] text-xs focus-visible:ring-0"
            placeholder="Write a comment "
          />
        </div>

        <div className="flex justify-end py-2">
          <Button size={"sm"} className="h-fit py-1 text-[10px]">
            add comment
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 px-2 py-3">
        {comments.map((comment) => {
          return (
            <div
              key={comment.commentId}
              className="mb-4 space-y-2 border-b border-b-slate-300 pb-1"
            >
              <div className="flex gap-2">
                <div className="h-8 w-8 overflow-hidden rounded-md">
                  <img
                    className="size-full object-cover"
                    src={comment.author.profileImage}
                    alt={comment.author.username}
                  />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <p className="text-xs font-bold">{comment.author.username}</p>
                  <p className="text-[10px] text-gray-500">
                    {comment.createdAt}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2 self-start">
                  <p className="cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline">
                    Edit
                  </p>
                  <p className="cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline">
                    Delete
                  </p>
                </div>
              </div>
              <div className="">
                <p className="text-[12px]">
                  {comment.content}
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellat illum, dolorum obcaecati odio architecto atque
                  corporis sed ipsam velit perspiciatis.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const comments: TComment[] = [];

const commentss: TComment[] = [
  {
    commentId: "daf",
    cardId: "",
    author: {
      id: "dssa",
      profileImage:
        "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
      email: "beamlak@gmail.com",
      username: "Beamlak Samson",
      createdAt: "",
    },
    content: "good man",
    createdAt: "24 August at 20:43",
    updatedAt: "",
  },
  {
    commentId: "test",
    cardId: "",
    author: {
      id: "dssa",
      profileImage:
        "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
      email: "beamlak@gmail.com",
      username: "Beamlak Samson",
      createdAt: "",
    },
    content: "good man",
    createdAt: "24 August at 20:43",
    updatedAt: "",
  },
  {
    commentId: "test3",
    cardId: "",
    author: {
      id: "dssa",
      profileImage:
        "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
      email: "beamlak@gmail.com",
      username: "Beamlak Samson",
      createdAt: "",
    },
    content: "good man",
    createdAt: "24 August at 20:43",
    updatedAt: "",
  },
];
