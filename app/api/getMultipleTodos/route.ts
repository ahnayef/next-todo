import { db } from "@/app/firebase";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const req = await request.json();

    const { aplicant, author } = req;


    const todoRef = collection(db, "users", author, "todos");

    const todoSnap =  await getDocs(todoRef);

    const publicTodos: DocumentData[] = [];
    const privateTodos: DocumentData[] = [];

    if (!(todoSnap.empty)) {

        todoSnap.forEach((doc) => {
            if (doc.data().private) {
              privateTodos.push(doc.data());
            } else {
              publicTodos.push(doc.data());
            }
          });
          
          if(aplicant === author) {

            return new NextResponse(JSON.stringify({ publicTodos:publicTodos,privateTodos:privateTodos }), {
                status: 200,
            });
          } else {
            return new NextResponse(JSON.stringify({ publicTodos: publicTodos, privateTodos: [] }), {
                status: 200,
            });
          }


    } else {
        return new NextResponse("This user don't have any todos yet!", {
            status: 404,
        });
    }

    // return new NextResponse(JSON.stringify({ res: tid }), {
    //     status: 200,
    // });

}