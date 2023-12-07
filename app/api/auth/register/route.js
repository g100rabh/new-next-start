import prisma from "@/lib/prisma";
import { Sql } from "@prisma/client/runtime/library";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log(
      "cre16465456456456416545======n===========>>>>>>>>>>>>>>>.",
      email,
      password
    );

    const hashedPassword = await hash(password, 10);

    console.log(hashedPassword);

    const result = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: email
      },
    });

    console.log("email:", email, "password:", password);
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ message: "success" });
}
