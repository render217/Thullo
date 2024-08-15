import BoardCreateForm from "@/components/shared/Board/board-create-form";
import BoardFeed from "@/components/shared/Board/board-feed";

export default function page() {
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-7xl px-[1%]">
        {/*  */}
        <div className="flex items-center justify-between py-2">
          <h1 className="font-semibold">All Boards</h1>
          <BoardCreateForm />
        </div>
        {/*  */}
        <div className="my-8">
          <BoardFeed />
        </div>
        {/*  */}
      </div>
    </div>
  );
}
