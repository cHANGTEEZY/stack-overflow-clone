import QuestionCards from "@/components/cards/QuestionCards";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "How to learn react",
    description: "I want to learn react, can anyone help me?",
    tags: [
      {
        _id: "1",
        name: "react",
      },
      {
        _id: "2",
        name: "javascript",
      },
    ],
    upvotes: 10,
    answers: 2,
    views: 100,
    createdAt: new Date("2021-10-2"),
    author: {
      _id: "1",
      name: "Sushank",
      image: "/images/avatar.webp",
    },
  },
  {
    _id: "2",
    title: "How to learn nextjs",
    description: "I want to learn nextjs, can anyone help me?",
    tags: [
      {
        _id: "1",
        name: "nextjs",
      },
      {
        _id: "2",
        name: "react",
      },
    ],
    upvotes: 5,
    answers: 1,
    views: 50,
    createdAt: new Date("2021-10-2"),
    author: {
      _id: "1",
      name: "Sushank",
      image: "/images/avatar.webp",
    },
  },
  {
    _id: "3",
    title: "How to learn javascript",
    description: "I want to learn javascript, can anyone help me?",
    tags: [
      {
        _id: "1",
        name: "javascript",
      },
      {
        _id: "2",
        name: "web development",
      },
    ],
    upvotes: 20,
    answers: 5,
    views: 200,
    createdAt: new Date("2021-10-2"),
    author: {
      _id: "1",
      name: "Sushank",
      image: "/images/avatar.webp",
    },
  },
];

const filter = [
  {
    name: "React",
    value: "react",
  },
  {
    name: "Nextjs",
    value: "nextjs",
  },
  {
    name: "Javascript",
    value: "javascript",
  },
  {
    name: "Web Development",
    value: "web development",
  },
  {
    name: "Nodejs",
    value: "nodejs",
  },
  {
    name: "Python",
    value: "python",
  },
  {
    name: "Java",
    value: "java",
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const HomePage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const query = params.query ?? "";
  const filter = params.filter ?? "";
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesFilter = filter
      ? question.tags.some(
          (tag) => tag.name.toLowerCase() === filter.toLowerCase()
        )
      : [];

    return matchesQuery && matchesFilter;
  });

  console.log("filtered", filteredQuestions);

  return (
    <>
      <section className="w-full flex flex-col-reverse justify-between sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          route="/"
          otherClasses={"flex-1"}
        />
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCards key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
