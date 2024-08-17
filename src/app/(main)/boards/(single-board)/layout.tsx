import NavHeader from "@/components/shared/nav-header";
import BoardNav from "./_components/board-nav";
import Image from "next/image";

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
      <div className="grid h-[50px] items-center bg-gray-50">
        <BoardNav />
      </div>

      <main className="relative w-full p-[5px]">
        <div className="-m-[5px] h-[calc(100vh-108px)]">{children}</div>
      </main>
    </>
  );
}
