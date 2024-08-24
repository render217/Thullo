import { IBoard } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TBoard } from "@/types/t";
import { useEffect, useState } from "react";
import { checkImageUrl } from "@/lib/utils";

export default function BoardCard({ board }: { board: TBoard }) {
  const totalMembers = board.boardMember.length;
  const remainingMembers = totalMembers > 3 ? totalMembers - 3 : 0;
  const displayMembers = board.boardMember.slice(0, 3);
  return (
    <>
      <Card className="w-[16rem] max-w-[16rem] border transition-all duration-300 ease-in-out hover:shadow-md">
        <CardHeader className="p-0">
          <Link
            href={`/boards/${board.boardId}`}
            className="h-[200px] overflow-hidden p-4"
          >
            <BoardCardImage imageUrl={board?.boardImage} />
          </Link>
        </CardHeader>

        <CardContent className="border-b px-3 py-1.5">
          <CardTitle className="h-12">
            <Link
              href={`/boards/${board.boardId}`}
              className="text-lg font-semibold hover:underline"
            >
              {board.boardName}
            </Link>
          </CardTitle>
        </CardContent>
        <CardFooter className="h-12 px-3 py-2 pb-3">
          <div className="flex w-full items-center gap-3">
            {displayMembers.map((member) => {
              return (
                <div key={member.id} className="flex items-center gap-2">
                  <Image
                    src={member.profileImage}
                    height={100}
                    width={150}
                    alt="avatar"
                    className="h-7 w-8 rounded-md"
                  />
                </div>
              );
            })}
            {remainingMembers > 0 && (
              <span className="ml-auto block rounded-md border px-2 py-2 text-xs">
                + {remainingMembers} others
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

function BoardCardImage({ imageUrl }: { imageUrl: string }) {
  const defaultImageUrl =
    "https://utfs.io/f/b855ad0f-c8b6-4180-8837-467f7076a020-hut5o2.jpg";
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState<string>(defaultImageUrl);

  useEffect(() => {
    const validateImage = async () => {
      const validUrl = await checkImageUrl(imageUrl, defaultImageUrl);
      setImg(validUrl);
      setIsLoading(false);
    };
    validateImage();
  }, [imageUrl]);
  return (
    <div className="size-full rounded-md border">
      {!isLoading ? (
        <img
          className="mx-auto size-full max-h-[100%] max-w-[100%] object-contain"
          src={img}
          alt="board"
        />
      ) : (
        // <div className="h-[200px] w-full overflow-hidden rounded-md p-4">
        <div className="size-full animate-pulse rounded-md bg-gray-200 object-cover"></div>
        // </div>
      )}
    </div>
  );
}
