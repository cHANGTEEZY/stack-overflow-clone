import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCards";
import Metric from "../Metric";

interface Props {
  question: Question;
}

const QuestionCards = ({
  question: { _id, title, author, tags, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gao-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`asked ${getTimeStamp(createdAt)} ago`}
          href={ROUTES.PROFILE(author._id)}
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl={"/icons/like.svg"}
            alt={"Like"}
            value={upvotes}
            title={`votes`}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl={"/icons/message.svg"}
            alt={"Answers"}
            value={answers}
            title={`Answers`}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl={"/icons/eye.svg"}
            alt={"Views"}
            value={views}
            title={`views`}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCards;
