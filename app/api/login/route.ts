import { loginUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json(); 
    const { email, password } = body;

    console.log(email, password)
    try {

        if (!email || !password) {
          return  NextResponse.json({message: 'Email and password are required'}, {status: 400})
        }
        const validate = await loginUser(email, password, 'MOBILE')
        if(validate.status === 'failed') {
            if(validate.error === 'Incorrect email or password') {
                return NextResponse.json({message: validate.error}, {status: 401})
            }
            return  NextResponse.json({message: validate.error}, {status: 500})
        }
        return  NextResponse.json({message: 'Success', token: validate.token}, {status: 200})
    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
