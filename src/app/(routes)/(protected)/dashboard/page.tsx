import React from "react";
import { signOut } from "../../../../../auth";
import { auth } from "../../../../../auth";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default Dashboard;
