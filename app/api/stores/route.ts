import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; 
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
 try {
    const { userId } = getAuth(req);
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


