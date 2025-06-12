import { data } from "../database/data";
import { NextResponse } from "next/server";
interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccesResponse<T = null> = ActionResponse<T> & { success: true };

type ErrorResponse = ActionResponse<undefined> & { success: true };

type APIErrorResponse = NextResponse<ErrorResponse>;

type APIResponse<T = null> = NextResponse<SuccesResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  seacrchParms: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: number;
  filter?: number;
  sort?: string;
}
