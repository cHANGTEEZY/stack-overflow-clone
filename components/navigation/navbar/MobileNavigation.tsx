import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./navlinks";

const MobileNavigation = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer">
          <Image
            src={"/icons/hamburger.svg"}
            width={36}
            height={36}
            alt="hambrger menu"
            className="sm:hidden invert dark:invert-0"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="background-light900_dark200 border-none"
        >
          <SheetHeader>
            <SheetTitle className="" asChild>
              <Link href="/" className={"flex items-center gap-1"}>
                <Image
                  src={"/images/site-logo.svg"}
                  width={23}
                  height={23}
                  alt="stackoverlfow clone logo"
                />
                <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                  Dev<span className="text-primary-500">Flow</span>
                </p>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div
            className="no-scrollbar flex  h-[calc(100vh-80px)] 
            flex-col justify-between overflow-y-auto m-5"
          >
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-10">
                <NavLinks isMobileNav />
              </section>
            </SheetClose>

            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    asChild
                    className="small-medium btn-secondary w-full min-h-[41px] rounded-lg 
                    cursor-pointer px-4 py-3 shadow-none"
                  >
                    <span className="primary-text-gradient">Log in</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    asChild
                    className="small-medium light-border-2 text-dark400_light900 btn-tertiary 
                        w-full min-h-[41px] rounded-lg border 
                     cursor-pointer px-4 py-3 shadow-none"
                  >
                    <span>Sign up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
