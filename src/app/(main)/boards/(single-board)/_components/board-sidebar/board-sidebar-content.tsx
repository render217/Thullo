"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { IBoard, IUser } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Pencil,
  ScrollText,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function BoardSideBarContent({ board }: { board: IBoard }) {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit(!isEdit);
  return (
    <>
      <SheetHeader className="mb-3">
        <SheetTitle>{board.title}</SheetTitle>
      </SheetHeader>
      <Separator className="mb-4 border bg-slate-300" />

      <div>
        {/* ADMIN */}
        <div>
          <Badge className="border-2" variant={"outline"}>
            <div className="flex w-20 items-end gap-2">
              <User className="size-4" />
              <p className="text-xs font-medium">Made By</p>
            </div>
          </Badge>

          <div className="mb-3 mt-2 flex items-center gap-3 py-2">
            <Image
              className="h-8 w-8 rounded-md"
              src={board.admin.profileImage}
              height={200}
              width={100}
              alt="person"
            />
            <div className="">
              <p className="text-sm font-semibold">{board.admin.username}</p>
              <p className="text-xs text-slate-400">{board.createdAt}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="">
          <div className="mb-3 flex items-end justify-between">
            <Badge className="border-2" variant={"outline"}>
              <div className="flex w-24 items-center gap-2">
                <ScrollText className="size-4" />
                <p className="text-xs font-medium">Description</p>
              </div>
            </Badge>
            {!isEdit ? (
              <Button
                onClick={toggleEdit}
                className="h-6 border-2"
                size={"sm"}
                variant={"outline"}
              >
                <div className="flex items-center gap-2">
                  <Pencil className="size-4" />
                  <p className="text-xs font-semibold">Edit</p>
                </div>
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  onClick={toggleEdit}
                  className="h-6 border-2 border-red-500"
                  size={"sm"}
                  variant={"outline"}
                >
                  <div className="flex items-center gap-2 text-red-500">
                    <CircleX className="size-4" />
                    <p className="text-xs font-semibold">Cancel</p>
                  </div>
                </Button>
                <Button
                  onClick={toggleEdit}
                  className="h-6 border-2 border-blue-500"
                  size={"sm"}
                  variant={"outline"}
                >
                  <div className="flex items-center gap-2 text-blue-500">
                    <CircleCheck className="size-4" />
                    <p className="text-xs font-semibold">Save</p>
                  </div>
                </Button>
              </div>
            )}
          </div>
          <div>
            {!isEdit ? (
              <ScrollArea className="h-[18rem] py-3 pl-2 pr-4 text-sm">
                <p>Simple board to start on a project.</p>
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
              </ScrollArea>
            ) : (
              <Textarea
                className="h-[18rem] py-3 pl-2 pr-4 text-sm"
                defaultValue={board.description}
                disabled={!isEdit}
              />
            )}
          </div>
        </div>

        {/* Members */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <Badge className="border-2" variant={"outline"}>
              <div className="flex w-20 items-center gap-2">
                <Users className="size-4" />
                <p className="text-xs">Teams</p>
              </div>
            </Badge>
            <Button className="h-6 border-2" size={"sm"} variant={"outline"}>
              <div className="flex items-center gap-2">
                <CirclePlus className="size-4" />
                <p className="text-xs font-semibold">New Member</p>
              </div>
            </Button>
          </div>
          <div>
            <ScrollArea className="h-40 pr-4">
              <div className="flex flex-col gap-3">
                <TeamMember isAdmin={true} member={board.admin} />
                {board.members.map((member) => (
                  <TeamMember key={member.id} member={member} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}

function TeamMember({
  member,
  isAdmin = false,
}: {
  member: IUser;
  isAdmin?: Boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-1">
      <Image
        className="h-7 w-7"
        src={member.profileImage}
        height={100}
        width={100}
        alt="person"
      />
      <p className="text-xs font-semibold">{member.username}</p>
      {isAdmin ? (
        <Button
          className="ml-auto h-6 w-20 border py-2 text-xs transition-all duration-300 ease-in-out hover:cursor-text hover:bg-transparent"
          variant={"outline"}
          size={"sm"}
        >
          Admin
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="ml-auto h-6 w-20 border border-red-500 py-2 text-xs text-red-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
              variant={"outline"}
              size={"sm"}
            >
              Remove
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to remove?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently remove{" "}
                <span className="mr-2 cursor-pointer font-semibold underline">
                  {member.username}
                </span>
                from the board.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button
                  size="sm"
                  type="button"
                  className="w-20 border-2 bg-slate-500 text-xs hover:bg-slate-500/80"
                >
                  Close
                </Button>
              </DialogClose>
              <Button size="sm" className="w-20 text-xs">
                Procceed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
