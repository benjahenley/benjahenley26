import prisma from "@/lib/prisma";
import { TweetCategory } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") as TweetCategory;

    const tweets = await prisma.tweet.findMany({
      where: { category },
      orderBy: [{ pinned: "desc" }, { date: "desc" }],
      include: {
        user: true,
      },
    });

    return NextResponse.json(tweets);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tweets" },
      { status: 500 }
    );
  }
}
