export default function BoardBackgroundImage() {
  return (
    <div className="size-full">
      <img
        className="absolute inset-0 size-full filter"
        src={"/images/kanban.jpg"}
        alt="background"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
}
