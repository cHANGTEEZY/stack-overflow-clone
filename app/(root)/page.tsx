import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log("Your session", session);

  return (
    <div>
      <h1 className="h1-bold">Hello NextJS</h1>

      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";

          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <Button type="submit">Signout</Button>
      </form>
    </div>
  );
};

export default page;
