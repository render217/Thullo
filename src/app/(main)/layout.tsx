import NavHeader from "@/components/shared/NavHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="grid h-[56px] items-center shadow-md">
        <NavHeader />
      </div>
      <main>
        <div className="min-h-[calc(100vh-58px)] bg-gray-200">{children}</div>
      </main>
    </div>
  );
}
