"use client";
export default function BlockScreen({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      onClick={() => {
        return;
      }}
      className="pointer-events-none fixed inset-0 z-[100] h-screen w-screen bg-black/80"
    >
      <div className="pointer-events-none z-[99] size-full">
        <div className="z-50 flex size-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
