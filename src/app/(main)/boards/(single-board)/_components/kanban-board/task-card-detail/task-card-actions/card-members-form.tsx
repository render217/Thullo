"use client";
import { CircleX, LoaderCircle, Plus, Search, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useActionSelector } from ".";
import { TBoardTaskCard, TCardMember, TCommonUser } from "@/types/t";
import {
  useAssignMembers,
  useGetUsersInBoardNotInCard,
  useUnassignMember,
} from "@/utils/hooks/useBoards";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useCardStore } from "@/lib/store/useCardStore";
export default function CardMembersForm() {
  const { card } = useCardStore();
  const [members, setMembers] = useState(card?.cardMembers || []);

  useEffect(() => {
    setMembers(card?.cardMembers || []);
  }, [card?.cardMembers]);

  const { memberSelected, openAction, showMember } = useActionSelector();
  const [selectedUsers, setSelectedUsers] = useState<TCardMember[]>([]);
  const [memberName, setMemberName] = useState("");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const debonceFn = setTimeout(() => {
      if (searchVal) {
        setMemberName(searchVal);
      } else {
        setMemberName("");
      }
    }, 800);
    return () => clearInterval(debonceFn);
  }, [searchVal]);

  const { data, isLoading, refetch } = useGetUsersInBoardNotInCard({
    boardId: card?.board?.boardId,
    cardId: card?.cardId,
    userName: memberName,
  });

  const { mutateAsync: assignMembersAsync, isPending: isAssigingMembers } =
    useAssignMembers();

  const { mutateAsync: unAssignMember, isPending: isUnAssigningMember } =
    useUnassignMember();

  const usersResult = data?.success ? data.data : [];

  const filteredUsers =
    usersResult.filter(
      (user) => !selectedUsers.some((selected) => selected.id === user.id),
    ) || [];

  const handleSearchClick = () => {
    refetch();
  };

  const handleSelect = (u: TCommonUser) => {
    setSelectedUsers((prev) => [...prev, u]);
  };

  const handleDeSelect = (u: TCommonUser) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== u.id));
  };

  const handleAssignMembers = async () => {
    if (isAssigingMembers) return;
    const payload = {
      cardId: card.cardId,
      userIds: selectedUsers.map((user) => user.id),
    };

    const res = await assignMembersAsync(payload);
    if (res.success) {
      // console.log(res.data);
      setSelectedUsers([]);
    }
  };

  const handleUnAssignMember = async (user: TCommonUser) => {
    if (isUnAssigningMember) return;
    const payload = {
      cardId: card?.cardId,
      userId: user.id,
    };
    const res = await unAssignMember(payload);
    if (res.success) {
      // console.log("unassign member success", res.data);
    }
  };

  return (
    <div>
      {!memberSelected && (
        <div
          onClick={() => openAction("showMember")}
          className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300"
        >
          <Users className="size-4" />
          <p>Members</p>
        </div>
      )}
      {showMember && (
        <div className="flex items-center gap-2 text-gray-500">
          <Users className="size-3" />
          <p className="text-[10px]">Members</p>
        </div>
      )}
      {showMember && (
        <>
          {members.length > 0 && (
            <ScrollArea className="h-[140px] rounded-md border p-1">
              <div className="flex flex-col gap-2 py-2">
                {members.map((member) => {
                  return (
                    <div key={member.id} className="flex gap-2">
                      <div className="h-8 min-w-8 max-w-8 overflow-hidden rounded-sm">
                        <img
                          className="size-full object-cover"
                          src={member.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="relative w-full">
                        <h2 className="max-w-[140px] overflow-hidden truncate text-[10px] text-black">
                          {member.username}
                        </h2>
                        <span
                          onClick={() => handleUnAssignMember(member)}
                          className={cn(
                            "absolute bottom-0 block w-[40px] cursor-pointer rounded-sm border border-red-500 text-center text-[8px] text-red-500 hover:bg-red-200",
                            isUnAssigningMember
                              ? "cursor-not-allowed bg-red-200 opacity-40"
                              : "",
                          )}
                        >
                          {isUnAssigningMember ? (
                            <LoaderCircle className="mx-auto size-3 animate-spin" />
                          ) : (
                            "Remove"
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-5 w-full">
              <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md bg-blue-200 p-2 text-xs text-blue-500 shadow-sm hover:bg-blue-300">
                <p>Assign a member</p>
                <Plus className="size-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[220px] p-3">
              <div>
                <h3 className="text-sm font-semibold">Members</h3>
                <p className="text-[10px]">Assign members to this card</p>
              </div>
              {/* break to other component */}
              <div className="relative py-2">
                <Input
                  className="h-6 py-0.5 pr-[28px] text-[10px] shadow-sm focus-visible:ring-0"
                  placeholder="search for member..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <Button
                  onClick={handleSearchClick}
                  className="absolute right-1 top-2.5 h-5 w-fit p-1"
                >
                  <Search className="size-3" />
                </Button>
              </div>
              {/* break to other component */}
              {/* <div className="grid h-[140px] place-content-center">
                <p className="text-center text-[10px]"></p>
              </div> */}

              {/* break to other component */}
              {selectedUsers.length > 0 && (
                <div className="my-2">
                  <ScrollArea className="max-w-[200px] rounded-md border border-slate-300">
                    <div className="flex gap-3 p-2 py-3">
                      {selectedUsers.map((user) => {
                        return (
                          <div
                            key={user.id}
                            className={cn(
                              "relative grid w-fit place-content-center rounded-md border border-slate-400 px-2",
                            )}
                          >
                            <span className="block text-[10px] font-light">
                              {user.username}
                            </span>
                            <span
                              onClick={() => handleDeSelect(user)}
                              className="absolute -right-2 -top-1 cursor-pointer rounded-full bg-red-500 text-white hover:scale-x-110"
                            >
                              <CircleX className="size-3" />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}

              <div className="h-[140px] overflow-hidden rounded-md border border-slate-300">
                <ScrollArea className="h-[140px] pr-2">
                  {isLoading && (
                    <div className="grid size-full h-[130px] place-content-center">
                      <LoaderCircle className="mx-auto size-4 animate-spin" />
                    </div>
                  )}

                  {!isLoading && filteredUsers.length === 0 && (
                    <div className="grid size-full h-[130px] place-content-center">
                      <p className="text-[12px]">No users avalible</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 p-1">
                    {filteredUsers.map((user) => {
                      return (
                        <div
                          key={user.id}
                          className="relative flex cursor-pointer items-center gap-2 rounded-sm border p-1 hover:bg-slate-100"
                        >
                          <Avatar className="h-4 w-4">
                            <img
                              className="size-full object-cover"
                              src={user.profileImage}
                              alt={user.username}
                            />
                          </Avatar>
                          <div className="relative">
                            <h2 className="w-[105px] truncate text-[10px]">
                              {user.username}
                            </h2>
                          </div>
                          <span
                            onClick={() => handleSelect(user)}
                            className="absolute right-1 top-1 block rounded-md border bg-blue-500 p-0.5 px-1 text-[8px] text-white"
                          >
                            select
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>

              {selectedUsers.length > 0 && (
                <div className="mt-2">
                  <Button
                    onClick={handleAssignMembers}
                    size={"sm"}
                    className={cn(
                      "mx-auto block h-6 w-[100px] text-[10px]",
                      isAssigingMembers ? "cursor-not-allowed opacity-40" : "",
                    )}
                  >
                    {isAssigingMembers ? (
                      <LoaderCircle className="mx-auto size-4 animate-spin" />
                    ) : (
                      <p>Assign Members</p>
                    )}
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
