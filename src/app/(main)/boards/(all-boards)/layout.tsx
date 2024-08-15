import NavHeader from "@/components/shared/NavHeader";

export default function AllBoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="">{children}</div>
    </main>
  );
}
