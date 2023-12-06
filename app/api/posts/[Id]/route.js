import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
  const id = params.Id;

  const post = await prisma.post.delete({
    where: { id },
    
  });
  return NextResponse.json(post);
}



export async function GET(request, { params }) {

  const id = params.Id;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return NextResponse.json(post);
}