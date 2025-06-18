"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

const NavLinks = ({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId?: string;
}) => {
  const pathName = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        const route =
          link.route === "/profile" && userId
            ? `/profile/${userId}`
            : link.route;

        if (link.route === "/profile" && !userId) {
          return null;
        }

        const isActive: boolean =
          (pathName.includes(route) && route.length > 1) || pathName === route;

        const LinkComponent = (
          <Link
            href={route}
            key={link.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4",
              !isMobileNav && "max-lg:justify-center"
            )}
          >
            <Image
              src={link.imgURL}
              height={20}
              width={20}
              alt={link.label}
              className={cn({ "invert-colors": !isActive })}
            />

            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {link.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={link.label}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={link.label}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
