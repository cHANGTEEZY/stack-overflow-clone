import { auth, signOut } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log("Your session", session);

  return (
    <div>
      <h1 className="h1-bold">Hello NextJS</h1>
    </div>
  );
};

export default page;
