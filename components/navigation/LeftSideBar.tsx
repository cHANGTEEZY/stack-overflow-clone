import React from "react";
import NavLinks from "./navbar/navlinks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { LogOut } from "lucide-react";
import Image from "next/image";

const LeftSideBar = () => {
  const isLoggedIn = true;

  return (
    <section
      className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 
        flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 
        shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      <div className="flex flex-1 flex-col gap-2">
        <NavLinks />
      </div>

      {!isLoggedIn ? (
        <div className="flex flex-col gap-3">
          <Button
            className="small-medium btn-secondary w-full min-h-[41px] rounded-lg 
                    cursor-pointer px-4 py-3 shadow-none"
            asChild
          >
            <Link href={ROUTES.SIGN_IN}>
              <Image
                src={"/icons/account.svg"}
                width={20}
                height={20}
                alt="account"
                className="lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log in
              </span>
            </Link>
          </Button>

          <Button
            className="small-medium light-border-2 text-dark400_light900 btn-tertiary 
                        w-full min-h-[41px] rounded-lg border 
                     cursor-pointer px-4 py-3 shadow-none"
            asChild
          >
            <Link href={ROUTES.SIGN_IN}>
              <Image
                src={"/icons/sign-up.svg"}
                width={20}
                height={20}
                alt="account"
                className="lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Link>
          </Button>
        </div>
      ) : (
        <Button>
          <LogOut className="max-lg:hidden flex" />
          <span className="hidden sm:block cursor-pointer ">Logout</span>
        </Button>
      )}
    </section>
  );
};

export default LeftSideBar;
