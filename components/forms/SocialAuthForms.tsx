import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const SocialAuthForms = () => {
  const buttonClass = `background-dark400_light900 body-medium text-dark-100 
    min-h-12 rounded-2 px-4 py-3.5 flex-1 cursor-pointer`;

  return (
    <div className="mt-10 flex flex-wrap gap-2.5 ">
      <Button className={buttonClass}>
        <Image
          src={"/icons/github.svg"}
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
          alt="Github logo"
        />
        <span>Login in with Github</span>
      </Button>

      <Button className={buttonClass}>
        <Image
          src={"/icons/google.svg"}
          width={20}
          height={20}
          className="mr-2.5 object-contain"
          alt="Google logo"
        />
        <span>Login in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForms;
