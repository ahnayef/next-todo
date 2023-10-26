import { db } from "@/app/firebase";
import { doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    
    const req = await request.json();

    const tid = req.tid;
      
    const todoRef = doc(db,"users")

    return new NextResponse(JSON.stringify({ res:tid }), {
      status: 200,
    });
    
  }