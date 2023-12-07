import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{ params }) {
  console.log(params);
  const postId = params.Id;
  console.log(postId);
  


  const comments = await prisma.comment.findMany({
    where: { postId },
  });
console.log(comments);
  return NextResponse.json(comments);
  // return null;
}
