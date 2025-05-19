"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, {
          scroll: false,
        });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, route, router, searchParams, pathname]);

  return (
    <div
      className={cn(
        "background-light800_darkGradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4",
        otherClasses
      )}
    >
      <Image src={imgSrc} height={24} width={24} alt="search icon" />

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        className={cn(
          "no-focus border-none placeholder text-dark400_light700 shadow-none outline-none background-light800_darkGradient"
        )}
        onChange={(e) => {
          const newValue = e.target.value;
          setSearchQuery(newValue);
        }}
      />
    </div>
  );
};

export default LocalSearch;
