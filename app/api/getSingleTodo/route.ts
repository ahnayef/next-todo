import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const req = await request.json();

    const { user, author, tid } = req;

    const todoRef = doc(db, "users", author, "todos", tid);

    const todoSnap = await getDoc(todoRef);

    if ((todoSnap.exists())) {

        if (todoSnap.data().author != user && todoSnap.data().private == true) {
            return new NextResponse("You are not authorized to view this todo", {
                status: 401,
            });
        } else {
            return new NextResponse(JSON.stringify(todoSnap.data()), {
                status: 200,
            });
        }

    } else {
        return new NextResponse("Todo not found", {
            status: 404,
        });
    }

    // return new NextResponse(JSON.stringify({ res: tid }), {
    //     status: 200,
    // });

}