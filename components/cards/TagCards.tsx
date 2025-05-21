import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDevIconClassName } from "@/lib/utils";
import { Cone } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: string;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const techIcon = getDevIconClassName(name);

  const content = (
    <>
      <Badge
        className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md
      border-none px-4 py-2 uppercase"
      >
        <div className="flex-center space-x-2">
          <i className={`${techIcon} text-slate-900 dark:text-slate-400`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src={"/icons/close.svg"}
            alt="clsose icon"
            width={12}
            height={12}
            className="cusror-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <Button
        onClick={(e: React.MouseEvent) => e.preventDefault()} //? form was being submitted by this button
        className="flex justify-between gap-2 background-light800_dark300"
      >
        {content}
      </Button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className={"flex justify-between gap-2"}>
        {content}
      </Link>
    );
  }
};

export default TagCard;
