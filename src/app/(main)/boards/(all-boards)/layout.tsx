import NavHeader from "@/components/shared/nav-header";

export default function AllBoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid h-[56px] items-center shadow-md">
        <NavHeader />
      </div>
      <main className="size-full h-[calc(100vh-58px)] overflow-y-hidden bg-gray-100">
        <div className="size-full overflow-y-auto">{children}</div>
      </main>
    </>
  );
}
