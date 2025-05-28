import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      {
        success: true,
        data: {
          accounts,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = AccountSchema.safeParse(body);

    const existingAccount = await Account.findOne({
      provider: validatedData.data?.provider,
      providerAccountId: validatedData.data?.providerAccountId,
    });

    if (existingAccount)
      throw new ForbiddenError(
        "An account with the same provider and providerAccountId already exists"
      );

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
