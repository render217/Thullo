import BoardSideBar from "../board-sidebar";
import BoardMemebers from "./board-members";
import ChangeVisibility from "./change-visibility";
import InviteUser from "./invite-user";

export default function BoardNav() {
  return (
    <div className="px-[2%]">
      <div className="flex items-center gap-4">
        <ChangeVisibility />
        <BoardMemebers />
        <InviteUser />
        <div className="ml-auto">
          <BoardSideBar />
        </div>
      </div>
    </div>
  );
}
