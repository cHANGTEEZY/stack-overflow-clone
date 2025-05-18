import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";
import TagCards from "../cards/TagCards";

const RightSideBar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title: "How to create a custom hook in react",
    },
    {
      _id: "2",
      title: "How to use react query ",
    },
    {
      _id: "3",
      title: "Which is better redux or zustand",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      name: "React",
      questions: "1000",
    },
    {
      _id: "2",
      name: "Next.js",
      questions: "500",
    },
    {
      _id: "3",
      name: "Node.js",
      questions: "2000",
    },
  ];

  return (
    <section
      className="pt-36 custom-scrollbar background-light900_dark200 light-border 
        sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto
        border-l p-6 shadow-light-300 dark:shadow-non max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={ROUTES.PROFILE(question._id)}
              className="flex cursor-pointer 
            items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src={"/icons/chevron-right.svg"}
                alt="Chevron right"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCards />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
