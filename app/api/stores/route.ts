import { auth } from "@clerk/nextjs/server"; 
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // ✅ asta funcționează în server routes
    console.log("USERID:", userId);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (typeof name !== "string" || name.trim().length === 0) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const trimmedName = name.trim();

    const store = await prismadb.store.create({
      data: {
        name: trimmedName,
        userId,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
