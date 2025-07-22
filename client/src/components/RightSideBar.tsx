import { SignOutButton } from "@clerk/clerk-react";

function RightSideBar() {
  return (
    <>
      <div className="flex-1/3">
        custom calendar component
        <SignOutButton />
      </div>
    </>
  );
}

export default RightSideBar;
