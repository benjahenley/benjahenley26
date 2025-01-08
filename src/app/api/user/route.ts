import prisma from "@/lib/prisma";
import { userSchema } from "@/validations/userSchema";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    await userSchema.validate(userData, { abortEarly: false });
    console.log("Validation successful");

    const { name, email, profileImage } = userData;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        profileImage,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("id") || "");

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
