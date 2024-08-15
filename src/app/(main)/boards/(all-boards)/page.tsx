import BoardCreateForm from "@/components/shared/Board/board-create-form";
import BoardFeed from "@/components/shared/Board/board-feed";

export default function page() {
  return (
    <div className="size-full pt-6">
      <div className="mx-auto max-w-[1160px] px-[20px]">
        {/*  */}
        <div className="flex items-center justify-between py-2">
          <h1 className="font-semibold">All Boards</h1>
          <BoardCreateForm />
        </div>

        <div className="mt-4 pb-14">
          <BoardFeed />
        </div>
      </div>
    </div>
  );
}
