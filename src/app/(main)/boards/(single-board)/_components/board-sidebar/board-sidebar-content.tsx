"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle, SheetContent } from "@/components/ui/sheet";
import { IBoard, IUser } from "@/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CircleCheck,
  CirclePlus,
  CircleX,
  LoaderCircle,
  Pencil,
  ScrollText,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { cn, formatDate } from "@/lib/utils";
import { TBoardDetail, TBoardMember, TBoardTaskCard } from "@/types/t";
import BoardDescription from "./board-description";
import BoardTitle from "./board-title";
import {
  useDeleteBoard,
  useRemoveMemberFromBoard,
} from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import BlockScreen from "@/components/shared/loaders/block-screen";
import Spinner from "@/components/shared/loaders/spinner";

export default function BoardSideBarContent({
  board,
}: {
  board: TBoardDetail;
}) {
  const router = useRouter();
  const { userId } = useAuth();
  const isAdmin = board?.admin?.id === userId;
  const [openDialog, setOpenDialog] = useState(false);

  const {
    mutateAsync: deleteBoardAsync,
    isPending: isDeletingBoard,
    isSuccess,
  } = useDeleteBoard();
  const handleDeleteBoard = async () => {
    setOpenDialog(false);
    const payload = {
      boardId: board?.boardId,
      adminId: userId!,
    };
    const res = await deleteBoardAsync(payload);
    if (res.success) {
      console.log("deleted");
      router.replace("/boards");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/boards");
    }
  }, [isSuccess]);

  return (
    <>
      {isDeletingBoard && (
        <BlockScreen>
          <Spinner size={50} />
        </BlockScreen>
      )}

      <div
        className={cn("h-full overflow-hidden", isDeletingBoard && "hidden")}
      >
        <ScrollArea
          className={cn(
            "h-full pr-4",
            isDeletingBoard && "pointer-events-none z-50",
          )}
        >
          {/* <div className="">
          <h1 className="pb-1 text-lg font-semibold">{board.boardName}</h1>
          <Separator className="" />
        </div> */}
          <BoardTitle board={board} />
          {/* 
          ------------------------------------
            ADMDIN META
          ------------------------------------
        */}
          <div className="mt-3 space-y-2">
            <div className="w-fit rounded-lg border border-slate-300 px-2 py-0.5">
              <div className="flex items-center gap-2 text-gray-500">
                <User className="size-3" />
                <p className="text-[10px]">MadeBy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-md">
                <img
                  className="size-full object-cover"
                  src={board.admin.profileImage}
                  alt={board.admin.username}
                />
              </div>
              <div className="">
                <p className="text-xs font-semibold">{board.admin.username}</p>
              </div>
              <div className="ml-auto">
                {isAdmin && (
                  <Dialog
                    open={openDialog}
                    onOpenChange={(val) => {
                      setOpenDialog(val);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        disabled={isDeletingBoard}
                        className={cn(
                          "ml-auto h-6 w-20 border border-red-500 py-2 text-[10px] text-red-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white disabled:pointer-events-auto disabled:cursor-not-allowed",
                          isDeletingBoard &&
                            "cursor-not-allowed bg-red-500 text-white opacity-40",
                        )}
                        variant={"outline"}
                        size={"sm"}
                      >
                        {isDeletingBoard ? (
                          <LoaderCircle className="mx-auto size-4 animate-spin" />
                        ) : (
                          <p className="text-[10px]">Delete Board</p>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={cn("max-w-[400px] gap-2")}>
                      <DialogTitle>Are you sure to delete?</DialogTitle>
                      <div>
                        <DialogDescription className="space-y-1">
                          <p className="text-xs">
                            This action cannot be undone.
                          </p>
                          <p className="text-xs">
                            This will permanently delete{" "}
                            <span className="mr-2 cursor-pointer font-semibold underline">
                              {board.boardName}
                            </span>
                            {""}
                            and all it's content.
                          </p>
                        </DialogDescription>
                      </div>

                      <DialogFooter>
                        <div className="mt-3 flex w-full justify-end gap-2">
                          <DialogClose asChild>
                            <Button
                              onClick={() => {}}
                              className="block h-7 w-20 border border-slate-300 text-xs hover:border-slate-800"
                              size={"sm"}
                              variant={"outline"}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            onClick={handleDeleteBoard}
                            className="block h-7 w-20 text-xs"
                            size={"sm"}
                          >
                            {isDeletingBoard ? (
                              <LoaderCircle className="mx-auto size-4 animate-spin" />
                            ) : (
                              <p>Proceed</p>
                            )}
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
          {/* 
          ------------------------------------
            DESCRIPTION
          ------------------------------------
        */}

          <div className="mt-3">
            <BoardDescription board={board} />
          </div>
          {/* 
          ------------------------------------
            MEMBERS
          ------------------------------------
        */}
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="w-fit rounded-lg border border-slate-300 px-2 py-0.5">
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="size-3" />
                  <p className="text-[10px]">Teams</p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <ScrollArea className="p-1 pr-4">
                <div className="flex flex-col gap-2">
                  <TeamMember
                    isAdmin={true}
                    member={board.admin}
                    boardId={board?.boardId}
                  />
                  {board.boardMember.length > 0 ? (
                    <>
                      {board.boardMember.map((member) => (
                        <TeamMember
                          key={member.id}
                          member={member}
                          allowRemove={isAdmin}
                          boardId={board?.boardId}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-center text-xs">No members</p>
                    </>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <ScrollBar className="block" />
        </ScrollArea>
      </div>
    </>
  );
}

function TeamMember({
  boardId,
  member,
  allowRemove,
  isAdmin = false,
}: {
  member: TBoardMember;
  allowRemove?: Boolean;
  isAdmin?: Boolean;
  boardId: string;
}) {
  const { mutateAsync: removeMemberAsync, isPending: isRemoving } =
    useRemoveMemberFromBoard();

  const handleRemoveMember = async () => {
    const payload = {
      boardId: boardId,
      userId: member.id,
    };
    const res = await removeMemberAsync(payload);
    if (res.success) {
      // console.log("Member removed successfully");
    }
  };

  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-7 w-7 overflow-hidden rounded-md">
        <img
          className="size-full object-cover"
          src={member.profileImage}
          alt="person"
        />
      </div>
      <p className="text-[10px] font-medium">{member.username}</p>
      {isAdmin && (
        <Button
          className="ml-auto h-6 w-20 border py-2 text-[10px] transition-all duration-300 ease-in-out hover:cursor-text hover:bg-transparent"
          variant={"outline"}
          size={"sm"}
        >
          Admin
        </Button>
      )}
      {allowRemove && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="ml-auto h-6 w-20 border border-red-500 py-2 text-[10px] text-red-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
              variant={"outline"}
              size={"sm"}
            >
              {isRemoving ? (
                <LoaderCircle className="mx-auto size-4 animate-spin" />
              ) : (
                <p>Remove</p>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[400px] gap-2">
            <DialogTitle>Are you sure you want to remove?</DialogTitle>
            <div>
              <DialogDescription className="space-y-1">
                <p className="text-xs">This action cannot be undone.</p>
                <p className="text-xs">
                  This will permanently remove{" "}
                  <span className="mr-2 cursor-pointer font-semibold underline">
                    {member.username}
                  </span>
                  {""}
                  from the board.
                </p>
              </DialogDescription>
            </div>

            <DialogFooter>
              <div className="mt-3 flex w-full justify-end gap-2">
                <DialogClose asChild>
                  <Button
                    onClick={() => {}}
                    className="block h-7 w-20 border border-slate-300 text-xs hover:border-slate-800"
                    size={"sm"}
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleRemoveMember}
                  className="block h-7 w-20 text-xs"
                  size={"sm"}
                >
                  {isRemoving ? (
                    <LoaderCircle className="mx-auto size-4 animate-spin" />
                  ) : (
                    <p>Proceed</p>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

{
  /* <Textarea
                  className="my-2 py-3 pl-2 pr-4 text-xs focus-visible:ring-0"
                  defaultValue={board.description}
                  disabled={!isEdit}
                /> */
}
{
  /* <p>Simple board to start on a project.</p>
                <p>
                  Each list can hold items (cards) that represent ideas or
                  tasks.
                </p>
                <p>There 4 lists here:</p>* Backlog 🤔 : Ideas are created here.
                Here people can describe the idea following three simple
                questions: Why you wish to do it, What it is, how can you do it.
                * In Progress📚: Once the ideas is clearly defined, the task can
                move to #todo stage. Here the owner of the idea can move to
                #doing once s/he is ready. He can also wait a bit for other
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish.
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish.
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish.
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish. */
}
