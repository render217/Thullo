import NavHeader from "@/components/shared/NavHeader";
import BoardNav from "./_components/board-nav";

export default function SingleBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid h-[56px] items-center border-b border-gray-200 shadow-md">
        <NavHeader />
      </div>
      <div className="grid h-[56px] items-center bg-gray-50">
        <BoardNav />
      </div>
      <main className="w-full bg-gray-100 p-[32px]">
        <div className="-m-[32px] h-[calc(100vh-116px)]">{children}</div>
      </main>
    </>
  );
}
