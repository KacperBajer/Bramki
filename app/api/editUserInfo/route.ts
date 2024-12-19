import { editUser, getUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const headers = req.headers
  const token = headers.get('token')
  const { firstname, lastname, userClass } = body;

  console.log(firstname, lastname, userClass, token);
  try {

    if (!token || !firstname || !lastname) {
      return  NextResponse.json({message: 'First and last name are required'}, {status: 400})
    }

    const user = await getUser(token)
    
    if(!user) {
      return  NextResponse.json({message: 'Session expired'}, {status: 401})            
    }

    const edit = await editUser(user.id, undefined, firstname, lastname, userClass)

    if(edit.status === 'failed') {
      return NextResponse.json(
        { message: edit.error || "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
