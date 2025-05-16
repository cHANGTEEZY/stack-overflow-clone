"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForms = () => {
  const buttonClass = `background-dark400_light900 body-medium text-dark-100 
    min-h-12 rounded-2 px-4 py-3.5 flex-1 cursor-pointer`;

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.error(error);
      toast.error("Sign-in Error", {
        description:
          error instanceof Error
            ? error.message
            : "Error occurred during signing in",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5 ">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src={"/icons/github.svg"}
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
          alt="Github logo"
        />
        <span className="dark:text-white">Login in with Github</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src={"/icons/google.svg"}
          width={20}
          height={20}
          className="mr-2.5 object-contain"
          alt="Google logo"
        />
        <span className="dark:text-white">Login in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForms;
