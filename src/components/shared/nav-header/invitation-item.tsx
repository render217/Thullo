import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TBoard } from "@/types";

export default function InvitationItem({ board }: { board: TBoard }) {
  const [open, setOpen] = useState(false);

  const handleDecline = () => {
    setOpen(false);
  };
  const handleAccept = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogTrigger className="text-start">
          <div className="cursor-pointer rounded-md border border-slate-200 p-1 hover:bg-slate-100">
            <div>
              <p className="text-[10px] font-semibold">
                Invitation received from:{" "}
              </p>
              <p className="text-[10px]">{board.boardName}</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] gap-2">
          <DialogTitle className="text-center text-xl">Invitation</DialogTitle>
          <div>
            <DialogDescription className="flex justify-center">
              <div className="space-y-1">
                <p className="text-center text-xs">
                  You were invited to join the board:{" "}
                </p>
                <div className="cursor-pointer text-xs font-semibold">
                  <p className="w-fit bg-blue-200 p-2 text-blue-500">
                    {board.boardName}
                  </p>
                </div>
              </div>
            </DialogDescription>
          </div>
          <DialogFooter>
            <div className="mt-3 flex w-full justify-center gap-2">
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                className="block h-7 w-20 border border-slate-300 text-xs hover:border-slate-800"
                size={"sm"}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDecline}
                className="block h-7 w-20 text-xs"
                size={"sm"}
                variant={"destructive"}
              >
                Decline
              </Button>
              <Button
                onClick={handleAccept}
                className="block h-7 w-20 bg-slate-800 text-xs text-white hover:bg-slate-700"
                size={"sm"}
              >
                Accept
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
