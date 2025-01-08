import prisma from "@/lib/prisma";
import { tweetIdSchema } from "@/validations/tweetIdSchema";
import { tweetSchema } from "@/validations/tweetSchema";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function POST(request: Request) {
  try {
    const datum = await request.json();

    await tweetSchema.validate(datum, { abortEarly: false });

    const newTweet = await prisma.tweet.create({
      data: datum,
    });

    return NextResponse.json(newTweet, { status: 201 });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const numericId = id ? Number(id) : null;

    if (numericId === null || isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    await tweetIdSchema.validate({ id: numericId }, { abortEarly: false });

    const deletedTweet = await prisma.tweet.delete({
      where: { id: numericId },
    });

    return NextResponse.json(deletedTweet, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const numericId = id ? Number(id) : null;

    if (numericId === null || isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: 400 }
      );
    }
    const deletedTweet = await prisma.tweet.findFirst({
      where: { id: numericId },
    });

    return NextResponse.json(deletedTweet, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
