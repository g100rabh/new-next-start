import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function POST(request) {
    const res = await request.json();
    console.log(res);
    const { content, postId} = res;

    const sessionUser = await getServerSession();
    const email = sessionUser.user.email;

    const result = await prisma.comment.create({
        data: {
            email,
            content,
            postId,
        }
    })
    return NextResponse.json({result});
}