import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

const UserAvatar = ({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) => {
  const initials = name
    .split("")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar>
        {image ? (
          <Image
            src={image}
            alt={name}
            className="object-contain"
            width={36}
            height={36}
            quality={100}
          />
        ) : (
          <AvatarFallback
            className="primary-gradient font-space-grotesk font-bold 
          tracking-wider text-white"
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
