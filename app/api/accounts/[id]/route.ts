import dbConnect from "@/lib/mongoose";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-error";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import { APIErrorResponse } from "@/types/global";
import { AccountSchema, UserSchema } from "@/lib/validations";
import Account from "@/database/account.model";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");
  try {
    await dbConnect();

    const account = await Account.findById(id);
    if (!account) throw new NotFoundError("account");

    return NextResponse.json({ success: true, data: account }, { status: 204 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

//delete user by id
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();

    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

//update user by id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = AccountSchema.safeParse(body);

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const updatedAccount = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedAccount) throw new NotFoundError("Account");

    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
