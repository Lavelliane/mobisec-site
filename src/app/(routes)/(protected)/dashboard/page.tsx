import React from "react";
import { signOut } from "../../../../../auth";

const Dashboard = () => {
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
