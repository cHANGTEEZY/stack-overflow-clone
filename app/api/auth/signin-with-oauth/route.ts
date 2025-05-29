import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const { name, username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    const generateUniqueUsername = async (
      baseUsername: string,
      session: mongoose.ClientSession
    ) => {
      let uniqueUsername = baseUsername;
      let counter = 1;

      while (true) {
        const existingUser = await User.findOne({
          username: uniqueUsername,
        }).session(session);
        if (!existingUser) break;
        uniqueUsername = `${baseUsername}-${counter}`;
        counter++;
      }

      return uniqueUsername;
    };

    let existingUser = await User.findOne({ email }).session(session);

    if (!existingUser) {
      const uniqueUsername = await generateUniqueUsername(
        slugifiedUsername,
        session
      );

      [existingUser] = await User.create(
        [{ name, username: uniqueUsername, email, image }],
        { session }
      );
    } else {
      const updatedData: { name?: string; image?: string } = {};

      if (existingUser.name !== name) updatedData.name = name;
      if (existingUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0) {
        await User.findOneAndUpdate(
          {
            _id: existingUser._id,
          },
          {
            $set: updatedData,
          }
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();

    return NextResponse.json({ success: true });
  } catch (error) {
    session.abortTransaction();
    console.error("Oauth sign-in error", error);
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
  }
}
