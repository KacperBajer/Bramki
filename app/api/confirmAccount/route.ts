import { createUser, isEmailAvailable, loginUser, validateUserRequest } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json(); 
    const headers = req.headers
    const email = headers.get('email')
    const password = headers.get('password')
    const firstname = headers.get('firstname')
    const lastname = headers.get('lastname')
    const userClass = headers.get('userClass')   

    const { key } = body;

    try {

        if (!email || !password || !firstname || !lastname || !key) {
          return  NextResponse.json({message: 'Send all required data'}, {status: 400})
        }
        
        const checkEmailAvailable = await isEmailAvailable(email)

        if(checkEmailAvailable === 'Error') {
          return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
        }

        if(!checkEmailAvailable) {
          return NextResponse.json({message: 'Email is used'}, {status: 500})
        }

        const validateData = await validateUserRequest(email, key, password, firstname, lastname)

        if(validateData.status === 'failed') {
          return NextResponse.json({message: validateData.error || 'Something went wrong'}, {status: 500})
        }

        const createAcc = await createUser(email, password, firstname, lastname, userClass as string)

        if(createAcc.status === 'failed') {
          return  NextResponse.json({message: createAcc.error || 'Something went wrong'}, {status: 500})
        }

        const validate = await loginUser(email, password, 'MOBILE')

        if(validate.status === 'failed') {
          return  NextResponse.json({message: validate.error || 'Something went wrong'}, {status: 500})
        }
        return  NextResponse.json({message: 'Success', token: validate.token}, {status: 200})
    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
