import prisma from "@/lib/prisma";
import { commentSchema } from "@/validations/commentSchema";
import { NextResponse } from "next/server";
import * as yup from "yup";

export {};

// export async function POST(request: Request) {
//   try {
//     const requestData = await request.json();

//     await commentSchema.validate(requestData, { abortEarly: false });

//     const { content, tweetId } = requestData;

//     const newComment = await prisma.comment.create({
//       data: {
//         content,
//         tweetId,
//         translations: {
//           create: translations.map((translation) => ({
//             language: translation.language,
//             content: translation.content,
//           })),
//         },
//       },
//     });

//     return NextResponse.json(newComment, { status: 201 });
//   } catch (error: any) {
//     if (error instanceof yup.ValidationError) {
//       return NextResponse.json(
//         {
//           error: "Validation error",
//           details: error.errors,
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       {
//         error: "Error creating comment with translations",
//         details: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
