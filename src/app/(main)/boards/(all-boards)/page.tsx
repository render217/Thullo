import { useState } from "react";
import BoardCreateForm from "./_components/board/board-create-form";
import BoardFeed from "./_components/board/board-feed";
import BoardFilter from "./_components/board/board-filter";

export default function page() {
  return (
    <div className="size-full pt-6">
      <div className="mx-auto max-w-[1300px] px-[20px]">
        {/*  */}
        <div className="flex items-center justify-between py-2">
          <BoardFilter />
          <BoardCreateForm />
        </div>

        <div className="mt-4 pb-14">
          <BoardFeed />
        </div>
      </div>
    </div>
  );
}
