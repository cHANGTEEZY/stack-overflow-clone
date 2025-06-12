import { auth } from "@/auth";
import QuestionCards from "@/components/cards/QuestionCards";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const HomePage = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 1,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  //   const matchesQuery = question.title
  //     .toLowerCase()
  //     .includes(query.toLowerCase());

  //   const matchesFilter = filter
  //     ? question.tags.some(
  //         (tag) => tag.name.toLowerCase() === filter.toLowerCase()
  //       )
  //     : [];

  //   return matchesQuery && matchesFilter;
  // });

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

      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCards key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p>{error?.message || "Failed to fetch questions"}</p>
        </div>
      )}
    </>
  );
};
export default HomePage;
