import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    const id = params.Id;

    const updatedPostData = JSON.parse(request.body);
  
    const updatedPost = await prisma.post.put({
      where: { id },
      updatedPostData,
    });
  
    return NextResponse.json(updatedPost);
  }