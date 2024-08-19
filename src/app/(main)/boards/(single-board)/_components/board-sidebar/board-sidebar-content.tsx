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
    <div className="h-full overflow-hidden">
      <ScrollArea className="h-full pr-4">
        <div className="">
          <h1 className="font-semibol pb-1">{board.title}</h1>
          <Separator className="" />
        </div>
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
                alt={board.admin.profileImage}
              />
            </div>
            <div className="">
              <p className="text-xs font-semibold">{board.admin.username}</p>
              <p className="text-[10px] text-slate-400">{board.createdAt}</p>
            </div>
          </div>
        </div>
        {/* 
          ------------------------------------
            DESCRIPTION
          ------------------------------------
        */}
        <div className="mt-3">
          <div className="flex items-end justify-between">
            <div className="w-fit rounded-lg border border-slate-300 px-2 py-0.5">
              <div className="flex items-center gap-2 text-gray-500">
                <ScrollText className="size-3" />
                <p className="text-[10px]">Description</p>
              </div>
            </div>
            {!isEdit ? (
              <Button
                onClick={toggleEdit}
                className="rounded-xs h-[22px] px-4 py-1"
                size={"sm"}
                variant={"outline"}
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <Pencil className="size-3" />
                  <p className="text-xs font-semibold">Edit</p>
                </div>
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  onClick={toggleEdit}
                  className="rounded-xs h-[22px] border-red-500 px-4 py-1 hover:bg-red-100"
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
                  className="rounded-xs h-[22px] border-blue-500 hover:bg-blue-100"
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
              <ScrollArea className="my-2 p-1 text-xs">
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
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish.
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish.
                members to join. * In Review ⚙️: On-going * Completed 🙌🏽**:
                Finished You could add other lists like labels holding labels
                (with colors) in order to tag each card by a label if you wish.
              </ScrollArea>
            ) : (
              <div className="p-1">
                <Textarea
                  className="my-2 py-3 pl-2 pr-4 text-xs focus-visible:ring-0"
                  defaultValue={board.description}
                  disabled={!isEdit}
                />
              </div>
            )}
          </div>
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
                <TeamMember isAdmin={true} member={board.admin} />

                {board.members.map((member) => (
                  <TeamMember key={member.id} member={member} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <ScrollBar className="block" />
      </ScrollArea>
    </div>
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
    <div className="flex items-center gap-3 py-1">
      <div className="h-7 w-7 overflow-hidden rounded-md">
        <img
          className="size-full object-cover"
          src={member.profileImage}
          alt="person"
        />
      </div>
      <p className="text-[10px] font-medium">{member.username}</p>
      {isAdmin ? (
        <Button
          className="ml-auto h-6 w-20 border py-2 text-[10px] transition-all duration-300 ease-in-out hover:cursor-text hover:bg-transparent"
          variant={"outline"}
          size={"sm"}
        >
          Admin
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="ml-auto h-6 w-20 border border-red-500 py-2 text-[10px] text-red-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
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
