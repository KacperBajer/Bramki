import { isValidEmail } from "@/lib/func";
import { createUserRequest } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json(); 
    const { email, password, firstname, lastname, userclass } = body;

    console.log(email, password,  firstname, lastname)
    try {

        if (!email || !password || !firstname  || !lastname) {
          return  NextResponse.json({message: 'Email, password, first and last name are required'}, {status: 400})
        }

        const validEmail = isValidEmail(email)

        if(!validEmail) {
          return NextResponse.json({message: 'You should use school email'}, {status: 500})
        }

        const createacc = await createUserRequest(email, password, firstname, lastname, userclass)
        if(createacc.status === 'failed') {
          return  NextResponse.json({message: createacc.error || 'Something went wrong'}, {status: 500})
        }
       
        return  NextResponse.json({message: 'Success', key: createacc.key}, {status: 200})


    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
