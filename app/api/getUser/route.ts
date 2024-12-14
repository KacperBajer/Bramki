import { getUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const headers = req.headers;
    const token = headers.get('token');

    try {

        if (!token) {
          return  NextResponse.json({message: 'No token'}, {status: 400})
        }

        const user = await getUser(token)
        
        if(!user) {
            return  NextResponse.json({message: 'Session expired'}, {status: 401})            
        }
        return  NextResponse.json({message: 'success', user: user}, {status: 200})

    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
