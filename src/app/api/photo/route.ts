import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ status:200, message:"성공" })
}